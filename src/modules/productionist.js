/**
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
 * CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
 * NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * Port of productionist to Node.js
 * @author Johnathan Pagnutti
 * NOTE [Port]: The big shift between this library and the original python productionist code is file I/O.
 * This port shifts that code away, because JS environments can often be file I/O unfriendly.  This port provides
 * a series of loaders (based on ajax requests and the Node.js fs module) and does file I/O outside of core processing
 */
import Grammar from "./grammar";
import Loader from './fs-loader'; //NOTE this should be replaced with a context-dependent loading scheme
import ExpressibleMeaning from './expressibleMeaning';
import Output from './output';

//NOTE [Port]: json library isn't needed (JSON is native to JS)
//NOTE [Port]: pickle.js exists, but it's really old.  JavaScript does not have any native object serialization tools, we'll see how
//NOTE long we can go without one

//NOTE [PORT]: I can define terms dynamically in JSON, but going bottom up is scary.  Gonna define
//NOTE file constants up here.
/**
 * Configuration constant to see if we should be using a past loading rather than regenerating
 * information
 * @type {Boolean}
 */
var HAVE_REPETITIONS_FILE_PRESIST_ACROSS_RUNTIME_INSTANCES = false;
/**
 * configuration constant over how strong the penalty for reptition is
 * @type {Number}
 */
var REPETITION_PENALTY_MULTIPLIER = 0.033;
/**
 * configuration constant over how well terms should 'rebound' from being repeated
 * @type {Number}
 */
var REPETITION_PENALTY_RECOVERY_RATE = 1.2;

/**
 * A system that generates text ouputs at runtime, on the fly.
 * @param  {String} contentBundleName      The name of the content bundles
 * @param  {String} contentBundleDirectory  Name of the directory (path?) containing content bundles
 * @param  {Boolean} probabilisticMode      flag to use a probability distribution to select candidates
 * @param  {Boolean} repetitionPenaltyMode   flag to use a penalty to discourage repeated use of 'wildcard rules'
 * @param  {Boolean} terseMode              flag to have the system favor production rules that produce terser dialogue
 * @param  {Number} verbosity              [0, 1, 2] amount of logging information to print
 * @return {Object}                         {Constructor}
 */
//NOTE [Port] we want to remove the load from this function.  Pass in a reference to an already loaded object instead.
class Productionist {
  constructor(contentBundleName, contentBundleDirectory, probabilisticMode, repetitionPenaltyMode, terseMode, verbosity){
    // Create a new productionist object!
    this.contentBundle = contentBundleName;
    //If verbosity is 0, no information will be printed out during processing; if 1, information about how far along
    //Producionist is in its general processing will be printed out; if 2,
    //information about the paths taken throught he grammar tog enerate content will also be printed
    this.verbosity = verbosity

    // In terse mode, the system will favor production rules that may priduce terser dialogue
    this.terseMode = terseMode;

    //The remaining path holds all the semantically meaningful production rules that the system
    //is to execute as soon as they are encountered (between encountering these rules, the
    //system is free to select between wildcard production rules since that only result in
    //lexical/syntatic variation, i.e., not variation in the tags that are accumulated); this
    //attribute gets set by this.followRecipe()
    this.remainingPath = [];
    // The explicit path holds all production rules that the system ended up executing
    // during generation (including ones that were selected as wildcard rules, which would thus not
    // be included in the remaining path); this is saved a record of the generation process that
    // produced a line, and is critically utilized to produce the bracked expression for a line
    this.explicitPathTaken = [];
    // Whether Productionist is currently targeting a particular expressible meaning, which means
    // that it cannot go down paths that would accumulate tags outside that meaning, or Whether
    // it is generating example terminal results of expanding nonterminal symbols or executing
    // production rules, in which case every production rule becomes a wildcard rule
    this.targetingMeaning = true;
    // In probabilistic mode, Productionist will select which expressible meanings to target
    // probabilistically, by fitting a probability distribution to the candidates uses the scores
    // given to them; otherwise, Productionist will simply pick the highest scoring one
    this.probabilisticMode = probabilisticMode;
    // In reptition-penalty mode, semantically meaningless rules ("wildcard rules") that have been
    // used to produce recently generated content are less likely to be selected again (with a decay
    // rate on the penalty for selecting them); we do this by maintaining a current penalty for each
    // rule that increases each time the rule is used and decays as the rule is not used
    this.reptitionPenaltyMode = repetitionPenaltyMode;

    //Grab the path to the directory with the content bundle_name
    //NOTE [Port]: This needs to be shifted out of the main library to be able to get data from more sources
    if(contentBundleDirectory.endsWith("/")){ //strip trailing slash.  [Port]: might shift this to a URI
      contentBundleDirectory = contentBundleDirectory.substring(0, contentBundleDirectory.length - 2);
    }
    // hold onto the grammar file path.
    this.grammarFileLocation = contentBundleDirectory;

    //NOTE [Port]: Adding a property to say if this productionist object is finalized or not.  Non-finalized objects
    //NOTE cannot be used yet, and still need finalizeProductionist to be called.
  }

  /**
   * Return whether any mode is engaged such that candidate production rules need to be scored.
   * NOTE [Port] The way this is structured in python, I don't know how it's setter would work.  But, to keep
   * things mostly aligned, I'm using the get/set interface in JavaScript rather than a regular function.
   * @return {Boolean} if we need to score the production rules or not
   */
  get scoringModesEngated(){
    return this.repetitionPenaltyMode || this.terseMode || this.grammar.unequalRuleFrequencies;
  }

  /**
   * Method 'finalizes' a productionist object by async loading of all the various files that
   * might be used for a productionist instance.
   *
   * This also does the last round of initalization needed for Productionist to function.
   * @return {promise} a promise for a finalized productionist object
   */
  finalizeProductionist(){
    // NOTE [Port] moving all of this to a promise chain
    //build the grammar file in memory, using the Grammar class
    return this.loadGrammar(`${this.grammarFileLocation}/${this.contentBundle}.grammar`)
      .then(grammar => {
        this.grammar = grammar;
        //If applicable, laod the trie file at the specified location; this file contains a data structure
        // (a 'trie') that efficently stores all the semantically meaningful paths through the
        // grammar; this file will have been generated by Reductionist
        // NOTE [Port] loadTrie always rejects right now
        return this.loadTrie(`${this.grammarFileLocation}/${this.contentBundle}.marisa`)
      })
      .catch(() => {
        this.trie = null;
        // Also load a set of expressible meanings -- these pertain to each of the possible targets that
        // generated content may come packaged with, and each expressible meaning handles its associated
        // target with recipes for producing that content (in the form of paths through the grammar)
        return this.loadExpressibleMeanings(`${this.grammarFileLocation}/${this.contentBundle}.meanings`);
      })
      .then(meanings => {
        this.expressibleMeanigns = meanings;
        if(this.reptitionPenaltyMode){
          if(HAVE_REPETITIONS_FILE_PRESIST_ACROSS_RUNTIME_INSTANCES){
            let repetitionsFilePath = this.grammarFileLocation.substring(0, this.grammarFileLocation.length - 6);
            return Loader.loadRepetitions(repetitionsFilePath);
          }
        }
      })
      .then(repetitionPenalties => {
        //Promise success!  Either we didn't try to load a repeitionPeanlities file (in which the the object is empty)
        //OR we successfully loaded one
        if(repetitionPenalties === undefined){
          if(this.reptitionPenaltyMode){
            this.repetitionPenalties = {}
            let grammarSymbols = this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols);
            for(let symbol of grammarSymbols){
              this.repetitionsPenalties[symbol.toString()] = 1.0;
            }
            if (this.verbosity > 0){
              console.log("Initializing new repetitions dictionary...");
            }
          }else{
            this.repetitionPenalties = {};
          }
        }else{
          this.repetitionPenalties = repetitionPenalties;
          if (this.verbosity > 0){
            console.log("Loading repetitions file...");
          }
        }
      }, () => {
        // promise failure---we couldn't get anything from the repeitions file
        this.repetitionPenalties = {}
        let grammarSymbols = this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols);
        for(let symbol of grammarSymbols){
          this.repetitionsPenalties[symbol.toString()] = 1.0;
        }
        if (this.verbosity > 0){
          console.log("Cound not load repetitions dictionary -- initializing new one...");
        }
      })
      .then(() => {
        this.finalized = true;
        return this;
      }
    );
  }
  /**
   * Load the grammar sepcification form file and build and returna  Grammar object for it.
   * @param  {String} grammarFileLocation grammar file location
   * @return {Promise}                    a promise for a new gramamr object
   * @private
   */
  loadGrammar(grammarFileLocation){
    if (this.verbosity > 0){
      console.log("Loading grammar...");
    }
    return Loader.loadGrammar(grammarFileLocation).then(grammarObj => new Grammar(grammarObj));
  }

  /**
   * Load a trie file (one containing the semantically meaingful paths through this gramamr)
   * @param  {String} trieFileLocation Path to a trie file
   * @return {Promise}                 A promise for a Trie object
   * @private
   */
  // NOTE [Port] we want to split out fileIO from the main library, see others
  loadTrie(trieFileLocation){
    if(this.verbosity > 0){
      console.log("Loading trie...");
    }
    // NOTE [Port] Not touching ANY of this yet.  Gonna just reject this promise outright.
    return Promise.reject(new Error('Trie files are currently not supported, skipping Trie load.'));
  }

  /**
   * Load a set of constructed expressible meanings from a file.
   * @param  {String} expressibleMeaningsFileLocation path to the meanings file
   * @return {Promise}                    A Promise for a new ExpressibleMeanings object
   * @private
   */
  loadExpressibleMeanings(expressibleMeaningsFileLocation){
    if(this.verbosity > 0){
      console.log("Loading expressible meanings...");
    }
    let expressibleMeanings = [];
    let idToTag = this.grammar.idToTag;
    return Loader.loadExpressiblemeanings(expressibleMeaningsFileLocation)
      .then(triples => {
        for(let triple of triples){
          let meaningId = triple[0];
          let allPathsStr = triple[1];
          let allTagsStr = triple[2];

          let recipes = [];

          if(this.trie){
            //TODO [Port] skipping Tries for right now
            return Promise.reject(new Error('This port currently does not suport Trie files, unable to create recipes.'));
          }else{
            for(let pathStr in allPathsStr.split('|')){
              recipes.append(pathStr.split(',').map(ruleId => Number(ruleId)));
            }
          }
          let tags = new Set();
          for(let tagId of allTagsStr.split(',')){
            tags.add(idToTag[tagId]);
          }
          expressibleMeanings.push(
            new ExpressibleMeaning(Number(meaningId), tags, recipes)
          );
        }

        expressibleMeanings.sort((a, b) => {
          if(a.id < b.id){
            return -1;
          }else if(a.id > b.id){
            return 1;
          }else{
            return 0;
          }
        });

        return expressibleMeanings;
      }
    );
  }

  /**
   * Save a serialized version of the repetition-penalties dictionary, for use in any subsequent
   * generation instances
   * @return {Promise} a promise for the file to have been saved.
   */
  saveRepetitionPenaltiesFile(){
    //let pathToRepetitionsFile = `${this.contentBundle}.repetitions`;
    //TODO oh this is where pickle would have been used
    //TODO right now, I don't want to deal with any of this, so I'm just gonna mark it for fixing later
    return Promise.reject(new Error("saveRepeitionPenalitiesFile is unimplemented"));
  }

  /**
   * Furnish example text generated by terminally exapnding the nonterminal symbol with the given name
   * @param  {String} nonterminalSymbolName the name of the nonterminal we'd like to Furnish
   * @return {object}                       A package of content, mapping a symbol to generated text
   */
  furnishExampleTerminalExpansionOfNonterminalSymbol(nonterminalSymbolName){
    let nonterminalflag = this.grammar.nonterminalSymbols.some(s => s.name === nonterminalSymbolName);
    if(!nonterminalflag){
      //NOTE [Port] probably need to find a better way to identify things instead of contentBundles, as that might
      //NOTE not be sane in all JS applications
      throw new Error(`Error: There is no nonterminal symbol in ${this.contentBundle}.grammar with the name ${nonterminalSymbolName}`);
    }
    this.targetingMeaning = false; // all rules we encounter will be treated as wildcard rules
    let targetedSymbol = this.grammar.nonterminalSymbols.map(s => s.name === nonterminalSymbolName)[0];
    // Terminally expand the symbol to generate text
    let generatedText = this.terminallyExpandNonterminalSymbol(targetedSymbol, 0);
    // Package that up with all the associated metadata
    let output = this.buildContentPackage(targetedSymbol, generatedText);
    // Reset the targetingMeaning attribute
    this.targetingMeaning = true;
    // Return the content package
    return output;
  }

  /**
   * Furnish example text generated as the terminal result of excuting the production rule with the given definition
   * @param  {String} productionRuleDefinition a string representation of a production rule
   * @return {ContentPackage}                          A complete content package from firing this rule
   */
  furnishExampleTerminalResultOfExecutingProductionRule(productionRuleDefinition){
    let definitionFlag = this.grammar.productionRules.some(r => r.toString() === productionRuleDefinition);
    if(!definitionFlag){
      throw new Error(`Error: There is no production rule in ${this.contentBundle}.grammar with the definition ${productionRuleDefinition}`)
    }

    this.targetingMeaning = false; //All rules we encounter will be treated as wildcard rules
    let targetedRule = this.grammar.productionRules.filter(r => r.toString() === productionRuleDefinition).next();
    // Collect the terminal results of executing this rule
    let generatedText = this.executeProductionRule(targetedRule, 0);
    // Package that up with all the associated metadata
    let output = this.buildContnetPackage(targetedRule.head, generatedText);
    // Reset the taretingMeaning attribute
    this.targetingMeaning = true;
    // return the content package
    return output;
  }

  /**
   * Satisfy the given content request
   * @param  {contentRequest} contentRequest a content request objects
   * @return {ContentPackage}                a content package for this request
   * @throws {Error}                         Unable to fulfill the provided request
   * @private
   */
  fulfillContentRequest(contentRequest){
    // Find all the expressible meanings that are stisfying, given the content request
    let satisficingExpresibleMeanings = this.compileSatisficingExpressibleMeanings(contentRequest);
    // if there's no satisficing content requests, throw an error
    if(satisficingExpresibleMeanings === undefined){
      throw new Error("Error: The submitted content request cannont be fulfilled by using this grammar.");
    }

    // Select one of these to target for generation, either randomly or by using the scoring metric
    // given in the content request
    let selectedExpressibleMeaning = this.selectExpressibleMeaning(satisficingExpresibleMeanings, contentRequest.scoringMetric);

    // Select one of the grammar paths associated with this expressible meaning
    let selectedRecipe = this.selectRecipeForExpressibleMeaning(selectedExpressibleMeaning);

    //Execute that grammar path to produce the generated content satisfying the content request
    let generatedText = this.followRecipe(selectedRecipe);

    // package that up with all the associated metadata
    return this.buildContentPackage(generatedText, null, null, contentRequest);
  }

  /**
   * Furnish an object that packaged the generated text with its acumulated tags and other metadata
   * @param  {String?} generatedText  the text that has been generated for this content request
   * @param  {Object?} targetedSymbol optional symbol that was targeted for this production
   * @param  {Recipe} selectedRecipe  optional recipe used to generate the text
   * @param  {ContentRequest} contentRequest the content request that the generated text is answering
   * @return {Output}                a new Output object (the generated text [ackaged with tags and other metadata)
   * @throws {Error}                  Unable to create a content package that satisfyies the contentRequest
   * @private
   */
  buildContentPackage(generatedText, targetedSymbol, selectedRecipe, contentRequest){
    // Collect all the tags attached to the symbols along with the path we took -- these are the
    // tags that will com bunded with generated content

    let tags = new Set();
    for(let productionRule of this.explicitPathTaken){
      //NOTE [Port] javascript does not have a set |= operator, elements must be added one by one
      let ruleTags = new Set(productionRule.tags);
      for(let tag of ruleTags){
        tags.add(tag);
      }
    }

    // Produce a bracketed expression specifying the specific path through the grammar that
    // produced this generated content (useful for debugging/authoring purposes); first, we'll
    // need to save a copy of the explicit path that we took through the grammar, since this
    // will be consumed as we build the bracketed expression
    let explicitPathTaken = this.explicitPathTaken;

    //NOTE [Port] this whole thing is a little awkward, and could probably be better done with a flag in produceBracketedExpression...
    let bracketedExpression = undefined; //NOTE [Port] need to reserve the var name
    if(targetedSymbol){ //NOTE [Port] letting JavaScript's 'Truthy' evaluation put in work, to cover both the null and undefiend cases
      bracketedExpression = this.produceBracketedExpression(targetedSymbol);
    }else{
      bracketedExpression = this.produceBracketedExpression();
    }

    // Instantiate an Output object
    let output = new Output(generatedText, tags, selectedRecipe, explicitPathTaken, bracketedExpression);

    // If repeition-penalty mode is engaged, penalize all the rules that we executed to produce
    // that content (so that they will be les likely to be used again) and decay the penalties
    // for all the other production rules in the grammar that we didn't execute this time around
    if(this.reptitionPenaltyMode){
      this.updateRepritionPenalties(explicitPathTaken);
    }

    // Lastly, if this content is meant to fulfill a content request, check to make sure it does so
    if (contentRequest){ //NOTE [Port] let JavaScript 'truthy' evaluation handle both undefined and null cases
      //TODO this set of flag calculations (issuperset DNE JS)
      let contentFulfillsTheRequest = !(output.tags & contentRequest.mustNotHave) && output.tags.issuperset(contentRequest.mustHave);
      if (!contentFulfillsTheRequest){
        throw new Error("The generated content unit does not satisfy the content request.");
      }
    }
    return output;
  }

  /**
   * Compile all satisficing expressible meanings that are stasificing.
   *
   * In this case, 'satisficing' meanins that an expressible meaning has none of the
   * 'must not have' tags and all of the 'must have' tags that are specified in the
   * content request.
   * @param  {contentRequest} contentRequest A request for this content
   * @return {Array}                A list of ExpressibleMeanings for the provided content request
   * @private
   */
  compileSatisficingExpressibleMeanings(contentRequest){
    //TODO JS sets don't have the & or issuperset operations
    // Make sure none of these have conditions tags that are currently violated
    return this.expressibleMeanings.map(em => !(em.tags & contentRequest.mustNotHave) && em.tags.issuperset(contentRequest.mustHave));
  }

  /**
   * Select an expressible meaning to target for generation
   * @param  {Array} candidates    A list of potential ExpressibleMeanings
   * @param  {Function?} scoringMetric A way to score each ExpressibleMeaning
   * @return {ExpressibleMeaning}               The ExpressibleMeaning to go for
   * @private
   */
  selectExpressibleMeaning(candidates, scoringMetric){
    if (this.verbsoity > 0){
      console.log("Selecting Expressible Meaning...");
    }
    let selectedExpressibleMeaning = undefined;  //NOTE [Port] need to reserve this var name
    // If there's only one option, we can just select that right off and move on
    if (candidates.length > 1){
      selectedExpressibleMeaning = candidates[0];
    }else if(! scoringMetric){
      // If no scoring metric was provided, we can just randomly select a satisficing intermediate
      // representation as the one that we will target
      // TODO see if JS has a random.choice(...) functionality
      selectedExpressibleMeaning = candidates[Math.floor(Math.random() * candidates.length)];
    }else{
      if(this.verbosity > 0){
        console.log("Scoring Expressible Meanings...");
        // If a scoring metric *was* provided in the content request, use it to rank the satisficing
        // expressible meaning; first, we need to score each of the candidate intermediate
        // representations using the scoring metric
        // provided in the content request
        let scores = {};
        for(let candidate of candidates){
          scores[candidate.toString()] = this.scoreExpressibleMeaning(candidate, scoringMetric);
        }
        // check if any candidate even earned any points; if not, we can just pick randomly
        let scoreValues = Object.keys(scores).map(key => scores[key]);
        if(!scoreValues){ //NOTE [Port] broke this into two lines
          selectedExpressibleMeaning = candidates[Math.floor(Math.random() * candidates.length)];
        }else{
          // fit a probability distribution to the candidates
          let probabilityRanges = this.fitProbabilityDistributionToDecisionCandidates(scores);
          // pick a specific expressible meaning to target
          selectedExpressibleMeaning = this.selectCandidateGivenProbabilityDistribution(probabilityRanges);
        }

        if (this.verbosity > 1){
          console.log("Derived the following scores for expressible meanings:");
          for(let candidate in scores){
            console.log(`\tEM${candidate.id}\t${scores[candidate]}`);
          }
        }
      }
    }

    return selectedExpressibleMeaning;
  }

  /**
   * Score a candidate expressible meaning using the scoring metric provided in a content request.
   * @param  {expressibleMeaning} expressibleMeaning the meaning the content request wants to express
   * @param  {Array?} scoringMetric      How to score all expressible meanings for this content request
   * @return {Number}                    The score for this content request
   * @private
   */
  static scoreExpressibleMeaning(expressibleMeaning, scoringMetric){
    let score = 0;
    //NOTE [Port] you can't really do this double iteration in JavaScript.  We an break down tuples on indexes though
    for(let elem of scoringMetric){
      let tag = elem[0];
      let weight = elem[1];
      if(expressibleMeaning.tags.includes(tag)){
        score += weight;
      }
    }
    return score;
  }

  /**
   * Select one of the grammar paths associated with the given expressible meaning
   * @param  {expressibleMeaning} expressibleMeaning a potential expressible meaning with the content request
   * @return {Recipe}                    a path through the current grammar that expresses the expressible meaning
   */
  selectRecipeForExpressibleMeaning(expressibleMeaning){
    if(this.verbosity > 0){
      if(expressibleMeaning.recipes.length === 1){
        console.log(`Selecting EM ${this.expressibleMeanings.indexOf(expressibleMeaning)}'s sole recipe...'`);
      }else{
        console.log(`Selecting one of EM${this.expressibleMeanings.indexOf(expressibleMeaning)}'s ${expressibleMeaning.recipes.length} recipes...'`);
      }
    }

    let candidates = expressibleMeaning.recipes;
    let selectedRecipe = undefined; //NOTE [Port] need to reserve this var name
    //If there's only one option, we can just select that right off and move on
    if(candidates.length === 1){
      selectedRecipe = candidates[0];
    }else if(!this.scoringModesEngaged){
      selectedRecipe = candidates[Math.floor(Math.random() * candidates.length)];
    }else{
      // If it is engaged, we'll want to select a path that won't generate a lot of repeition; to
      // prevent repetition, we can store candidate paths according to the current repeition
      // penalties attached to the symbols in the production rules on the paths; first lets
      // compute a utility distribution over the candidate paths
      let scores = {};
      for(let recipe of candidates){
        scores[recipe] = this.scoreCandidateRecipe(recipe);
      }
      // Check if any candidate even earned any ponts; if not, we can just pick randomly
      let scoreValues = Object.keys(scores).map(key => scores[key]);
      if(!scoreValues){ //NOTE [Port] broke this into two lines
        selectedRecipe = candidates[Math.floor(Math.random() * candidates.length)];
      }else{
        // next, fit a probability distribution to the utility distribution
        let probabilityRanges = this.fitProbabilityDistributionToDecisionCandidates(scores);
        // finally, select a path (using the probability distribution, if probabilistic mode is enaged)
        selectedRecipe = this.selectCandidateGivenProbabilityDistribution(probabilityRanges);
      }
    }
    return selectedRecipe;
  }

  /**
   * Return a score for the given recipe according to the scores for the production rules on its path
   * @param  {Recipe} recipe the recipe to score
   * @return {Number}        the recipe's score
   * @private
   */
  scoreCandidateRecipe(recipe){
    // Ground out hte rule references in the recipe to form a list of actual ProductionRule
    // objects; note: if there's no path string, that means tthe selected path is one that
    // doesn't pass through any symbols with tags; in this case, Productionist can just select
    // between produciton rules that are not semantically meaningful until it's gorund out into
    // a terminal expansion
    let path = recipe.path.map(ruleId => this.grammar.productionRules[ruleId]);
    let score = path.reduce((ruleA, ruleB) => this.scoreCandidateProductionRule(ruleA) + this.scoreCandidateProductionRule(ruleB), 0);
    return score;
  }

  /**
   * Return a score for the given production rule.
   *
   * The score for this rule will be calculated according to its expansion-control tags (application
   * frequency and usage constraint) and, if applicable, the current repetition penalties of the symbols
   * in its body (if the repeptition-penalty mode is engaged) and the number and length of the symbols in
   * its body (if terse mode is engaged)
   * @param  {ProductionRule} productionRule the production rule to score
   * @return {Number}                the score of this production rule
   * @private
   */
  scoreCandidateProductionRule(productionRule){
    let score = 1.0;
    // if applicable, adjust score according to repeition penalties and terseness
    for(let symbol of productionRule.body){
      if(this.reptitionPenaltyMode){
        score *= this.reptitionPenalties[symbol.toString()];
      }
      if(this.terseMode){
        if(symbol instanceof String){
          score /= symbol.length;
        }
      }else{
        // Need more testing here, and the divisor should be a config constant -- idea is to penalize
        // longer stntence templates so as to avoid a local-optimum situation: it does this by dividing
        // the score in half for every nonterminal symbol on the rule's right-hand side
        score /= 2;
      }
    }

    // Finally, adjust score according to the application frequency associated with this rule; specifically,
    // multiply the score by the rule's frequency score multiplier (which will be 1.0 or less)
    score *= productionRule.frequencyScoreMultiplier;
    return score;
  }

  /**
   * Follow the given recipe to generate the desired text content.
   * @param  {Recipe} recipe the recipe to follow
   * @return {String}        terminal text
   * @private
   */
  followRecipe(recipe){
    // Ground out the rule references in the recipe to form a list of actual ProductionRule
    // objects; note: if this is an empty list, that means that the selected path is one that
    // doesn't pass through any symbols with tags; in this case, Productionist can just randomly
    // select production rules that are not semantically meaningful until it's ground out into
    // a terminal expansion

    let path = recipe.path.map(ruleId => this.grammar.productionRules[ruleId]);
    // keep this list handy as the list of remaining rules to execute --- we'll
    // be consuming this as we proceed
    this.remainingPath = path; //NOTE [Port] path is already a list

    // Keep track of all the rules we ended up firing for this path, including our choices
    // for wildcards --- we'll use this later to generate a pracketed expression specifying
    // how exactly the contnet unit was generated (for debugging/authoring purposes)
    this.explicitPathTaken = [];
    // Execute the rules on the selected path in order to produce content expressing the
    // desired semantics, which are specifically the tags associated with the targeted
    // expressible meaning; this can be done by simply targeting the grammar's
    // start symbol and then only using rules on the targeted path for expansion (with
    // randomly chosen rules executed in each case of a wild card on the path)
    let text = this.terminallyExpandNonterminalSymbol(this.grammar.startSymbol, 0);
    return text;
  }

  /**
   * Terminally expand the given symbol.
   * @param  {NonterminalSymbol} nonterminalSymbol A non-terminal to expand
   * @param  {Number} nTabsForDebug     the number of tabs to use for debugging statements
   * @return {String}                   the expansion of this rule
   */
  terminallyExpandNonterminalSymbol(nonterminalSymbol, nTabsForDebug){
    let debugWhitespace = new Array(nTabsForDebug).join('  '); //NOTE [Port] JS String multipulcation can get weird, so abusing Array.prototype.join()
    if(this.verbosity > 1){
      console.log(`${debugWhitespace}Expanding nonterminal symbol [[${nonterminalSymbol.name}]]...`);
    }

    let nextRule = undefined; // NOTE [Port] need to reserve a variable name
    // Select a production rule
    if(this.remainingPath && nonterminalSymbol.productionRules.includes(this.remainingPath[0])){
      nextRule = this.remainingPath.splice(0, 1)[0]; //NOTE [Port] JS splice returns an array
    }else{
      if(this.verbosity > 1){
        console.log(`${debugWhitespace}Selecting wildcard rule...`);
      }
      nextRule = this.selectWildcardProductionRule(nonterminalSymbol);
    }

    return this.executeProductionRule(nextRule, nTabsForDebug + 1);
  }

  /**
   * Select a wildcard production rule that will be used to expand the given nonterminal symbol.
   *
   * A 'wildcard rule' is one that is not marked as being semantically meaningful, and is thus not
   * included on the targeted path (stored as the 'remainingPath' attribute)
   * @param  {NonterminalSymbol} nonterminalSymbol the nonterminal symbol we'll expand
   * @return {ProductionRule}                   the wildcard rule to use
   * @throws {Error}                            If this nonterminal symbol has no wildcard rules
   * @private
   */
  selectWildcardProductionRule(nonterminalSymbol){
    let candidateWildcardRules = []; //NOTE [Port] need to reserve the var names
    let selectedWildcardRule = undefined;

    if(this.targetingMeaning){
      for(let r of nonterminalSymbol.productionRules){
          if(!r.semanticallyMeaningful){
            candidateWildcardRules.push(r);
          }
      }
    }else{
      candidateWildcardRules = nonterminalSymbol.productionRules;
    }

    // If there's only one choice, we can just select that and move on
    if(candidateWildcardRules.length === 1){
      selectedWildcardRule = candidateWildcardRules[0];
    }else if(!this.scoringModesEngaged){
      // If no scoring mode is engaged, we can simply rnadomly select a wildcard rule
      // NOTE [Port] original code attempts to make a random choice from a list, and catches an index error
      //            if the list is empty.  I'm going to just check and throw---it's more similar to how
      //            earlier assert statements look in JS.
      if(candidateWildcardRules.length === 0){
        throw new Error(`AuthoringError: THe nonterminal symbol ${nonterminalSymbol.name}
           has no available wildcard rules, which means it cannont be expanded.`);
      }
    }else{
      // otherwise, w eneed to compute a utility distrbution over the candidate wildcard rules
      let scores = {};
      for(let rule in candidateWildcardRules){
        scores[rule] = this.scoreCandidateProductionRule(rule);
      }
      // check if any candidate even earned any points; if not, we can just pick randomly
      //NOTE [Port] broke this into two lines
      let scoreValues = Object.keys(scores).map(key => scores[key]);
      if(!scoreValues){
        selectedWildcardRule = candidateWildcardRules[Math.floor(Math.random() * candidateWildcardRules.length)];
      }
    }

    return selectedWildcardRule;
  }

  /**
   * Execute the given production rule
   * @param  {ProductionRule} rule          The rule to expanding
   * @param  {Number} nTabsForDebug number of tabs to use for debug statements
   * @return {String}               the expansion of this rule
   * @private
   */
  executeProductionRule(rule, nTabsForDebug){
    let debugWhitespace = new Array(nTabsForDebug).join('  '); //NOTE [Port] JS String multipulcation can get weird, so abusing Array.prototype.join()
    if(this.verbosity > 1){
      console.log(`${debugWhitespace}Using production rule #${rule.id}: '${rule.toString()}'`);
    }

    // Add to our record of the explicit path we took in the grammar to produce the
    // content we'll be sending back
    this.explictPathTaken.push(rule);
    // Terminally expand this symbol
    let terminallyExpandedSymbolsInThisRuleBody = [];
    for(let symbol in rule.body){
      if(symbol instanceof String){
        terminallyExpandedSymbolsInThisRuleBody.push(symbol);
      }else{
        // Nonterminal symbol, which means we have to expand it
        //NOTE [Port] got rid of a helper var.  This feels cleaner and fits more with the
        //NOTE more functional style here
        terminallyExpandedSymbolsInThisRuleBody.push(
          this.terminallyExpandNonterminalSymbol(symbol, nTabsForDebug + 1)
        );
      }
    }

    // Concatinate the results and return that string
    return terminallyExpandedSymbolsInThisRuleBody.join('');
  }

  /**
   * Produce a bracketed expression for a given grammar path.
   *
   * Bracketed expressions can be useful for debugging purposes, since they provide an explicit_grammar_path_taken
   * account of how a content unit was generated.
   * @param  {Object?} symbolToStartFrom (optional) The symbol to start from.  If not provided, will start from the
   * grammar's start symbol
   * @return {[String?}                   The bracketed expression from this symbol
   * @private
   */
  produceBracketedExpression(symbolToStartFrom){
    // Unless this content was produced by explicitly targeting a nonterminal symbol or
    // production rule (to support live authoring feedback), we'll want to start at the
    // grammar's start symbol
    if(symbolToStartFrom === undefined || symbolToStartFrom === null){
      symbolToStartFrom = this.grammar.startSymbol;
    }

    //NOTE [Port] ketp the helper var here, but TODO: remove it.
    let bracketedExpression = this.expandNonterminalSymbolToProduceBracketedExpressionFragment(symbolToStartFrom);
    return bracketedExpression;
  }

  /**
   * Expand the given symbol to produce the next framgent of the bracketed expression being produced
   * @param  {NonterminalSymbol} nonterminalSymbol the nonterminal symbol to expand to get a bracketed expression
   * @return {String}                   the bracketed expression from this nonterminal symbol
   * @throws {Error}                    if the symbol does not fit with the rules on the production path
   * @private
   */
  expandNonterminalSymbolToProduceBracketedExpressionFragment(nonterminalSymbol){
    //NOTE [Port] JS doesn't have typed errors by default, and making a new error type to
    //NOTE catch an index problem feels incorrect.  In keeping with current convention
    //NOTE I'm moving to checking this in an if statement
    if(this.explicitPathTaken.length > 0){
      let nextRule = this.explicitPathTaken.splice(0, 1)[0]; //NOTE [Port] JS splice returns a list
      if(!nonterminalSymbol.productionRules.includes(nextRule)){
        throw new Error(`Error: Expected rule #${nextRule.id} to be a production rule of the symbol ${nonterminalSymbol.name}`);
      }
      // Use the next production rule on the path to produce the next frament of the bracketed expression
      return this.executeProductionRuleToProduceBracketedExpressionFragment(nextRule);
    }else{
      //NOTE [Port] this code goes where the catch originally went
      //NOTE Also, tweeked slightly to better fit JSs template strings from Python's
      // This nonterminal symbol currently has no production rules, so we'll just return the bracketed expression
      let tags = nonterminalSymbol.tags.map(t => t);
      //TODO remove this helper var
      let bracketedExpressionFragment = `${nonterminalSymbol.name}<${tags.join(', ')}>[[[${nonterminalSymbol.name}]]]`;
      return bracketedExpressionFragment;
    }
  }

  /**
   * Execute the given production rule to produce the next frament of the bracketed expression being produced
   * @param  {ProductionRule} rule production rule to execute
   * @return {String}      the bracketed expression from executing this production rule
   * @private
   */
  executeProductionRuleToProduceBracketedExpressionFragment(rule){
    // Terminally expand this symbol
    let terminallyExpandedSymbolsInThisRuleBody = [];
    for(let symbol of rule.body){
      if(symbol instanceof String){
        //terminal symbol (no need to expand)
        terminallyExpandedSymbolsInThisRuleBody.push(`"${symbol.toString()}"`);
      }else{
        terminallyExpandedSymbolsInThisRuleBody.push(
          this.expandNonterminalSymbolToProduceBracketedExpressionFragment(symbol)
        );
      }
    }

    // Concatenate the results and return that string
    // NOTE [Port] Tweeked slightly to better fit JSs template strings from Python's
    let tags = rule.head.tags ? rule.head.tags.map(t => t).join(', ') : '';
    // TODO remove this helper var, maybe clean up this template?
    let bracketedExpressionFragment = `${rule.head.name} <${tags}>[${terminallyExpandedSymbolsInThisRuleBody.join(' + ')}]`;
    return bracketedExpressionFragment;
  }

  /**
   * Udate the repetition penalties to increase the penalties for symbols we just used and decay the penalty
   * for all symbols we did not use this time around.
   * @param  {Array} explicitPathTaken the path through the grammar we just took
   * @return {Undefined}                   function does not return, just updates state
   */
  updateRepetitionPenalties(explicitPathTaken){
    let symbolsUsedThisTime = new Set();
    for(let rule of explicitPathTaken){
      for(let symbol of rule.body){
        symbolsUsedThisTime.add(symbol);
      }
    }
    //NOTE [Port] using a helper var here, because array concatination in JS can get a little weird.
    let grammarSymbols = this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols);
    for(let symbol of grammarSymbols){
      if(symbolsUsedThisTime.includes(symbol)){
        this.repetitionPenalties[symbol.toString()] *= REPETITION_PENALTY_MULTIPLIER;
      }else{
        this.repetitionPenalties[symbol.toString()] *= REPETITION_PENALTY_RECOVERY_RATE;
      }
      this.repetitionPenalties[symbol.toString()] = Math.min(1.0, this.reptitionPenalties[symbol.toString()]);
    }
  }

  /**
   * Return a dictionary mapping each of the decision candidates to a probability range
   * @param  {Object} scores dictionary containing the scores of all the candidates
   * @return {Object}        dictionary of a probability distribution to each candidates
   * @private
   */
  static fitProbabilityDistributionToDecisionCandidates(scores){
    let candidates = Object.keys(scores);
    // determine the individual prbabilities of each candidate
    let individualProbabilities = {};
    //NOTE [Port] JS doesn't the value() property or sum() function, so this looks a little
    //NOTE ganrlier but should be equivelent
    let sumOfAllScores = Object.keys(scores).map(key => scores[key]).reduce((a, b) => a + b);
    for(let candidate in candidates){
      individualProbabilities[candidate] = scores[candidate] / sumOfAllScores;
    }
    // Use those individual probabilities to associate each candidate with a specific
    // probability range, such that generating a random value between 0.0 and 1.0 will fall into
    // one and only one candidate's probability range
    let probabilityRanges = {};
    let currentBound = 0.0;
    for(let candidate of candidates){
      //NOTE [Port] took away a lot of helper variables here
      probabilityRanges[candidate] = [currentBound, currentBound + individualProbabilities[candidate]];
      currentBound += individualProbabilities[candidate];
    }
    // Make sure the last bound indeed extends to 1.0 (necessary because of rounding issues)
    // NOTE [Port] if Python had them, FOR SURE, JavaScript does
    let lastCandidateToHaveARangeAttributed = candidates[candidates.length - 1];
    probabilityRanges[lastCandidateToHaveARangeAttributed] = [probabilityRanges[lastCandidateToHaveARangeAttributed][0], 1.0];

    return probabilityRanges;
  }

  /**
   * Return a selected decision candidate.
   *
   * If probabillistic mode is engaged, the system with probabilistically select; otherwise, it
   * will simply return the highest scoring candidate.
   * @param  {Object} probabilityRanges a dictionary providing ranges to each candidate
   * @return {Object}                   the candidate we've chosen
   */
  selectCandidateGivenProbabilityDistribution(probabilityRanges){
    let selection = undefined; //NOTE [Port] need to reserve this var name
    if (this.probabilisticMode){
      let x = Math.random();
      //NOTE [Port] needed to do this with a loop in JS.  Couldn't quite figure out how to pull it off with map() and filter()
      for(let candidate in probabilityRanges){
        if(probabilityRanges.hasOwnProperty(candidate)){
          if(probabilityRanges[candidate][0] <= x && x <= probabilityRanges[candidate][1]){
            selection = x;
            break;
          }
        }
      }
    }else{
      //NOTE [Port] needed to do this with a loop and temp var in JS.  Couldn't quite figure out how to pull it off with map() and filter()
      let curMax = 0;
      for(let candidate in probabilityRanges){
        if(probabilityRanges.hasOwnProperty(candidate)){
          if(probabilityRanges[candidate][1] - probabilityRanges[candidate][0] > curMax){
            selection = candidate;
          }
        }
      }
    }

    return selection;
  }
}

export default Productionist

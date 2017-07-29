/**
 * File specifies an annotated context-free grammar, loaded from reductionist
 */
import NonterminalSymbol from './nonterminalSymbol';

class Grammar{
  /**
   * Create a new grammar object
   * @param  {Object} grammarObj          data from a .grammar file as a simple JSON object.
   * @return {Object}                     {constructor}
   */
  constructor(grammarObj){
    // initalize a Grammar object
    // this get set by this.initParseContentFile() NOTE [Port] might get renamed there.
    this.nonterminalSymbols = null;
    this.idToTag = null;
    // parsing!
    this.initParseJsonGrammarSpecification(grammarObj);
    this.startSymbol = this.nonterminalSymbols.filter((symbol) => symbol.startSymbol)[0]; //NOTE [port] the .next() construction to doesn't really work in JS
    // sort the symbol list -- this needs to hapepn before rule grounding, since we rely on
    // a symbol's ID being the same as its index in this.nonterminalSymbols
    //NOTE [Port] probably a better way to do this, but IIRC JS needs a compare function
    this.nonterminalSymbols = this.nonterminalSymbols.sort((a, b) => {
      if(a.id < b.id){
        return -1;
      } else if (a.id > b.id){
        return 1;
      }else{
        return 0;
      }
    });

    this.initGroundSymbolReferencesInAllProductionRuleBodies();
    //collect all production rules
    this.productionRules = []
    for (let symbol of this.nonterminalSymbols){
      this.productionRules = this.productionRules.concat(symbol.productionRules);
    }
    this.productionRules.sort((a, b) => {
      if(a.id < b.id){
        return -1;
      }else if (a.id > b.id){
        return 1;
      }else{
        return 0;
      }
    });

    //collect all terminal symbols
    this.terminalSymbols = []
    for(let rule of this.productionRules){
      for(let symbol of rule.body){
        if((typeof symbol === 'string') && !this.terminalSymbols.includes(symbol)){
          //NOTE [Port] JavaScript's baseline encoding is UCS2, and JS doesn't have a seperate unicode object.
          //NOTE Testing for a String at this point
          this.terminalSymbols.push(symbol); //NOTE [Port] This may actually be a set.  We have a data type for that!
        }
      }
    }

    // have all production rules compile all the tags on the symbols in their rule bodies
    for(let rule of this.productionRules){
      rule.compileTags();
    }

    //Compile all tags attached to all symbols in this grammar
    this.tags = new Set();
    for(let symbol of this.nonterminalSymbols){
      this.tags = new Set([...this.tags, ...new Set(symbol.tags)]) //NOTE [Port] JS set union sucks.
    }
    // check whether any symbols have rules with unequal application frequencies; if none doe, then
    // Producionist may be able to choose rules randomly (this attribute is used to determine whether
    // a 'scoring mode' is engaged, in Productionist.scoreModesEngaged())
    // NOTE [Port] Look James, I can be clever too
    this.unequalRuleFrequencies = this.productionRules.some((val, i, arr) => val.applicationFrequency === arr[0].applicationFrequency);
    // Lastly, run some valdidation checks on the grammar before proceeding any further (this
    // is particularly needed in the case that an author has maually tweaked any of the content
    // files generated by Reductionist)
    this.initValidateGrammar();
  }

  /**
   * Parse a JSON Grammar specification exported b Expressionist to instantiate symbols and rules
   * @param  {Object} grammarObj      grammar data as a simple JSON object, parsed from a .grammar file
   * @return {undefined}              Method just changes internal state, does not return anything
   */
  //NOTE [Port] we want to remove the load from this function.  Pass in a reference to an already loaded object instead.
  initParseJsonGrammarSpecification(grammarObj){

    // Grab out the dictionaries mapping tag IDs to the tags themselves, which we need to execute
    // expressible meanings
    this.idToTag = grammarObj['id_to_tag'];
    // build objects for the nonterminal symbols defined in the spec
    let symbolObjects = []
    let nonterminalSymbolSpecifications = grammarObj['nonterminal_symbols'];
    for(let symbolId in nonterminalSymbolSpecifications){
      let nonterminalSpec = nonterminalSymbolSpecifications[symbolId];
      symbolObjects.push(new NonterminalSymbol(
        Number(symbolId),
        nonterminalSpec['name'],
        nonterminalSpec['tags'],
        nonterminalSpec['production_rules'],
        nonterminalSpec['expannsions_are_complete_outputs'],
        nonterminalSpec['is_start_symbol'],
        nonterminalSpec['is_semantically_meaningful']
      ));
    }

    this.nonterminalSymbols = symbolObjects;
  }

  /**
   * Ground all symbol references in production rule bodies to actual NonterminalSymbol objects
   * @return {Undefined} method just changes internal state, does not return anything
   */
  initGroundSymbolReferencesInAllProductionRuleBodies(){
    for(let symbol of this.nonterminalSymbols){
      for(let rule of symbol.productionRules){
        this.initGroundSymbolReferencesInARuleBody(rule);
      }
    }
  }

  /**
   * Ground all symbol references in the body of this rule to actual NonterminalSymbol objects.
   * @param  {object} productionRule A Productionist rule to ground out to Nonterminals
   * @return {Undfined}                Method modifies productionRule, as it's passed by reference
   */
  initGroundSymbolReferencesInARuleBody(productionRule){
    let ruleBodySpecification = productionRule.bodySpecification;
    let ruleBodyWithResolvedSymbolReferences = [];
    for(let symbolReference of ruleBodySpecification){
      if (typeof symbolReference === 'number'){ //NOTE [Port] javascript type checking is a pain.  instanceof Number deals with objects, not number primatives.
        // the symbol's ID, which is also its index in this.nonterminalSymbols
        // We've encountered a reference to a nonterminal symbol, we need to resolve this
        // reference and append the nonterminal symbol itself to the list that we're building
        ruleBodyWithResolvedSymbolReferences.push(this.nonterminalSymbols[symbolReference]);
      }else{
        //We've encountered a terminal symbol, so we can just append this string itself
        //to the list we're building
        ruleBodyWithResolvedSymbolReferences.push(symbolReference);
      }
      productionRule.body = ruleBodyWithResolvedSymbolReferences;
    }
  }

  /**
   * A set of validation checks to ensure the well formedness of this grammar
   * @return {undefined} function just checks internal state, and throws error if
   * a grammar is malformed
   */
  initValidateGrammar(){
    let checkList = this.nonterminalSymbols.filter(s => s.startSymbol !== false && s.startSymbol !== undefined);
    if(!(checkList.length > 0)){
      throw new Error("This grammar has no start symbols; there must be exactly one.");
    }
    if(!(checkList.length === 1)){
      throw new Error("This grammar has multiple start symbols; there must be exactly one.");
    }

    //TODO TAKE ALL CHECKS FROM REDUCTIONIST -- IDEA IS MAKE SURE IT WASN'T TAMPERED WITH MANUALLY
    //TODO CHECK FOR CYCLES HERE (SIGNALED BY A SYMBOL APPEARING IN ITS OWN DESCENDANTS LIST;
    //SUCH A LIST CAN BE COMPUTED USING SOME OF THE FUNCTIONALITY USED ABOVE TO DETERMINE
    //IF A SYMBOL IS SEMANTICALLY MEANINGFUL) -- also, it appears that the json module
    //may have a built-in check for this (keyword for looking into this is 'check_circular')
  }
}

export default Grammar

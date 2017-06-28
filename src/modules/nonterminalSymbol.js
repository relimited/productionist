/**
 * A nonterminal symbol in an annotated context-free authored using an Expressionist-like tool.
 */
import ProductionRule from 'productionRule';

class NonterminalSymbol{
  /**
   * Initalize a nonterminal symbol object.
   * @param  {Number} symbolId                     the Unique ID of this symbol
   * @param  {String} name                         a string name f this symbol
   * @param  {Array} tags                         A list of string tags of the form 'tagset:tag', attached to this symbol
   * @param  {Object} productionRulesSpecification an object that specifyies how rules should fire???
   * @param  {Boolean} expansionsAreCompleteOuputs  flag to say if the expansions for this object complete outputs
   * @param  {Boolean} startSymbol                  flag to say that this nonterminal is a starting symbol
   * @param  {Boolean} semanticallyMeaningful       flag to say if this symbol (or any of it's children) have tags
   * @return {Object}                              {constructor}
   */
  constructor(symbolId, name, tags, productionRulesSpecification, expansionsAreCompleteOuputs, startSymbol, semanticallyMeaningful){
    this.id = symbolId;
    this.name = name;
    // set the tags attached to this symbol (defined as a list of strings of the form 'tagset:tag')
    this.tags = tags;
    // Reify production rules for expanding this symbol NOTE [Port] Ok, what?
    this.productionRules = this.initReifyProductionRules(productionRulesSpecification);
    this.initSetRuleFrequencyScoreMultipliers();
    // whether an author marled this as a symbol whose terminal expansions are complete outputs
    this.expansionsAreCompeteOutputs = expansionsAreCompleteOuputs;
    // whether this is the start symbol in the grammar
    this.startSymbol = startSymbol;
    // whether this symbol and/or any of its decendants have tags
    this.semanticallyMeaningful = semanticallyMeaningful;
  }

  /**
   * Overloading the default toString() method, return the string representation
   * @return {string} A string representation of this object
   */
  toString(){
    return `[[${this.name}]]`;
  }

  /**
   * Instantiate ProductionRule objects for the rules specified
   * @param  {Object} productionRulesSpecification spec for the objects to Instantiate
   * @return {Array}                              an Array of ProductionRule objects
   */
  initReifyProductionRules(productionRulesSpecification){
    let productionRuleObjects = [];
    if(productionRulesSpecification !== undefined){ //NOTE [Port] this is a little weird, I think we can
                                                    //do this check when we try to create an iterator for the array
      for(let ruleSpec of productionRulesSpecification){
        productionRuleObjects.push(new ProductionRule(
          ruleSpec['id'],
          this,
          ruleSpec['body'],
          ruleSpec['application_frequency'],
          ruleSpec['is_semantically_meaningful']
        ));
      }
    }
    return productionRuleObjects
  }

  /**
   * Set frequency score multipliers for each of this symbol's priduction rules.
   * @return {undefined} method just modifies internal state, does not return anything
   * FIXME this method needs to be double checked
   */
  initSetRuleFrequencyScoreMultipliers(){
    if (this.productionRules !== undefined && this.productionRules.length > 0){
      let maxApplicationFrequency = Math.max(this.productionRules.map(rule => rule.applicationFrequency));
      for(let rule of this.productionRules){
        rule.frequencyScoreMultiplier = rule.applicationFrequency / maxApplicationFrequency;
      }
    }
  }
}

export default NonterminalSymbol;

/**
 * A production rule in an annotated context-free grammar authored using an Expressionist-like tool.
 */
class ProductionRule{
  /**
   * Initalize a production rule object
   * @param  {Number} ruleId                a unique id for this production rule???
   * @param  {NonterminalSymbol} head                  left hand side of this rule
   * @param  {Object} bodySpec              sspec for a equence of symbols that this rule may be used to expand the head into
   * @param  {Number} applicationFrequency  rate this rule will be used in relation to other rules with this head
   * @param  {Boolean} semanticallyMeaningul If this symbol or it's decendents have tags
   * @return {Object}                       {constructor}
   */
  constructor(ruleId, head, bodySpec, applicationFrequency, semanticallyMeaningful){
    this.id = ruleId;
    this.head = head;
    this.bodySpecification = bodySpec;
    // the rate at which this rule will be used relative to sibling rules, i.e., other rules with
    // the same head
    this.applicationFrequency = applicationFrequency;
    this.semanticallyMeaningful = semanticallyMeaningful;

    //the body gets set by Productionist.iintGroundSymbolReferencesInARuleBody()
    this.body = null;
    // How this rule's application frequency will alter scores that Productionist computs for it; this
    // is determined by NonterminalSymbol._init_set_rule_frequency_score_mltipliers() by diving the
    // rule's application frequency by the maximum frequency applied to one of its sibling rules
    this.frequencyScoreMultiplier = null;
    // tags get set by this.compile_tags()
    this.tags = [];
  }

  /**
   * Return a string representation of this object
   * @return {String} a string representation of this object
   */
  toString(){
    //NOTE [Port]  JavaScript uses a better internal string representation than Python does, so unicode objects don't exist.
    //NOTE [Port] This also feels like it's fixable with a toString method on symbol objects.
    let symbolStr = "";
    for(let symbol of this.body){
      if(symbol instanceof String){
        symbolStr = symbolStr.concat(symbol);
      }else{
        symbolStr = symbolStr.concat(`[[${symbol.name}]]`);
      }
    }
    return `${this.head} --> ${symbolStr}`
  }

  /**
   * Compile all tags that are accessible from this production rule, meaning all the tags on all the symbols
   * in the body of this rule.
   * @return {undefined} method just changes internal state, does not return any values
   */
  compileTags(){
    for(let symbol of this.body){
      if(!(symbol instanceof String)){ //i.e. if the symbol is nonterminal
        for(let tag of symbol.tags){
          if(!this.tags.includes(tag)){
            this.tags.append(tag);    //NOTE [Port] I think I can convert this.tags to a set, then I don't need to worry about this.
          }
        }
      }
    }
  }
}
export default ProductionRule

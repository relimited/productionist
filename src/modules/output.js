/**
 * A generated text output, comprising both the textual content itself and its associated tags.
 */

class Output{
  /**
   * Initalize an Output object.
   * @param  {String} text                     the generated textual content
   * @param  {Set} tags                        the set of tags inherited from the nonterminal symbols expanded to create this content
   * @param  {Object} recipe                   an association between the generated content, expressible meaning and specific recipe
   *                                           used to create it.
   * @param  {Array} explicitGrammarPathTaken  the path that was taken through the grammar to produce this content
   * @param  {String} bracketedExpression      A bracked expression capturing the symbols expanded to produce this content
   * @return {Object}                          {constructor}
   */
  constructor(text, tags, recipe, explicitGrammarPathTaken, bracketedExpression){
    // The generated textual content, itself
    this.text = text;
    // The set of tags inherited from the nonterminal symbols expanded to generate this content
    this.tags = tags;
    // The recipe that was followed to produce this output; this associates the generated content
    // with the expressible meaning and the specific recipe that were targeted to produce it, which
    // could be useful for debugging/authoring reasons
    this.recipe = recipe;
    // The path that was take throught he grammar to produce this content, represented as the
    // ordered sequence of production rules that were executed
    this.explicitGrammarPathTaken = explicitGrammarPathTaken;
    // A bracketed expression capturing the particular symbols that were expanded to
    // produce this content
    this.bracketedExpression = bracketedExpression;
    // A prettier-printed expression presenting the bracketed exression as a tree
    this.treeExpression = this.constructTreeExpression(true);
    // A more cluttered, but potentially more useful tree expression that displays the tags
    // inherited from each expanded symbol
    this.treeExpressionWithTags = this.constructTreeExpression(false);
  }

  /**
   * Return a string representation of this output
   * @return {String} a string representation of this object
   */
  toString(){
    return this.text;
  }

  /**
   * Construct a more understandable version of the bracketed expression, presented as a tree.
   * @param  {Boolean} excludeTags if we should strip out the tags or not when constructing this
   * @return {String}             A string representation of the bracketed expression as a tree
   */
  constructTreeExpression(excludeTags){
    let bracketedExpression = this.bracketedExpression;
    if (excludeTags){
      bracketedExpression = bracketedExpression.replace(/ <.+?>/, ""); //NOTE [Port] amazingly, JavaScript's regexs and python's mean the same thing here!
    }
    let treeExpression = "";
    let indent = 0;
    for(let character of bracketedExpression){
      //NOTE [Port] change the indent based on the character code
      if('[]+'.includes(character)){
        if (character === '['){
            indent += 4;
        }else if(character === ']'){
          indent -= 4;
        }else{
          indent = 0;
        }
      }
      //NOTE [Port] append a newline + whitespace or the character, based on character code
      if('[+'.includes(character)){
        let whitespace = Array(indent+1).join(' '); //NOTE [Port] hacky.  JS join puts the string between the array elements,
                                                    // and uses a empty string to represent an undefined array element.
        treeExpression = treeExpression.concat('\n', whitespace);
      }else if(character === ']'){
        continue;
      }else{
        treeExpression = treeExpression.concat(character);
      }
    }

    return treeExpression;
  }
}
export default Output;

/**
 * An 'expressible meaning' is a particular meaning (i.e., collection of tags), bundled with
 * recipes (i.e., collection of compressed grammar paths) for generating content that will come
 * with this tags.
 *
 * The recipes for generating the desired content are specified as compresed paths through the grammar,
 * and they are reified as objects of the class Recipe, defined below.
 */
import Recipe from './recipe';

class ExpressibleMeaning{
  /**
   * Initialize an ExpressibleMeaning object
   * @param  {Number} meaningId an ID to identify this expressible meaning
   * @param  {Set} tags      Set of all tags that go with this expressible meaning
   * @param  {Array} recipes   A list of compressed grammars for generting content with a certain set of tags
   * @return {Object}           {constructor}
   */
  constructor(meaningId, tags, recipes){
    this.id = meaningId;
    // A set of including all the tags associated with this expressible meaning; these can be thought
    // of as the semantics taht are associated with all the paths through the grammar that this
    // expressible meaning indexes
    this.tags = tags;
    // A list of recipes for generating content that expresses the associated meaning; each is
    // represented as a compressed grammar path (i.e., one that, if its rules are executed in order,
    // will produce the exact set of tags associated with this expressible meaning)
    this.recipes = this.initBuildRecipes(recipes);
  }

  /**
   * Overloaded toString() method to create a string representation of an ExpressibleMeaning
   * @return {String} A string representation of this object
   */
  toString(){
    return "An expressible meaning associated with the following tags: ".concat(this.tags.join(', '));
  }

  /**
   * Return a list of Recipe objects, each corresponding to one of the gramamr paths associated with
   * this expressible meaning.
   * @param  {Array} recipes A list of compressed grammars for generting content with a certain set of tags
   * @return {Array}         A list of recipe objects for each grammar path in this expressible meaning
   */
  initBuildRecipes(recipes){
    let recipeObjects = recipes.map((recipe, i, recipes) => new Recipe(i, this, recipe));
    recipeObjects.sort((a, b) => {
      if(a.id < b.id){
        return -1;
      }else if (a.id > b.id){
        return 1;
      }else{
        return 0;
      }
    });

    return recipeObjects;
  }
}
export default ExpressibleMeaning;

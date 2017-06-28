/**
 * A recipe, in the form of a compressed grammar path, for generating content associated with a specific
 * expressible meaning.

 * By 'compressed grammar path', I mean a chain of semantically meaningful production rules that,
 * when executed in the given order, will produce the desired content. Production rules that are not
 * semantically meaningful are not included in these compressed paths (this is the source of compression),
 * which means Productionist is free to choose randomly when its candidate production rules for the symbol
 * it is currently expanding does not include the next symbol on its target path. This works just fine,
 * because production rules that are not semantically meaningful cannot cause unwanted tags (or any
 * tags, for that matter) to be accumulated, which means the random choices only produce lexical variation
 * and not semantic variation. More precisely, the rules won't be chosen randomly, but according to all
 * the concerns that are used to score rules that are not semantically meaningful ('wildcard rules'):
 * repetition penalties, author assigned application frequencies and usage constraints, etc.
 */
//NOTE [Port] just gonna copy that from the original code.

class Recipe{
  /**
   * Initialize a Recipe object.
   * @param  {Number} recipeId           id for this recipe
   * @param  {ExpressibleMeaning} expressibleMeaning an ExpressibleMeanings object for this recipe
   * @param  {String} grammarPath        The path through the grammar that is associated with this recipe
   * @return {Object}                    {constructor}
   */
  constructor(recipeId, expressibleMeaning, grammarPath){
    this.id = recipeId;
    this.expressibleMeaning = expressibleMeaning;
    this.name = `${expressibleMeaning.id}-${this.id}`
    this.path = grammarPath;
  }

  /**
   * String representation of a Recipe
   * @return {String} the string representation of this object
   */
  toString(){
    return `Recipe ${this.name}`
  }

}
export default Recipe;

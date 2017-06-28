/**
 * A Content request submitted to a Productionist module.
 */

class ContentRequest{
  /**
   * Initialize a ContentRequest object.
   * @param  {Set} mustHave      tags that must be associated with generated content (optional)
   * @param  {Set} mustNotHave   tags that must not be associated with generated content (optional)
   * @param  {Array} scoringMetric a list of tuples specifiying the desirability of optional tags
   * @return {Object}               {constructor}
   */
  constuctuor(mustHave, mustNotHave, scoringMetric){
    // Tags taht must be associated with generated content
    this.mustHave = mustHave !== undefined && mustHave !== null ? mustHave : new Set(); //NOTE [Port] might have to do some processing to get this to be a set
    // tags that must *not* be associated with generated content
    this.mustNotHave = mustNotHave !== undefined && mustNotHave !== null ? mustNotHave : new Set();
    // A list of (tag, wieght) tuples specifying the desirability of optional tags
    this.scoringMetric = scoringMetric;

  }
}
export default ContentRequest;

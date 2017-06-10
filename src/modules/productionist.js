/**
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
 * CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
 * NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * Port of productionist to Node.js
 * @author Johnathan Pagnutti
 * NOTE [Port]: Porting to node first due to the CLI of the Python source code.
 *              Browser restrictions make writing CLI styled code hard, will attempt
 *              to keep code current with browserfy standards to allow for Productionist
 *              to be run in browser, if needed
 *              (But keeping it a node package provides potential for hosting on npm)
 */
/**
 * Node.js's file system interface, used to laod files, watch files for changes, etc.
 * @type {Object}
 */
import fs from 'fs'
/**
 * Node.js's regex package.  Used to build content unit's tree expression
 * @type {Object}
 */
import Regex from 'regex'
/**
 * A Marisa Trie implementation for node.js.  Used under the ISC license.
 * used to load a trie data structure that stores all paths through the grammar
 * @type {Object}
 */
//import Marisa from 'marisa-trie'

//NOTE [Port]: json library isn't needed (JSON is native to JS)
//NOTE [Port]: pickle.js exists, but it's really old.  JavaScript does not have any native object serialization tools, we'll see how
//NOTE long we can go without one

/**
 * A system that generates text ouputs at runtime, on the fly.
 * @param  {String} contentBundleName      The name of the content bundles
 * @param  {String} contentBundleDirectory  Name of the directory (path?) containing content bundles
 * @param  {Boolean} probabilisticMode      flag to use a probability distribution to select candidates
 * @param  {Boolean} reptitionPenaltyMode   flag to use a penalty to discourage repeated use of 'wildcard rules'
 * @param  {Boolean} terseMode              flag to have the system favor production rules that produce terser dialogue
 * @param  {Number} verbosity              [0, 1, 2] amount of logging information to print
 * @return {Object}                         {Constructor}
 */
class Productionist {
  constructor(contentBundleName, contentBundleDirectory, probabilisticMode, reptitionPenaltyMode, terseMode, verbosity){
    this.test = true;
  }

  test_funct(){
    return this.test
  }
}

export default Productionist

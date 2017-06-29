/**
 * A loader that uses the node 'fs' module to load various Productionist
 * files from the local file system.
 * @author Johnathan Pagnutti
 */
import fs from 'fs';
import Grammar from './grammar';
class FSLoader{
  /**
   * The loader clas.  Loaders don't need to have state, so we can actually get
   * away with making all the functions static and not having a constructor.
   */

   /**
    * Load a grammar file.  Grammar files end with '.grammar' and is a JSON file.
    * We also parse it here.
    * @param  {String} path file path to the relevant .grammar file
    * @return {Promise}      returns a promise for a Grammar object
    */
  static loadGrammar(path){
    return new Promise((resolve, reject) => {
      let grammarObj = {};
      try{
        fs.readFile(path, (err, data) => {
          if (err) throw err; //this'll get caught by the outer try block.
          grammarObj = JSON.parse(data);
          resolve(new Grammar(grammarObj));
        });
      }catch(err){
        //NOTE [Port] This is a thrown error in the python version.
        //NOTE Throwing inside a promise gets wonky, so we'll just reject the promise
        reject(`Cannot load grammar -- there is no grammar file located at ${path}`);
      }
    });
  }
}

export default FSLoader

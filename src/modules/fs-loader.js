/**
 * A loader that uses the node 'fs' module to load various Productionist
 * files from the local file system.
 * @author Johnathan Pagnutti
 */
import fs from 'fs';
import readline from 'readline';
import Grammar from './grammar';
import ExpressibleMeaning from './expressibleMeaning';
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

  /**
   * Load an expressible meanings file.  Expressible meanings files end with '.meanings'
   * and have a unique format.  We will do partial parsing here.
   * @param {String} path   file path to the relevant .meanings file
   * @param {Object} idToTag object from the grammar that maps ids to tags
   * @return {Promise}    returns a promise for a Grammar object
   */
  static loadExpressibleMeanings(path, idToTag){
    return new Promise((resolve,reject) => {
        let expressibleMeanings = [];
        try{
          let rl = readline.createInterface({
            input: fs.createReadStream(path)
          });
          rl.on('line', line => {
            let lineData = line.trim().split("\t");
            let meaningId = lineData[0];
            let allPathsStr = lineData[1];
            let allTagsStr = lineData[2];
            //NOTE [Port] this port does not support trie files, so I'm skipping the following python code:
            //NOTE if self.trie:
            //NOTE   path_trie_keys = [int(path_trie_keys) for path_trie_key in all_paths_str.split(',')]
            //NOTE   recipes = [self.trie.restore_key(path_trie_key) for path_trie_key in path_trie_keys]
            //NOTE else: ...
            //NOTE  the below code block will need to be moved into this else statement if tries are supported
            let recipes = [];
            for(let pathStr of allPathsStr.split("|")){
              recipes.push(pathStr.split(',').map(ruleId => Number(ruleId)));
            }
            //NOTE [Port] end else block
            let tags = new Set();
            if(allTagsStr){
              allTagsStr.split(',').map(tagId => tags.add(idToTag[tagId]));
            }
            expressibleMeanings.push(new ExpressibleMeaning(Number(meaningId), tags, recipes));
          });
          rl.on('close', () => {
            expressibleMeanings.sort((a, b) => {
              if(a.id < b.id){
                return -1;
              }else if(a.id > b.id){
                return 1;
              }else{
                return 0;
              }
            });
            resolve(expressibleMeanings);
          });
        }catch(err){
          //NOTE [Port] This is a thrown error in the python version.
          //NOTE Throwing inside a promise gets wonky, so we'll just reject the promise
          reject(`Cannot load expressible meanings -- there is no file located at ${path}`);
        }
    });
  }

  /**
   * Load a repeititons file.  Repititions files have a unique format (they might be pickled)
   * We also parse the file here.
   * @param  {String} path file path to the relevant .repetitions file
   * @return {Promise}      returns a promise for repetitions file data
   */
  static loadRepetitions(path){
    return Promise.reject("This method has not been implemented yet.");
  }
}

export default FSLoader

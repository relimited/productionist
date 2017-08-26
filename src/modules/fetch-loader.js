/**
 * A loader that uses the the fetch API to load various productionist
 * files with ajax requests.
 * @author Johnathan Pagnutti
 */
 import Grammar from './grammar';
 import ExpressibleMeaning from './expressibleMeaning';
 class FetchLoader{
   /**
    * Load a grammar file.  Grammar files end with '.grammar' and is a JSON file.
    * We also parse it here.
    * @param  {String} path URI to the relevant grammar file
    * @return {Promise}      returns a promise for a Grammar object
    */
  static loadGrammar(path){
    return fetch(path)
      .then(response => {
        //fetch gives us a Response object, which lets us check the status code of
        //the HTTP request underlying it.
        if(!response.ok){
            throw new Error(`HTTP Error.  Status ${response.status}`);
        }
        //parse the response as a json object, returns another promise
        return response.json()
      })
      .then(grammarObj => {
        return new Grammar(grammarObj); //wrap the anon JSON object as a Grammar
      });
  }

  /**
   * Load an expressible meanings file.  Expressible meanings files end with '.meanings'
   * and have a unique format.  We will do partial parsing here.
   * @param {String} path   URI to the relevant .meanings file
   * @param {Object} idToTag object from the grammar that maps ids to tags
   * @return {Promise}    returns a promise for a Grammar object
   */
   static loadExpressibleMeanings(path, idToTag){
     return fetch(path)
        .then(response => {
          //fetch gives us a Response object, which lets us check the status code of
          //the HTTP request underlying it.
          if(!response.ok){
              throw new Error(`HTTP Error.  Status ${response.status}`);
          }
          //parse the response as text, returns another promise
          return response.text()
        })
        .then(fileContents => {
          let expressibleMeanings = [];

          //break the file up by lines
          let fileLines = fileContents.split('\n'); //TODO brittle, b/c of Windows line feeds
          for(let line of fileLines){
            let lineData = line.trim().split("\t");

            //NOTE [Port] there might be an extra newline at the end of the file.  We need to
            //NOTE skip this parsing step when that happens and just continue
            if(lineData.length < 3){
              continue;
            }
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
          }

          expressibleMeanings.sort((a, b) => {
            if(a.id < b.id){
              return -1;
            }else if(a.id > b.id){
              return 1;
            }else{
              return 0;
            }
          });

          return expressibleMeanings;
        });
   }

   /**
    * Load a repeititons file.  Repititions files have a unique format (they might be pickled)
    * We also parse the file here.
    * @param  {String} path  URI to the relevant .repetitions file
    * @return {Promise}      returns a promise for repetitions file data
    */
   static loadRepetitions(path){
     return Promise.reject("This method has not been implemented yet.");
   }

 }
 export default FetchLoader

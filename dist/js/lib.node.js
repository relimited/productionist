/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _commander = __webpack_require__(11);

var _commander2 = _interopRequireDefault(_commander);

var _productionist = __webpack_require__(9);

var _productionist2 = _interopRequireDefault(_productionist);

var _contentRequest = __webpack_require__(2);

var _contentRequest2 = _interopRequireDefault(_contentRequest);

var _fsLoader = __webpack_require__(4);

var _fsLoader2 = _interopRequireDefault(_fsLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * CLI interface for productionist-js
                                                                                                                                                                                                     * @author Johnathan Pagnutti
                                                                                                                                                                                                     */

/**
 * commander is an CLI arguments parsing library for node.js.
 * @type {Object}
 */
//using commander for node to do argument parsing


//NOTE [Port] some temp vars here because commander isn't super great at non-named arguments
var contentBundleName;
var contentBundleDir;

_commander2.default.version('0.1.0').option('--n <n>', "The number of generated outputs that are requested (default: 1)", parseInt).option('--symbol <symbol>', "The name of the nonterminal symbol that will be expanded to generate n examples; passing " + "an argument for this will cancel any arguments passed for 'rule', 'must_have', " + "'must_not_have', and 'scoring_metric'.").option('--rule <rule>', "The definition of the production rule ('[rule name] --> [rule body]') that will be " + "executed to generate n examples; passing an argument for this will cancel any arguments " + "passed for 'must_have', 'must_not_have', and 'scoring_metric'.").option('--must_have <tags>', "Tags that must be attached to the generated output; " + "tags should be formatted [tagset]:[tag],[tagset:tag],[tagset:tag]").option('--must_not_have <tags>', "Tags that must *not* be attached to the generated output; " + "Tags should be formatted [tagset]:[tag],[tagset:tag],[tagset:tag]").option('--scoring_metric <metric>', "A scoring metric for any other tags, indicating how desirable (or undesirable) they are currently; " + "tags should be formatted [tagset]:[tag]*[weight],[tagset:tag]*[weight],[tagset:tag]*[weight]").option('--nonprobabilistic', "Whether to disengage probabilistic mode (flag argument); if probabilistic mode is not engaged, the " + "highest scoring option will always be selected (yields deterministic and potentially repetitive " + "behavior; if it is engaged, options will be selected probabilistically according to their scored " + "utility.").option('--repetition_penalty', "Whether to engage repetition-penality mode (flag argument); when repetition-penalty mode is turned " + "on, Productionist will be less likely to take paths in the grammar that were recently taken.").option('--terse', "Whether to engage terse mode (flag argument); when terse mode is engaged, shorter outputs (in " + "terms of number of characters) will be prioritzed.").option('--test', "Whether to engage test mode (flag argument); when test mode is engaged, the system forms a random " + "content request and attempts to satisfy it.").option('--seed', "An integer seed for the pseudrandom number generator that Productionist uses", parseInt).option('--verbosity <verb>', "How verbose Productionist's debug text should be (0=no debug text, 1=more debug text, 2=most debug text)", parseInt);

_commander2.default.command('* <content_bundle_name> <content_bundle_dir>').description('Generate some text with productionist!  content_bundle_name is the name of the content bundle that is to be ' + "operated over (i.e., 'talktown' to use files generated by Reductionist that are named 'talktown.grammar', " + "'talktown.trie', and 'talktown.meanings'\ncontent_bundle_dir is the full filepath to the bundle of content files" + "generated by Reductionist.").action(function (content_bundle_name, content_bundle_dir) {
  contentBundleName = content_bundle_name;
  contentBundleDir = content_bundle_dir;
});

_commander2.default.parse(process.argv);
//Set the random seed, if one was specified TODO: ahahahaaha.  You can't seed JSs rng.  OF COURSE.
if (_commander2.default.seed) {
  console.log("Currently, this port does not support seeding.");
}
if (typeof _commander2.default.terse === 'undefined') {
  _commander2.default.terse = false;
}
if (typeof _commander2.default.nonprobabilistic === 'undefined') {
  _commander2.default.nonprobabilistic = false;
}
if (typeof _commander2.default.repetition_penalty === 'undefined') {
  _commander2.default.repetition_penalty = false;
}
if (typeof _commander2.default.test === 'undefined') {
  _commander2.default.test = false;
}

var productionist = new _productionist2.default(contentBundleName, contentBundleDir, !_commander2.default.nonprobabilistic, _commander2.default.repetition_penalty, _commander2.default.terse, _commander2.default.verbosity, _fsLoader2.default);

//NOTE [Port] we gotta finish the productionist object before we can start to use it.
//            This means loading in affiliated files and updating the object as each one
//            loads in.
productionist.finalizeProductionist().then(function (productionist) {
  var outputs = [];
  if (_commander2.default.symbol) {
    outputs = new Array(_commander2.default.n).map(function () {
      return productionist.furnishExampleTerminalExpansionOfNonterminalSymbol(_commander2.default.symbol);
    });
  } else if (_commander2.default.rule) {
    outputs = new Array(_commander2.default.n).map(function () {
      return productionist.furnishExampleTerminalResultOfExecutingProductionRule(_commander2.default.rule);
    });
  } else {
    var mustHave = void 0;
    var mustNotHave = void 0;
    var scoringMetric = void 0;
    if (!_commander2.default.test) {
      //build a content request by parsing the relevant command-line arguments
      mustHave = new Set();
      if (_commander2.default.must_have) {
        mustHave = new Set(_commander2.default.must_have.split(','));
      }
      mustNotHave = new Set();
      if (_commander2.default.must_not_have) {
        mustNotHave = new Set(_commander2.default.must_not_have.split(','));
      }
      scoringMetric = [];
      if (_commander2.default.scoring_metric) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _commander2.default.scoring_metric.split(',')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tagAndWeight = _step.value;

            var pair = tagAndWeight.split('*');
            var weight = Number(pair[1]);
            scoringMetric.push([pair[0], weight]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    } else {
      // form a content request that solicits a randomly selected tag
      var allTags = new Set();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = productionist.grammar.nonterminalSymbols[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var s = _step2.value;

          allTags.add(s);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      mustHave = new Set([].concat(_toConsumableArray(allTags))[Math.floor(Math.random() * allTags.size)].tags);
      mustNotHave = new Set();
      scoringMetric = [];
    }
    var contentRequest = new _contentRequest2.default(mustHave, mustNotHave, scoringMetric);
    if (_commander2.default.verbosity > 0) {
      console.log("\n-- Attempting to fulfill the following content request:\n" + ('\n\tMust have: ' + (contentRequest.mustHave.size > 0 ? [].concat(_toConsumableArray(contentRequest.mustHave.values())).join(', ') : 'N/A')) + ('\n\tMust not have: ' + (contentRequest.mustNotHave.size > 0 ? [].concat(_toConsumableArray(contentRequest.mustNotHave.values())).join(', ') : 'N/A')) + ('\n\tScoring metric: ' + (scoringMetric.length > 0 ? scoringMetric.map(function (t) {
        return t.toString();
      }).join(', ') : 'N/A')));
    }
    outputs = new Array(_commander2.default.n).map(function () {
      return productionist.fulfillContentRequest(contentRequest);
    });
  }

  for (var i = 0; i < outputs.length; i++) {
    var output = outputs[i];
    if (_commander2.default.verbosity > 0) {
      console.log("\n\n-- Successfully generated an output:");
      // Print the generated output
      console.log('\n\t' + output);
      // Print out all the tags attached to the generated output
      console.log("\nThe following tags are attached to this output:");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = output.tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var tag = _step3.value;

          console.log('\t' + tag);
        }
        // Print the tree expression for the generated output
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      console.log("\n\n-- Here's a tree expression illustrating the series of expansions " + "that produced this output:");
      console.log('\n' + output.treeExpression);
      // Print the tagged tree expression for the generated output
      console.log("\n\n-- Here's a tree expression that shows how the generated content got its tags:");
      console.log('\n' + output.treeExpressionWithTags);
      // Print the bracketed expression for the generated output
      console.log("\n\n-- Here's a bracketed expression that more economically illustrates " + "the derivation of the content:");
      console.log('\n' + output.bracketedExpression);
      console.log('\n\n');
    } else {
      console.log('#' + (i + 1));
      console.log('--Output--\n' + output.toString());
      console.log('--Tags--\n' + output.tags.join(','));
      console.log('--Bracketed Expression--\n' + output.bracketedExpression);
      console.log('--Tree Expression--\n' + output.treeExpression);
      console.log('-- Tree Expression (with tags)--\n' + output.treeExpressionWithTags);
    }
  }
  // Lastly, save out the updated repetitions file, if applicable, for future use
  // TODO [Port] not in this port yet, due to the weirdness of where HAVE_REPETITIONS_FILE_PRESIST_ACROSS_RUNTIME_INSTANCES
  // is located.
  if (productionist.reptitionPenalityMode && false) {
    return productionist.saveRepetitionPenaltiesFile(); //TODO this is not currently, but we'd return another promise here.
  }
}).catch(function (err) {
  return console.log(err);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Content request submitted to a Productionist module.
 */

var ContentRequest =
/**
 * Initialize a ContentRequest object.
 * @param  {Set} mustHave      tags that must be associated with generated content (optional)
 * @param  {Set} mustNotHave   tags that must not be associated with generated content (optional)
 * @param  {Array} scoringMetric a list of tuples specifiying the desirability of optional tags
 * @return {Object}               {constructor}
 */
function ContentRequest(mustHave, mustNotHave, scoringMetric) {
  _classCallCheck(this, ContentRequest);

  // Tags that must be associated with generated content
  this.mustHave = mustHave !== undefined && mustHave !== null ? mustHave : new Set(); //NOTE [Port] might have to do some processing to get this to be a set
  // tags that must *not* be associated with generated content
  this.mustNotHave = mustNotHave !== undefined && mustNotHave !== null ? mustNotHave : new Set();
  // A list of (tag, wieght) tuples specifying the desirability of optional tags
  this.scoringMetric = scoringMetric;
};

exports.default = ContentRequest;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * An 'expressible meaning' is a particular meaning (i.e., collection of tags), bundled with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * recipes (i.e., collection of compressed grammar paths) for generating content that will come
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * with this tags.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The recipes for generating the desired content are specified as compresed paths through the grammar,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and they are reified as objects of the class Recipe, defined below.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _recipe = __webpack_require__(10);

var _recipe2 = _interopRequireDefault(_recipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressibleMeaning = function () {
  /**
   * Initialize an ExpressibleMeaning object
   * @param  {Number} meaningId an ID to identify this expressible meaning
   * @param  {Set} tags      Set of all tags that go with this expressible meaning
   * @param  {Array} recipes   A list of compressed grammars for generting content with a certain set of tags
   * @return {Object}           {constructor}
   */
  function ExpressibleMeaning(meaningId, tags, recipes) {
    _classCallCheck(this, ExpressibleMeaning);

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


  _createClass(ExpressibleMeaning, [{
    key: 'toString',
    value: function toString() {
      return "An expressible meaning associated with the following tags: ".concat(this.tags.join(', '));
    }

    /**
     * Return a list of Recipe objects, each corresponding to one of the gramamr paths associated with
     * this expressible meaning.
     * @param  {Array} recipes A list of compressed grammars for generting content with a certain set of tags
     * @return {Array}         A list of recipe objects for each grammar path in this expressible meaning
     */

  }, {
    key: 'initBuildRecipes',
    value: function initBuildRecipes(recipes) {
      var _this = this;

      var recipeObjects = recipes.map(function (recipe, i, recipes) {
        return new _recipe2.default(i, _this, recipe);
      });
      recipeObjects.sort(function (a, b) {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });

      return recipeObjects;
    }
  }]);

  return ExpressibleMeaning;
}();

exports.default = ExpressibleMeaning;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A loader that uses the node 'fs' module to load various Productionist
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * files from the local file system.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Johnathan Pagnutti
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _readline = __webpack_require__(16);

var _readline2 = _interopRequireDefault(_readline);

var _grammar = __webpack_require__(5);

var _grammar2 = _interopRequireDefault(_grammar);

var _expressibleMeaning = __webpack_require__(3);

var _expressibleMeaning2 = _interopRequireDefault(_expressibleMeaning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FSLoader = function () {
  function FSLoader() {
    _classCallCheck(this, FSLoader);
  }

  _createClass(FSLoader, null, [{
    key: 'loadGrammar',

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
    value: function loadGrammar(path) {
      return new Promise(function (resolve, reject) {
        var grammarObj = {};
        try {
          _fs2.default.readFile(path, function (err, data) {
            if (err) throw err; //this'll get caught by the outer try block.
            grammarObj = JSON.parse(data);
            resolve(new _grammar2.default(grammarObj));
          });
        } catch (err) {
          //NOTE [Port] This is a thrown error in the python version.
          //NOTE Throwing inside a promise gets wonky, so we'll just reject the promise
          reject('Cannot load grammar -- there is no grammar file located at ' + path);
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

  }, {
    key: 'loadExpressibleMeanings',
    value: function loadExpressibleMeanings(path, idToTag) {
      return new Promise(function (resolve, reject) {
        var expressibleMeanings = [];
        try {
          var rl = _readline2.default.createInterface({
            input: _fs2.default.createReadStream(path)
          });
          rl.on('line', function (line) {
            var lineData = line.trim().split("\t");
            var meaningId = lineData[0];
            var allPathsStr = lineData[1];
            var allTagsStr = lineData[2];
            //NOTE [Port] this port does not support trie files, so I'm skipping the following python code:
            //NOTE if self.trie:
            //NOTE   path_trie_keys = [int(path_trie_keys) for path_trie_key in all_paths_str.split(',')]
            //NOTE   recipes = [self.trie.restore_key(path_trie_key) for path_trie_key in path_trie_keys]
            //NOTE else: ...
            //NOTE  the below code block will need to be moved into this else statement if tries are supported
            var recipes = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = allPathsStr.split("|")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var pathStr = _step.value;

                recipes.push(pathStr.split(',').map(function (ruleId) {
                  return Number(ruleId);
                }));
              }
              //NOTE [Port] end else block
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            var tags = new Set();
            if (allTagsStr) {
              allTagsStr.split(',').map(function (tagId) {
                return tags.add(idToTag[tagId]);
              });
            }
            expressibleMeanings.push(new _expressibleMeaning2.default(Number(meaningId), tags, recipes));
          });
          rl.on('close', function () {
            expressibleMeanings.sort(function (a, b) {
              if (a.id < b.id) {
                return -1;
              } else if (a.id > b.id) {
                return 1;
              } else {
                return 0;
              }
            });
            resolve(expressibleMeanings);
          });
        } catch (err) {
          //NOTE [Port] This is a thrown error in the python version.
          //NOTE Throwing inside a promise gets wonky, so we'll just reject the promise
          reject('Cannot load expressible meanings -- there is no file located at ' + path);
        }
      });
    }

    /**
     * Load a repeititons file.  Repititions files have a unique format (they might be pickled)
     * We also parse the file here.
     * @param  {String} path file path to the relevant .repetitions file
     * @return {Promise}      returns a promise for repetitions file data
     */

  }, {
    key: 'loadRepetitions',
    value: function loadRepetitions(path) {
      return Promise.reject("This method has not been implemented yet.");
    }
  }]);

  return FSLoader;
}();

exports.default = FSLoader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * File specifies an annotated context-free grammar, loaded from reductionist
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _nonterminalSymbol = __webpack_require__(6);

var _nonterminalSymbol2 = _interopRequireDefault(_nonterminalSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grammar = function () {
  /**
   * Create a new grammar object
   * @param  {Object} grammarObj          data from a .grammar file as a simple JSON object.
   * @return {Object}                     {constructor}
   */
  function Grammar(grammarObj) {
    _classCallCheck(this, Grammar);

    // initalize a Grammar object
    // this get set by this.initParseContentFile() NOTE [Port] might get renamed there.
    this.nonterminalSymbols = null;
    this.idToTag = null;
    // parsing!
    this.initParseJsonGrammarSpecification(grammarObj);
    this.startSymbol = this.nonterminalSymbols.filter(function (symbol) {
      return symbol.startSymbol;
    })[0]; //NOTE [port] the .next() construction to doesn't really work in JS
    // sort the symbol list -- this needs to hapepn before rule grounding, since we rely on
    // a symbol's ID being the same as its index in this.nonterminalSymbols
    //NOTE [Port] probably a better way to do this, but IIRC JS needs a compare function
    this.nonterminalSymbols = this.nonterminalSymbols.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });

    this.initGroundSymbolReferencesInAllProductionRuleBodies();
    //collect all production rules
    this.productionRules = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.nonterminalSymbols[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var symbol = _step.value;

        this.productionRules = this.productionRules.concat(symbol.productionRules);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.productionRules.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });

    //collect all terminal symbols
    this.terminalSymbols = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.productionRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var rule = _step2.value;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = rule.body[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _symbol2 = _step5.value;

            if (typeof _symbol2 === 'string' && !this.terminalSymbols.includes(_symbol2)) {
              //NOTE [Port] JavaScript's baseline encoding is UCS2, and JS doesn't have a seperate unicode object.
              //NOTE Testing for a String at this point
              this.terminalSymbols.push(_symbol2); //NOTE [Port] This may actually be a set.  We have a data type for that!
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      // have all production rules compile all the tags on the symbols in their rule bodies
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.productionRules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _rule = _step3.value;

        _rule.compileTags();
      }

      //Compile all tags attached to all symbols in this grammar
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    this.tags = new Set();
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = this.nonterminalSymbols[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _symbol = _step4.value;

        this.tags = new Set([].concat(_toConsumableArray(this.tags), _toConsumableArray(new Set(_symbol.tags)))); //NOTE [Port] JS set union sucks.
      }
      // check whether any symbols have rules with unequal application frequencies; if none doe, then
      // Producionist may be able to choose rules randomly (this attribute is used to determine whether
      // a 'scoring mode' is engaged, in Productionist.scoreModesEngaged())
      // NOTE [Port] Look James, I can be clever too
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    this.unequalRuleFrequencies = this.productionRules.some(function (val, i, arr) {
      return val.applicationFrequency === arr[0].applicationFrequency;
    });
    // Lastly, run some valdidation checks on the grammar before proceeding any further (this
    // is particularly needed in the case that an author has maually tweaked any of the content
    // files generated by Reductionist)
    this.initValidateGrammar();
  }

  /**
   * Parse a JSON Grammar specification exported b Expressionist to instantiate symbols and rules
   * @param  {Object} grammarObj      grammar data as a simple JSON object, parsed from a .grammar file
   * @return {undefined}              Method just changes internal state, does not return anything
   */
  //NOTE [Port] we want to remove the load from this function.  Pass in a reference to an already loaded object instead.


  _createClass(Grammar, [{
    key: 'initParseJsonGrammarSpecification',
    value: function initParseJsonGrammarSpecification(grammarObj) {

      // Grab out the dictionaries mapping tag IDs to the tags themselves, which we need to execute
      // expressible meanings
      this.idToTag = grammarObj['id_to_tag'];
      // build objects for the nonterminal symbols defined in the spec
      var symbolObjects = [];
      var nonterminalSymbolSpecifications = grammarObj['nonterminal_symbols'];
      for (var symbolId in nonterminalSymbolSpecifications) {
        var nonterminalSpec = nonterminalSymbolSpecifications[symbolId];
        symbolObjects.push(new _nonterminalSymbol2.default(Number(symbolId), nonterminalSpec['name'], nonterminalSpec['tags'], nonterminalSpec['production_rules'], nonterminalSpec['expannsions_are_complete_outputs'], nonterminalSpec['is_start_symbol'], nonterminalSpec['is_semantically_meaningful']));
      }

      this.nonterminalSymbols = symbolObjects;
    }

    /**
     * Ground all symbol references in production rule bodies to actual NonterminalSymbol objects
     * @return {Undefined} method just changes internal state, does not return anything
     */

  }, {
    key: 'initGroundSymbolReferencesInAllProductionRuleBodies',
    value: function initGroundSymbolReferencesInAllProductionRuleBodies() {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.nonterminalSymbols[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var symbol = _step6.value;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = symbol.productionRules[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var rule = _step7.value;

              this.initGroundSymbolReferencesInARuleBody(rule);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    /**
     * Ground all symbol references in the body of this rule to actual NonterminalSymbol objects.
     * @param  {object} productionRule A Productionist rule to ground out to Nonterminals
     * @return {Undfined}                Method modifies productionRule, as it's passed by reference
     */

  }, {
    key: 'initGroundSymbolReferencesInARuleBody',
    value: function initGroundSymbolReferencesInARuleBody(productionRule) {
      var ruleBodySpecification = productionRule.bodySpecification;
      var ruleBodyWithResolvedSymbolReferences = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = ruleBodySpecification[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var symbolReference = _step8.value;

          if (typeof symbolReference === 'number') {
            //NOTE [Port] javascript type checking is a pain.  instanceof Number deals with objects, not number primatives.
            // the symbol's ID, which is also its index in this.nonterminalSymbols
            // We've encountered a reference to a nonterminal symbol, we need to resolve this
            // reference and append the nonterminal symbol itself to the list that we're building
            ruleBodyWithResolvedSymbolReferences.push(this.nonterminalSymbols[symbolReference]);
          } else {
            //We've encountered a terminal symbol, so we can just append this string itself
            //to the list we're building
            ruleBodyWithResolvedSymbolReferences.push(symbolReference);
          }
          productionRule.body = ruleBodyWithResolvedSymbolReferences;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }

    /**
     * A set of validation checks to ensure the well formedness of this grammar
     * @return {undefined} function just checks internal state, and throws error if
     * a grammar is malformed
     */

  }, {
    key: 'initValidateGrammar',
    value: function initValidateGrammar() {
      var checkList = this.nonterminalSymbols.filter(function (s) {
        return s.startSymbol !== false && s.startSymbol !== undefined;
      });
      if (!(checkList.length > 0)) {
        throw new Error("This grammar has no start symbols; there must be exactly one.");
      }
      if (!(checkList.length === 1)) {
        throw new Error("This grammar has multiple start symbols; there must be exactly one.");
      }

      //TODO TAKE ALL CHECKS FROM REDUCTIONIST -- IDEA IS MAKE SURE IT WASN'T TAMPERED WITH MANUALLY
      //TODO CHECK FOR CYCLES HERE (SIGNALED BY A SYMBOL APPEARING IN ITS OWN DESCENDANTS LIST;
      //SUCH A LIST CAN BE COMPUTED USING SOME OF THE FUNCTIONALITY USED ABOVE TO DETERMINE
      //IF A SYMBOL IS SEMANTICALLY MEANINGFUL) -- also, it appears that the json module
      //may have a built-in check for this (keyword for looking into this is 'check_circular')
    }
  }]);

  return Grammar;
}();

exports.default = Grammar;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A nonterminal symbol in an annotated context-free authored using an Expressionist-like tool.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _productionRule = __webpack_require__(8);

var _productionRule2 = _interopRequireDefault(_productionRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NonterminalSymbol = function () {
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
  function NonterminalSymbol(symbolId, name, tags, productionRulesSpecification, expansionsAreCompleteOuputs, startSymbol, semanticallyMeaningful) {
    _classCallCheck(this, NonterminalSymbol);

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


  _createClass(NonterminalSymbol, [{
    key: 'toString',
    value: function toString() {
      return '[[' + this.name + ']]';
    }

    /**
     * Instantiate ProductionRule objects for the rules specified
     * @param  {Object} productionRulesSpecification spec for the objects to Instantiate
     * @return {Array}                              an Array of ProductionRule objects
     */

  }, {
    key: 'initReifyProductionRules',
    value: function initReifyProductionRules(productionRulesSpecification) {
      var productionRuleObjects = [];
      if (productionRulesSpecification !== undefined) {
        //NOTE [Port] this is a little weird, I think we can
        //do this check when we try to create an iterator for the array
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = productionRulesSpecification[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ruleSpec = _step.value;

            productionRuleObjects.push(new _productionRule2.default(ruleSpec['id'], this, ruleSpec['body'], ruleSpec['application_frequency'], ruleSpec['is_semantically_meaningful']));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return productionRuleObjects;
    }

    /**
     * Set frequency score multipliers for each of this symbol's priduction rules.
     * @return {undefined} method just modifies internal state, does not return anything
     * FIXME this method needs to be double checked
     */

  }, {
    key: 'initSetRuleFrequencyScoreMultipliers',
    value: function initSetRuleFrequencyScoreMultipliers() {
      if (this.productionRules !== undefined && this.productionRules.length > 0) {
        var maxApplicationFrequency = Math.max(this.productionRules.map(function (rule) {
          return rule.applicationFrequency;
        }));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.productionRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var rule = _step2.value;

            rule.frequencyScoreMultiplier = rule.applicationFrequency / maxApplicationFrequency;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return NonterminalSymbol;
}();

exports.default = NonterminalSymbol;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A generated text output, comprising both the textual content itself and its associated tags.
 */

var Output = function () {
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
  function Output(text, tags, recipe, explicitGrammarPathTaken, bracketedExpression) {
    _classCallCheck(this, Output);

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


  _createClass(Output, [{
    key: "toString",
    value: function toString() {
      return this.text;
    }

    /**
     * Construct a more understandable version of the bracketed expression, presented as a tree.
     * @param  {Boolean} excludeTags if we should strip out the tags or not when constructing this
     * @return {String}             A string representation of the bracketed expression as a tree
     */

  }, {
    key: "constructTreeExpression",
    value: function constructTreeExpression(excludeTags) {
      var bracketedExpression = this.bracketedExpression;
      if (excludeTags) {
        bracketedExpression = bracketedExpression.replace(/ <.+?>/, ""); //NOTE [Port] amazingly, JavaScript's regexs and python's mean the same thing here!
      }
      var treeExpression = "";
      var indent = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = bracketedExpression[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var character = _step.value;

          //NOTE [Port] change the indent based on the character code
          if ('[]+'.includes(character)) {
            if (character === '[') {
              indent += 4;
            } else if (character === ']') {
              indent -= 4;
            } else {
              indent = 0;
            }
          }
          //NOTE [Port] append a newline + whitespace or the character, based on character code
          if ('[+'.includes(character)) {
            var whitespace = Array(indent + 1).join(' '); //NOTE [Port] hacky.  JS join puts the string between the array elements,
            // and uses a empty string to represent an undefined array element.
            treeExpression = treeExpression.concat('\n', whitespace);
          } else if (character === ']') {
            continue;
          } else {
            treeExpression = treeExpression.concat(character);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return treeExpression;
    }
  }]);

  return Output;
}();

exports.default = Output;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A production rule in an annotated context-free grammar authored using an Expressionist-like tool.
 */
var ProductionRule = function () {
  /**
   * Initalize a production rule object
   * @param  {Number} ruleId                a unique id for this production rule???
   * @param  {NonterminalSymbol} head                  left hand side of this rule
   * @param  {Object} bodySpec              sspec for a equence of symbols that this rule may be used to expand the head into
   * @param  {Number} applicationFrequency  rate this rule will be used in relation to other rules with this head
   * @param  {Boolean} semanticallyMeaningul If this symbol or it's decendents have tags
   * @return {Object}                       {constructor}
   */
  function ProductionRule(ruleId, head, bodySpec, applicationFrequency, semanticallyMeaningful) {
    _classCallCheck(this, ProductionRule);

    this.id = ruleId;
    this.head = head;
    this.bodySpecification = bodySpec;
    // the rate at which this rule will be used relative to sibling rules, i.e., other rules with
    // the same head
    this.applicationFrequency = applicationFrequency;
    this.semanticallyMeaningful = semanticallyMeaningful;

    //the body gets set by Productionist.initGroundSymbolReferencesInARuleBody()
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


  _createClass(ProductionRule, [{
    key: 'toString',
    value: function toString() {
      //NOTE [Port]  JavaScript uses a better internal string representation than Python does, so unicode objects don't exist.
      //NOTE [Port] This also feels like it's fixable with a toString method on symbol objects.
      var symbolStr = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var symbol = _step.value;

          if (typeof symbol === 'string') {
            symbolStr = symbolStr.concat(symbol);
          } else {
            symbolStr = symbolStr.concat('[[' + symbol.name + ']]');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.head + ' --> ' + symbolStr;
    }

    /**
     * Compile all tags that are accessible from this production rule, meaning all the tags on all the symbols
     * in the body of this rule.
     * @return {undefined} method just changes internal state, does not return any values
     */

  }, {
    key: 'compileTags',
    value: function compileTags() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var symbol = _step2.value;

          if (!(typeof symbol === 'string')) {
            //i.e. if the symbol is nonterminal
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = symbol.tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var tag = _step3.value;

                if (!this.tags.includes(tag)) {
                  this.tags.push(tag); //NOTE [Port] I think I can convert this.tags to a set, then I don't need to worry about this.
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return ProductionRule;
}();

exports.default = ProductionRule;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * Port of productionist to Node.js
 * @author Johnathan Pagnutti
 * NOTE [Port]: The big shift between this library and the original python productionist code is file I/O.
 * This port shifts that code away, because JS environments can often be file I/O unfriendly.  This port provides
 * a series of loaders (based on ajax requests and the Node.js fs module) and does file I/O outside of core processing
 */


var _output = __webpack_require__(7);

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//NOTE [Port]: json library isn't needed (JSON is native to JS)
//NOTE [Port]: pickle.js exists, but it's really old.  JavaScript does not have any native object serialization tools, we'll see how
//NOTE long we can go without one

//NOTE [PORT]: I can define terms dynamically in JSON, but going bottom up is scary.  Gonna define
//NOTE file constants up here.
/**
 * Configuration constant to see if we should be using a past loading rather than regenerating
 * information
 * @type {Boolean}
 */
var HAVE_REPETITIONS_FILE_PRESIST_ACROSS_RUNTIME_INSTANCES = false;
/**
 * configuration constant over how strong the penalty for reptition is
 * @type {Number}
 */
var REPETITION_PENALTY_MULTIPLIER = 0.033;
/**
 * configuration constant over how well terms should 'rebound' from being repeated
 * @type {Number}
 */
var REPETITION_PENALTY_RECOVERY_RATE = 1.2;

/**
 * A system that generates text ouputs at runtime, on the fly.
 * @param  {String} contentBundleName      The name of the content bundles
 * @param  {String} contentBundleDirectory  Name of the directory (path?) containing content bundles
 * @param  {Boolean} probabilisticMode      flag to use a probability distribution to select candidates
 * @param  {Boolean} repetitionPenaltyMode   flag to use a penalty to discourage repeated use of 'wildcard rules'
 * @param  {Boolean} terseMode              flag to have the system favor production rules that produce terser dialogue
 * @param  {Number} verbosity              [0, 1, 2] amount of logging information to print
 * @param  {Constructor} Loader              The way we're going to load files (NOTE port specific)
 * @return {Object}                         {Constructor}
 */
//NOTE [Port] we want to remove the load from this function.  Pass in a reference to an already loaded object instead.

var Productionist = function () {
  function Productionist(contentBundleName, contentBundleDirectory, probabilisticMode, repetitionPenaltyMode, terseMode, verbosity, Loader) {
    _classCallCheck(this, Productionist);

    // Create a new productionist object!
    this.contentBundle = contentBundleName;
    //If verbosity is 0, no information will be printed out during processing; if 1, information about how far along
    //Producionist is in its general processing will be printed out; if 2,
    //information about the paths taken throught he grammar tog enerate content will also be printed
    this.verbosity = verbosity;

    // In terse mode, the system will favor production rules that may priduce terser dialogue
    this.terseMode = terseMode;

    //The remaining path holds all the semantically meaningful production rules that the system
    //is to execute as soon as they are encountered (between encountering these rules, the
    //system is free to select between wildcard production rules since that only result in
    //lexical/syntatic variation, i.e., not variation in the tags that are accumulated); this
    //attribute gets set by this.followRecipe()
    this.remainingPath = [];
    // The explicit path holds all production rules that the system ended up executing
    // during generation (including ones that were selected as wildcard rules, which would thus not
    // be included in the remaining path); this is saved a record of the generation process that
    // produced a line, and is critically utilized to produce the bracked expression for a line
    this.explicitPathTaken = [];
    // Whether Productionist is currently targeting a particular expressible meaning, which means
    // that it cannot go down paths that would accumulate tags outside that meaning, or Whether
    // it is generating example terminal results of expanding nonterminal symbols or executing
    // production rules, in which case every production rule becomes a wildcard rule
    this.targetingMeaning = true;
    // In probabilistic mode, Productionist will select which expressible meanings to target
    // probabilistically, by fitting a probability distribution to the candidates uses the scores
    // given to them; otherwise, Productionist will simply pick the highest scoring one
    this.probabilisticMode = probabilisticMode;
    // In reptition-penalty mode, semantically meaningless rules ("wildcard rules") that have been
    // used to produce recently generated content are less likely to be selected again (with a decay
    // rate on the penalty for selecting them); we do this by maintaining a current penalty for each
    // rule that increases each time the rule is used and decays as the rule is not used
    this.reptitionPenaltyMode = repetitionPenaltyMode;

    //Grab the path to the directory with the content bundle_name
    //NOTE [Port]: This needs to be shifted out of the main library to be able to get data from more sources
    if (contentBundleDirectory.endsWith("/")) {
      //strip trailing slash.  [Port]: might shift this to a URI
      contentBundleDirectory = contentBundleDirectory.substring(0, contentBundleDirectory.length - 2);
    }
    // hold onto the grammar file path.
    this.grammarFileLocation = contentBundleDirectory;

    //NOTE [Port]: Adding a property to say if this productionist object is finalized or not.  Non-finalized objects
    //NOTE cannot be used yet, and still need finalizeProductionist to be called.
    this.finalized = false;

    //NOTE [Port]: due to multiple ways to load files, we give productionist a loader to do its file loads
    this.loader = Loader;
  }

  /**
   * Return whether any mode is engaged such that candidate production rules need to be scored.
   * NOTE [Port] The way this is structured in python, I don't know how it's setter would work.  But, to keep
   * things mostly aligned, I'm using the get/set interface in JavaScript rather than a regular function.
   * @return {Boolean} if we need to score the production rules or not
   */


  _createClass(Productionist, [{
    key: "finalizeProductionist",


    /**
     * Method 'finalizes' a productionist object by async loading of all the various files that
     * might be used for a productionist instance.
     *
     * This also does the last round of initalization needed for Productionist to function.
     * @return {promise} a promise for a finalized productionist object
     */
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var repetitionPenalties, repetitionsFilePath, grammarSymbols, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, symbol, _grammarSymbols, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _symbol;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.loadGrammar(this.grammarFileLocation + "/" + this.contentBundle + ".grammar");

              case 2:
                this.grammar = _context.sent;
                _context.prev = 3;
                _context.next = 6;
                return this.loadTrie(this.grammarFileLocation + "/" + this.contentBundle + ".marisa");

              case 6:
                this.trie = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);

                // NOTE [Port] loadTrie always rejects right now
                this.trie = null;

              case 12:
                _context.next = 14;
                return this.loadExpressibleMeanings(this.grammarFileLocation + "/" + this.contentBundle + ".meanings");

              case 14:
                this.expressibleMeanings = _context.sent;
                _context.prev = 15;
                repetitionPenalties = undefined;

                if (!(this.reptitionPenaltyMode === undefined)) {
                  _context.next = 23;
                  break;
                }

                if (!HAVE_REPETITIONS_FILE_PRESIST_ACROSS_RUNTIME_INSTANCES) {
                  _context.next = 23;
                  break;
                }

                repetitionsFilePath = this.grammarFileLocation.substring(0, this.grammarFileLocation.length - 6) + ".repetitions";
                _context.next = 22;
                return this.loader.loadRepetitions(repetitionsFilePath);

              case 22:
                repetitionPenalties = _context.sent;

              case 23:
                if (!(repetitionPenalties === undefined)) {
                  _context.next = 52;
                  break;
                }

                if (!this.reptitionPenaltyMode) {
                  _context.next = 49;
                  break;
                }

                this.repetitionPenalties = {};
                grammarSymbols = this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 30;

                for (_iterator = grammarSymbols[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  symbol = _step.value;

                  this.repetitionsPenalties[symbol.toString()] = 1.0;
                }
                _context.next = 38;
                break;

              case 34:
                _context.prev = 34;
                _context.t1 = _context["catch"](30);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 38:
                _context.prev = 38;
                _context.prev = 39;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 41:
                _context.prev = 41;

                if (!_didIteratorError) {
                  _context.next = 44;
                  break;
                }

                throw _iteratorError;

              case 44:
                return _context.finish(41);

              case 45:
                return _context.finish(38);

              case 46:
                if (this.verbosity > 0) {
                  console.log("Initializing new repetitions dictionary...");
                }
                _context.next = 50;
                break;

              case 49:
                this.repetitionPenalties = {};

              case 50:
                _context.next = 54;
                break;

              case 52:
                this.repetitionPenalties = repetitionPenalties;
                if (this.verbosity > 0) {
                  console.log("Loading repetitions file...");
                }

              case 54:
                _context.next = 82;
                break;

              case 56:
                _context.prev = 56;
                _context.t2 = _context["catch"](15);

                if (!(this.expressibleMeanings === undefined || this.grammar === undefined)) {
                  _context.next = 60;
                  break;
                }

                return _context.abrupt("return", Promise.reject(_context.t2));

              case 60:

                //promise failure---we couldn't get anything from the repeitions file
                this.repetitionPenalties = {};
                _grammarSymbols = this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols);
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 65;

                for (_iterator2 = _grammarSymbols[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _symbol = _step2.value;

                  this.repetitionPenalties[_symbol.toString()] = 1.0;
                }
                _context.next = 73;
                break;

              case 69:
                _context.prev = 69;
                _context.t3 = _context["catch"](65);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t3;

              case 73:
                _context.prev = 73;
                _context.prev = 74;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 76:
                _context.prev = 76;

                if (!_didIteratorError2) {
                  _context.next = 79;
                  break;
                }

                throw _iteratorError2;

              case 79:
                return _context.finish(76);

              case 80:
                return _context.finish(73);

              case 81:
                if (this.verbosity > 0) {
                  console.log("Cound not load repetitions dictionary -- initializing new one...");
                }

              case 82:

                //done!
                this.finalized = true;
                return _context.abrupt("return", this);

              case 84:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 9], [15, 56], [30, 34, 38, 46], [39,, 41, 45], [65, 69, 73, 81], [74,, 76, 80]]);
      }));

      function finalizeProductionist() {
        return _ref.apply(this, arguments);
      }

      return finalizeProductionist;
    }()
    /**
     * Load the grammar sepcification form file and build and returna  Grammar object for it.
     * @param  {String} grammarFileLocation grammar file location
     * @return {Promise}                    a promise for a new gramamr object
     * @private
     */

  }, {
    key: "loadGrammar",
    value: function loadGrammar(grammarFileLocation) {
      if (this.verbosity > 0) {
        console.log("Loading grammar...");
      }
      return this.loader.loadGrammar(grammarFileLocation);
    }

    /**
     * Load a trie file (one containing the semantically meaingful paths through this gramamr)
     * @param  {String} trieFileLocation Path to a trie file
     * @return {Promise}                 A promise for a Trie object
     * @private
     */
    // NOTE [Port] we want to split out fileIO from the main library, see others

  }, {
    key: "loadTrie",
    value: function loadTrie(trieFileLocation) {
      if (this.verbosity > 0) {
        console.log("Loading trie...");
      }
      // NOTE [Port] Not touching ANY of this yet.  Gonna just reject this promise outright.
      return Promise.reject(new Error('Trie files are currently not supported, skipping Trie load.'));
    }

    /**
     * Load a set of constructed expressible meanings from a file.
     * @param  {String} expressibleMeaningsFileLocation path to the meanings file
     * @return {Promise}                    A Promise for a new ExpressibleMeanings object
     * @private
     */

  }, {
    key: "loadExpressibleMeanings",
    value: function loadExpressibleMeanings(expressibleMeaningsFileLocation) {
      if (this.verbosity > 0) {
        console.log("Loading expressible meanings...");
      }
      var idToTag = this.grammar.idToTag;
      return this.loader.loadExpressibleMeanings(expressibleMeaningsFileLocation, idToTag);
    }

    /**
     * Save a serialized version of the repetition-penalties dictionary, for use in any subsequent
     * generation instances
     * @return {Promise} a promise for the file to have been saved.
     */

  }, {
    key: "saveRepetitionPenaltiesFile",
    value: function saveRepetitionPenaltiesFile() {
      //let pathToRepetitionsFile = `${this.contentBundle}.repetitions`;
      //TODO oh this is where pickle would have been used
      //TODO right now, I don't want to deal with any of this, so I'm just gonna mark it for fixing later
      return Promise.reject(new Error("saveRepeitionPenalitiesFile is unimplemented"));
    }

    /**
     * Furnish example text generated by terminally exapnding the nonterminal symbol with the given name
     * @param  {String} nonterminalSymbolName the name of the nonterminal we'd like to Furnish
     * @return {object}                       A package of content, mapping a symbol to generated text
     */

  }, {
    key: "furnishExampleTerminalExpansionOfNonterminalSymbol",
    value: function furnishExampleTerminalExpansionOfNonterminalSymbol(nonterminalSymbolName) {
      var nonterminalflag = this.grammar.nonterminalSymbols.some(function (s) {
        return s.name === nonterminalSymbolName;
      });
      if (!nonterminalflag) {
        //NOTE [Port] probably need to find a better way to identify things instead of contentBundles, as that might
        //NOTE not be sane in all JS applications
        throw new Error("Error: There is no nonterminal symbol in " + this.contentBundle + ".grammar with the name " + nonterminalSymbolName);
      }
      this.targetingMeaning = false; // all rules we encounter will be treated as wildcard rules
      var targetedSymbol = this.grammar.nonterminalSymbols.map(function (s) {
        return s.name === nonterminalSymbolName;
      })[0];
      // Terminally expand the symbol to generate text
      var generatedText = this.terminallyExpandNonterminalSymbol(targetedSymbol, 0);
      // Package that up with all the associated metadata
      var output = this.buildContentPackage(targetedSymbol, generatedText);
      // Reset the targetingMeaning attribute
      this.targetingMeaning = true;
      // Return the content package
      return output;
    }

    /**
     * Furnish example text generated as the terminal result of excuting the production rule with the given definition
     * @param  {String} productionRuleDefinition a string representation of a production rule
     * @return {ContentPackage}                          A complete content package from firing this rule
     */

  }, {
    key: "furnishExampleTerminalResultOfExecutingProductionRule",
    value: function furnishExampleTerminalResultOfExecutingProductionRule(productionRuleDefinition) {
      var definitionFlag = this.grammar.productionRules.some(function (r) {
        return r.toString() === productionRuleDefinition;
      });
      if (!definitionFlag) {
        throw new Error("Error: There is no production rule in " + this.contentBundle + ".grammar with the definition " + productionRuleDefinition);
      }

      this.targetingMeaning = false; //All rules we encounter will be treated as wildcard rules
      var targetedRule = this.grammar.productionRules.filter(function (r) {
        return r.toString() === productionRuleDefinition;
      }).next();
      // Collect the terminal results of executing this rule
      var generatedText = this.executeProductionRule(targetedRule, 0);
      // Package that up with all the associated metadata
      var output = this.buildContnetPackage(targetedRule.head, generatedText);
      // Reset the taretingMeaning attribute
      this.targetingMeaning = true;
      // return the content package
      return output;
    }

    /**
     * Satisfy the given content request
     * @param  {contentRequest} contentRequest a content request objects
     * @return {ContentPackage}                a content package for this request
     * @throws {Error}                         Unable to fulfill the provided request
     * @private
     */

  }, {
    key: "fulfillContentRequest",
    value: function fulfillContentRequest(contentRequest) {
      // Find all the expressible meanings that are stisfying, given the content request
      var satisficingExpressibleMeanings = this.compileSatisficingExpressibleMeanings(contentRequest);
      // if there's no satisficing content requests, throw an error
      if (satisficingExpressibleMeanings === undefined || satisficingExpressibleMeanings.length === 0) {
        throw new Error("Error: The submitted content request cannot be fulfilled by using this grammar.");
      }

      // Select one of these to target for generation, either randomly or by using the scoring metric
      // given in the content request
      var selectedExpressibleMeaning = this.selectExpressibleMeaning(satisficingExpressibleMeanings, contentRequest.scoringMetric);

      // Select one of the grammar paths associated with this expressible meaning
      var selectedRecipe = this.selectRecipeForExpressibleMeaning(selectedExpressibleMeaning);

      //Execute that grammar path to produce the generated content satisfying the content request
      var generatedText = this.followRecipe(selectedRecipe);

      // package that up with all the associated metadata
      return this.buildContentPackage(generatedText, null, null, contentRequest);
    }

    /**
     * Furnish an object that packaged the generated text with its acumulated tags and other metadata
     * @param  {String?} generatedText  the text that has been generated for this content request
     * @param  {Object?} targetedSymbol optional symbol that was targeted for this production
     * @param  {Recipe} selectedRecipe  optional recipe used to generate the text
     * @param  {ContentRequest} contentRequest the content request that the generated text is answering
     * @return {Output}                a new Output object (the generated text [ackaged with tags and other metadata)
     * @throws {Error}                  Unable to create a content package that satisfyies the contentRequest
     * @private
     */

  }, {
    key: "buildContentPackage",
    value: function buildContentPackage(generatedText, targetedSymbol, selectedRecipe, contentRequest) {
      // Collect all the tags attached to the symbols along with the path we took -- these are the
      // tags that will com bunded with generated content

      var tags = new Set();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.explicitPathTaken[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var productionRule = _step3.value;

          //NOTE [Port] javascript does not have a set |= operator, elements must be added one by one
          var ruleTags = new Set(productionRule.tags);
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = ruleTags[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _tag = _step5.value;

              tags.add(_tag);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }

        // Produce a bracketed expression specifying the specific path through the grammar that
        // produced this generated content (useful for debugging/authoring purposes); first, we'll
        // need to save a copy of the explicit path that we took through the grammar, since this
        // will be consumed as we build the bracketed expression
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var explicitPathTaken = this.explicitPathTaken;

      //NOTE [Port] this whole thing is a little awkward, and could probably be better done with a flag in produceBracketedExpression...
      var bracketedExpression = undefined; //NOTE [Port] need to reserve the var name
      if (targetedSymbol) {
        //NOTE [Port] letting JavaScript's 'Truthy' evaluation put in work, to cover both the null and undefiend cases
        bracketedExpression = this.produceBracketedExpression(targetedSymbol);
      } else {
        bracketedExpression = this.produceBracketedExpression();
      }

      // Instantiate an Output object
      var output = new _output2.default(generatedText, tags, selectedRecipe, explicitPathTaken, bracketedExpression);

      // If repeition-penalty mode is engaged, penalize all the rules that we executed to produce
      // that content (so that they will be les likely to be used again) and decay the penalties
      // for all the other production rules in the grammar that we didn't execute this time around
      if (this.reptitionPenaltyMode) {
        this.updateRepritionPenalties(explicitPathTaken);
      }

      // Lastly, if this content is meant to fulfill a content request, check to make sure it does so
      if (contentRequest) {
        //NOTE [Port] let JavaScript 'truthy' evaluation handle both undefined and null cases
        //TODO this set of flag calculations (issuperset DNE JS)
        //TODO Slightly repeating myself, refactor to use before expansion checks here as well.
        var contentFulfillsTheRequest = true;

        var hasRequiredTag = true;

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = contentRequest.mustHave[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var tag = _step4.value;

            if (!output.tags.has(tag)) {
              hasRequiredTag = false;
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        if (!hasRequiredTag) {
          contentFulfillsTheRequest = false;
        }

        //performing the intersection of output.tags and contentRequest.mustNotHave
        var intersection = new Set([].concat(_toConsumableArray(output.tags)).filter(function (elm) {
          return contentRequest.mustNotHave.has(elm);
        }));

        //if the intersection set has anything, we failed to fill the content request
        if (intersection.size > 0) {
          contentFulfillsTheRequest = false;
        }

        if (!contentFulfillsTheRequest) {
          throw new Error("The generated content unit does not satisfy the content request.");
        }
      }
      return output;
    }

    /**
     * Compile all satisficing expressible meanings that are stasificing.
     *
     * In this case, 'satisficing' meanins that an expressible meaning has none of the
     * 'must not have' tags and all of the 'must have' tags that are specified in the
     * content request.
     * @param  {contentRequest} contentRequest A request for this content
     * @return {Array}                A list of ExpressibleMeanings for the provided content request
     * @private
     */

  }, {
    key: "compileSatisficingExpressibleMeanings",
    value: function compileSatisficingExpressibleMeanings(contentRequest) {
      //TODO JS sets don't have the & or issuperset operations
      // Make sure none of these have conditions tags that are currently violated
      return this.expressibleMeanings.filter(function (em) {
        //NOTE [PORT] javascript sets don't have the operations that python sets do, and I'd
        //prefer not to touch the default Set class, in case it gets changed later
        //testing to see if em.tags is a superset of contentRequest.mustHave
        var hasRequiredTag = true;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = contentRequest.mustHave[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var tag = _step6.value;

            if (!em.tags.has(tag)) {
              hasRequiredTag = false;
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        if (!hasRequiredTag) {
          return false;
        }

        //performing the intersection of em.tags and contentRequest.mustNotHave
        var intersection = new Set([].concat(_toConsumableArray(em.tags)).filter(function (elm) {
          return contentRequest.mustNotHave.has(elm);
        }));

        //if the intersection set has anything, return false.  Otherwise, return true!
        if (intersection.size > 0) {
          return false;
        }
        return true;
      });
    }

    /**
     * Select an expressible meaning to target for generation
     * @param  {Array} candidates    A list of potential ExpressibleMeanings
     * @param  {Function?} scoringMetric A way to score each ExpressibleMeaning
     * @return {ExpressibleMeaning}               The ExpressibleMeaning to go for
     * @private
     */

  }, {
    key: "selectExpressibleMeaning",
    value: function selectExpressibleMeaning(candidates, scoringMetric) {
      if (this.verbsoity > 0) {
        console.log("Selecting Expressible Meaning...");
      }
      var selectedExpressibleMeaning = undefined; //NOTE [Port] need to reserve this var name
      // If there's only one option, we can just select that right off and move on
      if (candidates.length > 1) {
        selectedExpressibleMeaning = candidates[0];
      } else if (!scoringMetric) {
        // If no scoring metric was provided, we can just randomly select a satisficing intermediate
        // representation as the one that we will target
        // TODO see if JS has a random.choice(...) functionality
        selectedExpressibleMeaning = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        if (this.verbosity > 0) {
          console.log("Scoring Expressible Meanings...");
          // If a scoring metric *was* provided in the content request, use it to rank the satisficing
          // expressible meaning; first, we need to score each of the candidate intermediate
          // representations using the scoring metric
          // provided in the content request
          var scores = {};
          console.log(candidates);
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = candidates[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var candidate = _step7.value;

              scores[candidate.toString()] = this.scoreExpressibleMeaning(candidate, scoringMetric);
            }
            // check if any candidate even earned any points; if not, we can just pick randomly
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          var scoreValues = Object.keys(scores).map(function (key) {
            return scores[key];
          });
          if (!scoreValues) {
            //NOTE [Port] broke this into two lines
            selectedExpressibleMeaning = candidates[Math.floor(Math.random() * candidates.length)];
          } else {
            // fit a probability distribution to the candidates
            var probabilityRanges = this.constructor.fitProbabilityDistributionToDecisionCandidates(scores);
            // pick a specific expressible meaning to target
            selectedExpressibleMeaning = this.selectCandidateGivenProbabilityDistribution(probabilityRanges);
          }

          if (this.verbosity > 1) {
            console.log("Derived the following scores for expressible meanings:");
            for (var _candidate in scores) {
              console.log("\tEM" + _candidate.id + "\t" + scores[_candidate]);
            }
          }
        }
      }

      return selectedExpressibleMeaning;
    }

    /**
     * Score a candidate expressible meaning using the scoring metric provided in a content request.
     * @param  {expressibleMeaning} expressibleMeaning the meaning the content request wants to express
     * @param  {Array?} scoringMetric      How to score all expressible meanings for this content request
     * @return {Number}                    The score for this content request
     * @private
     */

  }, {
    key: "selectRecipeForExpressibleMeaning",


    /**
     * Select one of the grammar paths associated with the given expressible meaning
     * @param  {expressibleMeaning} expressibleMeaning a potential expressible meaning with the content request
     * @return {Recipe}                    a path through the current grammar that expresses the expressible meaning
     */
    value: function selectRecipeForExpressibleMeaning(expressibleMeaning) {
      if (this.verbosity > 0) {
        if (expressibleMeaning.recipes.length === 1) {
          console.log("Selecting EM " + this.expressibleMeanings.indexOf(expressibleMeaning) + "'s sole recipe...'");
        } else {
          console.log("Selecting one of EM" + this.expressibleMeanings.indexOf(expressibleMeaning) + "'s " + expressibleMeaning.recipes.length + " recipes...'");
        }
      }

      var candidates = expressibleMeaning.recipes;
      var selectedRecipe = undefined; //NOTE [Port] need to reserve this var name
      //If there's only one option, we can just select that right off and move on
      if (candidates.length === 1) {
        selectedRecipe = candidates[0];
      } else if (!this.scoringModesEngaged) {
        selectedRecipe = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        // If it is engaged, we'll want to select a path that won't generate a lot of repeition; to
        // prevent repetition, we can store candidate paths according to the current repeition
        // penalties attached to the symbols in the production rules on the paths; first lets
        // compute a utility distribution over the candidate paths
        var scores = {};
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = candidates[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var recipe = _step8.value;

            scores[recipe] = this.scoreCandidateRecipe(recipe);
          }
          // Check if any candidate even earned any ponts; if not, we can just pick randomly
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        var scoreValues = Object.keys(scores).map(function (key) {
          return scores[key];
        });
        if (!scoreValues) {
          //NOTE [Port] broke this into two lines
          selectedRecipe = candidates[Math.floor(Math.random() * candidates.length)];
        } else {
          // next, fit a probability distribution to the utility distribution
          var probabilityRanges = this.constructor.fitProbabilityDistributionToDecisionCandidates(scores);
          // finally, select a path (using the probability distribution, if probabilistic mode is enaged)
          selectedRecipe = this.selectCandidateGivenProbabilityDistribution(probabilityRanges);
        }
      }
      return selectedRecipe;
    }

    /**
     * Return a score for the given recipe according to the scores for the production rules on its path
     * @param  {Recipe} recipe the recipe to score
     * @return {Number}        the recipe's score
     * @private
     */

  }, {
    key: "scoreCandidateRecipe",
    value: function scoreCandidateRecipe(recipe) {
      var _this = this;

      // Ground out hte rule references in the recipe to form a list of actual ProductionRule
      // objects; note: if there's no path string, that means tthe selected path is one that
      // doesn't pass through any symbols with tags; in this case, Productionist can just select
      // between produciton rules that are not semantically meaningful until it's gorund out into
      // a terminal expansion
      var path = recipe.path.map(function (ruleId) {
        return _this.grammar.productionRules[ruleId];
      });
      var score = path.reduce(function (ruleA, ruleB) {
        return _this.scoreCandidateProductionRule(ruleA) + _this.scoreCandidateProductionRule(ruleB);
      }, 0);
      return score;
    }

    /**
     * Return a score for the given production rule.
     *
     * The score for this rule will be calculated according to its expansion-control tags (application
     * frequency and usage constraint) and, if applicable, the current repetition penalties of the symbols
     * in its body (if the repeptition-penalty mode is engaged) and the number and length of the symbols in
     * its body (if terse mode is engaged)
     * @param  {ProductionRule} productionRule the production rule to score
     * @return {Number}                the score of this production rule
     * @private
     */

  }, {
    key: "scoreCandidateProductionRule",
    value: function scoreCandidateProductionRule(productionRule) {
      var score = 1.0;
      // if applicable, adjust score according to repeition penalties and terseness
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = productionRule.body[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var symbol = _step9.value;

          if (this.reptitionPenaltyMode) {
            score *= this.reptitionPenalties[symbol.toString()];
          }
          if (this.terseMode) {
            if (typeof symbol === 'string') {
              score /= symbol.length;
            }
          } else {
            // Need more testing here, and the divisor should be a config constant -- idea is to penalize
            // longer stntence templates so as to avoid a local-optimum situation: it does this by dividing
            // the score in half for every nonterminal symbol on the rule's right-hand side
            score /= 2;
          }
        }

        // Finally, adjust score according to the application frequency associated with this rule; specifically,
        // multiply the score by the rule's frequency score multiplier (which will be 1.0 or less)
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      score *= productionRule.frequencyScoreMultiplier;
      return score;
    }

    /**
     * Follow the given recipe to generate the desired text content.
     * @param  {Recipe} recipe the recipe to follow
     * @return {String}        terminal text
     * @private
     */

  }, {
    key: "followRecipe",
    value: function followRecipe(recipe) {
      var _this2 = this;

      // Ground out the rule references in the recipe to form a list of actual ProductionRule
      // objects; note: if this is an empty list, that means that the selected path is one that
      // doesn't pass through any symbols with tags; in this case, Productionist can just randomly
      // select production rules that are not semantically meaningful until it's ground out into
      // a terminal expansion

      var path = recipe.path.map(function (ruleId) {
        return _this2.grammar.productionRules[ruleId];
      });
      // keep this list handy as the list of remaining rules to execute --- we'll
      // be consuming this as we proceed
      this.remainingPath = path; //NOTE [Port] path is already a list

      // Keep track of all the rules we ended up firing for this path, including our choices
      // for wildcards --- we'll use this later to generate a pracketed expression specifying
      // how exactly the contnet unit was generated (for debugging/authoring purposes)
      this.explicitPathTaken = [];
      // Execute the rules on the selected path in order to produce content expressing the
      // desired semantics, which are specifically the tags associated with the targeted
      // expressible meaning; this can be done by simply targeting the grammar's
      // start symbol and then only using rules on the targeted path for expansion (with
      // randomly chosen rules executed in each case of a wild card on the path)
      var text = this.terminallyExpandNonterminalSymbol(this.grammar.startSymbol, 0);
      return text;
    }

    /**
     * Terminally expand the given symbol.
     * @param  {NonterminalSymbol} nonterminalSymbol A non-terminal to expand
     * @param  {Number} nTabsForDebug     the number of tabs to use for debugging statements
     * @return {String}                   the expansion of this rule
     */

  }, {
    key: "terminallyExpandNonterminalSymbol",
    value: function terminallyExpandNonterminalSymbol(nonterminalSymbol, nTabsForDebug) {
      var debugWhitespace = new Array(nTabsForDebug).join('  '); //NOTE [Port] JS String multipulcation can get weird, so abusing Array.prototype.join()
      if (this.verbosity > 1) {
        console.log(debugWhitespace + "Expanding nonterminal symbol [[" + nonterminalSymbol.name + "]]...");
      }

      var nextRule = undefined; // NOTE [Port] need to reserve a variable name
      // Select a production rule
      if (this.remainingPath && nonterminalSymbol.productionRules.includes(this.remainingPath[0])) {
        nextRule = this.remainingPath.splice(0, 1)[0]; //NOTE [Port] JS splice returns an array
      } else {
        if (this.verbosity > 1) {
          console.log(debugWhitespace + "Selecting wildcard rule...");
        }
        nextRule = this.selectWildcardProductionRule(nonterminalSymbol);
      }

      return this.executeProductionRule(nextRule, nTabsForDebug + 1);
    }

    /**
     * Select a wildcard production rule that will be used to expand the given nonterminal symbol.
     *
     * A 'wildcard rule' is one that is not marked as being semantically meaningful, and is thus not
     * included on the targeted path (stored as the 'remainingPath' attribute)
     * @param  {NonterminalSymbol} nonterminalSymbol the nonterminal symbol we'll expand
     * @return {ProductionRule}                   the wildcard rule to use
     * @throws {Error}                            If this nonterminal symbol has no wildcard rules
     * @private
     */

  }, {
    key: "selectWildcardProductionRule",
    value: function selectWildcardProductionRule(nonterminalSymbol) {
      var candidateWildcardRules = []; //NOTE [Port] need to reserve the var names
      var selectedWildcardRule = undefined;

      if (this.targetingMeaning) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = nonterminalSymbol.productionRules[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var r = _step10.value;

            if (!r.semanticallyMeaningful) {
              candidateWildcardRules.push(r);
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      } else {
        candidateWildcardRules = nonterminalSymbol.productionRules;
      }

      // If there's only one choice, we can just select that and move on
      if (candidateWildcardRules.length === 1) {
        selectedWildcardRule = candidateWildcardRules[0];
      } else if (!this.scoringModesEngaged) {
        // If no scoring mode is engaged, we can simply rnadomly select a wildcard rule
        // NOTE [Port] original code attempts to make a random choice from a list, and catches an index error
        //            if the list is empty, then throws an authoring error.
        //            I'm going to just check list length and throw---it's more similar to how
        //            earlier assert statements look in JS.
        if (candidateWildcardRules.length === 0) {
          throw new Error("AuthoringError: THe nonterminal symbol " + nonterminalSymbol.name + "\n           has no available wildcard rules, which means it cannont be expanded.");
        }
        selectedWildcardRule = candidateWildcardRules[Math.floor(Math.random() * candidateWildcardRules.length)];
      } else {
        // otherwise, w eneed to compute a utility distrbution over the candidate wildcard rules
        var scores = {};
        for (var rule in candidateWildcardRules) {
          scores[rule] = this.scoreCandidateProductionRule(rule);
        }
        // check if any candidate even earned any points; if not, we can just pick randomly
        //NOTE [Port] broke this into two lines
        var scoreValues = Object.keys(scores).map(function (key) {
          return scores[key];
        });
        if (!scoreValues) {
          selectedWildcardRule = candidateWildcardRules[Math.floor(Math.random() * candidateWildcardRules.length)];
        }
      }

      return selectedWildcardRule;
    }

    /**
     * Execute the given production rule
     * @param  {ProductionRule} rule          The rule to expanding
     * @param  {Number} nTabsForDebug number of tabs to use for debug statements
     * @return {String}               the expansion of this rule
     * @private
     */

  }, {
    key: "executeProductionRule",
    value: function executeProductionRule(rule, nTabsForDebug) {
      //console.log("In Production Rule");
      //console.log(rule);
      var debugWhitespace = new Array(nTabsForDebug).join('  '); //NOTE [Port] JS String multipulcation can get weird, so abusing Array.prototype.join()
      if (this.verbosity > 1) {
        console.log(debugWhitespace + "Using production rule #" + rule.id + ": '" + rule.toString() + "'");
      }

      // Add to our record of the explicit path we took in the grammar to produce the
      // content we'll be sending back
      this.explicitPathTaken.push(rule);
      // Terminally expand this symbol
      var terminallyExpandedSymbolsInThisRuleBody = [];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = rule.body[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var symbol = _step11.value;

          if (typeof symbol === 'string') {
            terminallyExpandedSymbolsInThisRuleBody.push(symbol);
          } else {
            // Nonterminal symbol, which means we have to expand it
            //NOTE [Port] got rid of a helper var.  This feels cleaner and fits more with the
            //NOTE more functional style here
            terminallyExpandedSymbolsInThisRuleBody.push(this.terminallyExpandNonterminalSymbol(symbol, nTabsForDebug + 1));
          }
        }

        // Concatinate the results and return that string
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      return terminallyExpandedSymbolsInThisRuleBody.join('');
    }

    /**
     * Produce a bracketed expression for a given grammar path.
     *
     * Bracketed expressions can be useful for debugging purposes, since they provide an explicit_grammar_path_taken
     * account of how a content unit was generated.
     * @param  {Object?} symbolToStartFrom (optional) The symbol to start from.  If not provided, will start from the
     * grammar's start symbol
     * @return {[String?}                   The bracketed expression from this symbol
     * @private
     */

  }, {
    key: "produceBracketedExpression",
    value: function produceBracketedExpression(symbolToStartFrom) {
      // Unless this content was produced by explicitly targeting a nonterminal symbol or
      // production rule (to support live authoring feedback), we'll want to start at the
      // grammar's start symbol
      if (symbolToStartFrom === undefined || symbolToStartFrom === null) {
        symbolToStartFrom = this.grammar.startSymbol;
      }

      //NOTE [Port] ketp the helper var here, but TODO: remove it.
      var bracketedExpression = this.expandNonterminalSymbolToProduceBracketedExpressionFragment(symbolToStartFrom);
      return bracketedExpression;
    }

    /**
     * Expand the given symbol to produce the next framgent of the bracketed expression being produced
     * @param  {NonterminalSymbol} nonterminalSymbol the nonterminal symbol to expand to get a bracketed expression
     * @return {String}                   the bracketed expression from this nonterminal symbol
     * @throws {Error}                    if the symbol does not fit with the rules on the production path
     * @private
     */

  }, {
    key: "expandNonterminalSymbolToProduceBracketedExpressionFragment",
    value: function expandNonterminalSymbolToProduceBracketedExpressionFragment(nonterminalSymbol) {
      //NOTE [Port] JS doesn't have typed errors by default, and making a new error type to
      //NOTE catch an index problem feels incorrect.  In keeping with current convention
      //NOTE I'm moving to checking this in an if statement
      if (this.explicitPathTaken.length > 0) {
        var nextRule = this.explicitPathTaken.splice(0, 1)[0]; //NOTE [Port] JS splice returns a list
        if (!nonterminalSymbol.productionRules.includes(nextRule)) {
          throw new Error("Error: Expected rule #" + nextRule.id + " to be a production rule of the symbol " + nonterminalSymbol.name);
        }
        // Use the next production rule on the path to produce the next frament of the bracketed expression
        return this.executeProductionRuleToProduceBracketedExpressionFragment(nextRule);
      } else {
        //NOTE [Port] this code goes where the catch originally went
        //NOTE Also, tweeked slightly to better fit JSs template strings from Python's
        // This nonterminal symbol currently has no production rules, so we'll just return the bracketed expression
        var tags = nonterminalSymbol.tags.map(function (t) {
          return t;
        });
        //TODO remove this helper var
        var bracketedExpressionFragment = nonterminalSymbol.name + "<" + tags.join(', ') + ">[[[" + nonterminalSymbol.name + "]]]";
        return bracketedExpressionFragment;
      }
    }

    /**
     * Execute the given production rule to produce the next frament of the bracketed expression being produced
     * @param  {ProductionRule} rule production rule to execute
     * @return {String}      the bracketed expression from executing this production rule
     * @private
     */

  }, {
    key: "executeProductionRuleToProduceBracketedExpressionFragment",
    value: function executeProductionRuleToProduceBracketedExpressionFragment(rule) {
      // Terminally expand this symbol
      var terminallyExpandedSymbolsInThisRuleBody = [];
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = rule.body[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var symbol = _step12.value;

          if (typeof symbol === 'string') {
            //terminal symbol (no need to expand)
            terminallyExpandedSymbolsInThisRuleBody.push("\"" + symbol.toString() + "\"");
          } else {
            terminallyExpandedSymbolsInThisRuleBody.push(this.expandNonterminalSymbolToProduceBracketedExpressionFragment(symbol));
          }
        }

        // Concatenate the results and return that string
        // NOTE [Port] Tweeked slightly to better fit JSs template strings from Python's
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      var tags = rule.head.tags ? rule.head.tags.map(function (t) {
        return t;
      }).join(', ') : '';
      // TODO remove this helper var, maybe clean up this template?
      var bracketedExpressionFragment = rule.head.name + " <" + tags + ">[" + terminallyExpandedSymbolsInThisRuleBody.join(' + ') + "]";
      return bracketedExpressionFragment;
    }

    /**
     * Udate the repetition penalties to increase the penalties for symbols we just used and decay the penalty
     * for all symbols we did not use this time around.
     * @param  {Array} explicitPathTaken the path through the grammar we just took
     * @return {Undefined}                   function does not return, just updates state
     */

  }, {
    key: "updateRepetitionPenalties",
    value: function updateRepetitionPenalties(explicitPathTaken) {
      var symbolsUsedThisTime = new Set();
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = explicitPathTaken[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var rule = _step13.value;
          var _iteratorNormalCompletion15 = true;
          var _didIteratorError15 = false;
          var _iteratorError15 = undefined;

          try {
            for (var _iterator15 = rule.body[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
              var _symbol2 = _step15.value;

              symbolsUsedThisTime.add(_symbol2);
            }
          } catch (err) {
            _didIteratorError15 = true;
            _iteratorError15 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion15 && _iterator15.return) {
                _iterator15.return();
              }
            } finally {
              if (_didIteratorError15) {
                throw _iteratorError15;
              }
            }
          }
        }
        //NOTE [Port] using a helper var here, because array concatination in JS can get a little weird.
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }

      var grammarSymbols = this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols);
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = grammarSymbols[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var symbol = _step14.value;

          if (symbolsUsedThisTime.includes(symbol)) {
            this.repetitionPenalties[symbol.toString()] *= REPETITION_PENALTY_MULTIPLIER;
          } else {
            this.repetitionPenalties[symbol.toString()] *= REPETITION_PENALTY_RECOVERY_RATE;
          }
          this.repetitionPenalties[symbol.toString()] = Math.min(1.0, this.reptitionPenalties[symbol.toString()]);
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14.return) {
            _iterator14.return();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }
    }

    /**
     * Return a dictionary mapping each of the decision candidates to a probability range
     * @param  {Object} scores dictionary containing the scores of all the candidates
     * @return {Object}        dictionary of a probability distribution to each candidates
     * @private
     */

  }, {
    key: "selectCandidateGivenProbabilityDistribution",


    /**
     * Return a selected decision candidate.
     *
     * If probabillistic mode is engaged, the system with probabilistically select; otherwise, it
     * will simply return the highest scoring candidate.
     * @param  {Object} probabilityRanges a dictionary providing ranges to each candidate
     * @return {Object}                   the candidate we've chosen
     */
    value: function selectCandidateGivenProbabilityDistribution(probabilityRanges) {
      var selection = undefined; //NOTE [Port] need to reserve this var name
      if (this.probabilisticMode) {
        var x = Math.random();
        //NOTE [Port] needed to do this with a loop in JS.  Couldn't quite figure out how to pull it off with map() and filter()
        for (var candidate in probabilityRanges) {
          if (probabilityRanges.hasOwnProperty(candidate)) {
            if (probabilityRanges[candidate][0] <= x && x <= probabilityRanges[candidate][1]) {
              selection = x;
              break;
            }
          }
        }
      } else {
        //NOTE [Port] needed to do this with a loop and temp var in JS.  Couldn't quite figure out how to pull it off with map() and filter()
        var curMax = 0;
        for (var _candidate2 in probabilityRanges) {
          if (probabilityRanges.hasOwnProperty(_candidate2)) {
            if (probabilityRanges[_candidate2][1] - probabilityRanges[_candidate2][0] > curMax) {
              selection = _candidate2;
            }
          }
        }
      }

      return selection;
    }
  }, {
    key: "scoringModesEngated",
    get: function get() {
      return this.repetitionPenaltyMode || this.terseMode || this.grammar.unequalRuleFrequencies;
    }
  }], [{
    key: "scoreExpressibleMeaning",
    value: function scoreExpressibleMeaning(expressibleMeaning, scoringMetric) {
      var score = 0;
      //NOTE [Port] you can't really do this double iteration in JavaScript.  We an break down tuples on indexes though
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = scoringMetric[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var elem = _step16.value;

          var tag = elem[0];
          var weight = elem[1];
          if (expressibleMeaning.tags.includes(tag)) {
            score += weight;
          }
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      return score;
    }
  }, {
    key: "fitProbabilityDistributionToDecisionCandidates",
    value: function fitProbabilityDistributionToDecisionCandidates(scores) {
      var candidates = Object.keys(scores);
      // determine the individual prbabilities of each candidate
      var individualProbabilities = {};
      //NOTE [Port] JS doesn't the value() property or sum() function, so this looks a little
      //NOTE ganrlier but should be equivelent
      var sumOfAllScores = Object.keys(scores).map(function (key) {
        return scores[key];
      }).reduce(function (a, b) {
        return a + b;
      });
      for (var candidate in candidates) {
        individualProbabilities[candidate] = scores[candidate] / sumOfAllScores;
      }
      // Use those individual probabilities to associate each candidate with a specific
      // probability range, such that generating a random value between 0.0 and 1.0 will fall into
      // one and only one candidate's probability range
      var probabilityRanges = {};
      var currentBound = 0.0;
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = candidates[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var _candidate3 = _step17.value;

          //NOTE [Port] took away a lot of helper variables here
          probabilityRanges[_candidate3] = [currentBound, currentBound + individualProbabilities[_candidate3]];
          currentBound += individualProbabilities[_candidate3];
        }
        // Make sure the last bound indeed extends to 1.0 (necessary because of rounding issues)
        // NOTE [Port] if Python had them, FOR SURE, JavaScript does
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17.return) {
            _iterator17.return();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      var lastCandidateToHaveARangeAttributed = candidates[candidates.length - 1];
      probabilityRanges[lastCandidateToHaveARangeAttributed] = [probabilityRanges[lastCandidateToHaveARangeAttributed][0], 1.0];

      return probabilityRanges;
    }
  }]);

  return Productionist;
}();

exports.default = Productionist;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Recipe = function () {
  /**
   * Initialize a Recipe object.
   * @param  {Number} recipeId           id for this recipe
   * @param  {ExpressibleMeaning} expressibleMeaning an ExpressibleMeanings object for this recipe
   * @param  {String} grammarPath        The path through the grammar that is associated with this recipe
   * @return {Object}                    {constructor}
   */
  function Recipe(recipeId, expressibleMeaning, grammarPath) {
    _classCallCheck(this, Recipe);

    this.id = recipeId;
    this.expressibleMeaning = expressibleMeaning;
    this.name = expressibleMeaning.id + "-" + this.id;
    this.path = grammarPath;
  }

  /**
   * String representation of a Recipe
   * @return {String} the string representation of this object
   */


  _createClass(Recipe, [{
    key: "toString",
    value: function toString() {
      return "Recipe " + this.name;
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(14).EventEmitter;
var spawn = __webpack_require__(13).spawn;
var readlink = __webpack_require__(12).readlinkSync;
var path = __webpack_require__(15);
var dirname = path.dirname;
var basename = path.basename;
var fs = __webpack_require__(0);

/**
 * Expose the root command.
 */

exports = module.exports = new Command();

/**
 * Expose `Command`.
 */

exports.Command = Command;

/**
 * Expose `Option`.
 */

exports.Option = Option;

/**
 * Initialize a new `Option` with the given `flags` and `description`.
 *
 * @param {String} flags
 * @param {String} description
 * @api public
 */

function Option(flags, description) {
  this.flags = flags;
  this.required = ~flags.indexOf('<');
  this.optional = ~flags.indexOf('[');
  this.bool = !~flags.indexOf('-no-');
  flags = flags.split(/[ ,|]+/);
  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
  this.long = flags.shift();
  this.description = description || '';
}

/**
 * Return option name.
 *
 * @return {String}
 * @api private
 */

Option.prototype.name = function() {
  return this.long
    .replace('--', '')
    .replace('no-', '');
};

/**
 * Check if `arg` matches the short or long flag.
 *
 * @param {String} arg
 * @return {Boolean}
 * @api private
 */

Option.prototype.is = function(arg) {
  return arg == this.short || arg == this.long;
};

/**
 * Initialize a new `Command`.
 *
 * @param {String} name
 * @api public
 */

function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = {};
  this._allowUnknownOption = false;
  this._args = [];
  this._name = name || '';
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Command.prototype.__proto__ = EventEmitter.prototype;

/**
 * Add command `name`.
 *
 * The `.action()` callback is invoked when the
 * command `name` is specified via __ARGV__,
 * and the remaining arguments are applied to the
 * function for access.
 *
 * When the `name` is "*" an un-matched command
 * will be passed as the first arg, followed by
 * the rest of __ARGV__ remaining.
 *
 * Examples:
 *
 *      program
 *        .version('0.0.1')
 *        .option('-C, --chdir <path>', 'change the working directory')
 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 *        .option('-T, --no-tests', 'ignore test hook')
 *
 *      program
 *        .command('setup')
 *        .description('run remote setup commands')
 *        .action(function() {
 *          console.log('setup');
 *        });
 *
 *      program
 *        .command('exec <cmd>')
 *        .description('run the given remote command')
 *        .action(function(cmd) {
 *          console.log('exec "%s"', cmd);
 *        });
 *
 *      program
 *        .command('teardown <dir> [otherDirs...]')
 *        .description('run teardown commands')
 *        .action(function(dir, otherDirs) {
 *          console.log('dir "%s"', dir);
 *          if (otherDirs) {
 *            otherDirs.forEach(function (oDir) {
 *              console.log('dir "%s"', oDir);
 *            });
 *          }
 *        });
 *
 *      program
 *        .command('*')
 *        .description('deploy the given env')
 *        .action(function(env) {
 *          console.log('deploying "%s"', env);
 *        });
 *
 *      program.parse(process.argv);
  *
 * @param {String} name
 * @param {String} [desc] for git-style sub-commands
 * @return {Command} the new command
 * @api public
 */

Command.prototype.command = function(name, desc, opts) {
  opts = opts || {};
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());

  if (desc) {
    cmd.description(desc);
    this.executables = true;
    this._execs[cmd._name] = true;
    if (opts.isDefault) this.defaultExecutable = cmd._name;
  }

  cmd._noHelp = !!opts.noHelp;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;

  if (desc) return this;
  return cmd;
};

/**
 * Define argument syntax for the top-level command.
 *
 * @api public
 */

Command.prototype.arguments = function (desc) {
  return this.parseExpectedArgs(desc.split(/ +/));
};

/**
 * Add an implicit `help [cmd]` subcommand
 * which invokes `--help` for the given command.
 *
 * @api private
 */

Command.prototype.addImplicitHelpCommand = function() {
  this.command('help [cmd]', 'display help for [cmd]');
};

/**
 * Parse expected `args`.
 *
 * For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parseExpectedArgs = function(args) {
  if (!args.length) return;
  var self = this;
  args.forEach(function(arg) {
    var argDetails = {
      required: false,
      name: '',
      variadic: false
    };

    switch (arg[0]) {
      case '<':
        argDetails.required = true;
        argDetails.name = arg.slice(1, -1);
        break;
      case '[':
        argDetails.name = arg.slice(1, -1);
        break;
    }

    if (argDetails.name.length > 3 && argDetails.name.slice(-3) === '...') {
      argDetails.variadic = true;
      argDetails.name = argDetails.name.slice(0, -3);
    }
    if (argDetails.name) {
      self._args.push(argDetails);
    }
  });
  return this;
};

/**
 * Register callback `fn` for the command.
 *
 * Examples:
 *
 *      program
 *        .command('help')
 *        .description('display verbose help')
 *        .action(function() {
 *           // output help here
 *        });
 *
 * @param {Function} fn
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.action = function(fn) {
  var self = this;
  var listener = function(args, unknown) {
    // Parse any so-far unknown options
    args = args || [];
    unknown = unknown || [];

    var parsed = self.parseOptions(unknown);

    // Output help if necessary
    outputHelpIfNecessary(self, parsed.unknown);

    // If there are still any unknown options, then we simply
    // die, unless someone asked for help, in which case we give it
    // to them, and then we die.
    if (parsed.unknown.length > 0) {
      self.unknownOption(parsed.unknown[0]);
    }

    // Leftover arguments need to be pushed back. Fixes issue #56
    if (parsed.args.length) args = parsed.args.concat(args);

    self._args.forEach(function(arg, i) {
      if (arg.required && null == args[i]) {
        self.missingArgument(arg.name);
      } else if (arg.variadic) {
        if (i !== self._args.length - 1) {
          self.variadicArgNotLast(arg.name);
        }

        args[i] = args.splice(i);
      }
    });

    // Always append ourselves to the end of the arguments,
    // to make sure we match the number of arguments the user
    // expects
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
      args.push(self);
    }

    fn.apply(self, args);
  };
  var parent = this.parent || this;
  var name = parent === this ? '*' : this._name;
  parent.on(name, listener);
  if (this._alias) parent.on(this._alias, listener);
  return this;
};

/**
 * Define option with `flags`, `description` and optional
 * coercion `fn`.
 *
 * The `flags` string should contain both the short and long flags,
 * separated by comma, a pipe or space. The following are all valid
 * all will output this way when `--help` is used.
 *
 *    "-p, --pepper"
 *    "-p|--pepper"
 *    "-p --pepper"
 *
 * Examples:
 *
 *     // simple boolean defaulting to false
 *     program.option('-p, --pepper', 'add pepper');
 *
 *     --pepper
 *     program.pepper
 *     // => Boolean
 *
 *     // simple boolean defaulting to true
 *     program.option('-C, --no-cheese', 'remove cheese');
 *
 *     program.cheese
 *     // => true
 *
 *     --no-cheese
 *     program.cheese
 *     // => false
 *
 *     // required argument
 *     program.option('-C, --chdir <path>', 'change the working directory');
 *
 *     --chdir /tmp
 *     program.chdir
 *     // => "/tmp"
 *
 *     // optional argument
 *     program.option('-c, --cheese [type]', 'add cheese [marble]');
 *
 * @param {String} flags
 * @param {String} description
 * @param {Function|Mixed} fn or default
 * @param {Mixed} defaultValue
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.option = function(flags, description, fn, defaultValue) {
  var self = this
    , option = new Option(flags, description)
    , oname = option.name()
    , name = camelcase(oname);

  // default as 3rd arg
  if (typeof fn != 'function') {
    if (fn instanceof RegExp) {
      var regex = fn;
      fn = function(val, def) {
        var m = regex.exec(val);
        return m ? m[0] : def;
      }
    }
    else {
      defaultValue = fn;
      fn = null;
    }
  }

  // preassign default value only for --no-*, [optional], or <required>
  if (false == option.bool || option.optional || option.required) {
    // when --no-* we make sure default is true
    if (false == option.bool) defaultValue = true;
    // preassign only if we have a default
    if (undefined !== defaultValue) self[name] = defaultValue;
  }

  // register the option
  this.options.push(option);

  // when it's passed assign the value
  // and conditionally invoke the callback
  this.on(oname, function(val) {
    // coercion
    if (null !== val && fn) val = fn(val, undefined === self[name]
      ? defaultValue
      : self[name]);

    // unassigned or bool
    if ('boolean' == typeof self[name] || 'undefined' == typeof self[name]) {
      // if no value, bool true, and we have a default, then use it!
      if (null == val) {
        self[name] = option.bool
          ? defaultValue || true
          : false;
      } else {
        self[name] = val;
      }
    } else if (null !== val) {
      // reassign
      self[name] = val;
    }
  });

  return this;
};

/**
 * Allow unknown options on the command line.
 *
 * @param {Boolean} arg if `true` or omitted, no error will be thrown
 * for unknown options.
 * @api public
 */
Command.prototype.allowUnknownOption = function(arg) {
    this._allowUnknownOption = arguments.length === 0 || arg;
    return this;
};

/**
 * Parse `argv`, settings options and invoking commands when defined.
 *
 * @param {Array} argv
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parse = function(argv) {
  // implicit help
  if (this.executables) this.addImplicitHelpCommand();

  // store raw args
  this.rawArgs = argv;

  // guess name
  this._name = this._name || basename(argv[1], '.js');

  // github-style sub-commands with no sub-command
  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
    // this user needs help
    argv.push('--help');
  }

  // process argv
  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
  var args = this.args = parsed.args;

  var result = this.parseArgs(this.args, parsed.unknown);

  // executable sub-commands
  var name = result.args[0];
  if (this._execs[name] && typeof this._execs[name] != "function") {
    return this.executeSubCommand(argv, args, parsed.unknown);
  } else if (this.defaultExecutable) {
    // use the default subcommand
    args.unshift(name = this.defaultExecutable);
    return this.executeSubCommand(argv, args, parsed.unknown);
  }

  return result;
};

/**
 * Execute a sub-command executable.
 *
 * @param {Array} argv
 * @param {Array} args
 * @param {Array} unknown
 * @api private
 */

Command.prototype.executeSubCommand = function(argv, args, unknown) {
  args = args.concat(unknown);

  if (!args.length) this.help();
  if ('help' == args[0] && 1 == args.length) this.help();

  // <cmd> --help
  if ('help' == args[0]) {
    args[0] = args[1];
    args[1] = '--help';
  }

  // executable
  var f = argv[1];
  // name of the subcommand, link `pm-install`
  var bin = basename(f, '.js') + '-' + args[0];


  // In case of globally installed, get the base dir where executable
  //  subcommand file should be located at
  var baseDir
    , link = readlink(f);

  // when symbolink is relative path
  if (link !== f && link.charAt(0) !== '/') {
    link = path.join(dirname(f), link)
  }
  baseDir = dirname(link);

  // prefer local `./<bin>` to bin in the $PATH
  var localBin = path.join(baseDir, bin);

  // whether bin file is a js script with explicit `.js` extension
  var isExplicitJS = false;
  if (exists(localBin + '.js')) {
    bin = localBin + '.js';
    isExplicitJS = true;
  } else if (exists(localBin)) {
    bin = localBin;
  }

  args = args.slice(1);

  var proc;
  if (process.platform !== 'win32') {
    if (isExplicitJS) {
      args.unshift(localBin);
      // add executable arguments to spawn
      args = (process.execArgv || []).concat(args);

      proc = spawn('node', args, { stdio: 'inherit', customFds: [0, 1, 2] });
    } else {
      proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });
    }
  } else {
    args.unshift(localBin);
    proc = spawn(process.execPath, args, { stdio: 'inherit'});
  }

  proc.on('close', process.exit.bind(process));
  proc.on('error', function(err) {
    if (err.code == "ENOENT") {
      console.error('\n  %s(1) does not exist, try --help\n', bin);
    } else if (err.code == "EACCES") {
      console.error('\n  %s(1) not executable. try chmod or run with root\n', bin);
    }
    process.exit(1);
  });

  // Store the reference to the child process
  this.runningCommand = proc;
};

/**
 * Normalize `args`, splitting joined short flags. For example
 * the arg "-abc" is equivalent to "-a -b -c".
 * This also normalizes equal sign and splits "--abc=def" into "--abc def".
 *
 * @param {Array} args
 * @return {Array}
 * @api private
 */

Command.prototype.normalize = function(args) {
  var ret = []
    , arg
    , lastOpt
    , index;

  for (var i = 0, len = args.length; i < len; ++i) {
    arg = args[i];
    if (i > 0) {
      lastOpt = this.optionFor(args[i-1]);
    }

    if (arg === '--') {
      // Honor option terminator
      ret = ret.concat(args.slice(i));
      break;
    } else if (lastOpt && lastOpt.required) {
      ret.push(arg);
    } else if (arg.length > 1 && '-' == arg[0] && '-' != arg[1]) {
      arg.slice(1).split('').forEach(function(c) {
        ret.push('-' + c);
      });
    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {
      ret.push(arg.slice(0, index), arg.slice(index + 1));
    } else {
      ret.push(arg);
    }
  }

  return ret;
};

/**
 * Parse command `args`.
 *
 * When listener(s) are available those
 * callbacks are invoked, otherwise the "*"
 * event is emitted and those actions are invoked.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api private
 */

Command.prototype.parseArgs = function(args, unknown) {
  var name;

  if (args.length) {
    name = args[0];
    if (this.listeners(name).length) {
      this.emit(args.shift(), args, unknown);
    } else {
      this.emit('*', args);
    }
  } else {
    outputHelpIfNecessary(this, unknown);

    // If there were no args and we have unknown options,
    // then they are extraneous and we need to error.
    if (unknown.length > 0) {
      this.unknownOption(unknown[0]);
    }
  }

  return this;
};

/**
 * Return an option matching `arg` if any.
 *
 * @param {String} arg
 * @return {Option}
 * @api private
 */

Command.prototype.optionFor = function(arg) {
  for (var i = 0, len = this.options.length; i < len; ++i) {
    if (this.options[i].is(arg)) {
      return this.options[i];
    }
  }
};

/**
 * Parse options from `argv` returning `argv`
 * void of these options.
 *
 * @param {Array} argv
 * @return {Array}
 * @api public
 */

Command.prototype.parseOptions = function(argv) {
  var args = []
    , len = argv.length
    , literal
    , option
    , arg;

  var unknownOptions = [];

  // parse options
  for (var i = 0; i < len; ++i) {
    arg = argv[i];

    // literal args after --
    if ('--' == arg) {
      literal = true;
      continue;
    }

    if (literal) {
      args.push(arg);
      continue;
    }

    // find matching Option
    option = this.optionFor(arg);

    // option is defined
    if (option) {
      // requires arg
      if (option.required) {
        arg = argv[++i];
        if (null == arg) return this.optionMissingArgument(option);
        this.emit(option.name(), arg);
      // optional arg
      } else if (option.optional) {
        arg = argv[i+1];
        if (null == arg || ('-' == arg[0] && '-' != arg)) {
          arg = null;
        } else {
          ++i;
        }
        this.emit(option.name(), arg);
      // bool
      } else {
        this.emit(option.name());
      }
      continue;
    }

    // looks like an option
    if (arg.length > 1 && '-' == arg[0]) {
      unknownOptions.push(arg);

      // If the next argument looks like it might be
      // an argument for this option, we pass it on.
      // If it isn't, then it'll simply be ignored
      if (argv[i+1] && '-' != argv[i+1][0]) {
        unknownOptions.push(argv[++i]);
      }
      continue;
    }

    // arg
    args.push(arg);
  }

  return { args: args, unknown: unknownOptions };
};

/**
 * Return an object containing options as key-value pairs
 *
 * @return {Object}
 * @api public
 */
Command.prototype.opts = function() {
  var result = {}
    , len = this.options.length;

  for (var i = 0 ; i < len; i++) {
    var key = camelcase(this.options[i].name());
    result[key] = key === 'version' ? this._version : this[key];
  }
  return result;
};

/**
 * Argument `name` is missing.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.missingArgument = function(name) {
  console.error();
  console.error("  error: missing required argument `%s'", name);
  console.error();
  process.exit(1);
};

/**
 * `Option` is missing an argument, but received `flag` or nothing.
 *
 * @param {String} option
 * @param {String} flag
 * @api private
 */

Command.prototype.optionMissingArgument = function(option, flag) {
  console.error();
  if (flag) {
    console.error("  error: option `%s' argument missing, got `%s'", option.flags, flag);
  } else {
    console.error("  error: option `%s' argument missing", option.flags);
  }
  console.error();
  process.exit(1);
};

/**
 * Unknown option `flag`.
 *
 * @param {String} flag
 * @api private
 */

Command.prototype.unknownOption = function(flag) {
  if (this._allowUnknownOption) return;
  console.error();
  console.error("  error: unknown option `%s'", flag);
  console.error();
  process.exit(1);
};

/**
 * Variadic argument with `name` is not the last argument as required.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.variadicArgNotLast = function(name) {
  console.error();
  console.error("  error: variadic arguments must be last `%s'", name);
  console.error();
  process.exit(1);
};

/**
 * Set the program version to `str`.
 *
 * This method auto-registers the "-V, --version" flag
 * which will print the version number when passed.
 *
 * @param {String} str
 * @param {String} flags
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.version = function(str, flags) {
  if (0 == arguments.length) return this._version;
  this._version = str;
  flags = flags || '-V, --version';
  this.option(flags, 'output the version number');
  this.on('version', function() {
    process.stdout.write(str + '\n');
    process.exit(0);
  });
  return this;
};

/**
 * Set the description to `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.description = function(str) {
  if (0 === arguments.length) return this._description;
  this._description = str;
  return this;
};

/**
 * Set an alias for the command
 *
 * @param {String} alias
 * @return {String|Command}
 * @api public
 */

Command.prototype.alias = function(alias) {
  if (0 == arguments.length) return this._alias;
  this._alias = alias;
  return this;
};

/**
 * Set / get the command usage `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.usage = function(str) {
  var args = this._args.map(function(arg) {
    return humanReadableArgName(arg);
  });

  var usage = '[options]'
    + (this.commands.length ? ' [command]' : '')
    + (this._args.length ? ' ' + args.join(' ') : '');

  if (0 == arguments.length) return this._usage || usage;
  this._usage = str;

  return this;
};

/**
 * Get the name of the command
 *
 * @param {String} name
 * @return {String|Command}
 * @api public
 */

Command.prototype.name = function() {
  return this._name;
};

/**
 * Return the largest option length.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.largestOptionLength = function() {
  return this.options.reduce(function(max, option) {
    return Math.max(max, option.flags.length);
  }, 0);
};

/**
 * Return help for options.
 *
 * @return {String}
 * @api private
 */

Command.prototype.optionHelp = function() {
  var width = this.largestOptionLength();

  // Prepend the help information
  return [pad('-h, --help', width) + '  ' + 'output usage information']
      .concat(this.options.map(function(option) {
        return pad(option.flags, width) + '  ' + option.description;
      }))
      .join('\n');
};

/**
 * Return command help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.commandHelp = function() {
  if (!this.commands.length) return '';

  var commands = this.commands.filter(function(cmd) {
    return !cmd._noHelp;
  }).map(function(cmd) {
    var args = cmd._args.map(function(arg) {
      return humanReadableArgName(arg);
    }).join(' ');

    return [
      cmd._name
        + (cmd._alias ? '|' + cmd._alias : '')
        + (cmd.options.length ? ' [options]' : '')
        + ' ' + args
      , cmd.description()
    ];
  });

  var width = commands.reduce(function(max, command) {
    return Math.max(max, command[0].length);
  }, 0);

  return [
    ''
    , '  Commands:'
    , ''
    , commands.map(function(cmd) {
      var desc = cmd[1] ? '  ' + cmd[1] : '';
      return pad(cmd[0], width) + desc;
    }).join('\n').replace(/^/gm, '    ')
    , ''
  ].join('\n');
};

/**
 * Return program help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.helpInformation = function() {
  var desc = [];
  if (this._description) {
    desc = [
      '  ' + this._description
      , ''
    ];
  }

  var cmdName = this._name;
  if (this._alias) {
    cmdName = cmdName + '|' + this._alias;
  }
  var usage = [
    ''
    ,'  Usage: ' + cmdName + ' ' + this.usage()
    , ''
  ];

  var cmds = [];
  var commandHelp = this.commandHelp();
  if (commandHelp) cmds = [commandHelp];

  var options = [
    '  Options:'
    , ''
    , '' + this.optionHelp().replace(/^/gm, '    ')
    , ''
    , ''
  ];

  return usage
    .concat(cmds)
    .concat(desc)
    .concat(options)
    .join('\n');
};

/**
 * Output help information for this command
 *
 * @api public
 */

Command.prototype.outputHelp = function(cb) {
  if (!cb) {
    cb = function(passthru) {
      return passthru;
    }
  }
  process.stdout.write(cb(this.helpInformation()));
  this.emit('--help');
};

/**
 * Output help information and exit.
 *
 * @api public
 */

Command.prototype.help = function(cb) {
  this.outputHelp(cb);
  process.exit();
};

/**
 * Camel-case the given `flag`
 *
 * @param {String} flag
 * @return {String}
 * @api private
 */

function camelcase(flag) {
  return flag.split('-').reduce(function(str, word) {
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

/**
 * Pad `str` to `width`.
 *
 * @param {String} str
 * @param {Number} width
 * @return {String}
 * @api private
 */

function pad(str, width) {
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
}

/**
 * Output help information if necessary
 *
 * @param {Command} command to output help for
 * @param {Array} array of options to search for -h or --help
 * @api private
 */

function outputHelpIfNecessary(cmd, options) {
  options = options || [];
  for (var i = 0; i < options.length; i++) {
    if (options[i] == '--help' || options[i] == '-h') {
      cmd.outputHelp();
      process.exit(0);
    }
  }
}

/**
 * Takes an argument an returns its human readable equivalent for help usage.
 *
 * @param {Object} arg
 * @return {String}
 * @api private
 */

function humanReadableArgName(arg) {
  var nameOutput = arg.name + (arg.variadic === true ? '...' : '');

  return arg.required
    ? '<' + nameOutput + '>'
    : '[' + nameOutput + ']'
}

// for versions before node v0.8 when there weren't `fs.existsSync`
function exists(file) {
  try {
    if (fs.statSync(file).isFile()) {
      return true;
    }
  } catch (e) {
    return false;
  }
}



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(0)
  , lstat = fs.lstatSync;

exports.readlinkSync = function (p) {
  if (lstat(p).isSymbolicLink()) {
    return fs.readlinkSync(p);
  } else {
    return p;
  }
};




/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
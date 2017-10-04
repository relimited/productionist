!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/static/",t(t.s=8)}([function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(4),l=function(e){return e&&e.__esModule?e:{default:e}}(a),u=function(){function e(t){i(this,e),this.nonterminalSymbols=null,this.idToTag=null,this.initParseJsonGrammarSpecification(t),this.startSymbol=this.nonterminalSymbols.filter(function(e){return e.startSymbol}).next(),this.nonterminalSymbols=this.nonterminalSymbols.sort(function(e,t){return e.id<t.id?-1:e.id>t.id?1:0}),this.initGroundSymbolReferencesInAllProductionRuleBodies(),this.productionRules=[];var n=!0,o=!1,a=void 0;try{for(var l,u=this.nonterminalSymbols[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var s=l.value;this.productionRules.push(s.productionRules)}}catch(e){o=!0,a=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw a}}this.productionRules.sort(function(e,t){return e.id<t.id?-1:e.id>t.id?1:0}),this.terminalSymbols=[];var c=!0,f=!1,d=void 0;try{for(var h,y=this.productionRules[Symbol.iterator]();!(c=(h=y.next()).done);c=!0){var v=h.value,m=!0,p=!1,g=void 0;try{for(var b,S=v.body[Symbol.iterator]();!(m=(b=S.next()).done);m=!0){var x=b.value;x instanceof String&&!this.terminalSymbols.includes(x)&&this.terminalSymbols.append(x)}}catch(e){p=!0,g=e}finally{try{!m&&S.return&&S.return()}finally{if(p)throw g}}}}catch(e){f=!0,d=e}finally{try{!c&&y.return&&y.return()}finally{if(f)throw d}}var w=!0,P=!1,k=void 0;try{for(var M,E=this.productionRules[Symbol.iterator]();!(w=(M=E.next()).done);w=!0){M.value.compileTags()}}catch(e){P=!0,k=e}finally{try{!w&&E.return&&E.return()}finally{if(P)throw k}}this.tags=new Set;var R=!0,T=!1,_=void 0;try{for(var O,j=this.nonterminalSymbols[Symbol.iterator]();!(R=(O=j.next()).done);R=!0){var C=O.value;this.tags=new Set([].concat(r(this.tags),r(new Set(C.tags))))}}catch(e){T=!0,_=e}finally{try{!R&&j.return&&j.return()}finally{if(T)throw _}}this.unequalRuleFrequencies=this.productionRules.some(function(e,t,n){return e.applicationFrequency===n[0].applicationFrequency}),this.initValidateGrammar()}return o(e,[{key:"initParseJsonGrammarSpecification",value:function(e){this.idToTag=e.id_to_tag;var t=[],n=e.nonterminal_symbols;for(var r in n){var i=n[r];t.append(new l.default(Number(r),i.name,i.tags,i.production_rules,i.expannsions_are_complete_outputs,i.is_start_symbol,i.is_semantically_meaningful))}this.nonterminalSymbols=t}},{key:"initGroundSymbolReferencesInAllProductionRuleBodies",value:function(){var e=!0,t=!1,n=void 0;try{for(var r,i=this.nonterminalSymbols[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value,a=!0,l=!1,u=void 0;try{for(var s,c=o.productionRules[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var f=s.value;this.initGroundSymbolReferencesInARleBody(f)}}catch(e){l=!0,u=e}finally{try{!a&&c.return&&c.return()}finally{if(l)throw u}}}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}}},{key:"initGroundSymbolReferencesInARuleBody",value:function(e){var t=e.bodySpecification,n=[],r=!0,i=!1,o=void 0;try{for(var a,l=t[Symbol.iterator]();!(r=(a=l.next()).done);r=!0){var u=a.value;u instanceof Number?n.append(this.nonterminalSymbols[u]):n.append(u),e.body=n}}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}}},{key:"initValidateGrammar",value:function(){var e=this.nonterminalSymbols.filter(function(e){return void 0!==e.startSymbol});if(!(e.length>0))throw new Error("This grammar has no start symbols; there ust be exactly one.");if(1!==e.length)throw new Error("This grammar has multiple start symbols; there must be exactly one.")}}]),e}();t.default=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),l=r(a),u=n(3),s=r(u),c=n(2),f=r(c),d=n(5),h=r(d),y=function(){function e(t,n,r,o,a,l){i(this,e),this.contentBundle=t,this.verbosity=l,this.terseMode=a,this.remainingPath=[],this.explicitPathTaken=[],this.targetingMeaning=!0,this.probabilisticMode=r,this.reptitionPenaltyMode=o,n.endsWidth("/")&&(n=n.substring(0,n.length-2)),this.grammarFileLocation=n}return o(e,[{key:"finalizeProductionist",value:function(){var e=this;return this.loadGrammar(this.grammarFileLocation+"/"+this.contentBundleName+".grammar").then(function(t){return e.grammar=t,e.loadTrie(e.grammarFileLocation+"/"+e.contentBundleName+".marisa")}).catch(function(){return e.trie=null,e.loadExpressibleMeanings(e.grammarFileLocation+"/"+e.contentBundleName+".meanings")}).then(function(t){if(e.expressibleMeanigns=t,e.reptitionPenaltyMode);}).then(function(t){if(void 0===t)if(e.reptitionPenaltyMode){e.repetitionPenalties={};var n=e.grammar.nonterminalSymbols.concat(e.grammar.terminalSymbols),r=!0,i=!1,o=void 0;try{for(var a,l=n[Symbol.iterator]();!(r=(a=l.next()).done);r=!0){var u=a.value;e.repetitionsPenalties[u.toString()]=1}}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}e.verbosity>0&&console.log("Initializing new repetitions dictionary...")}else e.repetitionPenalties={};else e.repetitionPenalties=t,e.verbosity>0&&console.log("Loading repetitions file...")},function(){e.repetitionPenalties={};var t=e.grammar.nonterminalSymbols.concat(e.grammar.terminalSymbols),n=!0,r=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var l=o.value;e.repetitionsPenalties[l.toString()]=1}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}e.verbosity>0&&console.log("Cound not load repetitions dictionary -- initializing new one...")}).then(function(){return e.finalized=!0,e})}},{key:"loadGrammar",value:function(e){return this.verbosity>0&&console.log("Loading grammar..."),s.default.loadGrammar(e).then(function(e){return new l.default(e)})}},{key:"loadTrie",value:function(e){return this.verbosity>0&&console.log("Loading trie..."),Promise.reject(new Error("Trie files are currently not supported, skipping Trie load."))}},{key:"loadExpressibleMeanings",value:function(e){var t=this;this.verbosity>0&&console.log("Loading expressible meanings...");var n=[],r=this.grammar.idToTag;return s.default.loadExpressiblemeanings(e).then(function(e){var i=!0,o=!1,a=void 0;try{for(var l,u=e[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var s=l.value,c=s[0],d=s[1],h=s[2],y=[];if(t.trie)return Promise.reject(new Error("This port currently does not suport Trie files, unable to create recipes."));for(var v in d.split("|"))y.append(v.split(",").map(function(e){return Number(e)}));var m=new Set,p=!0,g=!1,b=void 0;try{for(var S,x=h.split(",")[Symbol.iterator]();!(p=(S=x.next()).done);p=!0){var w=S.value;m.add(r[w])}}catch(e){g=!0,b=e}finally{try{!p&&x.return&&x.return()}finally{if(g)throw b}}n.push(new f.default(Number(c),m,y))}}catch(e){o=!0,a=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw a}}return n.sort(function(e,t){return e.id<t.id?-1:e.id>t.id?1:0}),n})}},{key:"saveRepetitionPenaltiesFile",value:function(){return Promise.reject(new Error("saveRepeitionPenalitiesFile is unimplemented"))}},{key:"furnishExampleTerminalExpansionOfNonterminalSymbol",value:function(e){if(!this.grammar.nonterminalSymbols.some(function(t){return t.name===e}))throw new Error("Error: There is no nonterminal symbol in "+this.contentBundle+".grammar with the name "+e);this.targetingMeaning=!1;var t=this.grammar.nonterminalSymbols.map(function(t){return t.name===e})[0],n=this.terminallyExpandNonterminalSymbol(t,0),r=this.buildContentPackage(t,n);return this.targetingMeaning=!0,r}},{key:"furnishExampleTerminalResultOfExecutingProductionRule",value:function(e){if(!this.grammar.productionRules.some(function(t){return t.toString()===e}))throw new Error("Error: There is no production rule in "+this.contentBundle+".grammar with the definition "+e);this.targetingMeaning=!1;var t=this.grammar.productionRules.filter(function(t){return t.toString()===e}).next(),n=this.executeProductionRule(t,0),r=this.buildContnetPackage(t.head,n);return this.targetingMeaning=!0,r}},{key:"fulfillContentRequest",value:function(e){var t=this.compileSatisficingExpressibleMeanings(e);if(void 0===t)throw new Error("Error: The submitted content request cannont be fulfilled by using this grammar.");var n=this.selectExpressibleMeaning(t,e.scoringMetric),r=this.selectRecipeForExpressibleMeaning(n),i=this.followRecipe(r);return this.buildContentPackage(i,null,null,e)}},{key:"buildContentPackage",value:function(e,t,n,r){var i=new Set,o=!0,a=!1,l=void 0;try{for(var u,s=this.explicitPathTaken[Symbol.iterator]();!(o=(u=s.next()).done);o=!0){var c=u.value,f=new Set(c.tags),d=!0,y=!1,v=void 0;try{for(var m,p=f[Symbol.iterator]();!(d=(m=p.next()).done);d=!0){var g=m.value;i.add(g)}}catch(e){y=!0,v=e}finally{try{!d&&p.return&&p.return()}finally{if(y)throw v}}}}catch(e){a=!0,l=e}finally{try{!o&&s.return&&s.return()}finally{if(a)throw l}}var b=this.explicitPathTaken,S=void 0;S=t?this.produceBracketedExpression(t):this.produceBracketedExpression();var x=new h.default(e,i,n,b,S);if(this.reptitionPenaltyMode&&this.updateRepritionPenalties(b),r){if(!(!(x.tags&r.mustNotHave)&&x.tags.issuperset(r.mustHave)))throw new Error("The generated content unit does not satisfy the content request.")}return x}},{key:"compileSatisficingExpressibleMeanings",value:function(e){return this.expressibleMeanings.map(function(t){return!(t.tags&e.mustNotHave)&&t.tags.issuperset(e.mustHave)})}},{key:"selectExpressibleMeaning",value:function(e,t){this.verbsoity>0&&console.log("Selecting Expressible Meaning...");var n=void 0;if(e.length>1)n=e[0];else if(t){if(this.verbosity>0){console.log("Scoring Expressible Meanings...");var r={},i=!0,o=!1,a=void 0;try{for(var l,u=e[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var s=l.value;r[s.toString()]=this.scoreExpressibleMeaning(s,t)}}catch(e){o=!0,a=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw a}}var c=Object.keys(r).map(function(e){return r[e]});if(c){var f=this.fitProbabilityDistributionToDecisionCandidates(r);n=this.selectCandidateGivenProbabilityDistribution(f)}else n=e[Math.floor(Math.random()*e.length)];if(this.verbosity>1){console.log("Derived the following scores for expressible meanings:");for(var d in r)console.log("\tEM"+d.id+"\t"+r[d])}}}else n=e[Math.floor(Math.random()*e.length)];return n}},{key:"selectRecipeForExpressibleMeaning",value:function(e){this.verbosity>0&&(1===e.recipes.length?console.log("Selecting EM "+this.expressibleMeanings.indexOf(e)+"'s sole recipe...'"):console.log("Selecting one of EM"+this.expressibleMeanings.indexOf(e)+"'s "+e.recipes.length+" recipes...'"));var t=e.recipes,n=void 0;if(1===t.length)n=t[0];else if(this.scoringModesEngaged){var r={},i=!0,o=!1,a=void 0;try{for(var l,u=t[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var s=l.value;r[s]=this.scoreCandidateRecipe(s)}}catch(e){o=!0,a=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw a}}var c=Object.keys(r).map(function(e){return r[e]});if(c){var f=this.fitProbabilityDistributionToDecisionCandidates(r);n=this.selectCandidateGivenProbabilityDistribution(f)}else n=t[Math.floor(Math.random()*t.length)]}else n=t[Math.floor(Math.random()*t.length)];return n}},{key:"scoreCandidateRecipe",value:function(e){var t=this;return e.path.map(function(e){return t.grammar.productionRules[e]}).reduce(function(e,n){return t.scoreCandidateProductionRule(e)+t.scoreCandidateProductionRule(n)},0)}},{key:"scoreCandidateProductionRule",value:function(e){var t=1,n=!0,r=!1,i=void 0;try{for(var o,a=e.body[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var l=o.value;this.reptitionPenaltyMode&&(t*=this.reptitionPenalties[l.toString()]),this.terseMode?l instanceof String&&(t/=l.length):t/=2}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}return t*=e.frequencyScoreMultiplier}},{key:"followRecipe",value:function(e){var t=this,n=e.path.map(function(e){return t.grammar.productionRules[e]});return this.remainingPath=n,this.explicitPathTaken=[],this.terminallyExpandNonterminalSymbol(this.grammar.startSymbol,0)}},{key:"terminallyExpandNonterminalSymbol",value:function(e,t){var n=new Array(t).join("  ");this.verbosity>1&&console.log(n+"Expanding nonterminal symbol [["+e.name+"]]...");var r=void 0;return this.remainingPath&&e.productionRules.includes(this.remainingPath[0])?r=this.remainingPath.splice(0,1)[0]:(this.verbosity>1&&console.log(n+"Selecting wildcard rule..."),r=this.selectWildcardProductionRule(e)),this.executeProductionRule(r,t+1)}},{key:"selectWildcardProductionRule",value:function(e){var t=[],n=void 0;if(this.targetingMeaning){var r=!0,i=!1,o=void 0;try{for(var a,l=e.productionRules[Symbol.iterator]();!(r=(a=l.next()).done);r=!0){var u=a.value;u.semanticallyMeaningful||t.push(u)}}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}}else t=e.productionRules;if(1===t.length)n=t[0];else if(this.scoringModesEngaged){var s={};for(var c in t)s[c]=this.scoreCandidateProductionRule(c);var f=Object.keys(s).map(function(e){return s[e]});f||(n=t[Math.floor(Math.random()*t.length)])}else if(0===t.length)throw new Error("AuthoringError: THe nonterminal symbol "+e.name+"\n           has no available wildcard rules, which means it cannont be expanded.");return n}},{key:"executeProductionRule",value:function(e,t){var n=new Array(t).join("  ");this.verbosity>1&&console.log(n+"Using production rule #"+e.id+": '"+e.toString()+"'"),this.explictPathTaken.push(e);var r=[];for(var i in e.body)i instanceof String?r.push(i):r.push(this.terminallyExpandNonterminalSymbol(i,t+1));return r.join("")}},{key:"produceBracketedExpression",value:function(e){return void 0!==e&&null!==e||(e=this.grammar.startSymbol),this.expandNonterminalSymbolToProduceBracketedExpressionFragment(e)}},{key:"expandNonterminalSymbolToProduceBracketedExpressionFragment",value:function(e){if(this.explicitPathTaken.length>0){var t=this.explicitPathTaken.splice(0,1)[0];if(!e.productionRules.includes(t))throw new Error("Error: Expected rule #"+t.id+" to be a production rule of the symbol "+e.name);return this.executeProductionRuleToProduceBracketedExpressionFragment(t)}var n=e.tags.map(function(e){return e});return e.name+"<"+n.join(", ")+">[[["+e.name+"]]]"}},{key:"executeProductionRuleToProduceBracketedExpressionFragment",value:function(e){var t=[],n=!0,r=!1,i=void 0;try{for(var o,a=e.body[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var l=o.value;l instanceof String?t.push('"'+l.toString()+'"'):t.push(this.expandNonterminalSymbolToProduceBracketedExpressionFragment(l))}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}var u=e.head.tags?e.head.tags.map(function(e){return e}).join(", "):"";return e.head.name+" <"+u+">["+t.join(" + ")+"]"}},{key:"updateRepetitionPenalties",value:function(e){var t=new Set,n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var l=o.value,u=!0,s=!1,c=void 0;try{for(var f,d=l.body[Symbol.iterator]();!(u=(f=d.next()).done);u=!0){var h=f.value;t.add(h)}}catch(e){s=!0,c=e}finally{try{!u&&d.return&&d.return()}finally{if(s)throw c}}}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}var y=this.grammar.nonterminalSymbols.concat(this.grammar.terminalSymbols),v=!0,m=!1,p=void 0;try{for(var g,b=y[Symbol.iterator]();!(v=(g=b.next()).done);v=!0){var S=g.value;t.includes(S)?this.repetitionPenalties[S.toString()]*=.033:this.repetitionPenalties[S.toString()]*=1.2,this.repetitionPenalties[S.toString()]=Math.min(1,this.reptitionPenalties[S.toString()])}}catch(e){m=!0,p=e}finally{try{!v&&b.return&&b.return()}finally{if(m)throw p}}}},{key:"selectCandidateGivenProbabilityDistribution",value:function(e){var t=void 0;if(this.probabilisticMode){var n=Math.random();for(var r in e)if(e.hasOwnProperty(r)&&e[r][0]<=n&&n<=e[r][1]){t=n;break}}else{for(var i in e)e.hasOwnProperty(i)&&e[i][1]-e[i][0]>0&&(t=i)}return t}},{key:"scoringModesEngated",get:function(){return this.repetitionPenaltyMode||this.terseMode||this.grammar.unequalRuleFrequencies}}],[{key:"scoreExpressibleMeaning",value:function(e,t){var n=0,r=!0,i=!1,o=void 0;try{for(var a,l=t[Symbol.iterator]();!(r=(a=l.next()).done);r=!0){var u=a.value,s=u[0],c=u[1];e.tags.includes(s)&&(n+=c)}}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}return n}},{key:"fitProbabilityDistributionToDecisionCandidates",value:function(e){var t=Object.keys(e),n={},r=Object.keys(e).map(function(t){return e[t]}).reduce(function(e,t){return e+t});for(var i in t)n[i]=e[i]/r;var o={},a=0,l=!0,u=!1,s=void 0;try{for(var c,f=t[Symbol.iterator]();!(l=(c=f.next()).done);l=!0){var d=c.value;o[d]=[a,a+n[d]],a+=n[d]}}catch(e){u=!0,s=e}finally{try{!l&&f.return&&f.return()}finally{if(u)throw s}}var h=t[t.length-1];return o[h]=[o[h][0],1],o}}]),e}();t.default=y},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(7),a=function(e){return e&&e.__esModule?e:{default:e}}(o),l=function(){function e(t,n,i){r(this,e),this.id=t,this.tags=n,this.recipes=this.initBuildRecipes(i)}return i(e,[{key:"toString",value:function(){return"An expressible meaning associated with the following tags: ".concat(this.tags.join(", "))}},{key:"initBuildRecipes",value:function(e){var t=this,n=e.map(function(e,n,r){return new a.default(n,t,e)});return n.sort(function(e,t){return e.id<t.id?-1:e.id>t.id?1:0}),n}}]),e}();t.default=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(!function(){var e=new Error('Cannot find module "fs"');throw e.code="MODULE_NOT_FOUND",e}()),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(o),l=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),s=function(){function e(){r(this,e)}return i(e,null,[{key:"loadGrammar",value:function(e){return new Promise(function(t,n){var r={};try{a.readFile(e,function(e,n){if(e)throw e;r=JSON.parse(n),t(new u.default(r))})}catch(t){n("Cannot load grammar -- there is no grammar file located at "+e)}})}}]),e}();t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(6),a=function(e){return e&&e.__esModule?e:{default:e}}(o),l=function(){function e(t,n,i,o,a,l,u){r(this,e),this.id=t,this.name=n,this.tags=i,this.productionRules=this.initReifyProductionRules(o),this.initSetRuleFrequencyScoreMultipliers(),this.expansionsAreCompeteOutputs=a,this.startSymbol=l,this.semanticallyMeaningful=u}return i(e,[{key:"toString",value:function(){return"[["+this.name+"]]"}},{key:"initReifyProductionRules",value:function(e){var t=[];if(void 0!==e){var n=!0,r=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var u=o.value;t.push(new a.default(u.id,this,u.body,u.application_frequency,u.is_semantically_meaningful))}}catch(e){r=!0,i=e}finally{try{!n&&l.return&&l.return()}finally{if(r)throw i}}}return t}},{key:"initSetRuleFrequencyScoreMultipliers",value:function(){if(void 0!==this.productionRules&&this.productionRules.length>0){var e=Math.max(this.productionRules.map(function(e){return e.applicationFrequency})),t=!0,n=!1,r=void 0;try{for(var i,o=this.productionRules[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var a=i.value;a.frequencyScoreMultiplier=a.applicationFrequency/e}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}}}}]),e}();t.default=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t,n,i,o,a){r(this,e),this.text=t,this.tags=n,this.recipe=i,this.explicitGrammarPathTaken=o,this.bracketedExpression=a,this.treeExpression=this.constructTreeExpression(!0),this.treeExpressionWithTags=this.constructTreeExpression(!1)}return i(e,[{key:"toString",value:function(){return this.text}},{key:"constructTreeExpression",value:function(e){var t=this.bracketedExpression;e&&(t=t.replace(/ <.+?>/,""));var n="",r=0,i=!0,o=!1,a=void 0;try{for(var l,u=t[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var s=l.value;if("[]+".includes(s)&&("["===s?r+=4:"]"===s?r-=4:r=0),"[+".includes(s)){var c=Array(r+1).join(" ");n=n.concat("\n",c)}else{if("]"===s)continue;n=n.concat(s)}}}catch(e){o=!0,a=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw a}}return n}}]),e}();t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t,n,i,o,a){r(this,e),this.id=t,this.head=n,this.bodySpecification=i,this.applicationFrequency=o,this.semanticallyMeaningful=a,this.body=null,this.frequencyScoreMultiplier=null,this.tags=[]}return i(e,[{key:"toString",value:function(){var e="",t=!0,n=!1,r=void 0;try{for(var i,o=this.body[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var a=i.value;e=a instanceof String?e.concat(a):e.concat("[["+a.name+"]]")}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}return this.head+" --\x3e "+e}},{key:"compileTags",value:function(){var e=!0,t=!1,n=void 0;try{for(var r,i=this.body[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value;if(!(o instanceof String)){var a=!0,l=!1,u=void 0;try{for(var s,c=o.tags[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var f=s.value;this.tags.includes(f)||this.tags.append(f)}}catch(e){l=!0,u=e}finally{try{!a&&c.return&&c.return()}finally{if(l)throw u}}}}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}}}]),e}();t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t,n,i){r(this,e),this.id=t,this.expressibleMeaning=n,this.name=n.id+"-"+this.id,this.path=i}return i(e,[{key:"toString",value:function(){return"Recipe "+this.name}}]),e}();t.default=o},function(e,t,n){e.exports=n(1)}]);
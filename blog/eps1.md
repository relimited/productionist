# Porting Libraries To New Languages
## Productionist JavaScript Port Eps 1: Design & Environment Setup
### Learning is a Thing You Do

Hello!  Welcome to another project in this here side-project blog.  Like many projects here, I was going to a bar when I ran into the amazing James Ryan ([Twitter](https://twitter.com/xfoml), [github](http://github.com/james-owen-ryan)). He's got a really cool grammar engine (language?  I'm vague on the details) called Expressionist, which has lots of submodules that follow the -ist naming convention.  James would like to release the Expressionist library (framework?) in a bunch of different languages.

Here's a weird fact about me: I love code translation work.  I don't have a good reason why.  It's a fairly straight-forward task, with easy constraints (make X do what it already does, but it's written in C now).  There are not many design decisions to get hung up on.  You learn a little bit about the people whose code you're translating.

Anyway, it had been a while since I translated something, and was itching to get back to it.  Thus, writing Productionist in JavaScript was born!  I've translated other code to JavaScript before (primarily C# Unity libraries), and am familiar with Python, so it seems like a good fit.

### Project Metadata
1. Background Knowledge: Medium-Advanced
  * Most of this project's background knowledge is application-focused, not theoretical.  I'll be referencing a lot of Libraries offhand, and use some high-level descriptions of what they do. I am setting up an ES6 development stack for both node and browser JavaScript, so get ready
  * Most of that is setting up a development environment for JavaScript, when writing code you want to be used by lots of people
2. Domain: Building a library for lots of other people to use, so we're leaning towards enterprise practice
  * This means writing unit tests, good comment practice, writing good error catching code, assert statements

### Step 1: Software Design

Sure, code translation doesn't have a lot of design considerations.  Make the new code work as exactly like the old code as you can.  But, it still makes sense to think about what the old code was being used for, how it's currently being used, and what that might mean for applications written in the new code.  Don't just rewrite code because it's fun---spend some time thinking about _why_ you want the code in this new language, and how it might be used in this new language.  Which I guess means I should talk a little bit about what Productionist does.

From the original author, Productionist works over some files that describe how an Expressionist grammar expands.  At runtime, other code makes requests to Productionist for bits of content, with the set of tags they want content to have, the set of tags that don't want content to have, and some scoring metrics for figuring out how to think about all other tags.  Productionist spits back content, which is almost always text.

Scanning the README of [the Python project](https://github.com/james-owen-ryan/productionist), we get some other info.  The current way to use the Python code is on the command line, and furthermore, it looks like there is a lot of file I/O.  There's the first pot hole: JavaScript <airquote> normally </airquote> runs in the browser. Web browsers are very much not allowed to access the file system for security and sanity reasons.  In addition, CLIs don't really make sense inside of a browser, as web browsers aren't terminals.

BUT there is server-side JavaScript in [Node.js](http://nodejs.org/).  Node will give us a way to write JS code that has a CLI, and can operate on the file system.  Furthermore, we'll be able to publish our code on npm, which will make it easier for other people to pull down and use the library.  Great.

BUT it's not entirely beyond the pale to think about universes where people will want to use Productionist in the browser.  Using it alongside, say the [Phaser](http://phaser.io/) game engine or [P5.js](https://p5js.org/) for generative art would need a version that runs in browser.  Luckily, [webpack](https://webpack.js.org/) can take Node code and package it to run on the browser, so we only need to maintain one codebase  Unluckily, you can't really escape the 'browsers-can't-access-the-file-system' problem or the 'but-how-would-you-even-run-this-in-a-browser' problem, so there might need some extensions for full browser support.

In summary, we have two (well, we're gonna show a surprise, so its three) 'targets' we want our code to work in:
1. Node.js with a CLI
2. Node.js API server
  * This is the surprise option.  But, it's a pretty easy use-case to think about Productionist working like a service.  Making queries to a seperate server is pretty common in web-dev.
3. In-Browser Library
  * There isn't any file I/O here, however the way the library is called is probably very similar to an API server

So, we have two 'targets' (nodejs and normal browser JavaScript) and two ways for people to use the code (CLI and API).  That's enough to get going, but lets look at just a few more things.

#### Step 1.5, how deep into ES6 do we want to go?

At the time of writing, JavaScript just got a huge overhaul in ES6, which adds a ton of really awesome language features.  I like them a lot.  However, both node and browsers don't support ES6 on their own, which means we need to worry about extra setup.  I think ES6 features are powerful and useful enough to be worth setting up the extra stuff.  I will not go whole hog on the JavaScript development stack (I don't need Flow annotations or typescript or anything like that), but to use ES6 features I am going to go kinda deep.

### Step 2: Set up a JavaScript Environment

This is always the silly thing about JavaScript.  Setting up everything you need and getting it talking to other stuff is a pain, and you should always be ready for this to take _far_ longer than it reasonably should.  We have two big considerations for setting up our environment:
1. Code needs to Just Work (tm), so spending extra time on setting up good tests (and tests that run every time we try to commit code) is worth it.
2. We're using some ES6 features (and if you're gonna use some of them, you might as well use them all).  Browser and Node.js don't support all of them yet, so we need to transpile our ES6 code to  ES2015 first.

#### 2.0 Stuff I have on hand:
I already have, installed, node.js and yarn (a package manager for node.js, and really JavaScript as a whole these days).  Using basic ```yarn init``` script, we can generate our ```package.json``` file and get going.

#### 2.1 Babel
Babel is what I'll use to convert ES6 code into ES2015 code.  I love me some arrow functions and import/export statements (the OO syntactic sugar is pretty meh, but I might as well use all of it).  Lets go.
```
yarn add babel-cli --dev
```
And lets integrate babel, inside of ```package.json```
```JavaScript
{
  ...
  "scripts":
  {
    "start": "babel-node src"
  }
}
```
(We've already added in other information, such as ```productionist.js``` being the root rather than ```index.js```). Babel has a lot of potential configurations, but I'd rather not deal with any of them.  I installed a fairly standard config:
```
yarn add --dev babel-config-env
```
And then configured babel to use it, which means creating a ```babelrc``` file which looks like so:
```JavaScript
{
  "presets": [
    "env"
  ]
}
```
That's enough babel for now.  I made some stupid ES6 classes to make sure things were transpilin'  They were.  It was sick, you should have been there.
#### 2.2 eslint
ESLint is a way to check for code accuracy.  Think of it as a program that checks to make sure you don't have a stupid syntax error or anything.  Mostly, this is useful for my text editor of choice, so I can get alerted when I import a module I never actually use, forget a closed paren or other mistakes.  Like a lot of other things, eslint is stupid configurable, and I'm lazy.  I used to use the Airbnb configuration, but found it to be _very restrictive_ and yelling at me for too many things (fuck you, strings can have double quotes, Airbnb).  I don't like to be yelled at.

I currently like the configuration that comes with the ```build-react-app``` package, and they're kind enough to have their eslint configuration as a separate package.  So, back to yarn commands:
```
yarn add eslint-config-react-app --dev
```
You can see here, I'm very careful with where I throw my command line flags.  Very, cery careful.  Hush.

eslint, like everything else forever, ALSO has it's own config file ```eslintrc``` lets do the stunt, shall we?
```JavaScript
{
  "extends": "react-app"
}
```
I won't go into configuring your text editor to use eslint, because I'm not cool and I don't use sublime text and I don't want people to make fun of me.  Ahem.  As we want this code to Just Work (tm) and we're playing around with experimental features, I'm gonna add a plugin to eslint, compat.  Compat uses some other tech to check to make sure that we're not going to deep in the experimental JavaScript hole, and that most browsers can run the code we're slinging.
```
yarn add --dev eslint-plugin-compat
```
And back to configuring eslint, so the .eslintrc file now looks like:
```JavaScript
{
  "extends": "react-app",
  "plugins": ["compat"]
}
```
And back to ```package.json``` to configure the compat plugin:
```JavaScript
{
  ...
  "browserslist": ["> 1%"],
}
```
Essentially, we want to use features that are supported by browsers that have more than 1% of the market share.  That should cover us for almost all users.  People still using Lynx are on their own.  ALMOST done with eslint configurting.  While we're dicking around in ```package.json``` lets add a script to run test cases:
```JavaScript
"scripts": {
  ...
  "test": "eslint src"
},
```
Yes, this checks files my text editor was already checking, but this'll form the core of my test suite, which we'll want, because again, we want this code to Just Work (TM).  Two down, several more to go!

#### 2.3 Jest
For testing, I'm using Jest.  I've had some problems with Jest in the past (mainly, how it's eaten my ```console.log()``` statements) but I'm using this project as an excuse to take another crack with it.  So, lets do the yarn thing.
```
yarn add --dev jest babel-jest
```
Lets tell eslint that I have jest installed so it won't throw a hissy fit when I want to use jest's test functions, so in ```.eslintrc.json```.
```JavaScript
...
"env": {
  "jest": true
}
```
Now to actually use it, in ```package.json```:
```JavaScript
"scripts": {
  ...
  "test": "eslint src && jest --coverage"
},
```
Now, typing ```yarn test``` in the root directory will have eslint check files for silly mistakes, then run our tests, keeping an eye towards making sure that we're testing everything.  Made a dopey test file to test my dopey current code, and it do!  Great.  Next!

#### 2.4 GitHooks and Husky
The thing about testing code is that you have to remember to do it.  I'm not super good at that.  So, I want to ensure that code gets tested, and that only tested code gets pushed back up to github.  To do that, i'm gonna use Husky to setup _hooks_ into my git merges, pushes and pulls.  You know the drill by now:
```
yarn add --dev Husky
```
And now in the ```package.json``` file:
```JavaScript
"scripts": {
  ...
  "precommit": "yarn test"
  "prepush": "yarn test"
},
```

#### 2.5 Webpack
Now for the hard part.  Webpack is a great way to merge the various source files we have into one, single file (useful for importing).  However, we want three different things to come out of webpack: a file that provides a cli, a file that we can import into nodejs projects and a file that we can import into the browser.

# Porting Libraries To New Languages
## Productionist JavaScript Port Eps 1: Design & Environment Setup
### Learning is a Thing You Do

Hello!  Welcome to another project in this here side-project blog.  I was going to a bar when I ran into the amazing James Ryan ([Twitter](https://twitter.com/xfoml), [github](http://github.com/james-owen-ryan)). He's got a really cool grammar engine called Expressionist, which has lots of submodules that follow the -ist naming convention.  James would like to release the Expressionist library (framework?) in a bunch of different languages.

Expressionist is cool because it lets people tag various symbols, and then you can ask for grammar productions that contain certain symbols (or definitely don't have certain symbols).  I believe Expressionist has shown promise as a dialogue engine for games, but it could also be useful for various generative art projects.  Considering that JavaScript is the language of choice for things that are going to be on the web, this seems like a port that makes sense.

Here's a weird fact about me: I love code translation work.  I don't have a good reason why.  It's a fairly straight-forward task, with easy constraints (make X do what it already does, but it's written in C now).  There are not many design decisions to get hung up on.  You learn a little bit about the people whose code you're translating.

Anyway, it had been a while since I translated something, and was itching to get back to it.  Thus, writing Productionist in JavaScript was born!  I've translated other code to JavaScript before (primarily C# Unity libraries), and am familiar with Python, so it seems like a good fit.

### Project Metadata
1. Background Knowledge: Medium-Advanced
  * Most of this project's background knowledge is application-focused, not theoretical.  I'll be referencing a lot of libraries offhand, and use some high-level descriptions of what they do. I am setting up an ES6 development stack for both node and browser JavaScript, so get ready
  * Setting up a development environment for JavaScript is important for this project as a lot of people may potentially use this library (a whole ten people, maybe!)
2. Domain: Building a library for lots of other people to use, so we're leaning towards enterprise practices
  * This means writing unit tests, good comment practice, writing good error catching code, assert statements, etc.  I'm gonna sacrifice some rapid feedback for correctness

### Step 1: Software Design

Sure, code translation doesn't have a lot of design considerations.  Make the new code work as exactly like the old code.  But, it still makes sense to think about what the code is being used for, how it's currently being used, and what that might mean for applications written in the new language.  Don't just rewrite code because it's fun---spend some time thinking about _why_ you want the code in this new language, and how it might be used in this new language.  Which I guess means I should talk a little bit about what Productionist does.

From the original author, Productionist works over some files that describe how an Expressionist grammar expands.  At runtime, other code makes requests to Productionist for bits of content, with the set of tags they want content to have, the set of tags that don't want content to have, and some scoring metrics for figuring out how to think about all other tags.  Productionist spits back content, which is almost always text.

Scanning the README of [the Python Productionist project](https://github.com/james-owen-ryan/productionist), we get some other info.  The current way to use the Python code is on the command line, and furthermore, it looks like there is a lot of file I/O.  Here's our first pothole: JavaScript <airquote> normally </airquote> runs in the browser. Web browsers are very much not allowed to access the file system for security and sanity reasons.  In addition, CLIs don't really make sense inside of a browser, as web browsers aren't terminals and you can't even get access to a command line without setting the browser in debug mode.

BUT there is server-side JavaScript in [Node.js](http://nodejs.org/).  Node will give us a way to write JS code that has a CLI, and can operate on the file system.  Furthermore, we'll be able to publish our code on npm, which will make it easier for other people to pull down and use the library.  Great.

BUT it's not entirely beyond the pale to think about universes where people will want to use Productionist in the browser.  Using it alongside, say the [Phaser](http://phaser.io/) game engine or [P5.js](https://p5js.org/) for generative art would need a version that runs in browser.  Luckily, [webpack](https://webpack.js.org/) can take Node code and package it to run on the browser, so we only need to maintain one codebase.  Unluckily, you can't really escape the 'browsers-can't-access-the-file-system' problem, so we'll need to think about what Productionist might look like built on other ways to get data (AJAX requests, perhaps).

In summary, we have three 'targets':
1. Node.js with a CLI
2. Node.js API
  * It's a pretty easy use-case to think about Productionist working like a service, where some client makes a request to a Node server for a bit of content.  We need to make sure we don't couple CLI code with functioning Productionist code.
3. In-Browser Library
  * We need to make sure that core Productionist doesn't rely on file I/O to work.  It can get the data it would normally get through other means (AJAX, primarily).

So, we have two 'targets' (Node.js and normal browser JavaScript) and two ways for people to use the code (CLI and API).  That's enough to get going, but lets look at just a few more things.

#### Step 1.5, how deep into ES6 do we want to go?

At the time of writing, JavaScript recently got a huge overhaul in ES6, which adds a ton of really awesome language features.  I like them a lot.  However, both node and browsers don't support ES6 on their own, which means we need to worry about extra setup.  I think ES6 features are powerful and useful enough to be worth setting up the extra stuff, especially because we'd still need to do a lot of setup to support our multiple environments.

### Step 2: Set up a JavaScript Environment

Ok, now that we've thought about where the code should live, we can start building a JavaScript development stack (the various tools we'll be using to help code development).  So, here's what I settled on:
* Node.js: We need to install node to create node servers.  We'll also be using npm, the package manager bundled with node to install a lot of our needed libraries.  Package managers make downloading / installing libraries very easy.
* Yarn:  Yarn is a reimplementation of npm, it works alongside npm's structure and repositories, but is faster.  Yarn also avoids gnarly circular dependency problems that npm sometimes runs into, and that's a good thing.  Never again with circular dependency problems.  Never, ever again.
* babel: Babel takes ES6 code and converts it to ES2015 code.  This is key for a few reasons:
  * lets us use all the sexy ES6 features that aren't fully supported yet (I'll talk about them when I use them)
  * helps ensure that the code will Just Run on more platforms (they just need to support all of ES2015)
* eslint: tool for reading JavaScript files and identifying problems before you run code.  Eslint can catch things like missing parenthesis, commas, etc.  I think the proper term for tools like this one is a _Linter_.  My text editor of choice, Atom, has a plugin that runs eslint every time I change a file, so I'm getting realtime feedback on my silly typing errors.  Eslint also helps enforce some style considerations, to help keep my code readable.
  * config-react-app: eslint is very configurable, and I haven't quite settled on presets I like.  I'm using the ones that come from the create-react-app project (which is a project that has all the code you need to get started on a React app), because I like them.  Airbnb also has a very popular configuration, I find it to be too restrictive (I like double quotes around strings, OK?!?).
  * compat: an eslint plugin to look for features that are too cutting edge.  Compat will flag features that aren't supported by enough browsers (and can't get converted by babel) and warn me about them.  It's good to know where a compatibility issue has likely happened, and compat gives me a shot at identifying those.
* jest: unit testing framework.  Jest provides a lot of useful tools to help write tests, and help make sure that tests are actually testing the code at hand.
* husky: Husky makes it easy to write Git Hooks---bits of stuff that should happen with certain git commands.  This helps ensure that I'm actually running my tests (because I forget to), so that the only code that gets added to the repository is code that checks out my current set of tests
* webpack: Combines the various JavaScript files into one big one, which is super useful for libraries (end users just have to import one file).  We can also provide several different targets, so we can have a file that runs in the browser and a file that runs in node.

### Step 3: Get a beer

Ok, that's enough for now.  There is potential supplemental post about my webpack configuration, espically for people who want to write code that might be deployed in a lot of different places.

# Porting Libraries To New Languages
## Productionist JavaScript Port Eps 4: We have some real output, and now build hell
### Learning is a Thing You Do

Episode 4!  I'm currently porting the amazing James Ryan's ([Twitter](https://twitter.com/xfoml), [github](http://github.com/james-owen-ryan)) Productionist to JavaScript.  Productionist is one of a family of tools to work with Expressionist grammars (link to the project here: https://www.jamesryan.world/projects#/expressionist/).

Team, hold your breath because *we have output*.  This is not a drill.  The CLI works (under very limited conditions, we're far from feature complete)!  There was a few bugs that I still needed to squash, and a wonky problem where I forgot how mathematical sets worked, buuuuuut:

[img link here]

We haven't tested it yet, and we're far, far away from being feature complete, so don't go really breaking out the champaign.  And, even before that, we have another round of refactoring to do.  I'll get into that riiiiiight now.

#### Moving over to the browser
ProductionistJS, as I'll be calling it, is currently written as a command line utility in node.  That's great, as it replicates the way that Producionist prime functions.  However, JavaScript is the language of the web, and most of us interact with the web in a browser.  As I've said earlier in this series, because of this, we really want ProducionistJS to work in a browser.  How are we going to make the shift?

The big one is file loading.  Productionist uses a suite of files in order to generate text (these files come from other parts of Expressionist), but as you know, browsers don't play nice with local file systems.  I've already abstracted the actual file I/O out of Productionist and into a separate Loader object.  The one that works with the CLI is built over node's ```fs``` module, which lets node access the local file system.  But for a bowser ProductionistJS build, we'll need something a little different: a way to load in productionist files with AJAX requests.

#### Same Code, Different Builds
What I'd like to do is something called a conditional import.  Based on an environment variable, either import a class of type A or type B, where A and B have the same interface.  The environment variable can tell me if I'm building for node (and I can access the local file system) or if I'm building for the web (where I need to do something different).  The problem is that I don't really know how to do that in clean JavaScript, so I'm doing a bit of a hack.

I've added an extra parameter to Productionist's constructor, a Loader.  Loaders are bundles of methods that will load Productionist files and do parsing, and always return a promise for the parsed data from that file.  All Loaders will always have the same function names, those functions will always have the same parameters.  In the code that calls the Productionist constructor, I'll swap which loader I'm using based on which context I'm in (a ```fs``` based loader for node, a different one for the web).

This means that the core Productionist code is *always the same across all contexts*.  The only things that change are the setup code for Productionist and the Loader code.  I'd like to do this without passing in a Loader as a parameter, but again, I'm not really sure how else to work this pattern in, due to the fact that I'm not sure how ```webpack``` creates and handles environment variables.  It's a small thing, but it'll work for now, and maybe a better JS expert can coach me on the right way to do this.

#### How do we load files on the web?
If we can't use a file system, how are we going to get files loaded for browser productionist?  I can think of two ways:
1. somehow have an author specify the files in the HTML page that will load the productionistJS script.
2. do an AJAX request to a server hosting the files for use.

I'm gonna start with option 2.  It's how the JavaScript game engine, Phaser, loads assets.  Productionist files are kinda like static assets, so this seems like a nice pattern to adopt.  The downside is that we're now requiring Expressionist authors to run a local web server during development, which can feel like a bit much for text-based files.

I also want to admit that I'm not sure how I'd want authors to insert productionist files into a browser page's HTML.  AFAIK, there isn't a tag for just 'text data' in HTML, but there could be an HTML 5 feature that I'm not aware of!  I'm a student too.

How are we going to load files in the web?  With the sweet new Fetch API!  Fetch is an interface over AJAX requests that's much cleaner than old-school AJAX calls.  It's mostly syntatic sugar, but it's good sugar.  Fetch has promises (woo!) and requires us to specify less information.  I've already set up Productionist to be friendly to a promise-based async style of writing code, so fetch should slot in very nicely to the exsisting codebase.  The big downside to fetch is how new it is, but we should be safe because we're transpiling our code to an older standard, so it'll Just Work (tm).

#### Designing a web API
So, we've (hopefully) made the only internal code translation we need to get Productionist to work in the browser (moving from node's ```fs``` module to ```fetch```).  Now we need to design an interface for Productionist in the web.  James's command line interface won't work here, so how do?

There are a lot of options: we could define a large parameter list, take a configuration object, define a set of smaller functions, etc.  Lots of libraries function in lots of different ways!  However, we do need to keep in mind one thing: ProductionistJS, internally, is asynchronous, and is going to naturally want to return ```promises```.  There is also a two-phase way of using Productionist--- parse the arguments first, create the initial Productionist object then finalize it within an async call.

What I ended up deciding on was having a very thin layer over the core productionist object.  When being used in the web, the user will need to do work like defining the exact properties of the

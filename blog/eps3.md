# Porting Libraries To New Languages
## Productionist JavaScript Port Eps 3: Asyc Hell
### Learning is a Thing You Do

Episode 3!  I'm currently porting the amazing James Ryan's ([Twitter](https://twitter.com/xfoml), [github](http://github.com/james-owen-ryan)) Productionist to JavaScript.  Productionist is one of a family of tools to work with Expressionist grammars (link to the project here: https://www.jamesryan.world/projects#/expressionist/).

Episode 1 had me set up my JS dev environment.  Episode 2, I did a lot of the raw 'just write it' code.  Now it's time to get really into the nitty-gritty of translation.  And deal with a big thing that comes up with working in the web, often: things aren't synchronous.

#### From Synchronous I/O to Async I/O
I'm gonna focus on reading in ```.grammar``` files for Productionist, but this pattern is repeated for other files that it uses.  Roughly, the process looks like this:
```
Productionist Constructor  Starts
  calls _load_grammar(...)
    starts the Grammar class constructor
      calls _init_parse_json_grammar_specification(...)
        uses python's open(...) to read in the .grammar file
        [code blocks while this takes place...]
        parses the file with json.parse(...)
      finishes parsing (creates NonterminalSymbol objects, etc)
    finishes class instantiation, returns a new instance of the Grammar class
  assigns the new grammar object to a variable (to use it later)
```
This is great, but with JavaScript, especially browser JavaScript loading these files from an ajax query, we do not have synchronous I/O.  We can't block execution to wait until the file read happens and the object gets parsed.  You can see the problem---the I/O lines happen in the middle of things that must happen one after the other.  You can't really do them out of order.

Furthermore, I'm getting a bad feeling about doing async operations (such as waiting on an ajax query) within a object constructor.  A lot of that bad feeling comes from the fact that I want to use Promises, because Promises are sexy.

In old-school JavaScript, you did async stuff by providing a callback function.  This callback function was where you put code that depended on your async stuff finishing.  The problem is that it's hard to read, especially if you have an async operation that needs to wait for another async operation to complete (your callback needs a callback).  God help you if you needed a separate callbacks to handle errors.  Promises help a lot with this, by adding a layer of abstraction.  A Promise is an object that will eventually return a value.  You can interact with that value using the .then(...) method of the object.

The issue is that Promises return Promises.  Using one inside of a class constructor is iffy, because either your object will get completely instantiated before the promise finishes (fully handle all promise stuff inside of the constructor), or your class constructor returns a Promise and not an instance of your class.  That's not gonna work.  

[There's an even newer way to do async in JavaScript, called async/await but I think its just sugar over Promise syntax, and doesn't actually fix these problems.  I could be wrong, though.]

So, we're going to need to heavily refactor.  Sorry, James.

#### Easy things first...
Lets go back to looking at our flow control problem:
```
Productionist Constructor  Starts
  calls _load_grammar(...)
    starts the Grammar class constructor
      calls _init_parse_json_grammar_specification(...)
        uses python's open(...) to read in the .grammar file
        [code blocks while this takes place...]
        parses the file with json.parse(...)
      finishes parsing (creates NonterminalSymbol objects, etc)
    finishes class instantiation, returns a new instance of the Grammar class
  assigns the new grammar object to a variable (to use it later)
  _uses the new grammar object to finish up some other stuff_
```
That last line is important, mostly because it ONLY happens with the last line.  We need the file read to finish to create NonterminalSymbol objects, and we need those objects to finish Grammar class instantiation.  Outside of two tiny lines, there is no part of Grammar class instantiation that doesn't depend on that file I/O.  Neat~

However, we can do some more work in the Productionist class constructor before needing to kick off a promise chain to get a grammar object.  That's a pretty easy shift.  But all we've done is minimize our problem: we still have an async operation that wants to happen in synchronous code.

#### Ok, So:
We've rewritten Productionist to do as much work as possible before we start our async operations.  I'm actually going to stop the class constructor there, and move all the async stuff to a new method ```finalizeProductionist``` that'll take in a new Productionist object return a Promise for a ready-to-roll Productionist object.  Other interfaces, such as a CLI or API, can wait for this promise before letting a user interact with Productionist.

We can kick off our Promise chain, do all our file I/O and all the operations that depend on that file I/O, in this function.  It'll mean that our CLI will work a liiiittle differently from James's Python implementation, but should be key for in-browser implementations of Productionist.  Furthermore, it should look/feel/smell the same.  What this'll look like:
```
Productionist Constructor Starts
  do as much as we can without a single I/O operation
  set a flag that this Productionist object isn't fully baked
Constructor Ends, new Productionist object
Call finalizeProductionist
  *async time*
  get a promise for file I/O
    .then(...
    *async x2*
    Do anything that depends on that file I/O
    get a promise for the next round of file I/O
      .then(...
      *async x3*
      Do anything that depends on that file I/O
      ...
      )
    )
  return a promise
new Promise for a fleshed out Productionist object
  .then(...
  *after all that async magic*
  flip the flag, Productionist is ready to roll
  actually do stuff with Productionist
  )
```

#### Jesus, why
A lot of the web is asynchronous.  If we were to write a visualization library over web Productionist, it would be able to start doing its renders before we were done with all the ajax calls to the various files Productionist needs to work.  In a game that uses Productionist, we're not blocking resources while we wait for our I/O, so other assets can get loaded in the meantime.  That being said, it's a little wonky to work with.  I've used Phaser.js, and it manages to handle its asset loading without resorting to async shenanigans.  I don't know how well Promises interact with Phaser's states, so that might not actually be useful.

#### A big rewrite, some minor things, then LIST HELL
There's always a bunch of low-key stuff you gotta iterate through.  ESLint was pretty good about catching typos, but my fairly lax rules let a lot of things slip through.  I also decided that, because a lot of Productionist's functions required special, bespoke objects and I didn't know what those looked like, I'd try to get a complete run first before writing unit tests (and unit tests done before adding some extra stuff).

Along those lines, I tweaked how the project gets built in ```package.json```.  I only wrote the loader designed to work with node, so I commented out the build for javascript.  While I just work on the CLI part, getting a dev server going isn't a priority (or even useful), so I'm just building for production with ```node prod:build``` and then trying to run.  This isn't super safe, but we just want to see some output right now, and can get to a better building pipeline later.

So, all is going well, fixing typos and easy bugs, until I hit my first error that looks like this:
```
TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
```
Wut?

So, the trick here is that the ```javascript for(let __ of __) { ... }``` loop iterates through each element of an iterable object.  JavaScript figures out if objects are iterable by looking for a property of that object, ```Symbol.iterator``` (the error code is slightly different than this because ```Symbol.iterator``` actually needs to be a function that's going to get passed to an internal ```Symbol(...)``` function).

That's a bit much, the long and short is, JavaScript is trying to iterate over something and can't.  Which means something that I think should be an Array, Set, etc. isn't.  This happened... several times.  Sometimes it was confusion over how Python behaves (I'm writing this post a bit behind when I first hit that problem), other times I just forgot to return something, and a few times it was due to forgetting that a ```javascript Number``` object and the number `4` have different types.

Anyway, that was exciting.  Gonna close out the episode here.  Bugfixing is fun!

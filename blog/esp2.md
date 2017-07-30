# Porting Libraries To New Languages
## Productionist JavaScript Port Eps 2: A lot of Rewriting
### Learning is a Thing You Do

Woo, episode 2!  I'm currently porting the amazing James Ryan's ([Twitter](https://twitter.com/xfoml), [github](http://github.com/james-owen-ryan)) Productionist to JavaScript (link to the project here: https://www.jamesryan.world/projects#/expressionist/).  Last episode I spent most of the time talking about setting a bunch of utilities to help me write code, now we can actually start doing translation!

#### Lets open the file...

_Sees that Productionist is over a thousand lines long_
_Deep breath_

This isn't actually a bad thing---packing Productionist up in a single file makes it very portable, and the code itself is broken up a bit.  I'm just afraid of everything.  But I do want to zoom in on a bit that I saw pretty quickly:

```Python
try:
  path_to_repetitions_file = '{path}.repetitions'.format(path=content_bundle_directory[:-5])
  repetitions_file = open(path_to_repetitions_file, 'rb')
  self.repetition_penalties = pickle.load(repetitions_file)
  # Make sure the grammar hasn't been modified since this repetitions file was last saved
  assert os.path.getmtime(path_to_repetitions_file) > os.path.getmtime(content_bundle_directory), None
    if self.verbosity > 0:
      print "Loading repetitions file..."
except (IOError, AssertionError):
```

Hm, this is gonna be tricky, because it shows the Python code doing three things we can't easily do in browser JavaScript.
* File I/O: Browsers, for many smart reasons, don't have access to file systems.  Nodejs does, but at the very least, we need to pull out _all_ file I/O in Productionist and move it to somewhere else.  This 'somewhere else' will change, depending on if we're building for Node or browser JavaScript, but we can still keep one clean Productionist file.
* Even without the file read/loads, file system conventions are common within Productionist.  We need to find analogies for things like file system paths for browser Productionist.
* ```pickle.load(...)``` is an object serialization command.  Serialization is a complicated topic, but for my purposes, I'm reading this as a way to load an object that has been saved in a file.  JavaScript can kinda do this, by saving objects as JSON files.  However, pickle supports saving objects with methods, whereas JSON does not.

Ok, to try and just start from the top of this file and translate down is going to be really hard, because we'll need to make design decisions before we've seen how they're going to impact code.  What if we go from the smallest, most atomic chunk of code and work our way upwards?  In theory, we'll start by translating code that doesn't depend on a lot of other code, and work our way upwards to more and more interleaved code.  This means our design decisions propagate outwards, as we make a design choices closer to more axiomatic code, we'll already have a commitment to follow.  Personally, this is very useful for me, and keeps me thinking productively and not letting my brain spin.

I struggle with large-scale design questions, because there are often many ways to do the thing.  Commitments / constraints help keep me on task and productive by saying, 'Well, you can't do it that way because of something else you already did.'

Back to translating!  If we look at Productionist as a whole, we see that there are some smaller classes we can start translating first, then move on to bigger things.  While I'm doing this, I'm also moving all the classes in separate files.  It'll be easier to write unit tests for them later this way.  Startin' to translate:
```Python
class ExpressibleMeaning(object) ...
class Recipe(object) ...
class ContentRequest(object) ...
class Output(object) ...
class Grammar(object) ...
class NonterminalSymbol(object) ...
class ProductionRule(object) ...
```

### Startin' to translate:

Most of this is pretty rote.  I'm also trying not to think to hard when it comes to low-level considerations.  For example, from ```ExpressibleMeaning```:
```Python
def _init_build_recipes(self, recipes):
  """Return a list of Recipe objects, each corresponding to one of the grammar paths associated with
  this expressible meaning.
  """
  recipe_objects = []
  for i in xrange(len(recipes)):
      grammar_path = recipes[i]
      recipe_objects.append(Recipe(recipe_id=i, expressible_meaning=self, grammar_path=grammar_path))
  recipe_objects.sort(key=lambda r: r.id)
  return recipe_objects
```

(First, James gets the shiniest of gold stars for some great commenting.)
Try not to get bogged down in some details, I just want to look at this fragment at a high level.  This code is pretty simple--- take a list of recipes, and use it to create a list of ```Recipe``` objects.  The ```Recipe``` object list gets sorted by ID and returned.  Lets look at a few lines:
```Python
  for i in xrange(len(recipes)):
    grammar_path = recipes[i]
    recipe_objects.append(Recipe(recipe_id=i, expressible_meaning=self, grammar_path=grammar_path))
```
JavaScript doesn't have ```xrange(...)```.  I'm not even entirely sure what ```xrange(...)``` does.  A trip to the Python docs tells me that,
>  This function is very similar to range(), but returns an xrange object instead of a list. This is an opaque sequence type which yields the same values as the corresponding list, without actually storing them all simultaneously.

Ok.  So, we know that speed is important here.  How do in JavaScript?  Well, we know this function wants to do something with every element of the list, so ```Array.prototype.map()``` seems fitting.  ```map()``` takes a function that, for its argument, takes in the current element, the current index and a reference to the array.  ```map()``` then calls that function once for every element in the list.  So, we get:
```JavaScript
let recipeObjects = recipes.map((recipe, i, recipes) => new Recipe(i, this, recipe));
```

The ```=>``` is ES6 arrow function syntax, a fast way to write one-line functions.  The stuff in parens on the right side is the function's parameters, the left side is what the function should return.  Now, obviously, James used ```xrange()``` for a reason, and we're completely ignoring it.  I'll catch speed related problems later with a code profile, worry about that then.

#### Thus on and so forth
I'm going to deal with some of the bigger questions I raised at the top in a future post.  For right now, I'm just translating however feels natural, just to get code on the screen.  I can refactor later.  Working from the smallest objects, outward.  For any instance of fileI/O, I'm making a note to come back to later.

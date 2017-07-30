# Porting Libraries To New Languages
## Productionist JavaScript Port Eps 4: We have some real output, and now build hell
### Learning is a Thing You Do

Episode 4!  I'm currently porting the amazing James Ryan's ([Twitter](https://twitter.com/xfoml), [github](http://github.com/james-owen-ryan)) Productionist to JavaScript.  Productionist is one of a family of tools to work with Expressionist grammars (link to the project here: https://www.jamesryan.world/projects#/expressionist/).

Team, hold your breath because *we have output*.  This is not a drill.  The CLI works (under very limited conditions)!  There was a few bugs that I still needed to squash, and a wonky problem where I forgot how mathematical sets worked, buuuuuut:

[img link here]

We haven't tested it yet, and we're far, far away from being feature complete, so don't go really breaking out the champaign.  And, even moreso, we have another round of refactoring to do before we get there.  I'll get into that riiiiiight now.

#### File locations
Even after the great async refactor of 2017, there is another problem with Productinoist's file I/O that we need to handle before we can write a non-node based file loader for it.  I'll stick with the ```.grammar``` files, because they were the stars of talking about async refactoring, but this problem is similar to the other files Expressionist uses.  Lets look directly at some original python:
```python
# Build the grammar in memory, as an object of the Grammar class, which is defined below
self.grammar = self._load_grammar(
    grammar_file_location='{path}/{bundle_name}.grammar'.format(
      path=content_bundle_directory, bundle_name=content_bundle_name
    )
)
```
Do you see the problem?  Productionist expects ```.grammar``` files to be in a particular place with a particular naming convention (content_bundle_directory/bundle_name.grammar).  If we want to move this to the browser, where files may live anywhere on the web, this isn't going to work.  Furthermore, it crosses the streams somewhat: because of our multiple targets, we'd really like to keep any and all file-relevant code away from Productionist as possible.  Heck, I dunno if this path string will even work on Windows, where the slashes go the other way.

I want to change this, is what I'm getting at.

#### Separating all file considerations away from Producionist
I've since written the CLI (using the commanderjs library, I'm not doing my own parsing).  As a build target, the CLI code (which is in a file called nodeCli.js) is entry point of the application.  I can put build-specific code in the CLI file, and as long as the interface is the same across all entry points, the core library can be the same as well.

SO, the way the CLI currently works is that it also expects the above naming convention for files.  From the docs:
>To submit a content request to Productionist, use a command like this:
>```
>python -i productionist.py "myContentBundle" /path/to/reductionist/output/files ...
>```

I can't abolish this convention, that's rude and I think James is a super swell guy.  What I can do is move all of these conventions over to the CLI code, refactor Productionist in a way that will work better for other, non-CLI environments, and TADA.  This may come back to bite me later if there is a big feature change in Productionist that relies on this file format.  SO, where does ```content_bundle_directory``` and ```content_bundle_name``` come from anyway?  I'm glad you asked, imaginary friend!  Lets look at the python constructo for Productionist:
```python
def __init__(self, content_bundle_name, content_bundle_directory, probabilistic_mode=False,
                 repetition_penalty_mode=True, terse_mode=False, verbosity=1):
        """Initialize a Productionist object."""
```
Found 'em captain!  Instead of passing a name (that all the files should have) and a directory (where all the files should live), 

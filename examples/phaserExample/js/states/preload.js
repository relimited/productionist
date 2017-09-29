var loadState = {
    preload: function(){
        this.prod = new Productionist.default("faeMemoryLibrary", "http://localhost:8080/python/faeMemoryLibrary");
    },

    create: function(){
        //we don't want to do actual async loading in preload, because phaser manages all of that.  Instead, we'll do it here, then
        //call the state transition we're done.
        this.prod = this.prod.finalize();
        this.prod.then(productionist => {
            game.state.start('main', true, false, productionist);
        });
    }
}

var mainState = {
    init: function(prod){
        this.productionist = prod;
    },

    create: function(){
        this.keyboard = game.input.keyboard;
    },

    update: function(){
        if (this.keyboard.isPressed(Phaser.Keyboard.W)){
            var contentRequest = {
                'mustHave': new Set(["tags:party"]),
                'mustNotHave': new Set(["tags:fire"]),
                'scoringMetric': []
            };

            var output = productionist.fulfillContentRequest(contentRequest);
            game.add.text(80, 80, output.toString(), {font: '30px Courier', fill: '#ffffff'});
        }
    }
}

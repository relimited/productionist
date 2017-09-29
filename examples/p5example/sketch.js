var prod;
var prod_rdy

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  prod = new Productionist.default("faeMemoryLibrary", "http://localhost:8080/python/faeMemoryLibrary");
  prod_rdy = prod.finalize();
}

function draw() {
    prod_rdy.then(productionist => {
    var contentRequest = {
        'mustHave': new Set(["tags:party"]),
        'mustNotHave': new Set(["tags:fire"]),
        'scoringMetric': []
      };

      var output = productionist.fulfillContentRequest(contentRequest);
      textSize(32);
      text(output.toString(), 10, 30, 800, 600);
      //console.log(output)
    });
}

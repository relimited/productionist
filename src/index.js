/**
 * This is actually what node runs when we start the script, so this is where CLI
 * parsing will happen.
 * @author Johnathan Pagnutti
 */

/**
 * commander is an CLI arguments parsing library for node.js.
 * @type {Object}
 */
import Program from 'commander';
import Productionist from './modules/productionist';

const productionist = new Productionist();
console.log(productionist.test_funct());

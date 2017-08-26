/**
 * browser API interface for productionist-js
 * @author Johnathan Pagnutti
 */

 import Productionist from './modules/productionist';
 import ContentRequest from './modules/contentRequest';
 import Loader from './modules/fetch-loader';

 class ProductionistAPI{
   constructor(contentBundleName, contentBundlePath, nonprobabilistic=false,
     repeitionPenalty=false, terse=false, verbosity=0){
     this.productionist = new Productionist(
       contentBundleName,
       contentBundlePath,
       !nonprobabilistic,
       repeitionPenalty,
       terse,
       verbosity,
       Loader
     );
   }

   finalize(){
     return this.productionist.finalizeProductionist();
   }
 }

export default ProductionistAPI

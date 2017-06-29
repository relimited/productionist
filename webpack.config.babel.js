import path from 'path'

import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

//We'll have two webpack configurations, one for building a node library and one for building a browser library

export default [{
  entry: [
    './src/index'
  ],
  target: 'node',
  output: {
    filename: 'js/lib.node.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  }
},
{
  entry: [
    './src/modules/productionist'
  ],
  target: 'web',
  output: {
    filename: 'js/lib.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  }
}];

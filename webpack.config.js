/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const spawn = require('child_process').spawnSync;

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '.'),
  devtool: 'nosources-source-map',
  entry: './index.js',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.compilation.tap('emscripten-build', (compilation) => {
          let result = spawn('node', ['build.js'], { stdio: 'inherit' });
          
          if (result.status != 0) {
            compilation.errors.push('emscripten build failed');
          } else {
            console.log("emscripten build complete")
          }
        });
      }
    },
    new CopyPlugin([
      //we need to manually copy this instead of requiring from
      //our script source code, since wasm files are bound to global scope
      //in workers, rather than being fetched like the browser.
      //wranglerjs also needs to see a wasm file in order for it to be sent to the api
      //correctly.
      { from: './build/module.wasm', to: './worker/module.wasm'},
    ])
  ],
  module: {
    rules: [
      // Emscripten JS files define a global. With `exports-loader` we can 
      // load these files correctly (provided the global’s name is the same
      // as the file name).
      {
        test: /emscripten\.js$/,
        loader: 'exports-loader'
      },
    ]
  },
};

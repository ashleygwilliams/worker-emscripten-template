# 👷 `worker-emscripten-template`

A template for kick starting a Cloudflare worker project with emscripten

[`index.js`](index.js) is the content of the Workers script.  
[`fibonacci.c`](src/fibonacci.c) is the c source code for a fibonacci calculator.  
[`package.json`](package.json) holds the command we use to call emscripten.  
[`webpack.config.js`](webpack.config.js) holds the webpack config we use to bundle the emscripten output together with your script.  

#### Wrangler
To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate myApp https://github.com/cloudflare/worker-emscripten-template
```

# 👷 `worker-emscripten-template`

A template for kick starting a Cloudflare worker project with emscripten

[`index.js`](index.js) is the content of the Workers script.  
[`fibonacci.c`](src/fibonacci.c) is the c source code for a fibonacci calculator.  
[`package.json`](package.json) holds the command we use to call emscripten. (as an npm script)  
[`webpack.config.js`](webpack.config.js) holds the webpack config we use to bundle the emscripten output together with your script.  

This template requires [docker](https://docs.docker.com/install/) for providing the emscripten build environment.

#### Wrangler

This template requires the ^1.1.0 version of [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate myapp https://github.com/ashleygwilliams/worker-emscripten-template
```

And to see the 12th fibonacci number calculated in C compiled to wasm

```
wrangler preview
```

import emscripten from './build/module.js'
//import the emscripten glue code

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

//this is where the magic happens
//we send our own instantiateWasm function
//to the emscripten module
//so we can initialize the WASM instance ourselves
//since Workers puts your wasm file in global scope
//as a binding. In this case, this binding is called
//'wasmprogram' as that is the name wrangler uses
//for any uploaded wasm
let emscripten_module = new Promise((resolve, reject) => {
  emscripten({
    instantiateWasm(info, receive) {
      let instance = new WebAssembly.Instance(wasmprogram, info);
      receive(instance);
      return instance.exports;
    }
  }).then((module) => {
    resolve({
      fib: module.cwrap("fib", "number", ["number"])
    });
  });
});

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(event) {
  let C = await emscripten_module;

  return new Response(C.fib(12));
}

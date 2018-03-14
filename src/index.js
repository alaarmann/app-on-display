const js = import("rust-wasm");

js.then(js => {
  const sha512_sum = js.create_sha512("my dear Wasm");
  alert(sha512_sum);
});

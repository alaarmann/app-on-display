import './styles.css';
import SHA512 from 'crypto-js/sha512';
import forge from 'node-forge';
const js =
  import ("rust-wasm");



const main = function(create_sha512) {

  const callForgeSha512 = function(message) {
    let md = forge.md.sha512.create();
    md.update(forge.util.createBuffer(message, 'utf8').getBytes());
    return md.digest().toHex();
  };
  const app = document.createElement('div');
  app.id = 'app';
  const heading = document.createElement('h1');
  heading.innerText = "Sha512 digest generated by WASM (compared to others)";
  app.append(heading);

  const inputSection = document.createElement('div');
  inputSection.classList.add('input-section');
  const inputareaLabel = document.createElement('label');
  inputareaLabel.setAttribute('for', 'input');
  inputareaLabel.innerText = 'Input';
  inputSection.appendChild(inputareaLabel);
  const inputarea = document.createElement('textarea');
  inputarea.id = 'input';
  inputSection.appendChild(inputarea);

  createDigester({inputarea,
    id: 'rust-wasm',
    title: 'WASM',
    description: "WASM (based on Rust's sha2 crate)",
    url: 'https://github.com/alaarmann/rust-wasm',
    digestStrategy: create_sha512}).map(elem => app.appendChild(elem));
  createDigester({inputarea,
    id: 'forge',
    title: 'Forge',
    description: 'A native implementation of TLS (and various other cryptographic tools) in JavaScript',
    url: 'https://www.npmjs.com/package/node-forge',
    digestStrategy: callForgeSha512}).map(elem => app.appendChild(elem));
  createDigester({inputarea,
    id: 'cryptojs',
    title: 'CryptoJS',
    description: 'JavaScript library of crypto standards',
    url: 'https://www.npmjs.com/package/crypto-js',
    digestStrategy: SHA512}).map(elem => app.appendChild(elem));
  app.appendChild(inputSection);

  document.body.appendChild(app);
  inputarea.focus();
}

const createDigester = function({inputarea, id, title, description, url, digestStrategy}) {
  const descrSection = document.createElement('div');
  descrSection.classList.add('descr-section');
  const titleField = document.createElement('div');
  titleField.classList.add('title');
  titleField.innerText = title;
  descrSection.appendChild(titleField);
  const descrField = document.createElement('div');
  descrField.classList.add('description');
  descrField.innerHTML = description + ` <a href="${url}">${url}</a>`;
  descrSection.appendChild(descrField);

  const outputSection = document.createElement('div');
  outputSection.classList.add('output-section');
  const digestLabel = document.createElement('label');
  digestLabel.setAttribute('for', 'digest-' + id);
  digestLabel.innerText = 'Digest';
  const digest = document.createElement('output');
  digest.id = 'digest-' + id;
  outputSection.appendChild(digestLabel);
  outputSection.appendChild(digest);

  const performanceSection = document.createElement('div');
  performanceSection.classList.add('performance-section');
  const perfLabel = document.createElement('label');
  perfLabel.setAttribute('for', 'perf-' + id);
  perfLabel.innerText = 'Duration';
  const perf = document.createElement('output');
  perf.id = 'perf-' + id;
  performanceSection.appendChild(perfLabel);
  performanceSection.appendChild(perf);

  const modifiedHandler = function() {
    let duration = 0;
    const inp = inputarea.value;
    if (inp.length > 0) {
      const before = performance.now();
      const sha512sum = digestStrategy(inp);
      const after = performance.now();
      digest.innerText = sha512sum;
      duration = after - before;
    } else {
      digest.innerText = '';
    }
    perf.innerText = duration + ' ms';
  };
  inputarea.addEventListener('keyup', modifiedHandler);
  inputarea.addEventListener('paste', modifiedHandler);

  return [descrSection, outputSection, performanceSection];
}


js.then(js => {
  main(js.create_sha512);
});

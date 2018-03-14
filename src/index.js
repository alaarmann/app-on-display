import './styles.css';
const js =
  import ("rust-wasm");



const main = function(create_sha512) {

  const app = document.createElement('div');
  app.id = 'app';
  const outputSection = document.createElement('div');
  outputSection.classList.add('output-section');
  app.appendChild(outputSection);
  const digestLabel = document.createElement('label');
  digestLabel.setAttribute('for', 'digest');
  digestLabel.innerText = 'Digest';
  const digest = document.createElement('output');
  digest.id = 'digest';
  outputSection.appendChild(digestLabel);
  outputSection.appendChild(digest);

  const inputSection = document.createElement('div');
  inputSection.classList.add('input-section');
  app.appendChild(inputSection);
  const inputareaLabel = document.createElement('label');
  inputareaLabel.setAttribute('for', 'input');
  inputareaLabel.innerText = 'Input';
  inputSection.appendChild(inputareaLabel);
  const inputarea = document.createElement('textarea');
  inputarea.id = 'input';
  const modifiedHandler = function() {
    const result = create_sha512(inputarea.value);
    digest.innerText = result;
  };
  inputarea.addEventListener('keyup', modifiedHandler);
  inputarea.addEventListener('paste', modifiedHandler);
  inputSection.appendChild(inputarea);

  document.body.appendChild(app);
}


js.then(js => {
  main(js.create_sha512);
});

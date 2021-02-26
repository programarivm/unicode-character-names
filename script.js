import Fuse from './fuse.esm.min.js';

const input = document.querySelector('input');
const searchButton = document.getElementById('search-button');
const result = document.getElementById('result');

fetch('./unicode.json')
  .then(response => response.json())
  .then(unicode => {
    const addRow = (el, found, i) => {
      const button = document.createElement('button');
      const textChar  = document.createTextNode(unicode[found.item]);

      button.className = 'btn btn-light';
      button.title = found.item;
      button.appendChild(textChar);
      button.addEventListener('click', () => navigator.clipboard.writeText(unicode[found.item]));

      result.appendChild(button);
    }

    const fuzzySearch = (e) => {
      result.innerHTML = '';

      const fuse = new Fuse(
        Object.keys(unicode), {
          minMatchCharLength: 3,
          threshold: 0.3,
          distance: 33
      });

      fuse.search(input.value)
        .forEach((found, i) => {
          addRow(result, found, i)
        });
    }

    const inputSearch = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        fuzzySearch();
      }
    }

    input.addEventListener('keydown', inputSearch);
    searchButton.addEventListener('click', fuzzySearch);
});

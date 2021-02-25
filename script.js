import Fuse from './fuse.esm.min.js';

const input = document.querySelector('input');
const button = document.querySelector('button');
const table = document.querySelector('table');

fetch('./unicode.json')
  .then(response => response.json())
  .then(unicode => {
    const addRow = (el, found, i) => {
      const newRow = el.insertRow(i);
      const cellChar  = newRow.insertCell(0);
      const textChar  = document.createTextNode(unicode[found.item]);
      cellChar.appendChild(textChar);

      const cellDescription  = newRow.insertCell(1);
      const textDescription  = document.createTextNode(found.item);
      cellDescription.appendChild(textDescription);
    }

    const fuzzySearch = (e) => {
      table.innerHTML = '';

      const fuse = new Fuse(
        Object.keys(unicode), {
          minMatchCharLength: 3,
          threshold: 0.3,
          distance: 33
      });

      fuse.search(input.value)
        .forEach((found, i) => {
          addRow(table, found, i)
        });
    }

    const inputSearch = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        fuzzySearch();
      }
    }

    input.addEventListener('keydown', inputSearch);
    button.addEventListener('click', fuzzySearch);
});

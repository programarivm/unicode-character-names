import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.6/dist/fuse.esm.js'

const input = document.querySelector("input")
const button = document.querySelector("button")
const table = document.querySelector("table")

fetch('./unicode.json')
  .then(response => response.json())
  .then(unicode => {
    const addRow = (el, found, i) => {
      const newRow = el.insertRow(i)
      const newCell  = newRow.insertCell(0)
      const newText  = document.createTextNode(unicode[found.item])
      newCell.appendChild(newText)
    }

    button.addEventListener("click", function(event) {
      table.innerHTML = ''
      const fuse = new Fuse(
        Object.keys(unicode), {
          includeScore: true,
          minMatchCharLength: 2,
          threshold: 0.4
      })
      fuse.search(input.value)
        .forEach((found, i) => {
          addRow(table, found, i)
        });
    })
  })

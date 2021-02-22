import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.6/dist/fuse.esm.js'

const input = document.querySelector("input")
const button = document.querySelector("button")
const table = document.querySelector("table")

fetch('./unicode.json')
  .then(response => response.json())
  .then(unicode => {

    const addRow = (el, found, i) => {
      const newRow = el.insertRow(i)
      const cellChar  = newRow.insertCell(0)
      const textChar  = document.createTextNode(unicode[found.item])
      cellChar.appendChild(textChar)

      const cellDescription  = newRow.insertCell(1)
      const textDescription  = document.createTextNode(found.item)
      cellDescription.appendChild(textDescription)
    }

    button.addEventListener("click", function(event) {
      table.innerHTML = ''
      const fuse = new Fuse(
        Object.keys(unicode), {
          includeScore: true,
          minMatchCharLength: 2,
          threshold: 0.3
      })
      fuse.search(input.value)
        .forEach((found, i) => {
          addRow(table, found, i)
        });
    })
  })

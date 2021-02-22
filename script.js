import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.6/dist/fuse.esm.js'

const input = document.querySelector("input")
const button = document.querySelector("button")
const table = document.querySelector("table")

const options = {
  includeScore: true,
  minMatchCharLength: 2,
  threshold: 0.4
}

fetch('./unicode.json')
  .then(response => response.json())
  .then(unicode => {
    button.addEventListener("click", function( event ) {
      const names = Object.keys(unicode)
      const fuse = new Fuse(names, options)
      const result = fuse.search(input.value)

      console.log(result);
    })
  })

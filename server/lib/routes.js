const fs = require('fs')
const fetch = require('node-fetch')
const sharp = require('sharp')

exports.addRoutes = function addRoutes(api) {
  api.route('/hello').get((req, res) => {
    const name = req.query.name || 'stranger'
    res.send({ message: `Hello ${name}!` })
  })

  api.route('/').get((req, res) => {
    console.log('--------------------------------')
    console.log('REQ QUESY...', req.query)
    const { url, length } = req.query

    const renameTicket = (ticketName = 'nothing was returned', length = 9) => {
      console.log('length heresss', ticketName, length)
      return new Promise(function(resolve, reject) {
        const usefulCharacters = [...ticketName.substr(10)]
        const newTicketName = usefulCharacters.map(character => {
          if (character === ' ') return '_'
          else if (
            character === ':' ||
            character === '[' ||
            character === ']' ||
            character === '.' ||
            character === ',' ||
            character === '-' ||
            character === '(' ||
            character === ')' ||
            character === '#' ||
            character === '\n'
          )
            return ''
          return character.toLowerCase()
        })
        let newName =
          [ticketName.substr(0, 9)] +
          '_' +
          newTicketName.join('').substr(0, length)
        if (newName[newName.length - 1] == '-')
          newName = newName.substr(0, newName.length - 1)
        if (newName) {
          console.log('length..', length)
          resolve({ newName, length })
        } else {
          reject(Error('It broke'))
        }
      })
    }

    const newName = renameTicket(url, length)
    newName
      .then(({ newName, length }) => {
        // res.contentType('text/plain')
        res.send({ newName, length })
      })
      .catch(err => console.error('\n\n---||||----||||', err))
  })
}

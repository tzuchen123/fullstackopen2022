const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {

  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)

}else {

  const url = process.env.url
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)
  if (process.argv.length === 3) {

    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })

  }else{

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    person.save().then(result => {
      console.log(`added ${ process.argv[3]} number ${ process.argv[4]} to phonebook`)
      mongoose.connection.close()
    })
  }

}






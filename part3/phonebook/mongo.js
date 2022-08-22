const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}else{

  const password = process.argv[2]
  const url =
    `mongodb+srv://fullstack:${password}@cluster0.ull5axf.mongodb.net/?retryWrites=true&w=majority`
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)

  if (process.argv.length === 3) {
    Person.find({}).then(result => {
      result.forEach(note => {
        console.log(note)
      })
    })
  } else {
    const person = new Person({
      content: process.argv[3],
      date: process.argv[4],
    })

    person.save().then(result => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    })

  }
  mongoose.connection.close()
}






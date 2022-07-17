const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}else if(process.argv.length === 3 ){
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@cluster0.k9qxj.mongodb.net/?retryWrites=true&w=majority`

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  mongoose
    .connect(url)
    Person.find({}).then(result => {
      result.forEach(note => {
        console.log(note)
      })
      mongoose.connection.close()
    })
    .catch((err) => console.log(err))

}else{
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url = `mongodb+srv://fullstack:${password}@cluster0.k9qxj.mongodb.net/?retryWrites=true&w=majority`

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')

      const person = new Person({
        name: name,
        number:  number
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}



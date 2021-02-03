const mongoose = require('mongoose')

if (process.argv.length < 4) {
  console.log(`📣 Arguments required: <password> <databaseName> <name> <number>`)
  process.exit(1)  // returns an Exit Code of 1 means "Uncaught Fatal Exception"
}

const password = process.argv[2]
const dbName = process.argv[3]
const personName = process.argv[4]
const personNum = process.argv[5]

const URL = `mongodb+srv://lirobinxc:${password}@cluster0.zpzjs.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = new mongoose.model('Person', personSchema)

// DELETE function
// if (personName === "delete") {
//   Person.deleteOne({name: personNum})
//     .then(result => {
//       mongoose.connection.close();
//       console.log(`Deleted ${personNum}!`)
//       process.exit(0);
//     })
// }

if (process.argv.length === 4) {
  Person.find({})
    .then(result => {
      console.log('-----PHONEBOOK-----');
      result.forEach(ele => {
        console.log(`${ele.name} ~ ${ele.number}`)
      });
      mongoose.connection.close();
      process.exit(0)
    })
}

const person = new Person({
  name: personName,
  number: personNum,
})

if (process.argv.length === 6) {
  person.save().then(result => {
    console.log(`📣 Added ${personName} ~ ${personNum} to phonebook!`)
    mongoose.connection.close()
  })
}
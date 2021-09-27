const bcrypt = require("bcrypt");

const users = [
  {
    username: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('1234567', 10),
  },
  {
    username: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('1234567', 10),
  },
]

module.exports = users
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let password = 'abc123!';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
})


let hashedPass = '$2a$10$qsY1WPoh12CgkIq0beuTs.wmgCXC670BviK7bjzltDKvOaeoZRax2';

bcrypt.compare('sd', hashedPass, (err, res) => {
    console.log(res);
});

// let data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc');

// console.log(token);

// let decoded = jwt.verify(token, '123abc');
// console.log(`decoded: ${decoded}`);
// console.log(decoded)
// let message = 'I am user number 3 ';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hashed message: ${hash}`);


// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//     console.log('data was not changed!');
// } else 
// {
//     console.log('data was changed!');
// }
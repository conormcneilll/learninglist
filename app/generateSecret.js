const crypto = require('crypto');

// Generates a random session secret
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);


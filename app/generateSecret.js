const crypto = require('crypto');

// Generate a random session secret
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);


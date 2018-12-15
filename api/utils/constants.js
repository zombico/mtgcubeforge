'use strict';

exports.PORT = process.env.PORT || 3001;
exports.SECRET = process.env.SECRET || 'super-secret-passphrase';
exports.DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/cubeforge';
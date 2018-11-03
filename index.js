'use strict';

const server = require('./api/server');
const { PORT } = require('./api/utils/constants');

server.listen(PORT, () => console.log(`App listening on port ${PORT}`));

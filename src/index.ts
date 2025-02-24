import { createAdminIfNotExists } from './database';
import * as server from './server';

server
  .up()
  .then(createAdminIfNotExists)
  .catch((error) => {
    console.log('Error starting server', error);
    process.exit(1);
  });

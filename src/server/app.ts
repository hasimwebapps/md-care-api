require('dotenv').config();

import { startServer } from './server'
process.addListener('uncaughtException', err => {
  // tslint:disable-next-line:no-console
  console.error('uncaughtException:', err)
});
process.on('unhandledRejection', err => {
  // tslint:disable-next-line:no-console
  console.error('unhandleRejection:', err)
});
startServer();

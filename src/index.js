import { initMongoConnection } from './db/inirMongoConnection.js';
import { setupServer } from './server.js';

// const message = 'Hello world';
// console.log(message);

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();

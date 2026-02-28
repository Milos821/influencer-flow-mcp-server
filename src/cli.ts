#!/usr/bin/env node

import { startServer } from './tools/server.js';

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});

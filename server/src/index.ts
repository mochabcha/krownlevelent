import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './db/connect.js';
import { seedDefaultContent } from './services/siteContentService.js';

await connectDatabase();
await seedDefaultContent();

const app = createApp();
app.listen(env.PORT, () => {
  console.log(`KLE server listening on http://localhost:${env.PORT}`);
});

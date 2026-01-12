import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { env, defineConfig } from 'prisma/config';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});

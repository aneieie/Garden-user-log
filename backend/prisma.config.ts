import dotenv from 'dotenv';
import { env, defineConfig } from 'prisma/config';

const myEnv = dotenv.config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});

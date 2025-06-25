// This configuration file is used by Drizzle Kit to generate the database schema and types.

import type { Config } from "drizzle-kit";
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config;

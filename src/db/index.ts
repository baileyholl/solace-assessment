import {drizzle} from "drizzle-orm/postgres-js";
import {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";
import postgres from "postgres";

const setup = (): PostgresJsDatabase<Record<string, unknown>> => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  return drizzle(queryClient);
};

export default setup();

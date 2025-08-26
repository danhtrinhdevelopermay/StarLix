import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "../shared/schema-mysql";

// Use TiDB MySQL database
const DATABASE_URL = 'mysql://38q6w5SNZeFHRbp.root:BP5A9pUQXmh3V5HC@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test';

// Create connection pool for MySQL with production-safe settings
const pool = mysql.createPool({
  uri: DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  },
  connectionLimit: 3, // Conservative limit for TiDB
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const db = drizzle(pool, { 
  schema,
  mode: "planetscale" // TiDB compatibility mode
});
export { pool };

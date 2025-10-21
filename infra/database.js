import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    return await client.query(queryObject);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  return client;
}

const database = {
  getNewClient,
  query,
};

export default database;

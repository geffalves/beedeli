import { neon } from '@netlify/neon';

const getSql = () => neon();

export const handler = async (event: any) => {
  const sql = getSql();
  const method = event.httpMethod;

  try {
    if (method === 'GET') {
      const rows = await sql`SELECT key, value FROM settings WHERE key IN ('openingTime', 'closingTime')`;
      
      const settings: Record<string, string> = {};
      rows.forEach((row: any) => {
        settings[row.key] = row.value;
      });

      return {
        statusCode: 200,
        body: JSON.stringify(settings),
      };
    }

    if (method === 'POST') {
      const data = JSON.parse(event.body);
      
      // Upsert openingTime
      if (data.openingTime) {
        await sql`
          INSERT INTO settings (key, value) VALUES ('openingTime', ${data.openingTime})
          ON CONFLICT (key) DO UPDATE SET value = ${data.openingTime}
        `;
      }

      // Upsert closingTime
      if (data.closingTime) {
        await sql`
          INSERT INTO settings (key, value) VALUES ('closingTime', ${data.closingTime})
          ON CONFLICT (key) DO UPDATE SET value = ${data.closingTime}
        `;
      }

      return { statusCode: 200, body: JSON.stringify({ message: 'Saved' }) };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };

  } catch (error) {
    console.error('Database Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
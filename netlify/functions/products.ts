import { neon } from '@netlify/neon';

// Helper to get DB connection
const getSql = () => neon();

export const handler = async (event: any) => {
  const sql = getSql();
  const method = event.httpMethod;

  try {
    if (method === 'GET') {
      const rows = await sql`SELECT * FROM products`;
      // Convert snake_case to camelCase for frontend
      const products = rows.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        stock: r.stock,
        imageUrl: r.image_url,
        available: r.available
      }));
      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    }

    if (method === 'POST') {
      const data = JSON.parse(event.body);
      await sql`
        INSERT INTO products (id, name, description, stock, image_url, available)
        VALUES (${data.id}, ${data.name}, ${data.description}, ${data.stock}, ${data.imageUrl}, ${data.available})
      `;
      return { statusCode: 201, body: JSON.stringify({ message: 'Created' }) };
    }

    if (method === 'PUT') {
      const data = JSON.parse(event.body);
      await sql`
        UPDATE products 
        SET stock = ${data.stock}, available = ${data.available}
        WHERE id = ${data.id}
      `;
      return { statusCode: 200, body: JSON.stringify({ message: 'Updated' }) };
    }

    if (method === 'DELETE') {
      const data = JSON.parse(event.body);
      await sql`DELETE FROM products WHERE id = ${data.id}`;
      return { statusCode: 200, body: JSON.stringify({ message: 'Deleted' }) };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };

  } catch (error) {
    console.error('Database Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: String(error) }),
    };
  }
};
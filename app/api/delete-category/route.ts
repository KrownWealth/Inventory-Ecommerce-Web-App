// /api/products/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await db.category.delete({
        where: {
          id: String(id),
        },
      });
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete product', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.end(readFileSync('./public/sitemap/sitemap.xml'));
}

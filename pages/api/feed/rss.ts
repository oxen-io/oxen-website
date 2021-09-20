import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/xml');
  res.end(readFileSync('./public/rss/feed.xml'));
}

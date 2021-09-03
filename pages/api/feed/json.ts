import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/feed+json');
  res.end(readFileSync('./public/rss/feed.json'));
};

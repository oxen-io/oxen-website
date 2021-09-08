import { NextApiRequest, NextApiResponse } from 'next';
import base64 from 'base-64';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(400).json({
      message: 'Email API: Invalid http method. | Only POST is accepted.',
    });
  }

  const email = req.body.email;
  const response = await fetch(
    `https://api.createsend.com/api/v3.2/subscribers/${process.env.CAMPAIGN_MONITOR_LIST_API_ID}.json`,
    {
      body: JSON.stringify({
        EmailAddress: email,
        ConsentToTrack: 'Unchanged',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64.encode(
          `${process.env.CAMPAIGN_MONITOR_API_KEY}:x`,
        )}`,
      },
      method: 'POST',
    },
  );

  if (response.status === 201) {
    // console.log(`Email API: ${email} subscribed!`);
    res.status(201).json({ email });
  } else {
    // const result = await response.json();
    // console.warn(
    //   `Email API: | Code: ${result.Code} | Email: ${email} | ${result.Message}`
    // );
    res.status(400).json({ email });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';

// #region Mailerlite API
const ml_ApiKey = process.env.MAILERLITE_API_KEY;
const ml_BaseUrl = 'https://connect.mailerlite.com/api';
const ml_GroupId = process.env.MAILERLITE_GROUP_ID; // the session mailing list is using this API

async function makeMLRequest(req: NextApiRequest): Promise<Response> {
  const email = req.body.email;
  const body = {
    email,
    groups: [ml_GroupId],
  };
  const params = {
    method: 'POST',
    headers: {
      // prevents issues when the API version is updated
      'X-Version': '2025-02-11',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ml_ApiKey}`,
    },
    body: JSON.stringify(body),
  };

  // NOTE request limit is 120 requests per minute https://developers.mailerlite.com/docs/#rate-limits
  // TODO implement batch requests https://developers.mailerlite.com/docs/batching.html
  const response = await fetch(`${ml_BaseUrl}/subscribers`, params);
  return response;
}

// #endregion

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Email API: Invalid http method. | Only POST is accepted.',
    });
  }

  const email = req.body.email;
  const response = await makeMLRequest(req);
  // 201 Created: The subscriber was successfully added to the list.
  // 200 OK: The subscriber was already in the list.
  if (response.status === 201 || response.status === 200) {
    res.status(201).json({ email });
  } else {
    const result = await response.json();
    res.status(result.code).json({ email, message: result.message });
  }
}

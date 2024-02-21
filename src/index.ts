import 'dotenv/config';

import { Events, Kient } from 'kient';
import OTP from 'otp';

(async () => {
  if (!process.env.KICK_EMAIL || !process.env.KICK_PASSWORD || !process.env.KICK_2FA) {
    throw new Error('Missing authentication.');
  }

  const client = await Kient.create();
  await client.api.authentication.login(
    {
      email: process.env.KICK_EMAIL,
      password: process.env.KICK_PASSWORD,
      otc: new OTP({
        secret: process.env.KICK_2FA
      }).totp(Date.now())
    },
    process.env.KICK_AUTH || undefined
  );
})();

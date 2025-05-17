import { PriceAlertEmail } from "@/components/email-template/alert-price";
import { envConfig } from './config';
import { Resend } from 'resend';
import { SendEmailProps } from '@/types/types';

export async function sendEmail({
  name,
  price,
  discount,
  stock,
  url,
  image,
  email,
  isPriceAlert,
  isStockAlert,
}: SendEmailProps) {
  const resend = new Resend(envConfig.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'SmartBuy <onboarding@resend.dev>',
      to: ['victorbejas97@gmail.com', email], // TODO: change to the user email
      subject: 'hello world',
      react: PriceAlertEmail({
        userName: 'Victor',
        productName: name,
        productImage: image,
        productUrl: url,
        originalPrice: price,
        currentPrice: price,
        discount: discount,
        stock: stock,
        isPriceAlert,
        isStockAlert,
        storeName: 'SmartBuy',
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
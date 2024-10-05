"use server";

import { Message } from "@/lib/message";

export const generateResponse = async (messages: Message[], model: string) => {

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/55cf2259a4b600e283540fb99d185972/ai/run/@cf/meta/${model}`,
    {
      headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}` },
      method: "POST",
      body: JSON.stringify({ messages: messages }),
    }
  );

  const result = await response.json();

  if (result.errors.length > 0) {
    console.error("Error sending message:\n" + JSON.stringify(result));
    return "I didn't understand that, sorry!";
  }

  return result.result.response;
};

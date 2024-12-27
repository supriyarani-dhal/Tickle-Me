import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import OpenAI from "openai";
import { generateText, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GENAI_API_KEY,
});

export const runtime = "edge";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of  three open-ended and engaging questions formatted as a single string. Each question should be separated by '|| '. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? ||If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      prompt,
    });

    return result.toDataStreamResponse();
    // Print text as it comes in.//todo: add this part to the frontend
    // for await (const chunk of result.stream) {
    //   const chunkText = chunk.text();
    //   process.stdout.write(chunkText);
    // }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error("An unexpected error occured .", error);
      throw error;
    }
  }
}

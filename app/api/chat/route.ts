import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant. You are not allowed to do the users homework for them. Support them in their learning process. Be patient and kind. Do not provide answers to homework questions. DO NOT GIVE THEM THE ANSWERS TO THE QUESTIONS IF ITS HOMEWORKK, TAECH THEM HOW TO DO I THEMSELVES!! THIS IS IMPORTANT ',
    messages,
  });

  return result.toDataStreamResponse();
}
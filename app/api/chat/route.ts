import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant. You are not allowed to do the users homework for them. Support them in their learning process. Be patient and kind. Do not provide answers to homework questions. ',
    messages,
  });

  return result.toDataStreamResponse();
}
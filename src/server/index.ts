import {
  OPEN_AI_HOST,
  OPEN_AI_KEY,
  OPEN_AI_MODEL,
  DEFAULT_TEMPARTURE,
  DEFAULT_SYSTEM_PROMPT,
} from './constants';

export interface Message {
  role: string;
  content: string;
}

export const openAIConnect = async (messages: Message[]) => {
  const url = `${OPEN_AI_HOST}/v1/chat/completions`;

  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: OPEN_AI_MODEL,
      messages: [
        {
          role: 'system',
          content: DEFAULT_SYSTEM_PROMPT,
        },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: DEFAULT_TEMPARTURE,
    }),
  });

  const response = await resp.json();

  return response;
};

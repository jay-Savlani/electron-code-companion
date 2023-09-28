import {
  OPEN_AI_HOST,
  OPEN_AI_KEY,
  OPEN_AI_MODEL,
  DEFAULT_TEMPARTURE,
  DEFAULT_SYSTEM_PROMPT,
  AWS_API,
} from './constants';

export interface Message {
  role: string;
  content: string;
}

export type Action = 'AnalyseCode' | 'GenerateCode' | 'GenerateTest';

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

export const awsApiConnect = async (
  language: string,
  messages: Message[],
  temperature: number,
  max_tokens: number,
  action: Action,
) => {
  const resp = await fetch(AWS_API, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      action: action,
      language: language,
      package: '',
      request: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: DEFAULT_SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: temperature || 1,
        max_tokens: max_tokens || 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
    }),
  });

  const response = await resp.json();

  return response;
};

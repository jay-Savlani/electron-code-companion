import { useState } from 'react';

export interface IRequestOptions {
  temperature: number;
  max_tokens: number;
}

const useRequestOptions = () => {
  const [requestOptions, setRequestOptions] = useState<IRequestOptions>({
    temperature: 70,
    max_tokens: 1000,
  });

  return {
    requestOptions,
    setRequestOptions,
  };
};

export default useRequestOptions;

import { useState } from 'react';

export interface IViews {
  'input editor': boolean;
  'output editor': boolean;
  options: boolean;
}

const useViews = () => {
  const [views, setViews] = useState<IViews>({
    'input editor': true,
    'output editor': true,
    options: false,
  });

  return { views, setViews };
};

export default useViews;

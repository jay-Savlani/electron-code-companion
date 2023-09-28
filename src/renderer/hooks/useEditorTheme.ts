import { useState } from 'react';

export type EditorTheme = 'light' | 'vs-dark';

const useEditorTheme = () => {
  const [editorTheme, setEditorTheme] = useState<EditorTheme>('vs-dark');

  return { editorTheme, setEditorTheme };
};

export default useEditorTheme;

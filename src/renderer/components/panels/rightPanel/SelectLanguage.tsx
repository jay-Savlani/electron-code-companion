import React, { SetStateAction } from 'react';
import { languages } from './constants';

interface ISelectLanguageProps {
  language: string;
  setlanguage: React.Dispatch<SetStateAction<string>> | undefined;
}

function SelectLanguage({ language, setlanguage }: ISelectLanguageProps) {
  function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (setlanguage) {
      setlanguage(e.target.value);
    }
  }

  return (
    <select
      value={language}
      onChange={onChangeSelect}
      className='w-100 mb-2 bg bg-dark text-white p-2'
    >
      {languages.length &&
        languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
    </select>
  );
}

export default SelectLanguage;

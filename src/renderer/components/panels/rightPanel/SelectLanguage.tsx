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
      className='form-select bg bg-secondary-subtle'
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

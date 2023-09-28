import React, { SetStateAction, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { IViews } from '../../../hooks/useViews';
import { EditorTheme } from '../../../hooks/useEditorTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface IViewDropDownProps {
  views: IViews;
  setViews: React.Dispatch<SetStateAction<IViews>>;
  editorTheme: EditorTheme;
  setEditorTheme: React.Dispatch<SetStateAction<EditorTheme>>;
}
interface IDropListItemProps {
  view: keyof IViews;
  display: boolean;
  setViews: React.Dispatch<SetStateAction<IViews>>;
}

const DropDownListItem = ({ view, display, setViews }: IDropListItemProps) => {
  const onClickItem = () => {
    setViews((prevState) => {
      return {
        ...prevState,
        [view]: !prevState[view],
      };
    });
  };

  return (
    <div
      className='row w-100 my-2'
      onClick={onClickItem}
      style={{ cursor: 'pointer' }}
    >
      <div className='col-8'>{view}</div>
      {display && (
        <div className='col-4'>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
};

interface IEditorThemeItemProps {
  theme: EditorTheme;
  themeState: EditorTheme;
  setTheme: React.Dispatch<SetStateAction<EditorTheme>>;
}

const EditorThemeItem = ({
  theme,
  themeState,
  setTheme,
}: IEditorThemeItemProps) => {
  const onClickItem = () => {
    setTheme(theme);
  };

  const display = theme === themeState;
  return (
    <div
      className='row w-100 my-2'
      onClick={onClickItem}
      style={{ cursor: 'pointer' }}
    >
      <div className='col-8'>{theme === 'vs-dark' ? 'dark' : theme}</div>
      {display && (
        <div className='col-4'>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
};

const ViewDropDown = ({
  views,
  setViews,
  editorTheme,
  setEditorTheme,
}: IViewDropDownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const viewArray = Object.keys(views) as (keyof IViews)[];
  const editorThemeArray: EditorTheme[] = ['vs-dark', 'light'];

  return (
    <div className='d-flex'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
        <DropdownToggle caret>View</DropdownToggle>
        <DropdownMenu className='px-2' style={{ width: '200px' }}>
          {viewArray.map((view) => (
            <DropDownListItem
              key={view}
              view={view}
              display={views[view]}
              setViews={setViews}
            />
          ))}
          <DropdownItem header className='text-center'>
            Editor Theme
          </DropdownItem>
          {editorThemeArray.map((theme) => (
            <EditorThemeItem
              theme={theme}
              themeState={editorTheme}
              setTheme={setEditorTheme}
            />
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ViewDropDown;

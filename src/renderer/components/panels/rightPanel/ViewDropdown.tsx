import React, { SetStateAction, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { IViews } from '../../../hooks/useViews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface IDropListItemProps {
  view: keyof IViews;
  display: boolean;
  setViews: React.Dispatch<SetStateAction<IViews>>;
}

interface IViewDropDownProps {
  views: IViews;
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

const ViewDropDown = ({ views, setViews }: IViewDropDownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const viewArray = Object.keys(views) as (keyof IViews)[];

  return (
    <div className='d-flex'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
        <DropdownToggle caret>View</DropdownToggle>
        <DropdownMenu className='px-2' style={{ width: '200px' }}>
          {viewArray.map((view) => (
            <DropDownListItem
              view={view}
              display={views[view]}
              setViews={setViews}
            />
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ViewDropDown;

import * as React from 'react';
import styled , { css } from 'styled-components';

import { useContent , useContentDispatch } from '@/pages/context/ContentContext';

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
  active &&
  `
  border-bottom: 2px solid black;
  opacity: 1;
`}

`;
const ButtonGroup = styled.div`
  display: flex;
`;

export default function Levels() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const contentDispatch = useContentDispatch(); 
  const content= useContent(); 
  //const [active, setActive] = React.useState(content.activeLevelId);
  console.log(content);
 //console.log(levels);

 function handleChangeLevel(e) {
  console.log(e.target.id);
  contentDispatch({
    type: 'changedLevel',
    id: e.target.id,
  });
}

  return (
    <div>
      <ButtonGroup>
       {content.levels.map(level => (        
          <Tab
          id = {level.id}
          key = {level.id}
          active = {level.id == content.activeLevelId}
          //active= {true}
          onClick={(e) => handleChangeLevel(e)}
        >
          {level.title}
        </Tab>

       ))}
       </ButtonGroup> 
    </div>
  );
}

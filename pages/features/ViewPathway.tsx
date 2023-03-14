
import * as React from 'react';
import clientPromise from "../../lib/mongodb";
import { GetServerSideProps } from 'next'
// import { useContent ,useContentDispatch } from '@/pages/context/ContentContext';
// import Content from './Content';


export default function ViewPathway({pathwaymodels}) {
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState(null);


  return (
    <div>
        ViewPathway 
        
       {pathwaymodels.map(p => (
        <li key={p.id}>
            {p.title}
            {p.content[0].text}
            {p.content[0].item.title}
            {p.content[0].item.type}
        </li>
        ))}
        
    </div>
  );
}

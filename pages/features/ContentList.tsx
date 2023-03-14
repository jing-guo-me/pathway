import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
//import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import { styled, lighten, darken } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useContent ,useContentDispatch } from '@/pages/context/ContentContext';
import Content from './Content';


let nextId = 3;

export default function ContentList() {
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState(null);
  const content = useContent();
  const contentDispatch = useContentDispatch();
  console.log(content);


  const addNewContent = () =>{
    contentDispatch({
      type:'added',
      id : nextId ++,
      text: '',
    });    
  }

  const saveContent = async () =>{
    

    try {
      let response = await fetch("http://localhost:3000/api/pathway/AddPathway", {
        method: "POST",
        body: JSON.stringify({
          title: "first title",
          content: contentList,
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      console.log(response);
    } catch (errorMessage: any) {
      console.log(errorMessage);
    }
  

    //console.log(contentList);
    // contentDispatch({
    //   type:'save',
    // });    
  }

  function handleChangeContent(content) {
    //console.log(content);
    contentDispatch({
      type: 'changed',
      content: content,
    });
  }

  return (
    <div>
      
         {content.levels[content.activeLevelId].content.map(content => (
        <li key={content.id}>
          <Content content={content} onChange={handleChangeContent}></Content>
        </li>
        ))} 
       <button onClick={addNewContent}>Add new level</button>
       space
       <button onClick={saveContent}>Save</button>
    </div>
  );
}

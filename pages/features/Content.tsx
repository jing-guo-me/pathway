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

import { useContent , useContentDispatch } from '@/pages/context/ContentContext';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 20px',
  //color: theme.palette.primary.main,
  // backgroundColor:
  //   theme.palette.mode === 'light'
  //     ? lighten(theme.palette.primary.light, 0.85)
  //     : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

import handleQuery from '@/pages/api/search'

export default function Content({ content ,onChange }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [typeValue, setTypeValue] = React.useState('Paper');
  const contentDispatch = useContentDispatch();
  

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeValue((event.target as HTMLInputElement).value);
  };

  const handleItemChange = (e : React.FormEvent<HTMLInputElement>, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    //console.log(content);
    onChange({
      ...content,
      item: newValue,
    });
    // contentDispatch({
    //   type : 'changedItem',
    //   id: content.id,
    //   item : newValue,
    // }); 
    //console.log(content);
  }

  
  const handleItemInputChange = (e, newInputValue) => {   
    setInputValue(newInputValue);
  }

  React.useEffect(() => {
    let active = true; 
    if(value ==='')
    {
      return;
    }
    if(value?.type !=='')
    { 
      setTypeValue(value?.type);
    }


    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }


    handleQuery(inputValue).then((result)=>{
      //console.log(result);
      let results=[];

      if(result[0] !==  undefined){
        setTitle(result[0]);
        setTypeValue("Link");
      }
      else if(result[1] !==  undefined && result[1].length > 0){
        
       if(result[1][0] !== undefined){
        results.push(...result[1][0].data.items);
       }
       if(result[1][1] !== undefined){
        results.push(...result[1][1].data.items);
       }
       if(result[1][2] !== undefined){
        results.push(...result[1][2].data.items);
       }

        console.log(results);

        setOptions(results);
      }
      //setOptions(result);     
    }).catch(error => {      
      console.error('There was an error!', error);
   });

    return () => {
      active = false;
    };
  }, [value, inputValue]);


  return (
    <div>
 <TextField id="standard-basic" 
 fullWidth 
 label='' 
 variant="standard" 
 value={content.title}
 placeholder="Title"
  onChange= { (e) =>{
    onChange({
      ...content,
      title: e.target.value,
    });
  }}
  ></TextField>
  
  <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Content type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Paper"
        name="radio-buttons-group"
        row
        value={content.contentType ?? " "}
        onChange= { (e) =>{
          onChange({
            ...content,
            contentType: e.target.value,
          });
        }}
      >
        <FormControlLabel value="Paper" control={<Radio />} label="Paper" />
        <FormControlLabel value="Book" control={<Radio />} label="Book" />        
        <FormControlLabel value="Link" control={<Radio />} label="Website Link" />
        <FormControlLabel value="Video" control={<Radio />} label="Video" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>


<Autocomplete
      id="content"
      sx={{ width: 1000 }}
      groupBy={(option) => option.type}
      getOptionLabel={(option) =>{
         //console.log(option);
         return option.title;
      }}
      freeSolo
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      //noOptionsText="No locations"
      onChange= {handleItemChange}
      onInputChange= {handleItemInputChange}
      renderInput={(params) => (
        <TextField {...params} label=" item " fullWidth />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}

      renderOption={(props, option) => {
        // const matches =
        //   option.structured_formatting.main_text_matched_substrings || [];

        // const parts = parse(
        //   option.structured_formatting.main_text,
        //   matches.map((match: any) => [match.offset, match.offset + match.length]),
        // );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
              <Box component="span"                    
                  >
                    { option.title} by:{option.author}
                  </Box>
                
                {/* {option.map((option, index) => (
                  <Box
                    key={index}
                    component="span"                    
                  >
                    {option.name}
                  </Box>
                ))} */}
                <Typography variant="body2" color="text.secondary">
                  {option.name}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  
  <TextField
          id="outlined-textarea"
          label="Description of the idea"
          placeholder="Description"
          multiline
          fullWidth
          rows={2}
          value={content.description}
          onChange= { (e) =>{
            onChange({
              ...content,
              description: e.target.value,
            });
          }}
        />
    </div>
  );
}

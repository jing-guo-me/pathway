const axios = require('axios').default;
import { parseString } from "xml2js"; 

//const url = 'https://www.googleapis.com/books/v1/volumes?q=flowers';

//const url = 'https://api.npms.io/v2/search?q=';
const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
const youtubeUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyD_KvU8dvoOBopNIYubymQPpw8p2Ltgh5A&part=snippet,id&order=date&maxResults=10&q='
const arxivUrl = 'http://export.arxiv.org/api/query?search_query=all:'
 

const openLibraryUrl = 'https://openlibrary.org/search.json?q='

const getData = async (url: string) => {
  const result = await axios.get(url)
      .then(function (response) {
          //console.log(response);
          if (response !== null) {
              return response;
          }
      })
      .catch(function (error) {
          if (error.response) {
              // handle response error
          } else if (error.request) {
              // handle request error
          } else {
              // handle network error
          }
      });

    return result;
}

function isValidHttpUrl(query:String) {
  let url;
  try {
    url = new URL(query);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

async function getTitle(query:String){
  const url = ' https://title.mihir.ch/' + query;

  const result = await axios.get(url)
  .then(function (response) {
      if (response !== null && response.data!=null) {
          return response.data;
      }
  })
  .catch(function (error) {
      if (error.response) {
          // handle response error
      } else if (error.request) {
          // handle request error
      } else {
          // handle network error
      }
  });


  return result;
}

async function getSuggestions(query:String){
  const urlPaths = [];
  const results=[];
  
  //urlPaths.push(`${youtubeUrl}${query}`);
  urlPaths.push(`${googleUrl}${query}`);
  //urlPaths.push(`${arxivUrl}${query}`);
  
  //console.log(urlPaths);

  await Promise.allSettled(urlPaths.map(async (urlpath) =>{
      const result = await getData(urlpath);
    
      if(result != null && 'data' in result) {
        if (result.data != null) {
          if(urlpath.includes(googleUrl)){
            result.type= "googlebook";
            result.data.items.map( i =>{ 
              i.type = "Book";
              i.title = i.volumeInfo?.title;
              //console.log( i.volumnInfo?.authors);
              i.author = i.volumeInfo?.authors.join(", ");
              //i.author = i.author.map(a => a.name).join(", ")

            })
            console.log(result);

            results.push(result);
          }

          
          if(urlpath.includes(arxivUrl)){
            result.type= "arxiv";

            // parsing xml data
            parseString(result.data, function (err, stringResult) {
              //console.log(stringResult);


              stringResult.feed.entry.map( i => {              
                 i.type = "Paper";
                 i.title = i.title[0];                 
                 i.author = i.author.map(a => a.name).join(", ")
              })
              stringResult.data = stringResult.feed;
              stringResult.data.items = stringResult.feed.entry;

              console.log(stringResult);
              results.push(stringResult);
            });
            // result.data.items.map( i => {              
            //  i.type = "Arxiv";
             

            // })
            //console.log(result.data);

            //results.push(result);
         }

          if(urlpath.includes(youtubeUrl)){
             result.type= "youtube";
             result.data.items.map( i => {              
              i.type = "Youtube";
              i.title = i.snippet.title;
              i.author ="youtube";
            } )
             //console.log(result.data);

             results.push(result);
          }

      }
    }
  }))
  return results;
}

export default async function handleQuery(query:String) : [string,Array] {
  if(isValidHttpUrl(query))
  {
    const title = await getTitle(query);
    return [title,undefined];
  }
  else{
    const result =await getSuggestions(query);

    return [undefined ,result];
  }
}

const getOpenlibrary = () => {
  const url = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'
  
  axios.get(url).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}


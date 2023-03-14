import { createContext, useContext } from 'react';
import {useImmerReducer} from 'use-immer';

const ContentContext = createContext(null);
const ContentDispatchContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, dispatch] = useImmerReducer(
    contentReducer,
    initialPathwaymodel
  );

  return (
    <ContentContext.Provider value={content}>
      <ContentDispatchContext.Provider value={dispatch}>
        {children}
      </ContentDispatchContext.Provider>
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}

export function useContentDispatch() {
  return useContext(ContentDispatchContext);
}

function contentReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        item: null,
      });
      break;
    }
    case 'changedLevel': {
      draft.activeLevelId = action.id;
      break;
    }

    case 'save':{

      break;
    }


    case 'changed': {
      console.log(action);
      const index = draft.findIndex((t) => t.id === action.content.id);
      draft[index] = action.content;
      console.log(draft[index]);
      //console.log(index);
      break;
    }

    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialContent = [
  { id: 0, title : 'first title', text: 'Philosopher’s Path', item: '',description :'', contentType:'' },
  { id: 1, title : 'second title', text: 'Visit the temple', item: '',description :'', contentType:'' },
]

const initialPathwaymodel = {
  title:"Adventure",
  activeLevelId: 0,
  levels: [{
    title:"Beginner",
    id:0,
    content:[
    { id: 0, title : 'first item', text: 'Philosopher’s Path', item: '',description :'', contentType:''}
    ,{ id: 1, title : 'second item', text: 'Visit the temple', item: '',description :'', contentType:''}]
  },
  {
    title:"Intermediate",
    id:1,
    content:[{}]
  },
  {
    title:"Advanced",
    id:2,
    content:[{},{}]
  }]
};
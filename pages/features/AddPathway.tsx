import * as React from 'react';
import Link from 'next/link';

import ContentList from '@/pages/features/ContentList.tsx';
import { ContentProvider } from '@/pages/context/ContentContext.tsx';
import Levels from './Levels.tsx';


export default function AddPathway() {
  return (
    <div>
      <h1>Add pathway</h1>
      <ContentProvider>
        <Levels></Levels>
        <ContentList></ContentList>       
      </ContentProvider>
    </div>
  );
}


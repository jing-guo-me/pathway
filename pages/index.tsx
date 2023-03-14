

import * as React from 'react';
import Link from 'next/link';

import ViewPathway from '@/pages/features/ViewPathway';
import pathways from '@/pages/features/pathways';

import clientPromise from '../lib/mongodb';

export default function Home({pathwaymodels}) {
  //const [content, setContent] = React.useState([{}]);

  return (
    <div>
          <h1 className="title">
      Add new <Link href="/features/AddPathway">this page!</Link>
    </h1>

    <ViewPathway pathwaymodels={pathwaymodels}>
    
    </ViewPathway>

    </div>
  );
}


export async function getServerSideProps() {
  try {
      const client = await clientPromise;
      const db = client.db("test");
      const pathwaymodels = await db
      .collection("pathwaymodels")
      .find({})
      .limit(20)
      .toArray();
      console.log(pathwaymodels);
      return {
          props: { pathwaymodels: JSON.parse(JSON.stringify(pathwaymodels)) },
      };
  } catch (e) {
      console.error(e);
  }
}

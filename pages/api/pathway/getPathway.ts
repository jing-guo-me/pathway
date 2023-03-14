import clientPromise from "../../../lib/mongodb";


const getPathway = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const posts = await db.collection("pathwaymodels").
    find({}).limit(20).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default getPathway;
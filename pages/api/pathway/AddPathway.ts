import clientPromise from "../../../lib/mongodb";

const AddPathway= async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { title, content } = req.body;

        const pathway = await db
            .collection("pathwaymodels")
            .insertOne({
                title,
                content
            });

        res.json(pathway);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};

export default AddPathway;
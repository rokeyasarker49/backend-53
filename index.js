const express = require("express");
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());



const uri = "This Is Secret Code";

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		const dataBase = client.db("usersItem");
		const userCollection = dataBase.collection("users");

		app.get("/users", async (request, response) => {
			const coursor = userCollection.find({});
			const users = await coursor.toArray();
			response.send(users);
		});

		app.post("/users", async (request, response) => {
			const inputUser = request.body;
			const result = await userCollection.insertOne(inputUser);
			response.send(result);
		});
	} finally {
	}
}

run().catch(console.dir);

app.get("/", (request, response) => {
	response.send("backend-53");
});

app.listen(port, () => {
	console.log(`This app listening on ${port}`);
});

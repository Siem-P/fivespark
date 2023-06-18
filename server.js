import express from "express"
import bodyParser from "body-parser"
import * as path from "path"
import * as dotenv from "dotenv"
import fetch from "node-fetch";

// load .env file
dotenv.config()

const server = express()

server.set("view engine", "ejs")
server.set("views", "./views")
server.set("port", process.env.PORT || 8000)

server.use(express.static(path.resolve('public')))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}))

server.listen(server.get("port"), () => {
	console.log(`Application started on http://localhost:${server.get("port")}`)
});

server.get("/", async (req, res) => {
	const pillarCategories = await dataFetch("https://api.fivespark.com/items/pillar_categories")
	
	const pillarCategory = pillarCategories.data.filter(data => data.id === 4)
	console.log(pillarCategory)

	res.render("index", { pillarCategory })
})


/* ---------------------------- Api call function --------------------------- */


const apiInformation = {
	method: "GET",
	headers: {
		Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
	}
}

async function dataFetch(url) {
	const data = await fetch(url, apiInformation)
		.then((response) => response.json())
		.catch((error) => error);
	return data;
}
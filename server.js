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


// FUNCTIONS 

server.get("/", async (req, res) => {

	

	const serviceContracts = await dataFetch("https://api.fivespark.com/items/service_contracts")
	const selectedContracts = serviceContracts.data.filter(contract => contract.id === 3 || contract.id === 4 || contract.id === 7)
	

	const activitiesServicesContracts = await dataFetch("https://api.fivespark.com/items/activities_service_contracts")
	
	const contract_basic = activitiesServicesContracts.data.filter(contract => contract.service_contracts_id === 3)
	const contract_complete = activitiesServicesContracts.data.filter(contract => contract.service_contracts_id === 4)
	const contract_premium = activitiesServicesContracts.data.filter(contract => contract.service_contracts_id === 7)


	const activityTranslations = await dataFetch("https://api.fivespark.com/items/activities_translations")
	// const all_contracts = [contract_basic, contract_complete, contract_premium]

	console.log(activityTranslations)

	// console.log(selectedContracts)
	// const pillarCategories = await dataFetch("https://api.fivespark.com/items/pillar_categories")
	// const activities_translations = await dataFetch("https://api.fivespark.com/items/activities_translations")
	// const pillarCategory = pillarCategories.data.filter(data => data.id === 4)
	

	res.render("index", { selectedContracts, contract_basic, contract_premium, contract_complete, activityTranslations })
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
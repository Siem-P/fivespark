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
server.use(bodyParser.urlencoded({
	extended: true
}))

server.listen(server.get("port"), () => {
	console.log(`Application started on http://localhost:${server.get("port")}`)
});


const apiInformation = {
	method: "GET",
	headers: {
		Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
	}
}

// FUNCTIONS && VARIABLES

const language = "nl-NL"



server.get("/", async (req, res) => {

	// GET Service Contracts
	const serviceContracts = await dataFetch("https://api.fivespark.com/items/service_contracts")
	// GET Activities in service contracts
	const activitiesServicesContracts = await dataFetch("https://api.fivespark.com/items/activities_service_contracts")
	// GET Translations for service contract]
	const contractTranslations = await dataFetch("https://api.fivespark.com/items/service_contracts_translations")
	// GET Translations & Info about activities
	const activityTranslations = await dataFetch("https://api.fivespark.com/items/activities_translations")

	const selectedContracts = serviceContracts.data.filter(contract => contract.id === 3 || contract.id === 4 || contract.id === 7)
	const selectedContractTranslations = contractTranslations.data.filter(translation => translation.id === 3 || translation.id === 4 || translation.id === 7)
	const contract_basic = activitiesServicesContracts.data.filter(contract => contract.service_contracts_id === 3)
	const contract_complete = activitiesServicesContracts.data.filter(contract => contract.service_contracts_id === 4)
	const contract_premium = activitiesServicesContracts.data.filter(contract => contract.service_contracts_id === 7)

	console.log(selectedContractTranslations)

	res.render("index", {
		selectedContracts,
		selectedContractTranslations,
		contract_basic,
		contract_premium,
		contract_complete,
		activityTranslations,
		language
	})

})


/* ---------------------------- Api call function --------------------------- */


async function dataFetch(url) {
	const data = await fetch(url, apiInformation)
		.then((response) => response.json())
		.catch((error) => error);
	return data;
}
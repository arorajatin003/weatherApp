const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	var query = req.body.cityInput +","+req.body.countryInput;
	console.log(query);	
	var units = req.body.unitsInput;
	const apiKey = "f6673784b6d406308299ea4b0927ca64";
	var url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units="+units +"&appid="+apiKey;
	https.get(url,function(response){
		console.log(response);
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
		 	const temp = weatherData.main.temp;
			const weather = weatherData.weather[0].description;
			const icon= weatherData.weather[0].icon;
			var image = "http://openweathermap.org/img/wn/"+ icon+"@2x.png";
			console.log(weather);
			console.log(temp +" K");
			res.write("<p>The weather condition is: "+ weather);
			res.write("<p>Temprature in "+ query+" is "+temp+" *c</p>");
			res.write("<img src=" +image+ ">");
			res.send();
		});
	});
});

	

app.listen(3000,function(){
	console.log("Server is runing on port 3000");
});
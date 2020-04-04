var fs = require("fs");

module.exports = function(app) {
	// This is the javascript file that will build the form when included
	app.get("/grahamtool/catalogjs.aspx", function (request, response) {
		addLog(request.connection.remoteAddress, request.headers["x-forwarded-for"], request.header("host"), request.url, request.get("Referrer"));
		
		response.sendfile(__dirname + "/static/catalog.js");
	});
	
	app.get("/grahamtool/stylecatmanage.css", function (request, response) {
		response.sendfile(__dirname + "/static/stylecatmanage.css");
	});
	
	// This will send the csv file based on the file requested
	app.get("/grahamtool/*.csv", function (request, response) {
		addLog(request.connection.remoteAddress, request.headers["x-forwarded-for"], request.header("host"), request.url, request.get("Referrer"));
		
		var file = request.path.substring(request.path.lastIndexOf("/") + 1);
		
		response.set("Content-Type", "text/csv");
		response.sendfile(__dirname + "/data/" + file);
	});
	
	// This is the code to process the form. It will redirect to the passed parameter
	app.post("/grahamtool/catalogprocess.aspx", function (request, response) {
		var firstName, lastName, address, city, state, zip, email, hear, employee, industry, budget;
		firstName = (typeof request.body.first !== "undefined") ? "\"" + request.body.first + "\"" : "";
		lastName = (typeof request.body.last !== "undefined") ? "\"" + request.body.last + "\"" : "";
		address = (typeof request.body.address !== "undefined") ? "\"" + request.body.address + "\"" : "";
		city = (typeof request.body.city !== "undefined") ? "\"" + request.body.city + "\"" : "";
		state = (typeof request.body.state !== "undefined") ? "\"" + request.body.state + "\"" : "";
		zip = (typeof request.body.zip !== "undefined") ? "\"" + request.body.zip + "\"" : "";
		email = (typeof request.body.email !== "undefined") ? "\"" + request.body.email + "\"" : "";
		hear = (typeof request.body.hear !== "undefined") ? "\"" + request.body.hear + "\"" : "";
		employee = (typeof request.body.employee !== "undefined") ? "\"" + request.body.employee + "\"" : "";
		industry = (typeof request.body.industry !== "undefined") ? "\"" + request.body.industry + "\"" : "";
		budget = (typeof request.body.budget !== "undefined") ? "\"" + request.body.budget + "\"" : "";

		var filePath = __dirname + "/data/"
			+ new Date().getFullYear().toString() + "-"
			+ ((new Date().getMonth().toString().length === 1) ? "0" + new Date().getMonth().toString() : new Date().getMonth().toString())
			+ ".csv";
		var fileData = firstName + "," + lastName + "," + address + "," + city + "," + state + "," + zip + "," + email + "," + hear + "," + employee + "," + industry + "," + budget + "\n";
		
		fs.exists(filePath, function (isExists) {
			if (!isExists) {
				fileData = "\"First Name\",\"Last Name\",\"Address\",\"City\",\"State\",\"Zip\",\"Email\",\"How Did You Hear\",\"How Many Employees\",\"What Is Your Industry\",\"Amount Budgeted For Tools\"\n"
					+ fileData;
			}
		
			fs.appendFile(filePath, fileData, function (error) {
				response.redirect(request.body.r);
			});
		});
		
		addLog(request.connection.remoteAddress, request.headers["x-forwarded-for"], request.header("host"), request.url, request.get("Referrer"));
	});
	
	app.get("/grahamtool/catalogmanage.aspx", function (request, response) {
		var dataFolder = __dirname + "/data";
		
		fs.readdir(dataFolder, function (error, files) {
			if (error) {
				response.set("Content-Type", "text/html");
				response.send(JSON.stringify(error));
			}
			else {
				var tableHtml = "", lines;
				for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
					if (files[fileIndex].indexOf(".csv") >= 0) {
						lines = fs.readFileSync(dataFolder + "/" + files[fileIndex], "utf8").split("\n");
						
						tableHtml += "<tr>"
							+ "<td>"
								+ "<a href=\"/grahamtool/" + files[fileIndex] + "?r=\" target=\"_new\">" 
									+ files[fileIndex].replace(".csv", "").substring(5)  + "/" + files[fileIndex].substring(0,4)
								+ "</a>"
							+ "</td>"
							+ "<td class=\"countData\">" + (lines.length - 2) + "</td>"
							+ "</tr>";
					}
				}
				
				var fileData = fs.readFileSync(__dirname + "/static/catalogmanage.html", "utf8");
				
				response.set("Content-Type", "text/html");
				response.send(fileData.replace("{{CatalogTable}}", tableHtml));
			}
		});
		
		addLog(request.connection.remoteAddress, request.headers["x-forwarded-for"], request.header("host"), request.url, request.get("Referrer"));
	});
	
	app.get("/grahamtool/test", function (request, response) {
		addLog(request.connection.remoteAddress, request.headers["x-forwarded-for"], request.header("host"), request.url, request.get("Referrer"));
		
		response.sendfile(__dirname + "/static/test.html");
	});
	
	function addLog(ip, forwardedIP, host, url, referrer) {
		var log = new Date() + "\t" +
			ip + "\t" +
			forwardedIP + "\t" +
			host + "\t" +
			url + "\t" +
			referrer + "\r\n";
		
		fs.appendFile(__dirname + "/data/log.txt", log, "utf8", function () { });
	}
};
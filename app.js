const express = require("express");
var request = require("request");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.static("image"));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));

  app.get("/style.css", function (req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });

  //__dirname : It will resolve to your project folder.
});

router.get("/clicked", (req, res) => {
  console.log("clicked Server");
  //         return res.redirect('/thanks');
  var mobileNumber = req.params["mobileNumber"];
  var consentId = req.params["consentId"];
  console.log(req.params);
  console.log ("mobileNumber = " + mobileNumber);
  console.log ("consentId = " + consentId);
  var options = {
    method: "POST",
    url: "https://consent-receive-api-rest-dev-esb.api.tatamotors.com/api/consent_receive/update",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
"ConsentId" : "0350b74ea0938fca076f1e95fd115143",
"MobileNumber": "918698917838",
"ConsentStatus":"ACTIVE"
}),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

  res.sendFile(path.join(__dirname + "/Thanks.html"));
});

router.get("/thanks", function (req, res) {
  console.log("Thanks Server");

  res.sendFile(path.join(__dirname + "/Thanks.html"));
});

//add the router
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us11.api.mailchimp.com/3.0/lists/0bbbaeddb7";
  const option = {
    method: "POST",
    auth: "reyansh1:9657e6d33ba9c57002f3f9e8ee0d45a3-us11"
  }

  const request = https.request(url, option, function(response){
    if(response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/success", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log('server is running on port 3000');
});

// API Key
// 9657e6d33ba9c57002f3f9e8ee0d45a3-us11

// List ide
// 0bbbaeddb7

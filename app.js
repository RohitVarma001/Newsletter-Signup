const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/test.html");
})

app.post("/",(req,res)=>{
  const fname = req.body.fName;
  const sname = req.body.sName;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address: email,
        status : "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: sname
        }
      }
    ]
    }
    const jData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/1229703989";
    options = {
      method:"post",
      auth: "Rohit:fa60ff18ddc11552380e96de2c8fcecd-us5"
    }
  const request = https.request(url,options,(resp)=>{
      if (resp.statusCode === 200) {
        res.sendFile(__dirname+"/sucess.html");
      } else {
        res.sendFile(__dirname+"/failure.html");
      }
      resp.on("data",(data)=>{
        console.log(JSON.parse(data));
      })
    })

    request.write(jData);
    request.end();
})

app.post("/failure",(req,res)=>{
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{
  console.log("Server Running in 3000");
})

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://subhan:33263766s@cluster0.ykfogwt.mongodb.net/?retryWrites=true&w=majority";
const cors = require("cors");
const { error } = require("cli");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "odwnfadsknkpdwngipwnvpwjiwon82748327fewiu34298332jpndvnndknda()cjhiohfidonflfndwlhciodshvncsondwohvwnkvodni";

app.use(cors());

mongoose.connect(mongoURL,{
  useNewUrlParser:true,
})
.then(() => {
  console.log("Connected To Database");
})
.catch((e) => console.log(e));


app.use(express.json());
app.listen(5000,() => {
    console.log("Server Started");
})

app.post("/post", async (req,res) => {
    console.log(req.body);
    const {data} = req.body;

    try {
        if(data == "subhan")
        {
            res.send({status:"ok"});
        }
        else
        {
            res.send({status:"User not found"})
        }

    } catch (error) {
        res.send({status:"error"});
    }
});

require("./userDeatils");

const user = mongoose.model("UserInfo");

app.post("/register", async (req,res) => {
  const {name, email, password} = req.body;
  const encryptPass = await bcrypt.hash(password,10);
  try {
    const oldUser =await user.findOne({email});
    if(oldUser)
    {
      return res.send({error:"User Already Exists"});
    }
    await user.create({
      name,
      email,
      password: encryptPass,
    });
    res.send({status:"ok"});
  } catch (error) {
    res.send({status:"Error"});
  } 
});

api.post("/login", async(req,res) => {
  const {email , password} = req.body;
  const User = await user.findOne({email});

  if(!User)
    {
      return res.send({error:"User does not exist."});
    }
  
  if(await bcrypt.compare(password,user.password))
  {
    const token = jwt.sign({}, JWT_SECRET);
  }

})
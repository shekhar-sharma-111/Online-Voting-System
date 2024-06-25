const {admin} = require("../model/User_");
const bcrypt = require("bcrypt");
require('dotenv').config();
const salt1 = process.env.Salt;

//.............................login user
const loginAdmin = async (req, res) => {
    console.log(req.body); 
  
    const { email, password } = req.body;
  
    const hash = bcrypt.hashSync(password, salt1);
    const loginAdmin = await admin.findOne(
      { email: email, password: hash },
      "+name +email"
    );
    if (!loginAdmin) {
      console.log("Invalid email or password");
      res.json({ message: "Invalid email or password", status: "400" });
    } else {
      console.log("admin fecthed :\n", loginAdmin.name, "\n", loginAdmin.email);
      res.json({
        status: "200",
        message: "admin fecthed ",
        data: loginAdmin,
      });
    }
  };

  //...............................register admin 
const registerAdmin = async (req, res) => {
    console.log(req.body);
  try{
    const { email,name,password} = req.body;
   
    const userExist = await admin.findOne({ email: email });
  if(userExist){
    console.log("admin already exits with email:",email)
    res.json({message:'admin already exists',
    status:'400',
  })}
  else{
    const hashPassword = bcrypt.hashSync(password, salt1);
    console.log("hash password:", hashPassword);
    const newAdmin = new admin({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newAdmin
      .save()
      .then((admindata) => {
        console.log(`admin registered with this mail:${email}`)
        //  res.send('user data insserted')
        res.json(
          {
          status: 200,
          message: "admin registered ",
          data: admindata,
        }
        );
      })}}
      catch(e){console.error(e.message);}
  
  };

  //......................change password

const changePassword = async (req, res) => {
  const email = req.body.email;
  const loginAdmin = await admin.findOne({ email: email }, "+password ");
  const password = loginAdmin.password;
  console.log(req.body);
  console.log("oldhash:", password);
  const old_password = bcrypt.hashSync(req.body.old_password, salt1);

  if (!loginAdmin) {
    res.json({
      status: 400,
      message: "user not found",
    });
    console.log("user not found with email");
  } else {
    if (password != old_password) {
      console.log("wrong password");
      res.json({
        status: 200,
        message: "wrong old password",
      });
    } else {
      const { new_password, confirm_password } = req.body;
      if (new_password != confirm_password) {
        console.log("confirm password mismatched");
        res.json({
          status: 200,
          message: " confirm password miss matched",
        });
      } else {
        const newhash = bcrypt.hashSync(req.body.new_password, salt1);
        admin
          .updateOne({ email: email }, { password: newhash })
          .then((data) => {
            console.log("user password updated ");
            console.log("newhash:", newhash);
            res.json({
              status: 200,
              message: "password changed ",
             
            });
          })
          .catch((e) => console.error(e.message));
      }
    }
  }
};

  //export controller
  module.exports={
    loginAdmin,registerAdmin,changePassword
  }


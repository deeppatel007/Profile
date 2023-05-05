const Express =   require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');




const app = Express();
  
dotenv.config();
  
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});


app.post("/user/generateToken", (req, res) => {

  let jwtSecretKey = process.env.JWT_SECRET_KEY;  
  let data = {
      name: "deep",
      userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});


app.get("/user/validateToken", (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let token = req.headers.authorization.split(' ')[1];
  // console.log(token);
  try {
      //const token = req.header(Authorization: tokenHeaderKey);
      
      const verified = jwt.verify(token, jwtSecretKey,{
        expiresIn: '1h'
      });
      console.log(token);
      if(verified){
          return res.send("Successfully Verified");
      }else{
          return res.status(401).send(error);
      }
  } catch (error) {      
      return res.status(401).send(error);
  }
});


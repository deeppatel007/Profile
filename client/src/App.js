import React, { useState } from 'react';
import CryptoJS from "crypto-js";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
const initialState = {
  name: "",
  email: "",
  password: "",
  image: ""
}
function App() {

  const [justifyActive, setJustifyActive] = useState('tab1');
  const [profile,setProfile] = useState(initialState);
  const [encrptedData, setEncrptedData] = useState("");
  const [decrptedData, setDecrptedData] = useState("");
  const secretPass = "XkhZG4fW2t2W";

  const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();
    let saveProfile = {...profile}
    saveProfile.password = data;
     setProfile(saveProfile);
  };
  const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
  };
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  async function handleChange(e) {
      console.log(e.target.files);
      let changeProfile = {...profile}
      changeProfile[e.target.name] = e.target.value;
      let base64;
      if(e.target.name==="file")
         base64 = await convertToBase64(e.target);
      setProfile(changeProfile);
      changeProfile[e.target.name] = e.target.value;
      console.log(profile)
  }
  async function submitHandle(){
   encryptData(profile.password);
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <MDBInput wrapperClass='mb-4' label='Name' name='name' id='form1' type='text' onChange={(e)=>handleChange(e)}/>
          <MDBInput wrapperClass='mb-4' label='Email' name='email' id='form1' type='email' onChange={(e)=>handleChange(e)}/>
          <MDBInput wrapperClass='mb-4' label='Password' name='password' id='form1' type='password' onChange={(e)=>handleChange(e)}/>
          <MDBInput wrapperClass='mb-4'  id='form1' name='image' type='file' onChange={(e)=>handleChange(e)} ></MDBInput>
          <MDBBtn className="mb-4 w-100" onClick={submitHandle}>Sign up</MDBBtn>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;
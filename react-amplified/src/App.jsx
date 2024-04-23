/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import config from './config';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import inprovLogo from './assets/InProv-logo-light.png'
import { useNavigate } from 'react-router-dom';
import { InProvForm } from './ui-components';


const App = ({ signOut, user }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    date: new Date(),
    provider: 'AWS',
    os: 'Ubuntu',
    cpuCores: '1', 
  });

  useEffect(() => {
  }, []);

  // Handle form change for text and radio inputs
  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Function to handle form submission
const handleSubmit = async (fields) => {
  console.log("handleSubmit called");
  console.log(fields);
  // e.preventDefault();
  try {
    // Construct the payload by adding the date field to the existing fields object
    const payload = {
      ...fields,
      date: new Date(), // Add the current date in ISO format
    };

    console.log("Submitting form data:", JSON.stringify(payload));
    navigate('/status'); // Navigate immediately after submission
    
    const response = await fetch('http://192.168.181.132:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // Ensure the payload is correctly converted to a JSON string
    });



      if (response.ok) {
        //navigate('/status'); // Navigate to WebSocketDisplay after submission
        const result = await response.json();
        console.log(result.message); // Or handle the response in UI
      } else {
        console.error('Server error');
        // Handle errors or show feedback in the UI
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle errors or show feedback in the UI
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <img src={inprovLogo} alt="Logo" className="logo" />
        <Heading level={1} className="heading">Hello, User</Heading>
        <Button onClick={signOut} className="sign-out-button">Sign out</Button>
      </div>
      <div className='form-container'>
      <InProvForm onSubmit={fields => { handleSubmit(fields)}}/>
      </div>
    </div>
  );  
};

export default withAuthenticator(App);

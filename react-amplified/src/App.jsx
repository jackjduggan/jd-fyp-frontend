/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import config from './config';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import inprovLogo from './assets/InProv-logo-light.png'

const App = ({ signOut, user }) => {

  const [formData, setFormData] = useState({
    name: '',
    date: new Date(),
    provider: 'AWS',
    os: 'RHEL 8',
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
  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    try {
      console.log("Submitting form data:", JSON.stringify(formData));
      const response = await fetch('http://192.168.181.132:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
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
        <Heading level={1} className="heading">Hello {user.address}</Heading>
        <Button onClick={signOut} className="sign-out-button">Sign out</Button>
      </div>
      <div className="form-container">
        <strong>Configuration Form</strong>
        <p>Fill out the form to build your machine.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="question-header">Name:</label>
            <p className="question-description">Please enter the name for the configuration.</p>
            <input
              className="input-field"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          {/* ### CLOUD PROVIDER ### */}
          <div className="question-section">
            <div className="question-header">Which Cloud Provider?</div>
            <p className="question-description">Select your preferred cloud service provider.</p>
            <div className="options-container">
              <label className="option-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="provider"
                  value="AWS"
                  checked={formData.provider === 'AWS'}
                  onChange={(e) => handleChange('provider', e.target.value)}
                />
                Amazon Web Services (AWS)
              </label>
              <label className="option-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="provider"
                  value="GCP"
                  checked={formData.provider === 'GCP'}
                  onChange={(e) => handleChange('provider', e.target.value)}
                />
                Google Cloud Platform (GCP)
              </label>
            </div>
          </div>

          {/* ### OPERATING SYSTEM ### */}
          <div className="question-section">
            <div className="question-header">Which OS?</div>
            <p className="question-description">Select your preferred Linux operating system.</p>
            <div className="options-container">
              <label className="option-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="os"
                  value="RHEL8"
                  checked={formData.os === 'RHEL8'}
                  onChange={(e) => handleChange('os', e.target.value)}
                />
                RHEL 8
              </label>
              <label className="option-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="os"
                  value="Fedora"
                  checked={formData.os === 'Fedora'}
                  onChange={(e) => handleChange('os', e.target.value)}
                />
                Fedora
              </label>
            </div>
          </div>

          {/* ### CPU CORES / MACHINE SIZE ### */}
          <div className="question-section">
            <div className="question-header">How many CPU Cores?</div>
            <p className="question-description">How many cores does your machine need?</p>
            <div className="options-container">
              <label className="option-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="cpuCores"
                  value="1"
                  checked={formData.cpuCores === '1'}
                  onChange={(e) => handleChange('cpuCores', e.target.value)}
                />
                1 Core
              </label>
              <label className="option-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="cpuCores"
                  value="2"
                  checked={formData.cpuCores === '2'}
                  onChange={(e) => handleChange('cpuCores', e.target.value)}
                />
                2 Cores
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Configuration
          </button>

        </form>
      </div>
    </div>
  );  
};

export default withAuthenticator(App);

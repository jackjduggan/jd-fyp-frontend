/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import { generateClient } from 'aws-amplify/api';
// import { createTodo } from './graphql/mutations';
// import { listTodos } from './graphql/queries';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import inprovLogo from './assets/InProv-logo-light.png'
//const client = generateClient();

const App = ({ signOut, user }) => {
  // const [formState, setFormState] = useState(initialState);
  // const [todos, setTodos] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    date: new Date(), // Automatically set to current date
    provider: 'AWS',
    os: 'RHEL 8', // Default selection for OS
    cpuCores: '1', // Default selection for CPU Cores
  });

  useEffect(() => {
    //fetchTodos();
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

  // function setInput(key, value) {
  //   setFormState({ ...formState, [key]: value });
  // }

  // async function fetchTodos() {
  //   try {
  //     const todoData = await client.graphql({
  //       query: listTodos
  //     });
  //     const todos = todoData.data.listTodos.items;
  //     setTodos(todos);
  //   } catch (err) {
  //     console.log('error fetching todos');
  //   }
  // }

  // async function addTodo() {
  //   try {
  //     const todo = { ...formState };
  //     setTodos([...todos, todo]);
  //     setFormState(initialState);
  //     await client.graphql({
  //       query: createTodo,
  //       variables: {
  //         input: todo
  //       }
  //     });
  //   } catch (err) {
  //     console.log('error creating todo:', err);
  //   }
  // }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <img src={[inprovLogo]} alt="Logo" style={styles.logo} />
        <Heading level={1} style={styles.heading}>Hello {user.address}</Heading>
        <Button onClick={signOut} style={styles.signOutButton}>Sign out</Button>
      </div>
      <div style={styles.formContainer}>

        <strong>Configuration Form</strong>
        <p>Fill out the form to build your machine.</p>


        <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.questionHeader}>Name:</label>
          <p style={styles.questionDescription}>Please enter the name for the configuration.</p>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>


          <div style={styles.questionHeader}>
          Which Cloud Provider?
          <p style={styles.questionDescription}>Select your preferred cloud service provider.</p>
          <label style={styles.optionLabel}>
            Amazon Web Services (AWS)
            <input
              style={styles.radioInput}
              type="radio"
              value="AWS"
              checked={formData.provider === 'AWS'}
              onChange={(e) => handleChange('provider', e.target.value)}
            />
          </label>
          <label style={styles.optionLabel}>
            Google Cloud Platform (GCP)
            <input
              style={styles.radioInput}
              type="radio"
              value="GCP"
              checked={formData.provider === 'GCP'}
              onChange={(e) => handleChange('provider', e.target.value)}
            />
          </label>
        </div>

          <fieldset>
            <legend>Which OS?</legend>
            <label>
              <input
                type="radio"
                value="RHEL 8"
                checked={formData.os === 'RHEL 8'}
                onChange={(e) => handleChange('os', e.target.value)}
              />
              RHEL 8
            </label>
            <label>
              <input
                type="radio"
                value="Fedora"
                checked={formData.os === 'Fedora'}
                onChange={(e) => handleChange('os', e.target.value)}
              />
              Fedora
            </label>
          </fieldset>
          <fieldset>
            <legend>How many CPU Cores?</legend>
            <label>
              <input
                type="radio"
                value="1"
                checked={formData.cpuCores === '1'}
                onChange={(e) => handleChange('cpuCores', e.target.value)}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={formData.cpuCores === '2'}
                onChange={(e) => handleChange('cpuCores', e.target.value)}
              />
              2
            </label>
          </fieldset>
          <button type="submit" style={styles.button}>
            Submit Configuration
          </button>
        </form>
      </div>
    </div>
  );  
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '20px',
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '40px',
  },
  logo: {
    maxHeight: '100px',
  },
  heading: {
    margin: '0 auto',
  },
  signOutButton: {
    marginLeft: 'auto',
  },
  formContainer: {
    width: '100%',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  questionHeader: {
    fontSize: '1.2em', // Slightly larger
    fontWeight: 'bold',  // Bold text
    margin: '10px 0 5px', // Space around the header
  },
  questionDescription: {
    fontSize: '0.9em', // Smaller text for the description
    color: '#6c757d',  // Grey text color
    marginBottom: '10px', // Space below the description
  },
  optionLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px', // Space between options
  },
  radioInput: {
    marginRight: '10px', // Space to the left of the radio button
  },
};

export default withAuthenticator(App);

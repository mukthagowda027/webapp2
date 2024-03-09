// pages/index.js

import { useState } from 'react';
import styles from '../styles/Index.module.css'; // Import CSS module

const IndexPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch age
      const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
      const { age } = await ageResponse.json();
      setAge(age);

      // Fetch gender
      const genderResponse = await fetch(`https://api.genderize.io?name=${name}`);
      const { gender } = await genderResponse.json();
      setGender(gender);

      // Fetch country
      const countryResponse = await fetch(`https://api.nationalize.io?name=${name}`);
      const { country } = await countryResponse.json();
      if (country.length > 0) {
        
        setCountry(country[0].country_id);
      } else {
        setCountry('Not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.container}> 
      <h1 className={styles.title}>Guess Age, Gender, and Country App</h1>
      <form onSubmit={handleSubmit}>
      <label className={styles.label}>
         Enter Name:
        </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input} 
          />        
        <button type="submit" className={styles.button}>Submit</button> 
      </form>
      {age && gender && country && (
        <div className={styles.results}>
          <h2>Results:</h2>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Country: {country}</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;

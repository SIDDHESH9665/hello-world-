import React, { useState } from 'react';
import './App.css';

function App() {
  const [language, setLanguage] = useState('english');
  const [message, setMessage] = useState('Hello World');

  // Function to handle language change
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
    getHelloMessage(event.target.value);  // Get the message for the selected language
  };

  // Function to fetch and display the translated message
  const getHelloMessage = async (selectedLanguage) => {
    try {
      const response = await fetch(`http://localhost:5000/hello?language=${selectedLanguage}`);
      if (response.ok) {
        const data = await response.text();
        setMessage(data);  // Set the translated message
        triggerTypingEffect(document.getElementById('result'));  // Trigger the animation
      } else {
        setMessage('Translation not available');
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
      setMessage('Error fetching translation');
    }
  };

  // Trigger the typing animation for the output message
  function triggerTypingEffect(element) {
    element.style.animation = 'none';
    // Triggering reflow without causing the ESLint warning
    void element.offsetHeight;  // Forces a reflow without using the value
    element.style.animation = 'typing 1.5s steps(40) 1s forwards, fadeIn 0.8s ease-in-out forwards, scaleUp 0.3s ease-in-out forwards';
  }

  return (
    <div className="container">
      <h1>Say Hello Worldwide</h1>
      <div className="controls">
        <label htmlFor="language">Choose a language:</label>
        <select
          id="language"
          value={language}
          onChange={handleChangeLanguage}
        >
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="hindi">Hindi</option>
          <option value="spanish">Spanish</option>
          <option value="german">German</option>
        </select>
      </div>
      <div className="text-display">
        <p id="result">{message}</p>
      </div>
      <button onClick={() => getHelloMessage(language)}>Translate</button>
    </div>
  );
}

export default App;

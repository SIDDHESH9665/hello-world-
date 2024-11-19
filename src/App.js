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
  const getHelloMessage = (selectedLanguage) => {
    const translations = {
      english: "Hello World",
      french: "Bonjour le monde",
      hindi: "नमस्ते संसार",
      spanish: "Hola Mundo", // Added a Spanish translation
      german: "Hallo Welt", // Added a German translation
    };

    const resultElement = document.getElementById('result');
    
    // Change the font based on the language
    if (selectedLanguage === 'hindi') {
      resultElement.style.fontFamily = "'Noto Sans Hindi', sans-serif";
    } else {
      resultElement.style.fontFamily = "'Poppins', sans-serif";
    }

    // Check if the selected language has a translation
    setMessage(translations[selectedLanguage] || translations['english']);
    triggerTypingEffect(resultElement);
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
          <option value="spanish">Spanish</option>  {/* Added Spanish option */}
          <option value="german">German</option>    {/* Added German option */}
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
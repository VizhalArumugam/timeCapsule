import { useState, useEffect, use } from 'react';
import './styles/main.css';
import background from './images/background.jpg';
import grass from './images/grass.png';
import Main from './components/Main';

function App() {
  const [boxShadow, setBoxShadow] = useState("0 0 80px rgba(245, 237, 4, 1)");
  const [displayText, setDisplayText] = useState("");

  const text = ['Hey!','I am, Rizen','Wondering, What it is?','You wont believe me','It is a','Time Capsule!!',"Click it's top"]
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoxShadow(prevBoxShadow => 
        prevBoxShadow === "0 0 80px rgba(245, 237, 4, 1)" 
        ? "0 0 30px rgb(255, 255, 255)" 
        : "0 0 80px rgba(245, 237, 4, 1)"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let i = 0; // Index to track current text
    const textInterval = setInterval(() => {


      window.speechSynthesis.onvoiceschanged = () => {
        console.log("Voices updated:", window.speechSynthesis.getVoices());
      };
      const text1 = text[i];
      if (!text1) {
        alert("Please enter some text to speak!");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text1);

      utterance.pitch = 1.0; 
      utterance.rate = 0.9;  
      utterance.volume = 0.1;  

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name === 
        "Microsoft Steffan Online (Natural) - English (United States)");

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        console.log("Female voice not found, using default voice.");
      }

      window.speechSynthesis.speak(utterance);












      setDisplayText(text[i]); 
      i++;
      if (i >= text.length) {
        clearInterval(textInterval); 
      }
    }, 2500); 

    return () => clearInterval(textInterval); 
  }, []); 

  return (
    /*<div className="outer">
      <div className="head">
        <h5>RIZEN TORQUE</h5>
        <div className="about">
          <h6>Front-end</h6>
          <h6>Back-end</h6>
          <h6>Documentation</h6>
        </div>
      </div>
      
      <div className="hero">
        <div className="display-area">{displayText}</div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="capsule-container" style={{ boxShadow: boxShadow }}>
          <div className="capsule"></div>
        </div>
        <img src={grass} alt="grass" />
      </div>
    </div>*/
    <Main/>
  );
}

export default App;

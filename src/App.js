import { useState, useEffect, useRef } from 'react'; 
import './styles/main.css';
import background from './images/background.jpg';
import grass from './images/grass.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Main from "./components/Main.js";
import LoadingSpinner from './components/LoadingSpinner';
import eggcrack from './sounds/eggcrack.m4a'
import EmailForm from './components/EmailForm.js';
import Mail from './components/Mail.js';
function App() {
  const [boxShadow, setBoxShadow] = useState("0 0 80px rgba(245, 237, 4, 1)");
  const [displayText, setDisplayText] = useState("");
  const [pgNumber, setPgNumber] = useState(1);
  const [loading, setLoading] = useState(false);  
  const [dev,setDev] = useState("");
  const audioRef = useRef(null); 



  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play(); 
    }
  };

  function updatePage() {
    playAudio();
    setLoading(true);
    setPgNumber((p) => {
      p = p === 1 ? 2 : 1;
      return p;
    });

  }

  const text = ['Hey!', 'I am, Rizen', 'Wondering, What it is?', 'You wont believe me', 'It is a', 'Time Capsule!!', "Click on it's top"];
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoxShadow((prevBoxShadow) =>
        prevBoxShadow === "0 0 80px rgba(245, 237, 4, 1)"
          ? "0 0 30px rgb(255, 255, 255)"
          : "0 0 80px rgba(245, 237, 4, 1)"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let i = 0; 
    const textInterval = setInterval(() => {
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
      const femaleVoice = voices.find(voice => voice.name === "Microsoft Steffan Online (Natural) - English (United States)");

      if (femaleVoice) {
        utterance.voice = femaleVoice;
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

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);  
      }, 1000);  

      return () => clearTimeout(timer);
    }
  }, [loading]);

  function displayDev(num){
    const dispEl = document.querySelector('.display-dev');
    dispEl.style.opacity = '1';
    if(num == 1){
        
        setDev("Hasith S & Hemanth R");
        setTimeout(()=>{
          dispEl.style.opacity='0';
        },2000)
    }else if(num == 2){
        setDev("Muhammad Numaan Ahmad Azad");
        setTimeout(()=>{
          dispEl.style.opacity='0';
        },2000)
    }else{
        setDev("Vizhal A");
        setTimeout(()=>{
          dispEl.style.opacity='0';
        },2000)
    }
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className={`page-container ${loading ? "loading" : ""}`}>
              {/* Overlay for dull effect */}
              {loading && <div className="loading-overlay"></div>}
  
              {loading ? (
                <LoadingSpinner /> 
              ) : pgNumber === 1 ? (
                <div className="outer">
                  <div className="head">
                  
                    <h5>RIZEN TORQUE</h5>
                    <div className="cont">
                      <div className="display-dev">{dev}</div>
                    </div>
                    <div className="about">
                      <h6 onClick={()=>displayDev(1)}>Front-end</h6>
                      <h6 onClick={()=>displayDev(2)}>Back-end</h6>
                      <h6 onClick={()=>displayDev(3)}>Documentation</h6>
                    </div>
                  </div>
  
                  <div className="hero">
                    
                    <div className="display-area">{displayText}</div>
                    <div className="sparkle"></div>
                    <div className="capsule-container" style={{ boxShadow: boxShadow }}>
                      <div className="capsule" onClick={updatePage}></div>
                    </div>
                    <img src={grass} alt="grass" />
                  </div>
                </div>
              ) : (
                <Main updatePage={updatePage} />
              )}
            </div>
          }
        />
      </Routes>

      {/* Audio element that will be played when capsule is clicked */}
      <audio ref={audioRef} src={eggcrack} preload="auto"></audio>
    </Router>
    
  );
}

export default App;

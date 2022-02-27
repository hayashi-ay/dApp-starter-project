import React, { useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Ethereum object not found. Make sure you have metamask!");
    } else {
      console.log("Ethereum object is found", ethereum);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const wave = () => {

  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="hand-wave">👋</span> WELCOME!
        </div>

        <div className="bio">
        イーサリアムウォレットを接続して、メッセージを作成したら、<span role="img" aria-label="hand-wave">👋</span>を送ってください<span role="img" aria-label="shine">✨</span>
        </div>

        <button className="waveButton" onClick={wave}>
        Wave at Me
        </button>
      </div>
    </div>
  );
}

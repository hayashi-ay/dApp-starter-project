import React, { useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Ethereum object not found. Make sure you have metamask!");
        return ;
      } else {
        console.log("Ethereum object is found.", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      if (accounts.length === 0) {
        console.log("No authorized account found");
        return ;
      }
      const account = accounts[0];
      console.log("An authorized account found.", account);
    } catch (e) {
      console.log(e);
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

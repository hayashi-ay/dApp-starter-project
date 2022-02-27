import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./abi/WavePortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  console.log("currentAccount:", currentAccount);
  const contractAddress = process.env.REACT_APP_WAVE_PORTAL_CONTRACT_ADDRESS;
  console.log("contractAddress:", contractAddress);
  const contractABI = abi.abi;

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
      setCurrentAccount(account);
    } catch (e) {
      console.log(e);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask");
        return ;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count is", count.toNumber());
        console.log("Signer:", signer);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="hand-wave">👋</span> WELCOME!
        </div>

        <div className="bio">
        イーサリアムウォレットを接続して、メッセージを作成したら、<span role="img" aria-label="hand-wave">👋</span>を送ってください<span role="img" aria-label="shine">✨</span>
        </div>

        {currentAccount && (
          <button className="waveButton" onClick={wave}>
          Wave at Me
          </button>
        )}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
          Connect to Wallet
          </button>
        )}
      </div>
    </div>
  );
}

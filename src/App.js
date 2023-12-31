import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [qrCodeError, setQrCodeError] = useState(false);
  const qrCodeRef = useRef();

  console.log(input);

  const handleInputChange = (event) => {
    
    // to handle error
    const inputValue = event.target.value;
    if (inputValue.length <= 500) {
      setInput(inputValue);
      setQrCodeError(false);
    } else {
      setInput("");
      setQrCodeError(true);
    }
  };

  const handleDownloadClick = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const dataUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.click();
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter text or URL"
      />
      {qrCodeError && <h4 className="error">Data is too long....</h4>}
      {!qrCodeError && input && (
        <div ref={qrCodeRef}>
          <QRCode value={input} />
        </div>
      )}
      {!qrCodeError && input && (
        <button onClick={handleDownloadClick}>Download QR</button>
      )}
    </div>
  );
}

export default App;

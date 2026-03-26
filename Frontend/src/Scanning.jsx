import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, Image as ImageIcon, Keyboard, X, ArrowRight } from 'lucide-react';
import ScanResult from './ScanResult';

export default function NutriScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [scanResultData, setScanResultData] = useState(null);
  const qrCodeRef = useRef(null);

  // 1. Handle Live Camera Scanning
  const startCamera = async () => {
    setIsScanning(true);
    setShowManualInput(false);
    setScanResultData(null);
    const html5QrCode = new Html5Qrcode("reader");
    qrCodeRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          handleSuccess(decodedText);
          stopCamera();
        }
      );
    } catch (err) {
      console.error("Camera Error:", err);
      setIsScanning(false);
    }
  };

  const stopCamera = async () => {
    if (qrCodeRef.current) {
      await qrCodeRef.current.stop();
      qrCodeRef.current = null;
      setIsScanning(false);
    }
  };

  // 2. Handle Gallery Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsProcessing(true);
    const html5QrCode = new Html5Qrcode("reader");
    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      handleSuccess(decodedText);
    } catch (err) {
      alert("Could not find a valid barcode. Please try a clearer photo.");
      setIsProcessing(false);
    }
  };

  // 3. Handle Success (Fetch AI Analysis)
  const handleSuccess = async (barcode) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`http://localhost:8000/api/scan/${barcode}`);
      const data = await response.json();
      if (data.error) {
        alert("Product not found.");
      } else {
        setScanResultData(data);
      }
    } catch (error) {
      alert("Backend connection failed.");
    } finally {
      setIsProcessing(false);
      setShowManualInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Identify Product</h1>
        <p className="text-slate-500 mt-2">Scan, upload, or type the barcode</p>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden shadow-sm">
        
        <div id="reader" className={`absolute inset-0 w-full h-full ${isScanning ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* DEFAULT VIEW: Icons and Manual Input */}
        {!isScanning && !isProcessing && (
          <div className="flex flex-col items-center gap-6 z-10 p-8 w-full">
            {!showManualInput ? (
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-[#2ecc71]">
                <Camera size={40} />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-full bg-white border-2 border-[#2ecc71] rounded-2xl p-4 flex items-center gap-3">
                   <Keyboard className="text-slate-400" size={20}/>
                   <input 
                    type="text" 
                    placeholder="Enter Barcode Number"
                    className="flex-1 outline-none text-lg font-bold tracking-widest"
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                   />
                   <button 
                    onClick={() => handleSuccess(manualBarcode)}
                    className="bg-[#2ecc71] text-white p-2 rounded-xl"
                   >
                    <ArrowRight size={20}/>
                   </button>
                </div>
                <button onClick={() => setShowManualInput(false)} className="text-sm font-bold text-slate-400">Cancel</button>
              </div>
            )}
          </div>
        )}

        {/* SCANNING OVERLAY */}
        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <div className="w-56 h-56 border-2 border-[#2ecc71] rounded-3xl relative">
              <div className="absolute w-full h-1 bg-[#2ecc71] shadow-[0_0_15px_#2ecc71] animate-scan-move"></div>
            </div>
            <button onClick={stopCamera} className="mt-12 bg-white p-3 rounded-full text-red-500 pointer-events-auto shadow-lg"><X size={24}/></button>
          </div>
        )}

        {/* PROCESSING LOADER */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#2ecc71] rounded-full animate-spin"></div>
            <p className="mt-4 font-bold text-slate-600 tracking-tight">Analyzing...</p>
          </div>
        )}
      </div>

      {/* FOOTER BUTTONS */}
      {!isScanning && !isProcessing && (
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-10">
          <button onClick={startCamera} className="flex flex-col items-center gap-2 p-4 bg-[#2ecc71] text-white rounded-3xl shadow-lg active:scale-95 transition-all">
            <Camera size={24} />
            <span className="font-bold text-[10px] uppercase">Camera</span>
          </button>

          <label className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-slate-100 text-slate-700 rounded-3xl cursor-pointer active:scale-95 transition-all">
            <ImageIcon size={24} />
            <span className="font-bold text-[10px] uppercase">Gallery</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>

          <button onClick={() => setShowManualInput(true)} className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-slate-100 text-slate-700 rounded-3xl active:scale-95 transition-all">
            <Keyboard size={24} />
            <span className="font-bold text-[10px] uppercase">Type ID</span>
          </button>
        </div>
      )}

      {scanResultData && (
        <ScanResult data={scanResultData} onClose={() => setScanResultData(null)} />
      )}

      <style>{`
        @keyframes scan-move { 0%, 100% { top: 0%; } 50% { top: 100%; } }
        .animate-scan-move { position: absolute; animation: scan-move 2.5s ease-in-out infinite; }
        #reader video { object-fit: cover !important; border-radius: 2.5rem; }
      `}</style>
    </div>
  );
}
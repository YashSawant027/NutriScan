import React, { useState, useRef } from 'react';
// Added Html5QrcodeSupportedFormats to the import
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, Image as ImageIcon, Keyboard, X, ArrowRight } from 'lucide-react';
import ScanResult from './ScanResult';

export default function NutriScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [scanResultData, setScanResultData] = useState(null);
  const qrCodeRef = useRef(null);

  // 1. Handle Live Camera Scanning (UPDATED FOR 1D BARCODES)
  const startCamera = async () => {
    setIsScanning(true);
    setShowManualInput(false);
    setScanResultData(null);
    
    const html5QrCode = new Html5Qrcode("reader");
    qrCodeRef.current = html5QrCode;

    // CONFIGURATION FOR PRODUCT BARCODES
    const qrConfig = {
      fps: 20, 
      // Rectangular box (280x160) is MUCH better for catching long 1D barcodes
      qrbox: { width: 280, height: 160 }, 
      aspectRatio: 1.0,
      // CRITICAL: Explicitly enable EAN and UPC formats
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128
      ]
    };

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        qrConfig,
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
      try {
        await qrCodeRef.current.stop();
      } catch (err) {
        console.error("Stop Error:", err);
      }
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
      // Scan file with 1D formats enabled
      const decodedText = await html5QrCode.scanFile(file, true);
      handleSuccess(decodedText);
    } catch (err) {
      alert("No barcode detected. Ensure the photo is clear and horizontal.");
      setIsProcessing(false);
    }
  };

  // 3. Handle Success (Fetch AI Analysis)
  const handleSuccess = async (barcode) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`https://nutriscan-uadu.onrender.com/api/scan/${barcode}`);
      const data = await response.json();
      setScanResultData(data);
    } catch (error) {
      alert("Backend connection failed. Is FastAPI running?");
    } finally {
      setIsProcessing(false);
      setShowManualInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Identify Product</h1>
        <p className="text-slate-500 mt-2 font-medium">Scan the barcode on the packaging</p>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden shadow-sm">
        
        <div id="reader" className={`absolute inset-0 w-full h-full ${isScanning ? 'opacity-100' : 'opacity-0'}`}></div>

        {!isScanning && !isProcessing && (
          <div className="flex flex-col items-center gap-6 z-10 p-8 w-full">
            {!showManualInput ? (
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-500">
                <Camera size={40} />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-full bg-white border-2 border-emerald-500 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
                   <Keyboard className="text-slate-400" size={20}/>
                   <input 
                    type="text" 
                    placeholder="Enter Barcode"
                    className="flex-1 outline-none text-lg font-bold tracking-widest"
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                   />
                   <button onClick={() => handleSuccess(manualBarcode)} className="bg-emerald-500 text-white p-2 rounded-xl">
                    <ArrowRight size={20}/>
                   </button>
                </div>
                <button onClick={() => setShowManualInput(false)} className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cancel</button>
              </div>
            )}
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            {/* Wider Scan Area for 1D Barcodes */}
            <div className="w-72 h-40 border-2 border-emerald-500 rounded-2xl relative shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="absolute w-full h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-scan-move"></div>
            </div>
            <button onClick={stopCamera} className="mt-12 bg-white p-3 rounded-full text-rose-500 pointer-events-auto shadow-xl">
              <X size={24}/>
            </button>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="mt-4 font-black text-slate-600 uppercase text-[10px] tracking-[0.3em]">Decoding Barcode...</p>
          </div>
        )}
      </div>

      {!isScanning && !isProcessing && (
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-10">
          <button onClick={startCamera} className="flex flex-col items-center gap-2 p-4 bg-emerald-500 text-white rounded-[2rem] shadow-xl active:scale-95 transition-all">
            <Camera size={24} />
            <span className="font-bold text-[10px] uppercase">Scan</span>
          </button>

          <label className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 text-slate-700 rounded-[2rem] cursor-pointer shadow-sm active:scale-95 transition-all">
            <ImageIcon size={24} />
            <span className="font-bold text-[10px] uppercase">Upload</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>

          <button onClick={() => setShowManualInput(true)} className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 text-slate-700 rounded-[2rem] shadow-sm active:scale-95 transition-all">
            <Keyboard size={24} />
            <span className="font-bold text-[10px] uppercase">Manual</span>
          </button>
        </div>
      )}

      {scanResultData && (
        <ScanResult data={scanResultData} onClose={() => setScanResultData(null)} />
      )}

      <style>{`
        @keyframes scan-move { 0%, 100% { top: 10%; } 50% { top: 90%; } }
        .animate-scan-move { position: absolute; animation: scan-move 2.0s ease-in-out infinite; }
        #reader video { object-fit: cover !important; border-radius: 3rem; }
      `}</style>
    </div>
  );
}
import React, { useState, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, Image as ImageIcon, Keyboard, X, ArrowRight } from 'lucide-react';
import ScanResult from './ScanResult';
import Navbar from './Navbar';


export default function NutriScanner() {

  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [scanResultData, setScanResultData] = useState(null);

  const qrCodeRef = useRef(null);


  /* Start Camera */
  const startCamera = async () => {

    setIsScanning(true);
    setShowManualInput(false);
    setScanResultData(null);

    const html5QrCode = new Html5Qrcode("reader");
    qrCodeRef.current = html5QrCode;

    const qrConfig = {

      fps: 15,

      qrbox: (viewfinderWidth, viewfinderHeight) => {

        const minEdge = Math.min(viewfinderWidth, viewfinderHeight);

        if (minEdge < 400) {
          return { width: minEdge * 0.9, height: minEdge * 0.45 };
        }

        return { width: 350, height: 180 };
      },

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


  /* Stop Camera */

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


  /* Upload File */

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);

    const html5QrCode = new Html5Qrcode("reader");

    try {

      const decodedText = await html5QrCode.scanFile(file, true);
      handleSuccess(decodedText);

    } catch {

      alert("No barcode detected. Try clearer image.");

      setIsProcessing(false);

    }

  };


  /* Success Handler */

  const handleSuccess = async (barcode) => {

    setIsProcessing(true);

    try {

      const response = await fetch(
        `https://nutriscan-uadu.onrender.com/api/scan/${barcode}`
      );

      const data = await response.json();

      setScanResultData(data);

    } catch {

      alert("Backend connection failed");

    } finally {

      setIsProcessing(false);
      setShowManualInput(false);

    }

  };


  return (
<>
    <Navbar/>

    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10 text-slate-900 overflow-x-hidden">

      {/* Heading */}

      <div className="text-center mb-8 md:mb-12">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
          Identify Product
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Scan the barcode on packaging
        </p>

      </div>


      {/* Scanner Container */}

      <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/5] bg-slate-50 rounded-[2rem] sm:rounded-[3rem] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">

        <div
          id="reader"
          className={`absolute inset-0 w-full h-full ${isScanning ? 'opacity-100' : 'opacity-0'}`}
        />



        {/* Idle UI */}

        {!isScanning && !isProcessing && (

          <div className="flex flex-col items-center gap-6 z-10 p-6 w-full">

            {!showManualInput ? (

              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-500">

                <Camera size={32} />

              </div>

            ) : (

              <div className="w-full flex flex-col gap-4">

                <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 flex items-center gap-3 shadow-lg">

                  <Keyboard className="text-slate-400" size={18} />

                  <input

                    type="text"
                    placeholder="Enter Barcode"
                    className="flex-1 outline-none text-base sm:text-lg font-bold tracking-widest"

                    value={manualBarcode}

                    onChange={(e) =>
                      setManualBarcode(e.target.value)
                    }

                  />

                  <button

                    onClick={() => handleSuccess(manualBarcode)}

                    className="bg-emerald-500 text-white p-2 rounded-xl"

                  >

                    <ArrowRight size={18} />

                  </button>

                </div>

                <button

                  onClick={() => setShowManualInput(false)}

                  className="text-sm font-bold text-slate-400"

                >

                  Cancel

                </button>

              </div>

            )}

          </div>

        )}



        {/* Scanning UI */}

        {isScanning && (

          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">

            <div className="w-[70%] max-w-xs h-32 sm:h-40 border-2 border-emerald-500 rounded-2xl relative shadow-lg">

              <div className="absolute w-full h-1 bg-emerald-500 animate-scan-move" />

            </div>

            <button

              onClick={stopCamera}

              className="mt-8 bg-white p-3 rounded-full text-rose-500 pointer-events-auto shadow-lg"

            >

              <X size={22} />

            </button>

          </div>

        )}



        {/* Processing */}

        {isProcessing && (

          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-40">

            <div className="w-10 h-10 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin" />

            <p className="mt-4 text-xs font-bold tracking-widest text-slate-600">

              Decoding Barcode...

            </p>

          </div>

        )}

      </div>



      {/* Buttons */}

      {!isScanning && !isProcessing && (

        <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-8">

          <button

            onClick={startCamera}

            className="flex flex-col items-center gap-2 p-4 bg-emerald-500 text-white rounded-2xl shadow-md active:scale-95"

          >

            <Camera size={22} />

            <span className="text-xs font-bold">Scan</span>

          </button>


          <label className="flex flex-col items-center gap-2 p-4 bg-white border rounded-2xl shadow-sm cursor-pointer active:scale-95">

            <ImageIcon size={22} />

            <span className="text-xs font-bold">Upload</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

          </label>


          <button

            onClick={() => setShowManualInput(true)}

            className="flex flex-col items-center gap-2 p-4 bg-white border rounded-2xl shadow-sm active:scale-95"

          >

            <Keyboard size={22} />

            <span className="text-xs font-bold">Manual</span>

          </button>

        </div>

      )}


      {scanResultData && (

        <ScanResult
          data={scanResultData}
          onClose={() => setScanResultData(null)}
        />

      )}



      <style>{`

        @keyframes scan-move {
          0%,100% { top:10% }
          50% { top:90% }
        }

        .animate-scan-move {
          position:absolute;
          animation:scan-move 2s ease-in-out infinite;
        }

        #reader video {
          object-fit:cover !important;
          border-radius:2rem;
        }

      `}</style>

    </div></>

  );

}
import { useEffect, useRef } from 'react';

const BarcodeScanner = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);
  const videoRef = useRef(null);
  const QuaggaRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let stream = null;

    const initializeScanner = async () => {
      try {
        // 1. Primero intentamos con la API nativa
        if ('BarcodeDetector' in window) {
          const barcodeDetector = new window.BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_39', 'code_128']
          });
          
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          
          const video = document.createElement('video');
          videoRef.current = video;
          video.srcObject = stream;
          video.autoplay = true;
          video.playsInline = true;
          scannerRef.current.appendChild(video);
          
          const detectBarcode = async () => {
            if (!videoRef.current) return;
            
            try {
              const barcodes = await barcodeDetector.detect(video);
              if (barcodes.length > 0) {
                onScan(barcodes[0].rawValue);
                onClose();
              }
            } catch (err) {
              console.error('Error en detección:', err);
            }
            
            animationFrameRef.current = requestAnimationFrame(detectBarcode);
          };
          
          animationFrameRef.current = requestAnimationFrame(detectBarcode);
          return;
        }

        // 2. Fallback a Quagga.js
        const Quagga = await import('quagga').then(module => module.default);
        QuaggaRef.current = Quagga;
        
        await Quagga.init({
          inputStream: {
            type: "LiveStream",
            target: scannerRef.current,
            constraints: { facingMode: "environment" }
          },
          decoder: { readers: ["ean_reader"] }
        }, function(err) {
          if (err) {
            console.error('Error al inicializar Quagga:', err);
            return;
          }
          Quagga.start();
        });

        Quagga.onDetected((result) => {
          if (result?.codeResult?.code) {
            onScan(result.codeResult.code);
            onClose();
          }
        });
      } catch (err) {
        console.error('Error al inicializar escáner:', err);
        onClose();
      }
    };

    initializeScanner();

    return () => {
      // Limpieza para API nativa
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      
      if (videoRef.current && videoRef.current.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current);
      }
      
      // Limpieza para Quagga
      if (QuaggaRef.current) {
        try {
          QuaggaRef.current.offDetected();
          QuaggaRef.current.stop();
        } catch (e) {
          console.log('Error limpiando Quagga:', e);
        }
      }
    };
  }, [onScan, onClose]);

  return <div ref={scannerRef} style={{ width: '100%', height: '300px' }} />;
};

export default BarcodeScanner;
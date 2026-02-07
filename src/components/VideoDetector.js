import React, { useState } from "react";

function VideoDetector() {
  const [video, setVideo] = useState(null);
  const [resultado, setResultado] = useState(null);

  const analisarVideo = async () => {
    if (!video) {
      alert("Selecione um vídeo primeiro.");
      return;
    }

    setResultado("Analisando vídeo...");
    setTimeout(() => {
      const probIA = Math.random() * 100;
      const tipo = probIA > 50 ? "IA" : "Humano";
      setResultado(`Resultado: ${tipo} (confiança: ${probIA.toFixed(2)}%)`);

     
      setVideo(null);
      document.getElementById("entradaVideo").value = "";
    }, 2000);
  };

  return (
    <div>
      <label htmlFor="entradaVideo">Entrada de Vídeo</label>
      <input
        id="entradaVideo"
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
      />
      <button className="btn" onClick={analisarVideo}>
        Analisar Vídeo
      </button>
      {resultado && <p className="resultado">{resultado}</p>}
    </div>
  );
}

export default VideoDetector;

import React, { useState } from "react";
import TextoDetector from "./components/TextoDetector";
import ImagemDetector from "./components/ImagemDetector";
import VideoDetector from "./components/VideoDetector";
import "./App.css";

function App() {
  const [tab, setTab] = useState("texto");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
  <div className="glass-card w-full max-w-lg">
    <h1 className="text-3xl font-bold text-gradient text-center mb-2">AI Detector</h1>
    <p className="text-center mb-6">
      Analise textos, imagens e vídeos para detectar se foram gerados por inteligência artificial usando TensorFlow.js
    </p>
    <div className="tabs mb-6">
      <button className={tab === "texto" ? "active" : ""} onClick={() => setTab("texto")}>Texto</button>
      <button className={tab === "imagem" ? "active" : ""} onClick={() => setTab("imagem")}>Imagem</button>
      <button className={tab === "video" ? "active" : ""} onClick={() => setTab("video")}>Vídeo</button>
    </div>
    {tab === "texto" && <TextoDetector />}
    {tab === "imagem" && <ImagemDetector />}
    {tab === "video" && <VideoDetector />}
  </div>
</div>

  );
}

export default App;

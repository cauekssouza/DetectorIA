import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

function ImagemDetector() {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState(null);

  const analisarImagem = async () => {
    if (!imagem) {
      alert("Selecione uma imagem primeiro.");
      return;
    }

    setResultado("Carregando modelo...");
    await tf.setBackend("webgl");
    await tf.ready();

    const model = await mobilenet.load();
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(imagem);
    await new Promise((resolve) => {
      imgElement.onload = resolve;
    });

    const predictions = await model.classify(imgElement);

    let tipo = "Humano";
    if (predictions[0].className.toLowerCase().includes("cartoon") ||
        predictions[0].className.toLowerCase().includes("art")) {
      tipo = "IA";
    }

    setResultado(
      `Resultado: ${tipo} (detecção: ${predictions[0].className}, confiança: ${(predictions[0].probability * 100).toFixed(2)}%)`
    );

    // Limpa imagem e preview
    setImagem(null);
    setPreview(null);
    document.getElementById("entradaImagem").value = "";
  };

  return (
    <div>
      <label htmlFor="entradaImagem">Entrada de Imagem</label>
      <input
        id="entradaImagem"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setImagem(file);
          setPreview(URL.createObjectURL(file));
        }}
      />
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />
        </div>
      )}
      <button className="btn" onClick={analisarImagem}>
        Analisar Imagem
      </button>
      {resultado && <p className="resultado">{resultado}</p>}
    </div>
  );
}

export default ImagemDetector;

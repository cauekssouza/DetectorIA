import React, { useState } from "react";
import * as use from "@tensorflow-models/universal-sentence-encoder";

function TextoDetector() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState(null);

  const analisarTexto = async () => {
    if (texto.length < 50) {
      alert("Digite pelo menos 50 caracteres.");
      return;
    }

    setResultado("Carregando modelo...");
    const model = await use.load();
    const embeddings = await model.embed([texto]);
    const valores = embeddings.arraySync()[0];
    const media = valores.reduce((a, b) => a + b, 0) / valores.length;
    const probIA = Math.min(Math.max((media + 1) / 2, 0), 1) * 100;

   
    const tipo = probIA > 50 ? "IA" : "Humano";
    setResultado(`Resultado: ${tipo} (confiança: ${probIA.toFixed(2)}%)`);

    
    setTexto("");
  };

  return (
    <div>
      <label htmlFor="entradaTexto">Entrada de Texto</label>
      <textarea
        id="entradaTexto"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Cole ou digite o texto aqui... (mínimo 50 caracteres)"
      />
      <p>{texto.length} caracteres</p>
      <button className="btn" onClick={analisarTexto}>
        Analisar Texto
      </button>
      {resultado && <p className="resultado">{resultado}</p>}
    </div>
  );
}

export default TextoDetector;

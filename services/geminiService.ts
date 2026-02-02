
import { GoogleGenAI, Type } from "@google/genai";
import { Player } from "../types";

export const generateScoutReport = async (player: Player): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `
    Actúa como un cazatalentos (scout) de fútbol profesional. 
    Analiza los siguientes datos de un jugador amateur y genera un breve "Reporte del Scout" (máximo 100 palabras) 
    resaltando su perfil para clubes interesados.

    Nombre: ${player.fullName}
    Posición: ${player.position}
    Ciudad: ${player.city}
    Último Club: ${player.lastClub}
    Descripción del jugador: ${player.bio}

    El reporte debe sonar profesional, motivador y directo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Reporte no disponible en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al generar el análisis del scout.";
  }
};

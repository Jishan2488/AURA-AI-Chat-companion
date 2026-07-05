import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      // format messages for gemini
      // The API expects `contents: "prompt"` or a list of content objects if we manage history
      // For simplicity in a concierge agent, let's pass a system instruction and the latest prompt.
      // Or we can use the `ai.chats` if we want, but since it's stateless HTTP, `generateContent` is easier with history manually passed.
      
      const latestMessage = messages[messages.length - 1].content;

      // To pass history in generateContent, format them:
      const contents = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: "You are an AI Concierge designed for a capstone hackathon project. Your vibe is 'AI for Good', helpful, freestyle, empathetic, and slightly poetic. Keep your answers concise, vibey, and engaging.",
        },
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to communicate with the concierge." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY;

app.get("/hello", (req, res) => {
  res.send("Server is running!");
});

app.post("/gemini", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).send({ error: "No prompt provided" });

  try {
    const response = await axios.post(
      "https://api.gemini.com/v1/responses", // replace with the actual Gemini endpoint
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.send({ text: response.data.text }); // return just the text output
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Gemini request failed" });
  }
});

export default app;

const express = require("express");
const route = express.Router();
const AIAssistantController = require("../../controllers/backend/aiAssistantcontroller");

// POST /api/ask/AIAssistant/ask
route.post("/ask", AIAssistantController.create); //localhost:5000/api/ask/AIAssistant/ask

// GET  /api/ask/AIAssistant/history
route.get("/history", AIAssistantController.view); //localhost:5000/api/ask/AIAssistant/history

module.exports = (app) => {
    app.use("/api/ask/AIAssistant", route);
};

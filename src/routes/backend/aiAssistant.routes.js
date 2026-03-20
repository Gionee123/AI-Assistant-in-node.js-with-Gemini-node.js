const express = require("express");
const route = express.Router();
const AIAssistantController = require("../../controllers/backend/aiAssistantcontroller");

// POST /api/ask/AIAssistant/ask
route.post("/ask", AIAssistantController.create); //localhost:5000/api/ask/AIAssistant/ask

// POST  /api/ask/AIAssistant/history   
route.post("/history", AIAssistantController.view); //localhost:5000/api/ask/AIAssistant/history
route.delete("/delete/:id", AIAssistantController.delete); //localhost:5000/api/ask/AIAssistant/delete

module.exports = (app) => {
    app.use("/api/ask/AIAssistant", route);
};

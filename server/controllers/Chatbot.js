
const { BardAPI } = require('bard-api-node');
const apiKey = process.env.CHATBOT_API_KEY;

const bard = new BardAPI();

bard.initializeChat(apiKey);


exports.chatBotAnswer=async(req, res) => {
  const userMessage = req.body.userInput;

  try {
    const result = await bard.getBardResponse(userMessage);
    return res.json({ message: result.text });
  } catch (error) {
    return res.status(500).json({ message: 'Error: Something went wrong' });
  }
}

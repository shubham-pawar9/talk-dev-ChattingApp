import { useEffect, useState } from "react";

const UseBotReply = ({ userMessage }) => {
  const botResponse = {
    hello: "Hi there!",
    hi: "Hi there!",
    "how are you": "I'm fine, thanks for asking!",
    "how r u": "I'm fine, thanks for asking!",
    goodbye: "Goodbye! Have a great day!",
    bye: "Goodbye! Have a great day!",
    help: "Yes Sure",
    ok: "ok",
    "where are you": "at home",
    "where r u": "at home",
  };
  console.log(userMessage);
  const generateResponse = (userMessage) => {
    // Convert user message to lowercase for case-insensitive matching
    const lowerCaseMessage = userMessage.toLowerCase();

    // Loop through botResponse keys to find a match
    for (const key in botResponse) {
      if (lowerCaseMessage.includes(key)) {
        return botResponse[key];
      } else {
      }
    }
    if (userMessage != "") {
      // If no match found, return a default response
      return "I'm sorry, I didn't understand that.";
    }
  };

  //   State to store the bot reply
  const [botReply, setBotReply] = useState("");

  useEffect(() => {
    const response = generateResponse(userMessage);
    setBotReply(response);
  }, [userMessage]);
  return userMessage === "" ? null : botReply;
};

export { UseBotReply };

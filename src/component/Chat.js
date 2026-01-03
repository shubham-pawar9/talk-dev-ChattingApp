import { useEffect, useRef, useState } from "react";
// import { ChatData } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "./chatSlice";
import { UseBotReply } from "./UseBotReply";
import Picker from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
const Chat = ({ chatDisplay, messageInputRef, windowHeight }) => {
  // const [chatDisplay, setChatDisplay] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const ChatData = useSelector((state) => state.chat.chatData);
  const [inputToBot, setInputToBot] = useState("");
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    setInputMessage((prevInput) => {
      if (typeof prevInput === "string") {
        return prevInput + emojiObject.emoji;
      } else {
        return emojiObject.emoji; // If prevInput is undefined, start with the emoji
      }
    });
    setShowPicker(false);
  };

  const [time, setTime] = useState(() => {
    const options = { hour: "numeric", minute: "2-digit" };
    return new Date().toLocaleTimeString([], options);
  });
  const botReply = UseBotReply({
    userMessage: inputToBot,
  });
  console.log(botReply);
  const botreplyTime = useRef("");
  const heightRef = useRef("");
  const dispatch = useDispatch();

  const handleInputMsg = (e) => {
    setInputMessage(e.target.value);
  };
  const handleMessageSubmit = () => {
    const newMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: time,
    };
    dispatch(addMessage({ userName: chatDisplay, message: newMessage }));
    setInputToBot(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputMessage != "") {
        handleMessageSubmit();
      }
    }
  };
  const handleBotReply = () => {
    if (botReply != null) {
      if (botReply.trim() !== "") {
        // Trim bot reply to prevent showing empty replies
        const newMessage = {
          text: botReply,
          sender: "bot",
          timestamp: time,
        };
        dispatch(addMessage({ userName: chatDisplay, message: newMessage }));
        setBotMessage(botReply);
      }
    }
  };
  const scrollToTop = () => {
    if (heightRef.current) {
      heightRef.current.scrollTop = heightRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    const chatElement = document.getElementById(chatDisplay);
    if (chatElement) {
      chatElement.classList.add("active-chat");
    }
    return () => {
      const activeChatElement = document.querySelector(".active-chat");
      if (activeChatElement) {
        activeChatElement.classList.remove("active-chat");
      }
    };
  }, [chatDisplay]);
  useEffect(() => {
    botreplyTime.current = setTimeout(() => {
      handleBotReply();
    }, 1000);
    return () => {
      clearTimeout(botreplyTime.current);
    };
  }, [inputToBot, botReply]);
  useEffect(() => {
    scrollToTop();
  }, [ChatData]);

  return (
    <>
      <div
        className="mainChatDiv"
        style={{
          height: `${windowHeight - 155}px`,
        }}
      >
        <div className="chatDiv" ref={heightRef}>
          {ChatData &&
            ChatData[chatDisplay] != undefined &&
            ChatData[chatDisplay].messages.length > 0 &&
            ChatData[chatDisplay].messages.map((item, index) => {
              return (
                <div className={item.sender} key={index}>
                  <span className="message-text">{item.text}</span>
                  <span className="message-time">{item.timestamp}</span>
                </div>
              );
            })}
        </div>
        <div className="message-footer">
          <input
            type="text"
            placeholder="Type something"
            value={inputMessage}
            ref={messageInputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputMsg}
          />
          {/* <img
            className="emoji-picker"
            src={process.env.PUBLIC_URL + "/images/smile.png"}
            onClick={() => setShowPicker((val) => !val)}
          /> */}
          {showPicker && (
            <Picker
              onEmojiClick={onEmojiClick}
              rows={4}
              perRow={8}
              emojiSize={32}
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
              searchDisabled={true}
              reactionsDefaultOpen={true}
            />
          )}
          <button className="messageSubmitBtn" onClick={handleMessageSubmit}>
            <img src={process.env.PUBLIC_URL + "/images/submit.png"} />
          </button>
        </div>
      </div>
    </>
  );
};
export default Chat;

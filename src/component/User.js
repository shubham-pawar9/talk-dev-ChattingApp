import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "./chatSlice";
import AddContact from "./AddContact";
import Chat from "./Chat";
import { useEffect, useRef, useState } from "react";
import UserDetails from "./UserDetails";
const User = ({ setChatDisplay, chatDisplay, windowHeight }) => {
  const userData = useSelector((state) => state.chat.chatData);
  const dispatch = useDispatch();
  const [showContactAdd, setShowContactAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const messageInputRef = useRef("");
  const handleUserSelect = (myUserName) => {
    setChatDisplay(myUserName);
    dispatch(addMessage({ userName: myUserName, message: null }));
    setTimeout(() => {
      messageInputRef && messageInputRef.current.focus();
    }, 100);
  };
  const handleBackBtn = () => {
    setChatDisplay("");
    setShowContactAdd(false);
    setShowUserDetails(false);
  };
  const handleContactShow = () => {
    setChatDisplay("");
    setShowUserDetails(false);
    setShowContactAdd(true);
  };
  console.log(userData);
  const handleUserDetailsShow = () => {
    Object.keys(userData).filter((item) => {
      if (item == chatDisplay) {
        setSelectedUser(userData[item]);
      }
    });
    setShowUserDetails(true);
  };

  return (
    <>
      <div className="userListDiv">
        <div className="userHead">
          <span className="simpleText">Chats</span>
          <span className="addContactIcon">
            <img src="/images/add-user.png" onClick={handleContactShow} />
          </span>
        </div>
        <div
          className="userChatSection"
          style={{
            height: `${windowHeight - 110}px`,
          }}
        >
          <div className="chatuserList-head">
            {chatDisplay != "" || showContactAdd ? (
              <img src="/images/back-btn.png" onClick={handleBackBtn} />
            ) : null}
            {chatDisplay != "" && (
              <span className="selected-user" onClick={handleUserDetailsShow}>
                {chatDisplay}
              </span>
            )}
          </div>
          {!showContactAdd && chatDisplay == "" && (
            <div className="chatUserList">
              <div className="list-div">
                {Object.keys(userData).map((item, index) => {
                  return (
                    <div
                      className="profileIcon-div"
                      onClick={() => handleUserSelect(item)}
                    >
                      <img
                        src={
                          userData[item].gender == "male"
                            ? `/images/profile-male.jpg`
                            : userData[item].gender == "female"
                            ? `/images/profile-female.jpg`
                            : `/images/profile-male.jpg`
                        }
                      />
                      <div key={index} className="user" id={item}>
                        <span className="user-name">{item}</span>
                        <span className="user-lastMessage">
                          {userData[item].messages.length == 0
                            ? null
                            : userData[item].messages[
                                userData[item].messages.length - 1
                              ].text}
                        </span>
                      </div>
                      <span className="user-messageTime">
                        {userData[item].messages.length == 0
                          ? null
                          : userData[item].messages[
                              userData[item].messages.length - 1
                            ].timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {!showContactAdd && showUserDetails && (
            <UserDetails
              selectedUser={selectedUser}
              chatDisplay={chatDisplay}
            />
          )}
          {!showUserDetails && chatDisplay != "" && (
            <Chat
              chatDisplay={chatDisplay}
              messageInputRef={messageInputRef}
              windowHeight={windowHeight}
            />
          )}
          {showContactAdd && (
            <AddContact setShowContactAdd={setShowContactAdd} />
          )}
        </div>
      </div>
    </>
  );
};
export default User;

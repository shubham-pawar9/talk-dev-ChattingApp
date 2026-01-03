import { useSelector, useDispatch } from "react-redux";
import { addMessage, updateUsername } from "./chatSlice";
import AddContact from "./AddContact";
import Chat from "./Chat";
import { useEffect, useRef, useState } from "react";
import UserDetails from "./UserDetails";
import StoryList from "./StoryList";
const User = ({ setChatDisplay, chatDisplay, windowHeight }) => {
  const userData = useSelector((state) => state.chat.chatData);
  const dispatch = useDispatch();
  const [showContactAdd, setShowContactAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editStatus, setEditStatus] = useState(false);
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
    setEditStatus(false);
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
  const handleEditName = () => {
    setEditStatus(!editStatus);
    if (!editStatus) {
      document.getElementById(chatDisplay).contentEditable = true;
      document.getElementById(chatDisplay).classList.add("editable");
      document.getElementById(chatDisplay).focus();
    } else {
      const updatedUserName = document.getElementById(chatDisplay).textContent;
      if (userData[chatDisplay]) {
        dispatch(
          updateUsername({
            oldUsername: chatDisplay,
            newUsername: updatedUserName,
          })
        );
      }
      setChatDisplay(updatedUserName);
      document.getElementById(chatDisplay).contentEditable = false;
      document.getElementById(chatDisplay).classList.remove("editable");
      document.getElementById(chatDisplay).focus();
    }
  };
  const handleEditProfile = () => {};
  return (
    <>
      <div className="userListDiv">
        <div className="userHead">
          <span className="simpleText">
            Chats{" "}
            <img
              className="icon-img"
              src={process.env.PUBLIC_URL + "/images/icon.png"}
            />
          </span>
          <img
            className="addContactIcon"
            src={process.env.PUBLIC_URL + "/images/add-user.png"}
            onClick={handleContactShow}
          />
        </div>
        <div
          className="userChatSection"
          style={{
            height: `${windowHeight - 110}px`,
          }}
        >
          <div className="chatuserList-head">
            {chatDisplay != "" || showContactAdd ? (
              <img
                src={process.env.PUBLIC_URL + "/images/back-btn.png"}
                onClick={handleBackBtn}
              />
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
                {userData.users.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="profileIcon-div"
                      onClick={() => handleUserSelect(value)}
                    >
                      <img
                        src={
                          userData[value].gender == "male"
                            ? `${process.env.PUBLIC_URL}/images/profile-male.jpg`
                            : userData[value].gender == "female"
                            ? `${process.env.PUBLIC_URL}/images/profile-female.jpg`
                            : `${process.env.PUBLIC_URL}/images/profile-male.jpg`
                        }
                      />
                      <div key={index} className="user" id={value}>
                        <span className="user-name">{value}</span>
                        <span className="user-lastMessage">
                          {userData[value].messages.length == 0
                            ? null
                            : userData[value].messages[
                                userData[value].messages.length - 1
                              ].text}
                        </span>
                      </div>
                      <span className="user-messageTime">
                        {userData[value].messages.length == 0
                          ? null
                          : userData[value].messages[
                              userData[value].messages.length - 1
                            ].timestamp}
                      </span>
                    </div>
                  );
                })}
                {/* {Object.keys(userData).map((item, index) => {
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
                })} */}
              </div>
              <StoryList />
            </div>
          )}
          {!showContactAdd && showUserDetails && (
            <UserDetails
              selectedUser={selectedUser}
              chatDisplay={chatDisplay}
              handleEditName={handleEditName}
              handleEditProfile={handleEditProfile}
              setEditedValue={setEditedValue}
              editStatus={editStatus}
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

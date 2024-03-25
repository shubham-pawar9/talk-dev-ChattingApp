import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "./chatSlice";
const AddContact = ({ setShowContactAdd }) => {
  const userData = useSelector((state) => state.chat.chatData);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [genderSelect, setGenderSelect] = useState("");
  const [nameError, setNameError] = useState("");
  const handleInputUser = (e) => {
    setUserName(e.target.value.toLowerCase());
  };
  const handleUserSubmit = (e) => {
    e.preventDefault();

    if (!userData[userName]) {
      let prevUser;
      for (let user in userData) {
        if (userData[user].contact == contactNumber) {
          prevUser = user;
        }
      }
      console.log(prevUser);
      if (
        prevUser != undefined &&
        userData[prevUser].contact == contactNumber
      ) {
        setNameError("contact already added");
      } else {
        dispatch(
          addMessage({
            userName,
            contact: contactNumber,
            gender: genderSelect,
            messages: [],
          })
        );
        setUserName("");
        setContactNumber("");
        setGenderSelect("");
        setShowContactAdd(false);
      }
    } else {
      if (userData[userName]) {
        setNameError("username not be same");
      }
      setUserName(userName);
    }
  };

  const handleInputNumber = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 10) {
      setContactNumber(inputValue);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (userName != "") {
        handleUserSubmit(event);
      }
    }
  };
  const handleGender = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
    setGenderSelect(value);
  };

  return (
    <>
      <div className="contact-add-div">
        <h2 className="contact-head">New Contact</h2>
        <form className="contactInnerDiv" onSubmit={handleUserSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onKeyDown={handleKeyPress}
            onChange={handleInputUser}
            required
          />
          <span className="errorMsg">{nameError}</span>
          <input
            type="number"
            placeholder="Number"
            value={contactNumber}
            onKeyDown={handleKeyPress}
            onChange={handleInputNumber}
            required
          />
          <div className="gender-select">
            <label className="radioLabel male">
              <span>Male</span>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleGender}
              />
              <span className="checkmark"></span>
            </label>

            <label className="radioLabel female">
              <span>Female</span>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleGender}
              />
              <span className="checkmark"></span>
            </label>

            <label className="radioLabel other">
              <span>Other</span>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={handleGender}
              />
              <span className="checkmark"></span>
            </label>
          </div>

          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
export default AddContact;

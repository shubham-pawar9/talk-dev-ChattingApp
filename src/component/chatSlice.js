import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatData: {
    users: ["shubham", "rajat"],
    shubham: {
      contact: "7843068183",
      gender: "male",
      messages: [
        { text: "hii", sender: "user", timestamp: "10:12 AM" },
        { text: "hello", sender: "bot", timestamp: "11:01 AM" },
        {
          text: "how are you",
          sender: "user",
          timestamp: "11:14 AM",
        },
        { text: "fine", sender: "bot", timestamp: "11:16 AM" },
      ],
    },
    rajat: {
      contact: "7030092200",
      gender: "male",
      messages: [
        { text: "hello", sender: "user", timestamp: "03:12 AM" },
        { text: "hello", sender: "bot", timestamp: "03:13 AM" },
        {
          text: "how are you",
          sender: "user",
          timestamp: "03:45 AM",
        },
        { text: "good", sender: "bot", timestamp: "04:01 AM" },
      ],
    },
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { userName, contact, gender, message } = action.payload;
      //   console.log("Original state:", state);
      //   console.log(userName);
      if (!state.chatData[userName]) {
        console.log(
          `User ${userName} does not exist. Initializing messages array.`
        );
        state.chatData.users.push(userName);
        state.chatData[userName] = {
          contact: contact,
          gender: gender,
          messages: [],
        }; // Initialize messages array if it doesn't exist
      } else {
        console.log(`Adding message for user ${userName}.`);
        if (message != null) {
          state.chatData[userName] = {
            ...state.chatData[userName],
            messages: [...state.chatData[userName].messages, message],
          };
        }
      }

      //   console.log("Modified state:", state);
    },
    updateUsername: (state, action) => {
      const { oldUsername, newUsername } = action.payload;
      if (state.chatData[oldUsername] && !state.chatData[newUsername]) {
        const index = state.chatData.users.indexOf(oldUsername);
        if (index !== -1) {
          state.chatData.users[index] = newUsername; // Update username in the array
        }
        state.chatData[newUsername] = state.chatData[oldUsername];
        delete state.chatData[oldUsername];
      }
    },
  },
});

export const { addMessage, updateUsername } = chatSlice.actions;
export default chatSlice.reducer;

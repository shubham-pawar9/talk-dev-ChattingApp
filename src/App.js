import logo from "./logo.svg";
import "./App.css";
import Chat from "./component/Chat";
import User from "./component/User";
import { useEffect, useState } from "react";
import Cover from "./Cover";

function App() {
  const [chatDisplay, setChatDisplay] = useState("");
  const [userShow, setUserShow] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="App"
      style={{
        height: `${windowHeight}px`,
      }}
    >
      <Cover setUserShow={setUserShow} />
      {userShow && (
        <User
          setChatDisplay={setChatDisplay}
          chatDisplay={chatDisplay}
          windowHeight={windowHeight}
        />
      )}
    </div>
  );
}

export default App;

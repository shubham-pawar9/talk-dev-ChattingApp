import { useRef } from "react";

const Cover = ({ setUserShow }) => {
  const coverRef = useRef("");

  const handleUserList = () => {
    console.log(coverRef.current);
    coverRef.current.classList.add("explode");
    setUserShow(true);
  };

  return (
    <>
      <div className="cover-page" ref={coverRef}>
        <div className="cover-name">
          <span className="coverText text-T">T</span>
          <span className="coverText text-A">A</span>
          <span className="coverText text-L">L</span>
          <span className="coverText text-K">K</span>
        </div>
        <span className="text-dev">DEV</span>
        <span className="text-slogan">Your Space to Talk</span>
        <div className="cover-btn">
          <button className="userList-btn" onClick={handleUserList}>
            User list
          </button>
        </div>
      </div>
    </>
  );
};
export default Cover;

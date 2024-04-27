const UserDetails = ({
  selectedUser,
  chatDisplay,
  handleEditProfile,
  handleEditName,
  setEditedValue,
  editStatus,
}) => {
  return (
    <>
      <div className="userDetails">
        <div className="userProfile">
          <img src="/images/profile-male.jpg" />
          {/* <img
            className="edit-icon"
            src="/images/edit.png"
            onClick={handleEditProfile}
          /> */}
        </div>
        <div
          className="userContactDetails"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEditName();
            }
          }}
          tabIndex={0}
        >
          <span className="userName">
            <span id={chatDisplay}>{chatDisplay}</span>
            <img
              className="edit-icon"
              src={editStatus ? "/images/done.png" : "/images/edit.png"}
              onClick={handleEditName}
            />
          </span>
          <span className="userContact">Contact - {selectedUser.contact}</span>
        </div>
      </div>
    </>
  );
};
export default UserDetails;

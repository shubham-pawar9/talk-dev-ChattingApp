const UserDetails = ({ selectedUser, chatDisplay }) => {
  return (
    <>
      <div className="userDetails">
        <div className="userProfile">
          <img src="/images/profile-male.jpg" />
        </div>
        <div className="userContactDetails">
          <span className="userName">{chatDisplay}</span>
          <span className="userContact">Contact - {selectedUser.contact}</span>
        </div>
      </div>
    </>
  );
};
export default UserDetails;

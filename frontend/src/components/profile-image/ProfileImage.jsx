import DefaultProfileImage from "../../utils/profile-template.svg";

const ProfileImage = ({ profileImage, className, alt }) => {
  return (
    <img
      src={profileImage !== "" ? profileImage : DefaultProfileImage}
      alt={alt}
      className={className}
    />
  );
};

export default ProfileImage;

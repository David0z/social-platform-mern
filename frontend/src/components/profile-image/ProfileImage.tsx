import { useCallback } from "react";
import DefaultProfileImage from "../../images/profile-template.svg";

const ProfileImage = ({ profileImage, className, alt }) => {
  const handleError = useCallback((e) => {
    e.target.src = DefaultProfileImage
  }, [])

  return (
    <img
      src={profileImage !== "" ? process.env.REACT_APP_SERVER + profileImage : DefaultProfileImage}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ProfileImage;

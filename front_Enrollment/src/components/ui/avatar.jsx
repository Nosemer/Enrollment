import { useState } from "react";

const Avatar = ({ src, alt = "User", size = "md" }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc("/default-avatar.png")}
      className={`rounded-full object-cover ${sizes[size]}`}
    />
  );
};

export default Avatar;

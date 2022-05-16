import { useState } from "react";

const initialStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#ccc",
  border: "1px solid #000",
  color: "#000",
  textAlign: "center",
  alignItems: "center",
  margin: "5px",
  fontSize: "30px",
  fontFamily: "Arial black",
  boxShadow: "10px 10px 15px #CCC",
  display: "flex",
  justifyContent: "center",
  borderRadius: "5px",
  cursor: "pointer",
};

const Key = ({ value, handleKeyClick }) => {
  const [style, setStyle] = useState({ ...initialStyle });

  const handleMouseEnter = () => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: "#FFF",
    }));
  };

  const handleMouseLeave = () => {
    setStyle({ ...initialStyle });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleKeyClick(value)}
      style={style}
    >
      {value}
    </div>
  );
};

export default Key;

const Screen = ({ result }) => {
  const screenStyle = {
    width: "90%",
    height: "75px",
    backgroundColor: "#FFFF99",
    borderRadius: "5px",
    fontSize: "30px",
    textAlign: "right",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "arial black",
    overflow: "hidden",
  };

  return <div style={screenStyle}>{result}</div>;
};

export default Screen;

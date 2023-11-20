import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const titleStyle = {
    fontSize: "4rem",
    color: "#0070f3",
    fontWeight: "bold",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "0.5rem",
    fontFamily: '"Montserrat", sans-serif',
  };

  const sloganStyle = {
    fontSize: "1.5rem",
    color: "#333",
    fontWeight: "normal",
    marginBottom: "2rem",
    fontFamily: '"Montserrat", sans-serif',
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
      <img
        src="https://i.imgur.com/y3Isi62.jpeg"
        alt="chef"
        style={{
          maxWidth: "150px",
          height: "auto",
          marginTop: -130,
        }}
      />
      <h1 style={titleStyle}>QuickMenu</h1>
      <h2 style={sloganStyle}>Your digital menu, a scan away!</h2>
      <Button color="primary" onClick={() => navigate("/input")}>
        Enter
      </Button>{" "}
    </div>
  );
};

export default LandingPage;

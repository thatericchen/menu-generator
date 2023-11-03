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
      <h1 style={titleStyle}>QuickMenu</h1>
      <h2 style={sloganStyle}>Your digital menu, a scan away!</h2>
      <Button
        onClick={() => navigate("/input")}
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        Enter
      </Button>{" "}
    </div>
  );
};

export default LandingPage;

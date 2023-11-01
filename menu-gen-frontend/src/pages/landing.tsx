import React from "react";
import { Button } from "@nextui-org/react";

const LandingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>QuickMenu</h1>
      <h1>Your digital menu, a scan away!</h1>
      <Button>Enter</Button>
    </div>
  );
};

export default LandingPage;

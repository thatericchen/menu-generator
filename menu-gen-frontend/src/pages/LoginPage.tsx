import React, { Key } from "react";
import { Tabs, Tab, Link, Card, CardBody } from "@nextui-org/react";
import LoginForm from "./LoginForm";
import AccountForm from "./RegisterForm";
import InputPage from "./input";

const LoginPage: React.FC = () => {
  const [selected, setSelected] = React.useState("login");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  
  const handleLogin = (data: any) => {
    console.log(data);
    setIsLoggedIn(true);
    if (data.hasOwnProperty("token")) {
      setToken(data.token);
    }
  };

  const handleSelectionChange = (key: Key) => {
    setSelected(String(key));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {!isLoggedIn && (
        <Card className="max-w-full w-[340px] h-[500px]">
          <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={handleSelectionChange}
            >
              <Tab key="login" title="Login">
                <LoginForm onLogin={handleLogin} />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onClick={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <AccountForm onLogin={handleLogin} />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onClick={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
      {isLoggedIn && <InputPage token={token} />}
    </div>
  );
};

export default LoginPage;
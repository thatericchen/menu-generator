import React, { useState, FormEvent } from "react";
import { Input, Button } from "@nextui-org/react";

interface LoginFormProps {
  onLogin: (data: {}) => void;
}

interface Credentials {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    console.log(import.meta.env["VITE_BACKEND_URI"]);
    try {
      const formData = new FormData();
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);

      console.log(import.meta.env.VITE_BACKEND_URI);

      const response = await fetch(import.meta.env["VITE_BACKEND_URI"] + "/login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onLogin(await response.json());
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <Input
        isRequired
        type="email"
        label="Email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        className="max-w-xs"
      />
      <Input
        isRequired
        type="password"
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        className="max-w-xs"
      />
      <Button color="primary" type="submit" fullWidth disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
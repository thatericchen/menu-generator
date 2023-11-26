import { useState, FormEvent } from "react";
import { Input, Button } from "@nextui-org/react";

interface AccountFormProps {
  onLogin: (data: {}) => void;
}

interface Account {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AccountForm: React.FC<AccountFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = async (account: Account) => {
    const formData = new FormData();
    formData.append('email', account.email);
    formData.append('password', account.password);
    formData.append('firstName', account.firstName);
    formData.append('lastName', account.lastName);

    const response = await fetch(import.meta.env["BACKEND_URI"] + "/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Registration successful");
      onLogin(await response.json());
    } else {
      console.error("Registration failed");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const account = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    register(account);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        isRequired
        type="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="max-w-xs"
      />
      <Input
        isRequired
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="max-w-xs"
      />
      <Input
        isRequired
        label="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        className="max-w-xs"
      />
      <Input
        isRequired
        label="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        className="max-w-xs"
      />
      <Button color="primary" type="submit" fullWidth>
        Register
      </Button>
    </form>
  );
};

export default AccountForm;
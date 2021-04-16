import { useCallback, useState } from "react";
import { useSession } from "../../modules/SessionContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (await login(username, password)) await router.push("/");
      else console.log("Invalid username or password"); // TODO: Show errors
    },
    [login, password, username]
  );

  const redirectToRegister = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <form className="LoginForm-form" onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={redirectToRegister}>
        Register
      </button>
    </form>
  );
};

export default LoginPage;

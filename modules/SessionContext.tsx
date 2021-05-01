import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";

import { ME_QUERY } from "../graphql/meQuery";
import { LOGIN_MUTATION } from "../graphql/loginMutation";
import { useRouter } from "next/router";

const SessionContext = createContext(null);

interface SessionUser {
  _id: string;
  username: string;
  email: string;
  role: "Customer" | "Admin";
}

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState<SessionUser>(null);
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const [loadMe, { loading, data }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });
  const [login] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const handleLogin = useCallback(
    async (username, password) => {
      try {
        const res = await login({ variables: { username, password } });
        if (res?.data?.login?.token) {
          setCookie("token", res?.data?.login?.token, { maxAge: 86400 });
          setUser(res?.data?.login?.user);
          return true;
        }
      } catch (err) {
        removeCookie("token", { maxAge: 86400 });
        return false;
      }
    },
    [login, removeCookie, setCookie]
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    removeCookie("token", { maxAge: 86400 });
    router.push("/login");
  }, [removeCookie]);

  useEffect(() => {
    if (data?.me) {
      setUser(data?.me);
    }
  }, [data]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadMe();
      } catch (err) {
        removeCookie("token", { maxAge: 86400 });
      }
    };
    loadData();
  }, [loadMe, removeCookie]);

  return (
    <SessionContext.Provider
      value={{
        loading,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionContext;

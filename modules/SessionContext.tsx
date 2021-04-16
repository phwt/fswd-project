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

const SessionContext = createContext(null);

export const SessionProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const [loadMe, { loading, data }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });
  const [login] = useMutation(LOGIN_MUTATION);
  const handleLogin = useCallback(
    async (username, password) => {
      try {
        const res = await login({ variables: { username, password } });
        if (res?.data?.login?.token) {
          setCookie("token", res?.data?.login?.token, { maxAge: 86400 });
          setUser(res?.data?.login?.user);
        }
      } catch (err) {
        removeCookie("token", { maxAge: 86400 });
      }
    },
    [login, removeCookie, setCookie]
  );
  const handleLogout = useCallback(() => {
    setUser(null);
    removeCookie("token", { maxAge: 86400 });
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

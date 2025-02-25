import React, { ReactNode, useEffect, useState, useCallback } from "react";
import apiService from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";
import authorizationservice from "../../services/authorizationservice";

interface Props {
  children: ReactNode;
}

const LoginAuthCheck: React.FC<Props> = ({ children }) => {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    if (user) {
      setIsLoading(false);
      return;
    }

    try {
      const accessTokenData = (await apiService.verifyAccessToken())?.data;
      if (accessTokenData?.user) {
        setUser(accessTokenData.user);
        authorizationservice.initialiseAuthorization(accessTokenData.user);
        return;
      }

      const refreshTokenData = (await apiService.verifyRefreshToken())?.data;
      if (refreshTokenData?.user) {
        setUser(refreshTokenData.user);
        authorizationservice.initialiseAuthorization(refreshTokenData.user);
        return;
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, setUser]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{!isLoading && children}</>;
};

export default LoginAuthCheck;

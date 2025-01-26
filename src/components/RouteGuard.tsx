import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate('/login');
    }
  }, [user, navigate]);

  return <>{user ? children : null}</>;
};

export default RouteGuard;

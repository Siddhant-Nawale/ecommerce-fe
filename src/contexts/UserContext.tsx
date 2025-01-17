import React, { createContext, useContext, ReactNode, useState } from "react";

// Define types for user data
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: Role[];
  policies: Policy[];
}
interface Role {
  id: string;
  name: string;
}
interface Policy {
  id: string;
  name: string;
  description: string;
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Default context value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};


import type React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

type User = {
  fullname: string;
  username: string;
  email: string;
};

type UserWithPassword = {
  fullname: string;
  username: string;
  email: string;
  password: string;
} | null;

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string, isEmail: boolean) => Promise<boolean>;
  register: (fullname: string, username: string, email: string, password: string) => Promise<boolean>;
  verifyCode: (code: string) => Promise<boolean>;
  logout: () => void;
  isRegistering: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  showVerification: boolean;
  setShowVerification: (show: boolean) => void;
  tempUserData: UserWithPassword;
  setTempUserData: (data: UserWithPassword) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthProps = { children: React.ReactNode };

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [tempUserData, setTempUserData] = useState<UserWithPassword>(null);

  // Check if user is logged in when component mounts
  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, isEmail: boolean): Promise<boolean> => {
    if (username && password) {
      const userData = {
        fullname: "User Demo",
        username: isEmail ? "userdemo" : username,
        email: isEmail ? username : "user@example.com"
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store temp data and show verification
    setTempUserData({ fullname, username, email, password });
    setShowVerification(true);
    return true;
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    // Mock verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Any code works for demo
    if (code && tempUserData) {
      const userData = {
        fullname: tempUserData.fullname,
        username: tempUserData.username,
        email: tempUserData.email
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowVerification(false);
      setTempUserData(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        verifyCode,
        logout,
        isRegistering,
        setIsRegistering,
        showVerification,
        setShowVerification,
        tempUserData,
        setTempUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
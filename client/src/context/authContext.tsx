"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getProfileService,
  loginService,
  logoutService,
} from "@/services/authServices";

interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  user: User | null;
  error: string;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  user: null,
  error: "",
  isAdmin: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    let response: any = await loginService(email, password);
    if (response.status !== 200) {
      setError(response.data?.message || "Error al iniciar sesión");
      return;
    }

    router.push("/types");
    setUser(response.data.user);
    setIsAdmin(response.data.user.role === "admin");
  };

  const logout = async () => {
    await logoutService();
    router.push("/");
    setUser(null);
  };

  const getProfile = async () => {
    try {
      const data = await getProfileService();
      setUser(data);
      setIsAdmin(data.role === "admin");
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user, error, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/users", {
          withCredentials: true,
        });
        setUser(res.data.user);
        console.log(res.data.data);

        //eslint-disable-next-line
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.delete("/api/users");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout gagal", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

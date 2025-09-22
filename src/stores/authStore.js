import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import api from "../lib/api.js";

const useAuthStore = create(
  persist((set, get) => ({
    user: null,
    activeRole: null,
    isLoading: false, 
    isAuthenticated: false,

    login: (userData, token, role) => {
      Cookies.set("token", token, {
        secure: true,
        sameSite: "strict",
        expires: 7,
      });
      Cookies.set("user", JSON.stringify(userData), {
        secure: true,
        sameSite: "strict",
        expires: 7,
      });
      Cookies.set("role", role, {
        secure: true,
        sameSite: "strict",
        expires: 7,
      });

      set({
        user: userData,
        activeRole: role,
        isAuthenticated: true,
      });
    },

    logout: async () => {
      const { activeRole } = get();

      try {
        const api = (await import("../lib/api.js")).default;
        if (activeRole === "mentor") {
          await api.post("/mentors/logout");
        }
        else if (activeRole === "student") {
          await api.post("/student/logout");
        }
      } catch (error) {
        console.error("Logout API call failed:", error);
      } finally {
        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("role"); 
        

        set({
          user: null,
          activeRole: null,
          isAuthenticated: false,
        });
      } 
    },

    switchRole: (role) => {
      const { user } = get();
      if (!user) return;
      if (role !== "student" && role !== "mentor") return;

      Cookies.set("role", role, {
        secure: true,
        sameSite: "strict",
        expires: 7,
      });

      set({ activeRole: role });
    },

    setLoading: (loading) => set({ isLoading: loading }),

    validateUser: async () => {
      const { isLoading } = get();
      if (isLoading) return; // Prevent multiple simultaneous calls
      
      set({ isLoading: true });

      try {
        const role = Cookies.get("role") || "student"; 
        const endpoint = "/student/auth/me";

        const res = await api.get(endpoint);

        if (res.data.user) {
          set({ 
            user: res.data.user,
            activeRole: role,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            activeRole: null,
            isAuthenticated: false,
            isLoading: false, 
          });
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          set({
            user: null,
            activeRole: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } else {
          console.error("validateUser error:", err);
          set({ isLoading: false });
        }

        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("role");
      }
    },
  }))
);

export default useAuthStore;

import { useEffect } from "react";
import useAuthStore from "../stores/authStore";

const AppInitializer = ({ children }) => {
  const validateUser = useAuthStore((state) => state.validateUser);

  useEffect(() => {
    validateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return children;
};

export default AppInitializer;

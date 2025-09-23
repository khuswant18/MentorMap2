import { useEffect } from "react";
import useAuthStore from "../stores/authStore";

const AppInitializer = ({ children }) => {
  const { validateUser } = useAuthStore();
  console.log("inside app initializer", useAuthStore, validateUser)
  useEffect(() => {
    console.log("inside app initializer use effect")
    validateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return children;
};

export default AppInitializer;

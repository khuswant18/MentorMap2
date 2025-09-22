import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

function AppWrapper({ children }) {
  const hydrateUser = useUserStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser(); 
  }, [hydrateUser]);

  return children;
}

export default AppWrapper;

import { createContext, useContext } from "react";

// Context để điều khiển chế độ Light/Dark Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light" as "light" | "dark",
});

// Custom hook để sử dụng trong các component
export const useColorMode = () => useContext(ColorModeContext);

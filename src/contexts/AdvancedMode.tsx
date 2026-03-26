import { createContext, useContext, useState, ReactNode } from "react";

interface AdvancedModeContextType {
  isAdvanced: boolean;
  toggle: () => void;
}

const AdvancedModeContext = createContext<AdvancedModeContextType>({ isAdvanced: false, toggle: () => {} });

export const useAdvancedMode = () => useContext(AdvancedModeContext);

export const AdvancedModeProvider = ({ children }: { children: ReactNode }) => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  return (
    <AdvancedModeContext.Provider value={{ isAdvanced, toggle: () => setIsAdvanced(p => !p) }}>
      <div className={isAdvanced ? "advanced-mode" : ""}>{children}</div>
    </AdvancedModeContext.Provider>
  );
};

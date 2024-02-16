import React, { createContext, useState } from "react";
import NoKey from "./pages/NoKey";
import WithKey from "./pages/WithKey";

export const MarkContext = createContext();

function App() {
  const [globalMark, setGlobalMark] = useState(0)
  return (
    <MarkContext.Provider value={{globalMark,setGlobalMark}}>
      <NoKey />
    </MarkContext.Provider>
  );
}

export default App;

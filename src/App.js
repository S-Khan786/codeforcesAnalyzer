import { useState } from "react";
import Navbar from "./Components/Navbar";

import Main from "./Components/Main";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  const [handle, setHandle] = useState("ConsistencyIsTheKey");

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-tr from-slate-50 to-slate-200 pb-12 relative">
      <Navbar />
      <Main handle={handle} setHandle={setHandle} />     
      <ScrollToTop />
    </div>
  );
}

export default App;

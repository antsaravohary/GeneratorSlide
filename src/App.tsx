import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Generator from "./components/Generator";
import Presentation from "./components/Presentation";

function App() {
  return (
    <div className="flex justify-center">
      <Presentation />
      <Generator />
    </div>
  );
}

export default App;

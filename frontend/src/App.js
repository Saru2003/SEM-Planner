import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [keywords, setKeywords] = useState([]);
  const [plan, setPlan] = useState(null);
  return (
  <div className="App">
    <h1>SEM Planner</h1>
      {/*pass keywords here too */}
      <InputForm keywords={keywords} setKeywords={setKeywords} setPlan={setPlan} />
      <Results keywords={keywords} plan={plan} />
    </div>
  );
}

export default App;

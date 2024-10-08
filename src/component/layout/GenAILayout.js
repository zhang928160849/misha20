import "@ui5/webcomponents-icons/dist/da.js";

import "../css/App.css";
import PlayGround from "../playGround/PlayGround";
import { useState, useContext } from "react";
import AICard from "../card/AICard";
import NotesCard from "../card/NotesCard";
function GenAILayout() {
  const [isDialogVisible, setDialogVisible] = useState(true);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setDialogVisible(true);
  };

  return (
    <div className="App">
      <AICard
        onSubmit={handleSubmit}
        isVisible={isDialogVisible}
        isSubmitted={isSubmitted}
      />
      <NotesCard isSubmitted={isSubmitted} />
      <PlayGround isSubmitted={isSubmitted} />
    </div>
  );
}

export default GenAILayout;

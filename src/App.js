import logo from "./logo.svg";
import "./App.css";
import BasicInput from "./component/input/BasicInput";
import { LayoutProvider } from "./component/context/LayoutContext";
import GenAILayout from "./component/layout/GenAILayout";

function App() {
  return (
    <LayoutProvider>
      <GenAILayout />
    </LayoutProvider>
  );
}

export default App;

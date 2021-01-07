import "semantic-ui-css/semantic.min.css";
import "./App.scss";

import { AppProvider } from "./context/AppContext";
import StoriesList from "./components/StoriesList";

const App = () => (
  <AppProvider>
    <div className="App">
      <header className="App-header">
        <StoriesList />
      </header>
    </div>
  </AppProvider>
);

export default App;

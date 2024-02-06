import { Provider } from "react-redux";
import Body from "./components/Body";
import store from "./store/store";

function App() {
  
  return (
    <div className="App">
      <Provider store={store}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;

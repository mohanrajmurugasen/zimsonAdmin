import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import Main from "./components/main/main";
import Login from "./components/user/login";
import stores from "./redux/reducers";

const store = createStore(stores);

function App() {
  const token = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {token !== null ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

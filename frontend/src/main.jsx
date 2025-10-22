import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux-Store/store.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Giving access to all app's components */}
    <Provider store={store}>
      {/*BrowserRouter This enables routing in your app — it lets you use <Route> and <Link> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

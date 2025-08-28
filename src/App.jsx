import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<CustomerRouters />} />
    </Routes>
  );
}

export default App;

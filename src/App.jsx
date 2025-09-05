import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import "./App.css";
import AdminRouters from "./Routers/AdminRouters";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<CustomerRouters />} />
      <Route path='/admin/*' element={<AdminRouters/>}></Route>
    </Routes>
  );
}

export default App;

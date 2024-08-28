import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderManagement from "./components/OrderManagement/OrderManagement";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<OrderManagement />} />
          <Route path="/" element={<LoginForm />} />
          {/* Редирект на страницу входа по умолчанию */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

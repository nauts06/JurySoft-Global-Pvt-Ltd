import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../authentication/Login";
import Executive from "../authentication/Executive";


const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Login />} />
          <Route path="/signIn" element={<Executive />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;

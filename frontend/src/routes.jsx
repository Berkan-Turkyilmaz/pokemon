import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/pokemon/:name" element={<>Detail Page</>} />
        <Route path="/roster" element={<>Roster Page</>} />
        <Route path="/battle" element={<>Battle Page</>} />
        <Route path="/leaderboard" element={<>Leaderboard Page</>} />
      </Routes>
    </Router>
  );
}
export default AppRoutes;

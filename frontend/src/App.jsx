import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BattlePage,
  DetailsPage,
  HomePage,
  LeaderboardPage,
  RosterPage,
} from "./pages";
import NotFound from "./components/notFound";
import Navigation from "./components/navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<DetailsPage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;

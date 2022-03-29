import { Route, Routes, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleClick}>Logout</button>

      <Routes>
        <Route path="/welcome" element={<p>Welcome!</p>} />
      </Routes>
    </div>
  );
}

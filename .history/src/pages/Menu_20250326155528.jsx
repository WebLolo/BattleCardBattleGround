import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <h1>Bienvenue dans le jeu</h1>
      <button onClick={() => navigate("/game")}>Jouer</button>
    </div>
  );
}

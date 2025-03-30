import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <h1>Bienvenue dans le jeu</h1>
      <button onClick={() => navigate("/game", { state: { mode: "ia" } })}>
        Jouer contre l'IA
      </button>
      <button onClick={() => navigate("/game", { state: { mode: "1v1" } })}>
        1v1 Local
      </button>
    </div>
  );
}

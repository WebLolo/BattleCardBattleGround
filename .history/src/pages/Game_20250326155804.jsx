import { useLocation } from "react-router-dom";

export default function Game() {
  const location = useLocation();
  const mode = location.state?.mode || "ia"; // Par défaut, mode IA

  return (
    <div className="game">
      <h1>Mode de jeu : {mode === "ia" ? "IA" : "1v1 Local"}</h1>
    </div>
  );
}

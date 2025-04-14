import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react"; // ou n'importe quelle icône

export default function MusicControl({ audioRefs }) {
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [muted, setMuted] = useState(false);

  const containerRef = useRef(null);

  // Appliquer le volume à tous les audios liés
  useEffect(() => {
    audioRefs.forEach(ref => {
      if (ref.current) {
        ref.current.volume = muted ? 0 : volume;
      }
    });
  }, [volume, muted, audioRefs]);

  // Cacher les contrôles si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowControls(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
  <button
    onClick={() => setShowControls(!showControls)}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "white",
      fontSize: 24,
    }}
  >
    🔊
  </button>

  {showControls && (
    <div
      style={{
        position: "absolute", // 👈 empêche le décalage
        top: "100%",
        right: 0,
        marginTop: 8,
        padding: 10,
        background: "rgba(0,0,0,0.7)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
      />
      <button onClick={toggleMute} style={{ marginTop: 5, color: "white" }}>
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  )}
</div>
  );
}
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);


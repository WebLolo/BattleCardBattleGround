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
    <div ref={containerRef} style={{ position: "absolute", top: 10, right: 10, zIndex: 999 }}>
        <button
            onClick={() => setShowControls(!showControls)}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white" // 👈 bouton blanc
            }}
        >
        {muted || volume === 0 ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </button>
      {showControls && (
        <div style={{
          marginTop: 10,
          padding: 10,
          background: "rgba(0,0,0,0.7)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: 100 }}
          />
          <button
            onClick={() => setMuted(!muted)}
            style={{
              marginTop: 8,
              background: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {muted ? "Désactiver Mute" : "Mute"}
          </button>
        </div>
      )}
    </div>
  );
}

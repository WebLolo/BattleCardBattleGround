import "@/styles/GameLayout.css";

export default function GameLayout({ children, hudTop, boardTop, boardBottom, shop, footer }) {
  return (
    <div
        className="footer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        if (data.source === "shop") {
            onDropFromShop?.(data.card);
        }
        }}>
        {footer}
    </div>
  );
}

import GameLayout1v1 from "./GameLayout1v1";
export default function Game1v1(){
    return (
        <GameLayout1v1
            Player2HUD={
                phase === "shopPlayer1" ? (
                    <DropZone
                    
                    />
                )
            }
        >
        </GameLayout1v1>
    )
}
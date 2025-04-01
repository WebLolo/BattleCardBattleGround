import GameLayout1v1 from "./GameLayout1v1";
import DropZone from "./DropZone";
export default function Game1v1(){
    return (
        <GameLayout1v1
            Player2HUD={
                phase === "shopPlayer1" ? (
                    <DropZone

                    >
                    </DropZone>
                )
            }
        >
        </GameLayout1v1>
    )
}
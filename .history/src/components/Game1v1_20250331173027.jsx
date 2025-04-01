import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import { useState } from "react";
export default function Game1v1(){
    const [phase, setPhase] = useState("shopPlayer1");
    return (
        <GameLayout1v1
            Player2HUD={
                phase === "shopPlayer1"
            }

        >
        </GameLayout1v1>
    )
}
import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import { useState } from "react";
import ShopHUD from "./ShopHUD";
export default function Game1v1(){
    const [phase, setPhase] = useState("combat");
    return (
        <GameLayout1v1
            Player2HUDShop={
                phase === "shopPlayer1" ? (
                    <ShopHUD 
                    
                    />
                ) : phase === "shopPlayer2" ? (
                    <ShopHUD 
                    
                    />
                ) : phase === "combat" ? (
                    <Player2HUD 
                    
                    />
                ) : null
            }

        >
        </GameLayout1v1>
    )
}
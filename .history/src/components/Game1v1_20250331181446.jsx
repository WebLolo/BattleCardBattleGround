import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import { useState } from "react";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
export default function Game1v1(){
    const [phase, setPhase] = useState("shopPlayer1");
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
            ShopBoard={
                phase === "shopPlayer1" ? (
                    <ShopBoard 
                    
                    />
                ) : phase === "shopPlayer2" ? (
                    <ShopBoard 
                    
                    />
                ) : phase === "combat" ? (
                    <Player2Board 
                    
                    />
                ) : null
            }

        >
        </GameLayout1v1>
    )
}
import { useState } from "react";
import GameLayout from "./GameLayout";
import ShopHUD from "./ShopHUD";
import IAHUD from "./IAHUD";
import ShopBoard from "./ShopBoard";

export default function GameIA(){

    const [phase, setPhase] = useState("qsdqsd");

    return (
        <GameLayout
            IAHUD={
                phase === "shop" ? (
                    <ShopHUD
            
                    />
                ) : (
                    <IAHUD
                    />
                )

            }
            ShopBoard={
                phase === "shop" ? (
                    <ShopBoard
                    />
                ) : (
                    <IABoard
                    />
                )
            }
        
        />
    )
}
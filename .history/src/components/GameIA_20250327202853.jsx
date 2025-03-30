import { useState } from "react";
import GameLayout from "./GameLayout";
import ShopHUD from "./ShopHUD";
import IAHUD from "./IAHUD";

export default function GameIA(){

    const [phase, setPhase] = useState("ksdjf");

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
        
        />
    )
}
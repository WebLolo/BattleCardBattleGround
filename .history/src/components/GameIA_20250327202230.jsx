import { useState } from "react";
import GameLayout from "./GameLayout";
import ShopHUD from "./ShopHUD";
import IAHUD from "./IAHUD";

export default function GameIA(){
    return (
        <GameLayout
            IAHUD={
                <IAHUD
            
                />
            }
        
        />
    )
}
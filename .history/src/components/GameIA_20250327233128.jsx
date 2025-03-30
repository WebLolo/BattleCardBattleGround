import { useState } from "react";
import GameLayout from "./GameLayout";
import ShopHUD from "./ShopHUD";
import IAHUD from "./IAHUD";
import ShopBoard from "./ShopBoard";
import IABoard from "./IABoard";
import PlayerBoard from "./PlayerBoard";
import PlayerDeck from "./PlayerDeck";
import PlayerHUD from "./PlayerHUD";

export default function GameIA(){

    const [phase, setPhase] = useState("shop");
    const [gold, setGold] = useState(3);
    const [lvlTaverne, setLvlTaverne] = useState(1);
    const [playerPv, setplayerPv] = useState(30);

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
            PlayerBoard={
                <PlayerBoard
                />
            }
            PlayerDeck={
                <PlayerDeck
                />
            }
            PlayerHUD={
                <PlayerHUD
                    gold={gold}
                    lvlTaverne={lvlTaverne}
                />
            }
        
        />
    )
}
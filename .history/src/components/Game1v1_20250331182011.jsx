import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import { useState } from "react";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import { getCartesPourShop, getNombreCartesShop, getCartesAleatoires, clonerCarte } from "@/utils/shopUtils";

export default function Game1v1(){
    // Les phases
    const [phase, setPhase] = useState("shopPlayer1");
    // Les cartes du shop
    let [shopCards, setShopCards] = useState(() => {
        const tirage = getCartesPourShop(lvlTaverne);
        const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
        return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
    });
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
                        cards={shopCards}
                        origin="shop"
                        onPreview={setPreviewCard}
                    
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
import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import { useState } from "react";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import DropZone from "./DropZone";
import { getCartesPourShop, getNombreCartesShop, getCartesAleatoires, clonerCarte } from "@/utils/shopUtils";

export default function Game1v1(){
    // Les phases
    const [phase, setPhase] = useState("shopPlayer2");
    // Lvl Taverne Joueur 1
    const [lvlTaverne, setLvlTaverne] = useState(1);
    // Les previews des cartes
    const [previewCard, setPreviewCard] = useState(null);
    // Les cartes du shop
    let [shopCards, setShopCards] = useState(() => {
        const tirage = getCartesPourShop(lvlTaverne);
        const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
        return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
    });
    return (
        <GameLayout1v1
            Player2HUDShop={
                phase === "combat" ? (
                    <Player2HUD 
                    
                    />
                ) : null
            }
            ShopHUD={
                phase === "shopPlayer1" ? (
                    <DropZone id="header" className="drop-header">
                        <ShopHUD 
                    
                        />
                    </DropZone>
                ) : phase === "shopPlayer2" ? (
                    <DropZone id="header" className="drop-header">
                        <ShopHUD 
                    
                        />
                    </DropZone>
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
                        cards={shopCards}
                        origin="shop"
                        onPreview={setPreviewCard}
                    
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
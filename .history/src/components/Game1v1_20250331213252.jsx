import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import Player2Board from "./Player2Board";
import { useState } from "react";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import DropZone from "./DropZone";
import { getCartesPourShop, getNombreCartesShop, getCartesAleatoires, clonerCarte } from "@/utils/shopUtils";

export default function Game1v1(){
    // Les phases
    const [phase, setPhase] = useState("combat");
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
    // Board en phase combat et en phase Shop du Joueur 2
    const [boardCombatPlayer2, setBoardCombatPlayer2] = useState([]);
    const [boardPlayer2, setBoardPlayer2] = useState([]);
    return (
        <GameLayout1v1
            Player2HUDFight={
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
                ) :  null
            }
            Player2BoardFight={
                phase === "combat" ? (
                    <Player2Board 
                        cards={phase === "combat" ? boardCombatPlayer2 : boardPlayer2}
                        origin="board"
                        onPreview={setPreviewCard}
                        phase={phase}
                    
                    />
                ) : null
            }
            PlayerBoard={
                phase === "shopPlayer1" ? (
                    <DropZone id="board-drop" className="drop-bord">
                        <PlayerBoard 
                    
                        />
                    </DropZone>
                ) : null
            }
            Player2Board={
                phase === "shopPlayer2" ? (
                    <DropZone id="board-drop" className="drop-bord">
                        <Player2Board 
                    
                        />
                    </DropZone>
                ) : null
            }

        >
        </GameLayout1v1>
    )
}
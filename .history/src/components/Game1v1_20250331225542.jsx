import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import Player2Board from "./Player2Board";
import { useState } from "react";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import DropZone from "./DropZone";
import PlayerBoard from "./PlayerBoard";
import { getCartesPourShop, getNombreCartesShop, getCartesAleatoires, clonerCarte, coutLvlTaverne, actualiserBoutique, lvlUpTaverne } from "@/utils/shopUtils2";

export default function Game1v1(){

    // settings //
    // Les phases
    const [phase, setPhase] = useState("shopPlayer2");
    // Phase joueurs  (1 pour joueur 1 et 2 pour joueur 2)
    const [actualPlayer, setActualPlayer] = useState(1);
    // Les previews des cartes
    const [previewCard, setPreviewCard] = useState(null);

    // tout ce qui concerne le joueur 1 //
    // Gold player1
    const [gold, setGold] = useState(3);
    // Lvl Taverne Joueur 1
    const [lvlTaverne, setLvlTaverne] = useState(1);
    // Board en phase combat et en phase Shop du Joueur 1
    const [boardCombat, setBoardCombat] = useState([]);
    const [boardPlayer, setBoardPlayer] = useState([]);
    
    // Tout ce qui concerne le joueur 2 //
    // Board en phase combat et en phase Shop du Joueur 2
    const [boardCombatPlayer2, setBoardCombatPlayer2] = useState([]);
    const [boardPlayer2, setBoardPlayer2] = useState([]);
    // Gold player2
    const [goldPlayer2, setGoldPlayer2] = useState(3);
    // Lvl Taverne Joueur 2
    const [lvlTavernePlayer2, setLvlTavernePlayer2] = useState(1);
    // Pv Player 2
    const [player2Pv, setplayer2Pv] = useState(30);
    
    // Tout ce qui concerne le shop //
    // Les cartes du shop
    let [shopCards, setShopCards] = useState(() => {
        if (actualPlayer === 1){
            const tirage = getCartesPourShop(lvlTaverne);
            const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
            return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
        }
        if (actualPlayer === 2){
            const tirage = getCartesPourShop(lvlTavernePlayer2);
            const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2));
            return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
        }

    });

    // Autre //
    // Pour le combat
    const [carteAttaquantId, setCarteAttaquantId] = useState(null);
    const [carteDefenseurId, setCarteDefenseurId] = useState(null);


    return (
        <GameLayout1v1
            Player2HUDFight={
                phase === "combat" ? (
                    <Player2HUD 
                        goldPlayer2 = {goldPlayer2}
                        lvlTavernePlayer2 = {lvlTavernePlayer2}
                        player2Pv = {player2Pv}
                    />
                ) : null
            }
            ShopHUD={
                phase === "shopPlayer1" ? (
                    <DropZone id="header" className="drop-header">
                        <ShopHUD
                            cout={coutLvlTaverne[lvlTaverne]} 
                            onRefresh={() =>
                                actualiserBoutique({ lvlTaverne, setShopCards, gold, setGold, actualPlayer })
                            }
                            onLvlUp={() =>
                                lvlUpTaverne({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards })
                            }
                    
                        />
                    </DropZone>
                ) : phase === "shopPlayer2" ? (
                    <DropZone id="header" className="drop-header">
                        <ShopHUD
                            cout={coutLvlTaverne[lvlTavernePlayer2]}
                            onRefresh={() =>
                                actualiserBoutique({ lvlTavernePlayer2, setShopCards, goldPlayer2, setGoldPlayer2, actualPlayer })
                            }
                            onLvlUp={() =>
                                lvlUpTaverne({ goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, setLvlTavernePlayer2, setShopCards })
                            }
                    
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
                        cards={ boardCombatPlayer2 }
                        origin="board"
                        onPreview={setPreviewCard}
                        phase={phase}
                        carteAttaquantId={carteAttaquantId}
                        carteDefenseurId={carteDefenseurId}
                    
                    />
                ) : null
            }
            PlayerBoard={
                phase === "shopPlayer1" ? (
                    <DropZone id="board-drop" className="drop-bord">
                        <PlayerBoard 
                            cards={ boardPlayer }
                            origin="board"
                            onPreview={setPreviewCard}
                            phase={phase}
                            carteAttaquantId={carteAttaquantId}
                            carteDefenseurId={carteDefenseurId}
                        />
                    </DropZone>
                ) : null
            }
            Player2Board={
                phase === "shopPlayer2" ? (
                    <DropZone id="board-drop" className="drop-bord">
                        <Player2Board 
                            cards={ boardPlayer2 }
                            origin="board"
                            onPreview={setPreviewCard}
                            phase={phase}
                            carteAttaquantId={carteAttaquantId}
                            carteDefenseurId={carteDefenseurId}
                    
                        />
                    </DropZone>
                ) : null
            }

        >
        </GameLayout1v1>
    )
}
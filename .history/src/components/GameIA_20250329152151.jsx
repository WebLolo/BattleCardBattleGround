import { useState } from "react";
import { useEffect } from "react"; // en haut si pas déjà importé
import { DndContext } from "@dnd-kit/core";
import GameLayout from "./GameLayout";
import ShopHUD from "./ShopHUD";
import IAHUD from "./IAHUD";
import ShopBoard from "./ShopBoard";
import IABoard from "./IABoard";
import PlayerBoard from "./PlayerBoard";
import PlayerDeck from "./PlayerDeck";
import PlayerHUD from "./PlayerHUD";
import DropZone from "./DropZone";
import CardPreview from "@/components/CardPreview";
import { deroulerCombatReact } from "@/utils/combatUtils";
import { cards } from "@/data/cardsData";
import {
    coutLvlTaverne,
    getCartesPourShop,
    getNombreCartesShop,
    getCartesAleatoires,
    lvlUpTaverne,
    acheterCarte,
    actualiserBoutique,
    clonerCarte,
    acheterCarteIA,
  } from "@/utils/shopUtils";

export default function GameIA(){

    const [phase, setPhase] = useState("shop");
    const [gold, setGold] = useState(100);
    const [uniqueID, setUniqueID] = useState(1000)
    const [lvlTaverne, setLvlTaverne] = useState(1);
    const [playerPv, setplayerPv] = useState(30);
    const [previewCard, setPreviewCard] = useState(null); //
    let [shopCards, setShopCards] = useState(() => {
        const tirage = getCartesPourShop(lvlTaverne);
        const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
        return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
      });

    const [deck, setDeck] = useState([]);
    const [boardPlayer, setBoardPlayer] = useState([]);
    const [pvIA, setPvIA] = useState(30);
    const [boardIA, setBoardIA] = useState([]);
    const [goldIA, setGoldIA] = useState(3);
    const [goldTour1, setgoldTour1] = useState(3);
    const [messageCombat, setMessageCombat] = useState(null)

    const [boardCombat, setBoardCombat] = useState([]);
    const [boardCombatIA, setBoardCombatIA] = useState([]);
    const [carteAttaquantId, setCarteAttaquantId] = useState(null);
    const [carteDefenseurId, setCarteDefenseurId] = useState(null);


    const jouerCarteDepuisDeck = (card) => {
        if (boardPlayer.length >= 7) {
          alert("🛑 Board plein !");
          return;
        }
        setDeck(deck.filter((c) => c.id !== card.id));
        setBoardPlayer([...boardPlayer, card]);
    };
      
    const vendreCarteDuBoard = (card) => {
        setBoardPlayer(boardPlayer.filter((c) => c.id !== card.id));
        setGold(gold + 1);
    };



    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
      
        const [sourceType, sourceId] = active.id.split("-");
        const targetType = over.id;
        const id = parseInt(sourceId);
      
        let draggedCard;
        if (sourceType === "shop") {
          draggedCard = shopCards.find((c) => c.id === id);
        } else if (sourceType === "board") {
          draggedCard = boardPlayer.find((c) => c.id === id);
        } else if (sourceType === "deck") {
          draggedCard = deck.find((c) => c.id === id);
        }
      
        if (!draggedCard) return;
      
        if (sourceType === "shop" && targetType === "footer") {
          acheterCarte({
            card: draggedCard,
            gold,
            setGold,
            deck,
            setDeck,
            shopCards,
            setShopCards,
          });
        } else if (sourceType === "board" && targetType === "header") {
          vendreCarteDuBoard(draggedCard);
        } else if (sourceType === "deck" && targetType === "board-drop") {
          jouerCarteDepuisDeck(draggedCard);
        }
    };



    return (
        <DndContext onDragEnd={handleDragEnd}>
            <GameLayout
                IAHUD={
                    phase === "shop" ? (
                        <DropZone id="header" className="drop-header">
                            <ShopHUD
                                cout={coutLvlTaverne[lvlTaverne]}
                                onRefresh={() =>
                                    actualiserBoutique({ lvlTaverne, setShopCards, gold, setGold })
                                }
                                onLvlUp={() =>
                                    lvlUpTaverne({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards })
                                }
                        
                            />
                        </DropZone>
                    ) : (
                        <DropZone id="header" className="drop-header">
                            <IAHUD
                                pvIA={pvIA}
                            />
                        </DropZone>
                    )

                }
                ShopBoard={
                    phase === "shop" ? (
                        <ShopBoard
                            cards={shopCards}
                            origin="shop"
                            onPreview={setPreviewCard}
                        />
                    ) : (
                        <IABoard 
                            cards={phase === "combat" ? boardCombatIA : boardIA} 
                            onPreview={setPreviewCard}
                            carteAttaquantId={carteAttaquantId}
                            carteDefenseurId={carteDefenseurId}
                            origin={"ia"}
                            phase={phase}
                        />   

                    )
                }
                PlayerBoard={
                    <DropZone id="board-drop" className="drop-bord">
                        <PlayerBoard
                            cards={phase === "combat" ? boardCombat : boardPlayer} 
                            origin="board" 
                            onPreview={setPreviewCard}
                            phase={phase}
                            carteAttaquantId={carteAttaquantId}
                            carteDefenseurId={carteDefenseurId}
                        />
                    </DropZone>
                }
                PlayerDeck={
                    <DropZone id="footer" className="drop-footer">
                        <PlayerDeck
                            cards={deck}
                            origin="deck"
                            onPlay={jouerCarteDepuisDeck}
                            onPreview={setPreviewCard}
                        />
                    </DropZone>
                }
                PlayerHUD={
                    <>
                        <PlayerHUD
                            gold={gold}
                            lvlTaverne={lvlTaverne}
                            playerPv={playerPv}
                        />
                    
                    {phase === "shop" && (
                        <button
                            className="btn btn-danger mt-2"
                            onClick={async () => {
                                setPhase("combat");
                                await deroulerCombatReact({
                                  boardPlayer,
                                  setBoardPlayer,
                                  boardIA,
                                  setBoardIA,
                                  lvlTaverne,
                                  playerPv,
                                  setplayerPv,
                                  pvIA,
                                  goldIA,
                                  setGoldIA,
                                  setPvIA,
                                  setMessageCombat,
                                  setPhase,
                                  setBoardCombat,
                                  setBoardCombatIA,
                                  setCarteAttaquantId,
                                  setCarteDefenseurId
                                });
                              }} 
                              
                        >
                            Lancer le combat
                        </button>
                    )} : {phase === "combat" && (
                        <button
                            className="btn btn-danger mt-2"
                            onClick={async () => {
                                setPhase("shop");

                              }} 
                              
                        >
                            Retour au shop
                        </button>
                    )}


                    </>
                }
                
        
            />
            <CardPreview card={previewCard} onClose={() => setPreviewCard(null)} />
            {messageCombat && (
                <div className="message-combat">
                    {messageCombat}
                </div>
            )}
        </DndContext>
    )
}
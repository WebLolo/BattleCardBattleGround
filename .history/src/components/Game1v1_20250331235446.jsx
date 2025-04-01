import GameLayout1v1 from "./GameLayout1v1";
import Player2HUD from "./Player2HUD";
import Player2Board from "./Player2Board";
import Player2Deck from "./Player2Deck";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import DropZone from "./DropZone";
import PlayerBoard from "./PlayerBoard";
import PlayerDeck from "./PlayerDeck";
import CardPreview from "@/components/CardPreview";
import { getCartesPourShop, getNombreCartesShop, getCartesAleatoires, clonerCarte, coutLvlTaverne, actualiserBoutique, lvlUpTaverne, acheterCarte } from "@/utils/shopUtils2";

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
    //deck player1 
    const [deck, setDeck] = useState([]);
    
    // Tout ce qui concerne le joueur 2 //
    // Board en phase combat et en phase Shop du Joueur 2
    const [boardCombatPlayer2, setBoardCombatPlayer2] = useState([]);
    const [boardPlayer2, setBoardPlayer2] = useState([]);
    //deck player2 
    const [deckPlayer2, setDeckPlayer2] = useState([]);
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

    const vendreCarteDuBoard = (card) => {
        if(actualPlayer === 1){
            setBoardPlayer(boardPlayer.filter((c) => c.id !== card.id));
            setGold(gold + 1);
        }
        if(actualPlayer === 2){
            setBoardPlayer2(boardPlayer2.filter((c) => c.id !== card.id));
            setGoldPlayer2(goldPlayer2 + 1);
        }

    };

    const jouerCarteDepuisDeck = (card) => {
        if(actualPlayer === 1){
            if (boardPlayer.length >= 7) {
                alert("🛑 Board plein !");
                return;
            }
            setDeck(deck.filter((c) => c.id !== card.id));
            setBoardPlayer([...boardPlayer, card]);
        }
        if(actualPlayer === 2){
            if (boardPlayer2.length >= 7) {
                alert("🛑 Board plein !");
                return;
            }
            setDeckPlayer2(deckPlayer2.filter((c) => c.id !== card.id));
            setBoardPlayer2([...boardPlayer2, card]);
        }
    };

    const handleDragEnd = (event) => {
        if(actualPlayer === 1){
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
    
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerre ) {
      
                    console.log(`📢 Cri de guerre activé pour ${draggedCard.nom}`);
                
                    draggedCard.criDeGuerre(boardPlayer); // Effet sur tout le board
    
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.poteLa) {
                console.log(`📢 Pote la ! activé pour ${draggedCard.nom}`);
                draggedCard.poteLa(boardPlayer)
        
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerreUnique) {
                console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                let cible = boardPlayer[Math.floor(Math.random() * boardPlayer.length)];
                draggedCard.criDeGuerreUnique(cible); // Effet sur tout le board
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sangNoble) {
                console.log(`📢 Sang Noble activé pour ${draggedCard.nom}`);
                draggedCard.sangNoble(boardPlayer)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.effetDeCouple){
                appliquerEffetDeCouple(draggedCard, boardPlayer)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.aura) {
                console.log(`📢 Aura activé par ${draggedCard.nom}`);
                draggedCard.aura(boardPlayer)
            
            }
            if (sourceType === "board" && targetType === "header" && draggedCard.auraSell) {
                console.log(`📢 Aura de ${draggedCard.nom} désactivée`);
                draggedCard.auraSell(boardPlayer)
            
            }
            if (sourceType === "deck" && targetType === "board-drop"){
                let auraPresent = boardPlayer.findIndex(carte => carte.aura)
                console.log(auraPresent)
                if (auraPresent >= 0){
                    let carteAura = boardPlayer.find(carte => carte.aura)
                    carteAura.auraUnique(draggedCard)
                }
                
    
    
            }
    
            
          
            if (sourceType === "shop" && targetType === "footer") {
              acheterCarte({
                card: draggedCard,
                gold,
                setGold,
                deck,
                setDeck,
                shopCards,
                setShopCards,
                lvlTaverne,
                actualPlayer
              });
            } else if (sourceType === "board" && targetType === "header") {
              vendreCarteDuBoard(draggedCard);
            } else if (sourceType === "deck" && targetType === "board-drop") {
              jouerCarteDepuisDeck(draggedCard);
            }
        }
        if(actualPlayer === 2){
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
    
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerre ) {
      
                    console.log(`📢 Cri de guerre activé pour ${draggedCard.nom}`);
                
                    draggedCard.criDeGuerre(boardPlayer); // Effet sur tout le board
    
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.poteLa) {
                console.log(`📢 Pote la ! activé pour ${draggedCard.nom}`);
                draggedCard.poteLa(boardPlayer)
        
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerreUnique) {
                console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                let cible = boardPlayer[Math.floor(Math.random() * boardPlayer.length)];
                draggedCard.criDeGuerreUnique(cible); // Effet sur tout le board
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sangNoble) {
                console.log(`📢 Sang Noble activé pour ${draggedCard.nom}`);
                draggedCard.sangNoble(boardPlayer)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.effetDeCouple){
                appliquerEffetDeCouple(draggedCard, boardPlayer)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.aura) {
                console.log(`📢 Aura activé par ${draggedCard.nom}`);
                draggedCard.aura(boardPlayer)
            
            }
            if (sourceType === "board" && targetType === "header" && draggedCard.auraSell) {
                console.log(`📢 Aura de ${draggedCard.nom} désactivée`);
                draggedCard.auraSell(boardPlayer)
            
            }
            if (sourceType === "deck" && targetType === "board-drop"){
                let auraPresent = boardPlayer.findIndex(carte => carte.aura)
                console.log(auraPresent)
                if (auraPresent >= 0){
                    let carteAura = boardPlayer.find(carte => carte.aura)
                    carteAura.auraUnique(draggedCard)
                }
                
    
    
            }
    
            
          
            if (sourceType === "shop" && targetType === "footer") {
              acheterCarte({
                card: draggedCard,
                gold,
                setGold,
                deck,
                setDeck,
                shopCards,
                setShopCards,
                lvlTaverne,
                actualPlayer
              });
            } else if (sourceType === "board" && targetType === "header") {
              vendreCarteDuBoard(draggedCard);
            } else if (sourceType === "deck" && targetType === "board-drop") {
              jouerCarteDepuisDeck(draggedCard);
            }
        }

    };


    return (
        <DndContext onDragEnd={handleDragEnd}>
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
                PlayerDeck={
                    phase === "shopPlayer1" ? (
                        <DropZone id="footer" className="drop-footer">
                            <PlayerDeck
                                cards={deck}
                                origin="deck"
                                onPlay={jouerCarteDepuisDeck}
                                onPreview={setPreviewCard}
                            />
                        </DropZone>
                    ) : null
                }
                Player2Deck={
                    phase === "shopPlayer2" ? (
                        <DropZone id="footer" className="drop-footer">
                            <Player2Deck
                                cards={deckPlayer2}
                                origin="deck"
                                onPlay={jouerCarteDepuisDeck}
                                onPreview={setPreviewCard}
                            />
                        </DropZone>
                    ) : null
                }

            /> 
            <CardPreview card={previewCard} onClose={() => setPreviewCard(null)} /> 
        </DndContext>
    )
}
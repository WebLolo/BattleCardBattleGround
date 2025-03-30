import { useState, useEffect, useRef  } from "react";
import { DndContext } from "@dnd-kit/core";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import DropZone from "@/components/DropZone";
import { cards } from "@/data/cardsData";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);
  const [shopCards, setShopCards] = useState([]);

  const niveauTaverne = 1;

  const getCartesPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne);
  };

  const getCartesAleatoires = (liste, nombre) => {
    return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
  };

  // 🆕 Générer le shop au premier rendu
  useEffect(() => {
    const cartesPossibles = getCartesPourShop(niveauTaverne);
    const tirage = getCartesAleatoires(cartesPossibles, 3); // 3 cartes pour le niveau 1
    setShopCards(tirage);
  }, []);

  const jouerCarteDepuisDeck = (card) => {
    if (boardJoueur.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
    setDeck(deck.filter((c) => c.id !== card.id));
    setBoardJoueur([...boardJoueur, card]);
  };

  const acheterCarte = (card) => {
    if (gold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    setGold(gold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  };

  const vendreCarteDuBoard = (card) => {
    setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
    setGold(gold + 1);
  };

  const actualiserShop = () => {
    if (gold < 1) {
      alert("💰 Pas assez d'or pour actualiser !");
      return;
    }
  
    // Lancer animation
    if (shopRef.current) {
      shopRef.current.classList.add("shop-refresh-anim");
  
      // Supprimer après animation pour pouvoir la relancer plus tard
      setTimeout(() => {
        if (shopRef.current) {
          shopRef.current.classList.remove("shop-refresh-anim");
        }
      }, 400);
    }
  
    const cartesPossibles = getCartesPourShop(niveauTaverne);
    const tirage = getCartesAleatoires(cartesPossibles, 3);
    setShopCards(tirage);
    setGold(gold - 1);
  };
  

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("🧲 Drag terminé :", { active: active.id, over: over.id });
    if (!over) return;

    const [sourceType, sourceId] = active.id.split("-");
    const targetType = over.id;
    const id = parseInt(sourceId);

    let draggedCard;
    if (sourceType === "shop") {
      draggedCard = shopCards.find((c) => c.id === id);
    } else if (sourceType === "board") {
      draggedCard = boardJoueur.find((c) => c.id === id);
    } else if (sourceType === "deck") {
      draggedCard = deck.find((c) => c.id === id);
    }

    if (!draggedCard) return;

    if (sourceType === "shop" && targetType === "footer") {
      acheterCarte(draggedCard);
    } else if (sourceType === "board" && targetType === "header") {
      vendreCarteDuBoard(draggedCard);
    } else if (sourceType === "deck" && targetType === "board-drop") {
      jouerCarteDepuisDeck(draggedCard);
    }
  };

  const fakeBoardIA = [];
  const shopRef = useRef(null);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameLayout
        hudTop={
          <DropZone id="header" className="drop-header">
            <PlayerHUD name="IA" hp={30} level={1} gold={gold} avatar="/img/ia_avatar.png" />
          </DropZone>
        }
        boardTop={<Board cards={fakeBoardIA} />}
        shop={
            <div style={{ textAlign: "center" }}>
              <button className="btn btn-warning mb-2" onClick={actualiserShop}>
                🔁 Actualiser la boutique (1💰)
              </button>
              <div ref={shopRef}>
                <Shop cards={shopCards} origin="shop" />
              </div>
            </div>
          }
        boardBottom={
          <DropZone id="board-drop">
            <Board cards={boardJoueur} origin="board" />
          </DropZone>
        }
        footer={
          <>
            <DropZone id="footer" className="drop-footer">
              <Deck cards={deck} />
            </DropZone>
            <PlayerHUD name="Joueur" hp={30} level={1} gold={gold} avatar="/img/player_avatar.png" />
          </>
        }
      />
    </DndContext>
  );
}

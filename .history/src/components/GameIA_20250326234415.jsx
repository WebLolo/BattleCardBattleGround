// src/components/GameIA.jsx
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import DropZone from "@/components/DropZone";
import ShopHUD from "@/components/ShopHUD";
import { cards } from "@/data/cardsData";
import {
  coutLvlTaverne,
  getCartesPourShop,
  getNombreCartesShop,
  getCartesAleatoires,
  lvlUpTaverne,
  acheterCarte,
  actualiserBoutique,
} from "@/utils/shopUtils";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);
  const [lvlTaverne, setLvlTaverne] = useState(1);
  const [phase, setPhase] = useState("shop");

  const [shopCards, setShopCards] = useState(() => {
    const tirage = getCartesPourShop(lvlTaverne);
    return getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
  });

  const jouerCarteDepuisDeck = (card) => {
    if (boardJoueur.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
    setDeck(deck.filter((c) => c.id !== card.id));
    setBoardJoueur([...boardJoueur, card]);
  };

  const vendreCarteDuBoard = (card) => {
    setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
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
      draggedCard = boardJoueur.find((c) => c.id === id);
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

  const boardIA = [
    { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameLayout
        hudTop={
          phase === "shop" ? (
            <DropZone id="header" className="drop-header">
                <ShopHUD
                    lvlTaverne={lvlTaverne}
                    coutLvlSuivant={coutLvlTaverne[lvlTaverne]}
                    onRefresh={() =>
                        actualiserBoutique({ lvlTaverne, setShopCards })
                    }
                    onLvlUp={() =>
                        lvlUpTaverne({
                        gold,
                        lvlTaverne,
                        setGold,
                        setLvlTaverne,
                        setShopCards,
                        })
                    }
                />
            </DropZone>    
          ) : (
            <DropZone id="header" className="drop-header">
              <PlayerHUD
                name="IA"
                hp={30}
                level={1}
                gold={gold}
                avatar="/img/ia_avatar.png"
              />
            </DropZone>
          )
        }
        boardTop={phase === "combat" ? <Board cards={boardIA} /> : null}
        shop={phase === "shop" ? <Shop cards={shopCards} origin="shop" /> : null}
        boardBottom={
          <DropZone id="board-drop">
            <Board cards={boardJoueur} origin="board" />
          </DropZone>
        }
        footer={
          <>
            <DropZone id="footer" className="drop-footer">
              <Deck cards={deck} onPlay={jouerCarteDepuisDeck} />
            </DropZone>
            <PlayerHUD
              name="Joueur"
              hp={30}
              level={1}
              gold={gold}
              avatar="/img/player_avatar.png"
            />
            {phase === "shop" && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => setPhase("combat")}
              >
                Lancer le combat
              </button>
            )}
          </>
        }
      />
    </DndContext>
  );
}

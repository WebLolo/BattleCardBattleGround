import { useState } from "react";
import GameLayout from "./GameLayout";
import ShopHUD from "./ShopHUD";
import IAHUD from "./IAHUD";
import ShopBoard from "./ShopBoard";
import IABoard from "./IABoard";
import PlayerBoard from "./PlayerBoard";
import PlayerDeck from "./PlayerDeck";
import PlayerHUD from "./PlayerHUD";
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

export default function GameIA(){

    const [phase, setPhase] = useState("shop");
    const [gold, setGold] = useState(3);
    const [lvlTaverne, setLvlTaverne] = useState(1);
    const [playerPv, setplayerPv] = useState(30);
    const [shopCards, setShopCards] = useState(() => {
        const tirage = getCartesPourShop(lvlTaverne);
        return getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
      });

   
    const boardPlayer = [
        { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/cardfight1.png" },
        { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/cardfight2.png" },
      ];
    const boardIA = [
        { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/cardfight1.png" },
        { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/cardfight2.png" },
      ];
      const deck = [
        { id: 1, name: "Dragon", atk: 4, hp: 6, img: "/img/card1.png" },
        { id: 2, name: "Golem", atk: 3, hp: 8, img: "/img/card2.png" },
      ];
    

    return (
        <GameLayout
            IAHUD={
                phase === "shop" ? (
                    <ShopHUD
                        cout={coutLvlTaverne[lvlTaverne]}
                        onRefresh={() =>
                            actualiserBoutique({ lvlTaverne, setShopCards, gold, setGold })
                        }
                        onLvlUp={() =>
                            lvlUpTaverne({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards })
                        }
            
                    />
                ) : (
                    <IAHUD
                    />
                )

            }
            ShopBoard={
                phase === "shop" ? (
                    <ShopBoard
                        cards={shopCards}
                    />
                ) : (
                    <IABoard
                        cards={boardIA}
                    />
                )
            }
            PlayerBoard={
                <PlayerBoard
                    cards={boardPlayer}

                />
            }
            PlayerDeck={
                <PlayerDeck
                    cards={deck}
                />
            }
            PlayerHUD={
                <PlayerHUD
                    gold={gold}
                    lvlTaverne={lvlTaverne}
                    playerPv={playerPv}
                />
            }
        
        />
    )
}
import GameLayout1v1 from "./GameLayout1v1";
import DropZone from "./DropZone";
export default function Game1v1(){
    return (
        <GameLayout1v1
            Player2HUD={
                phase === "shopPlayer1" ? (
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
                )
            }
        >
        </GameLayout1v1>
    )
}
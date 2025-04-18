import { useNavigate } from "react-router-dom";
import { setSoundEffectVolume } from "@/utils/soundUtils";
// import { FusionAnimation } from "@/utils/animUtils";
import MusicControl from "./MusicControl";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useRef  } from "react";
import ProjectileImage from "./ProjectileImage";
import GameLayout1v1 from "./GameLayout1v1";
import Player2HUDFight from "./Player2HUDFight";
import Player2HUD from "./Player2HUD";
import Player2Board from "./Player2Board";
import Player2BoardFight from "./Player2BoardFight";
import Player2Deck from "./Player2Deck";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import DropZone from "./DropZone";
import PlayerBoard from "./PlayerBoard";
import PlayerBoardFight from "./PlayerBoardFight";
import PlayerDeck from "./PlayerDeck";
import PlayerHUD from "./PlayerHUD";
import CardPreview from "@/components/CardPreview";
import { getCartesPourShop, getNombreCartesShop, getCartesAleatoires, clonerCarte, coutLvlTaverne, coutLvlTavernePlayer2, actualiserBoutique, lvlUpTaverne, acheterCarte, fusionnerCartesIdentiques } from "@/utils/shopUtils1v1";
import { deroulerCombat1v1, entierAleatoire } from "@/utils/combatUtils1v1";
import { bivalence, piocherCarte, boardPositionSell, addBoardPosition, piocherCarteSpe, piocherCarteInf } from "@/utils/mecaUtils";
import { sleep } from "../utils/combatUtils1v1";
export default function Game1v1(){

    // settings //
    // Les phases
    let cartesEffetDeCoupleApplique = new Set();
    const navigate = useNavigate();
    const [phase, setPhase] = useState("shopPlayer1");
    // Phase joueurs  (1 pour joueur 1 et 2 pour joueur 2)
    const [actualPlayer, setActualPlayer] = useState(1);
    // Les previews des cartes
    const [previewCard, setPreviewCard] = useState(null);
    const [goldTour1, setgoldTour1] = useState(3);
    // variables pour les effets
    const [marinsCount, setMarinsCount] = useState(0);
    const [terrestresCount, setTerrestresCount] = useState(0);
    const [marinsCountPlayer2, setMarinsCountPlayer2] = useState(0);
    const [terrestresCountPlayer2, setTerrestresCountPlayer2] = useState(0);
    const [animAoEVisuelle, setAnimAoEVisuelle] = useState(false);
    const [projectileAnim, setProjectileAnim] = useState(null);
    const [griffeEffects, setGriffeEffects] = useState([]);
    const lastProjectileId = useRef(null);
    const [volume, setVolume] = useState(0.4); // Valeur par défaut
    const [muted, setMuted] = useState(false)
    const [soundVolume, setSoundVolume] = useState(1); // volume effets sonores
    const [fusionAnim, setFusionAnim] = useState(null);


    // tout ce qui concerne le joueur 1 //
    // Gold player1
    const [gold, setGold] = useState(100);
    // Lvl Taverne Joueur 1
    const [lvlTaverne, setLvlTaverne] = useState(1);
    // Board en phase combat et en phase Shop du Joueur 1
    const [boardCombat, setBoardCombat] = useState([]);
    const [boardPlayer, setBoardPlayer] = useState([]);
    //deck player1 
    const [deck, setDeck] = useState([]);
    // Pv Player1
    const [playerPv, setplayerPv] = useState(45);
    
    // Tout ce qui concerne le joueur 2 //
    // Board en phase combat et en phase Shop du Joueur 2
    const [boardCombatPlayer2, setBoardCombatPlayer2] = useState([]);
    const [boardPlayer2, setBoardPlayer2] = useState([]);
    //deck player2 
    const [deckPlayer2, setDeckPlayer2] = useState([]);
    // Gold player2
    const [goldPlayer2, setGoldPlayer2] = useState(100);
    // Lvl Taverne Joueur 2
    const [lvlTavernePlayer2, setLvlTavernePlayer2] = useState(1);
    // Pv Player 2
    const [player2Pv, setplayer2Pv] = useState(45);
    
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
            boardPositionSell(card, boardPlayer)
            setBoardPlayer(boardPlayer.filter((c) => c.id !== card.id));
            setGold(gold + 1);
        }
        if(actualPlayer === 2){
            boardPositionSell(card, boardPlayer2)
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
            console.log(card)
            addBoardPosition (card, boardPlayer)
            
            setDeck(deck.filter((c) => c.id !== card.id));
            setBoardPlayer([...boardPlayer, card]);
            
        }
        if(actualPlayer === 2){
            if (boardPlayer2.length >= 7) {
                alert("🛑 Board plein !");
                return;
            }
            addBoardPosition (card, boardPlayer2)
            setDeckPlayer2(deckPlayer2.filter((c) => c.id !== card.id));
            setBoardPlayer2([...boardPlayer2, card]);
        }
    };
    function appliquerEffetDeCouple(carteAjoutee, cartesBoard) {
        if (!carteAjoutee.effetDeCouple || cartesEffetDeCoupleApplique.has(carteAjoutee.id)) {
            return; // ✅ Si la carte n'a pas d'effet de couple ou a déjà appliqué l'effet, on ne fait rien
        }
      
        let partenaireTrouve = cartesBoard.find(c => c.nom === carteAjoutee.effetDeCouple.partenaire);
      
        if (partenaireTrouve) {
            console.log(`💑 Effet de couple activé pour ${carteAjoutee.nom} (partenaire : ${partenaireTrouve.nom})`);
      
            // 🆕 Appliquer l'effet UNIQUEMENT à la carte posée, pas à toutes
            if (carteAjoutee.effetDeCouple.effet){
                carteAjoutee.effetDeCouple.effet(cartesBoard);
            }
            if (carteAjoutee.effetDeCouple.effetUnique){
                carteAjoutee.effetDeCouple.effetUnique(carteAjoutee);
            }
            
      
            // 🔒 Marquer la carte comme ayant déjà appliqué son effet
            cartesEffetDeCoupleApplique.add(carteAjoutee.id);
        }
    };
    
      
    function FusionAnimation({ fusionAnim, onFinish }) {
        const [start, setStart] = useState(false);
      
        useEffect(() => {
          if (fusionAnim) {
            setStart(true);
            const timer = setTimeout(() => {
              setStart(false);
              onFinish();
            }, 1600); // Durée totale
            return () => clearTimeout(timer);
          }
        }, [fusionAnim]);
      
        if (!fusionAnim || !start) return null;
      
        return (
          <div className="fusion-anim-overlay">
            {fusionAnim.cartes.slice(0, 3).map((card, index) => (
              <img
                key={card.id}
                src={card.imgMinia}
                className={`fusion-card fusion-from-${index + 1}`}
                alt={card.nom}
              />
            ))}
            <img
              src={fusionAnim.carteResultat.imgMinia}
              className="fusion-result"
              alt={fusionAnim.carteResultat.nom}
            />
          </div>
        );
      }

    const handleDragEnd = (event) => {
        if(actualPlayer === 1){
            const { active, over } = event;
            if (!over) return;
          
            const [sourceType, sourceId] = active.id.split("-");
            const targetType = over.id;
            const id = parseInt(sourceId);
            console.log("🔥 sourceType:", sourceType, "targetType:", targetType, "over.id:", over.id);
          
            let draggedCard;
            if (sourceType === "shop") {
              draggedCard = shopCards.find((c) => c.id === id);
            } else if (sourceType === "board") {
              draggedCard = boardPlayer.find((c) => c.id === id);
            } else if (sourceType === "deck") {
              draggedCard = deck.find((c) => c.id === id);
            }
          
            if (!draggedCard) return;



            if (sourceType === "board" && targetType.startsWith("board-")) {
                
                const oldIndex = boardPlayer.findIndex((c) => c.id === id);
                const newIndex = boardPlayer.findIndex((c) => c.id === parseInt(over.id.split("-")[1]));

                console.log("🔁 reorder from", oldIndex, "to", newIndex);
                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    const newBoard = arrayMove(boardPlayer, oldIndex, newIndex);
                    setBoardPlayer(newBoard);
                return;
}
            }
    
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerre && boardPlayer.length <7 ) {
      
                    console.log(`📢 Cri de guerre activé pour ${draggedCard.nom}`);
                
                    draggedCard.criDeGuerre(boardPlayer); // Effet sur tout le board
    
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.poteLa && boardPlayer.length <7) {
                console.log(`📢 Pote la ! activé pour ${draggedCard.nom}`);
                draggedCard.poteLa(boardPlayer)
        
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerreUnique && boardPlayer.length <7 ) {
                console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                let boardFiltred =  boardPlayer.filter(card => card.famille === draggedCard.famille);
                if(boardFiltred.length > 0){
                    let cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                    draggedCard.criDeGuerreUnique(cible); // Effet sur tout le board
                }
                
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sangNoble && boardPlayer.length <7) {
                console.log(`📢 Sang Noble activé pour ${draggedCard.nom}`);
                draggedCard.sangNoble(boardPlayer)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.effetDeCouple && boardPlayer.length <7){
                appliquerEffetDeCouple(draggedCard, boardPlayer)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.aura && boardPlayer.length <7) {
                console.log(`📢 Aura activé par ${draggedCard.nom}`);
                draggedCard.aura(boardPlayer)
            
            }
            if (sourceType === "board" && targetType === "header" && draggedCard.auraSell) {
                console.log(`📢 Aura de ${draggedCard.nom} désactivée`);
                draggedCard.auraSell(boardPlayer)
            
            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer.length <7){
                let auraPresent = boardPlayer.findIndex(carte => carte.aura)
                
                if (auraPresent >= 0){
                    let carteAura = boardPlayer.find(carte => carte.aura)
                    carteAura.auraUnique(draggedCard)
                }
            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer.length <7){
                bivalence(sourceType, targetType, draggedCard, deck, setMarinsCount, marinsCount, setTerrestresCount, terrestresCount, boardPlayer)
            }
            if (sourceType === "board" && targetType === "header"){
                bivalence(sourceType, targetType, draggedCard, deck, setMarinsCount, marinsCount, setTerrestresCount, terrestresCount, boardPlayer)
            }

            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.effetDeMass && boardPlayer.length <7){
                draggedCard.effetDeMass(draggedCard, boardPlayer)
            }
            
            
            
            
            
            
            
          
            if (sourceType === "shop" && targetType === "footer" && gold >= 3) {
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
              const futurDeck = [...deck, draggedCard];
              fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: futurDeck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                setFusionAnim
              });
              
            } else if (sourceType === "board" && targetType === "header") {
              vendreCarteDuBoard(draggedCard);
              

            } else if (sourceType === "deck" && targetType === "board-drop") {
                
                jouerCarteDepuisDeck(draggedCard);
                
              
            }
            
            piocherCarte( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer )
            piocherCarteInf( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer )
            piocherCarteSpe( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim )
            
            
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
              draggedCard = boardPlayer2.find((c) => c.id === id);
            } else if (sourceType === "deck") {
              draggedCard = deckPlayer2.find((c) => c.id === id);
            }
          
            if (!draggedCard) return;
            if (sourceType === "board" && targetType.startsWith("board-")) {
                
                const oldIndex = boardPlayer2.findIndex((c) => c.id === id);
                const newIndex = boardPlayer2.findIndex((c) => c.id === parseInt(over.id.split("-")[1]));

                console.log("🔁 reorder from", oldIndex, "to", newIndex);
                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    const newBoard = arrayMove(boardPlayer2, oldIndex, newIndex);
                    setBoardPlayer2(newBoard);
                return;
}
            }
    
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerre && boardPlayer2.length <7) {
      
                    console.log(`📢 Cri de guerre activé pour ${draggedCard.nom}`);
                
                    draggedCard.criDeGuerre(boardPlayer2); // Effet sur tout le board
    
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.poteLa && boardPlayer2.length <7) {
                console.log(`📢 Pote la ! activé pour ${draggedCard.nom}`);
                draggedCard.poteLa(boardPlayer2)
        
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerreUnique && boardPlayer2.length <7) {
                console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                let boardFiltred =  boardPlayer2.filter(card => card.famille === draggedCard.famille);
                if(boardFiltred.length > 0){
                    let cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                    draggedCard.criDeGuerreUnique(cible); // Effet sur tout le board
                }
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sangNoble && boardPlayer2.length <7) {
                console.log(`📢 Sang Noble activé pour ${draggedCard.nom}`);
                draggedCard.sangNoble(boardPlayer2)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.effetDeCouple && boardPlayer2.length <7){
                appliquerEffetDeCouple(draggedCard, boardPlayer2)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.aura && boardPlayer2.length <7) {
                console.log(`📢 Aura activé par ${draggedCard.nom}`);
                draggedCard.aura(boardPlayer2)
            
            }
            if (sourceType === "board" && targetType === "header" && draggedCard.auraSell) {
                console.log(`📢 Aura de ${draggedCard.nom} désactivée`);
                draggedCard.auraSell(boardPlayer2)
            
            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer2.length <7){
                let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
                console.log(auraPresent)
                if (auraPresent >= 0){
                    let carteAura = boardPlayer2.find(carte => carte.aura)
                    carteAura.auraUnique(draggedCard)
                }
            }
            
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer2.length <7){
                bivalence(sourceType, targetType, draggedCard, deck, setMarinsCountPlayer2, marinsCountPlayer2, setTerrestresCountPlayer2, terrestresCountPlayer2, boardPlayer2)
            }
            if (sourceType === "board" && targetType === "header"){
                bivalence(sourceType, targetType, draggedCard, deck, setMarinsCountPlayer2, marinsCountPlayer2, setTerrestresCountPlayer2, terrestresCountPlayer2, boardPlayer2)
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.effetDeMass && boardPlayer2.length <7){
                draggedCard.effetDeMass(draggedCard, boardPlayer2)
            }
    
            
          
            if (sourceType === "shop" && targetType === "footer" && goldPlayer2 >= 3) {
              acheterCarte({
                card: draggedCard,
                goldPlayer2,
                setGoldPlayer2,
                deckPlayer2,
                setDeckPlayer2,
                shopCards,
                setShopCards,
                lvlTavernePlayer2,
                actualPlayer
              });
              const futurDeck = [...deckPlayer2, draggedCard];
              fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: futurDeck,
                board: boardPlayer2,
                setDeck: setDeckPlayer2,
                setBoard: setBoardPlayer2,
                setFusionAnim
              });
            } else if (sourceType === "board" && targetType === "header") {
              vendreCarteDuBoard(draggedCard);
            } else if (sourceType === "deck" && targetType === "board-drop") {
              jouerCarteDepuisDeck(draggedCard);
            }
            piocherCarte( sourceType, targetType, draggedCard, deckPlayer2, setDeckPlayer2, boardPlayer2, setBoardPlayer )
            piocherCarteInf( sourceType, targetType, draggedCard, deckPlayer2, setDeckPlayer2, boardPlayer2 )
            piocherCarteSpe( sourceType, targetType, draggedCard, deckPlayer2, setDeckPlayer2, boardPlayer2, setBoardPlayer, setFusionAnim )
        }

    };
    useEffect(() => {
        if (projectileAnim && projectileAnim.id !== lastProjectileId.current) {
          lastProjectileId.current = projectileAnim.id;
          console.log("🎯 Nouveau projectile affiché :", projectileAnim);
        }
      }, [projectileAnim]);
    useEffect(() => {
        if (griffeEffects.length > 0) {
          const timeout = setTimeout(() => setGriffeEffects([]), 500);
          return () => clearTimeout(timeout);
        }
      }, [griffeEffects]);

      console.log("🧩 Nouveau projectileAnim :", projectileAnim);

    const shopMusicRef = useRef(new Audio("sounds/ambiance.mp3"));
    const combatMusicRef = useRef(new Audio("sounds/combat.mp3"));
    const fadeInterval = useRef(null);

    useEffect(() => {
        const shopMusic = shopMusicRef.current;
        const combatMusic = combatMusicRef.current;
  
        shopMusic.loop = true;
        combatMusic.loop = true;
  
        const fadeOut = (audio, callback) => {
            clearInterval(fadeInterval.current);
            fadeInterval.current = setInterval(() => {
              if (audio.volume > 0) {
                audio.volume = Math.max(audio.volume - 0.05, 0);
              } else {
                audio.pause();
                clearInterval(fadeInterval.current);
                if (callback) callback(); // 💡 appelle le callback ici
              }
            }, 100);
          };
          
          const fadeIn = (audio) => {
            clearInterval(fadeInterval.current);
            audio.volume = 0;
            audio.play();
            fadeInterval.current = setInterval(() => {
              if (audio.volume < (muted ? 0 : volume)) {
                audio.volume = Math.min(audio.volume + 0.04, volume);
              } else {
                clearInterval(fadeInterval.current);
              }
            }, 100);
          };
  
    if (phase === "combat") {
      // 💥 transition rapide vers combat
      fadeOut(shopMusic, () => fadeIn(combatMusic, 0.4, 0.05), 0.05);
    } else if (phase === "shopPlayer1" || phase === "shopPlayer2") {
      // 🛑 si shopMusic déjà en cours, ne rien faire
      if (shopMusic.paused) {
        fadeOut(combatMusic, () => fadeIn(shopMusic));
      }
    }
    }, [phase, volume, muted]); // 👈 ajoute les dépendances volume / muted
    useEffect(() => {
        setSoundEffectVolume(muted ? 0 : soundVolume);
      }, [soundVolume, muted]);

      useEffect(() => {
        if (fusionAnim) {
          const timer = setTimeout(() => {
            setFusionAnim(null);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }, [fusionAnim]);
    return (
            <DndContext onDragEnd={handleDragEnd}>
                <GameLayout1v1
                    ShopHUD={
                        phase === "shopPlayer1" ? (
                            <DropZone id="header" className="drop-header">
                                <ShopHUD
                                    cout={coutLvlTaverne[lvlTaverne]} 
                                    onRefresh={() =>
                                        actualiserBoutique({ lvlTaverne, setShopCards, gold, setGold, actualPlayer })
                                    }
                                    onLvlUp={() =>
                                        lvlUpTaverne({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards, actualPlayer })
                                    }
                                                
                                />
                            </DropZone>
                        ) : phase === "shopPlayer2" ? (
                            <DropZone id="header" className="drop-header">
                                <ShopHUD
                                    cout={coutLvlTavernePlayer2[lvlTavernePlayer2]}
                                    onRefresh={() =>
                                        actualiserBoutique({ lvlTavernePlayer2, setShopCards, goldPlayer2, setGoldPlayer2, actualPlayer })
                                    }
                                    onLvlUp={() =>
                                        lvlUpTaverne({ goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, setLvlTavernePlayer2, setShopCards, actualPlayer })
                                     }       
                                />
                            </DropZone>
                        ) : (
                            <Player2HUDFight 
                                goldPlayer2 = {goldPlayer2}
                                lvlTavernePlayer2 = {lvlTavernePlayer2}
                                player2Pv = {player2Pv}
                            />
                        )
                    }
                    ShopBoard={
                        phase === "shopPlayer1" || phase === "shopPlayer2" ? (
                            <ShopBoard 
                                cards={shopCards}
                                origin="shop"
                                onPreview={setPreviewCard}             
                            />
                        ) : (
                            <Player2BoardFight 
                                cards={ boardCombatPlayer2 }
                                origin="board"
                                onPreview={setPreviewCard}
                                phase={phase}
                                carteAttaquantId={carteAttaquantId}
                                carteDefenseurId={carteDefenseurId}
                            />
                        )
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
                        ) : phase === "shopPlayer2" ? (
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
                        ) : (
                            <PlayerBoardFight
                                cards={ boardCombat }
                                origin="board"
                                onPreview={setPreviewCard}
                                phase={phase}
                                carteAttaquantId={carteAttaquantId}
                                carteDefenseurId={carteDefenseurId}
                            />
                        )
                    }
                    PlayerDeck={
                        phase === "shopPlayer1" || phase === "combat" ? (
                            <DropZone id="footer" className="drop-footer">
                                <PlayerDeck
                                    cards={deck}
                                    origin="deck"
                                    onPlay={jouerCarteDepuisDeck}
                                    onPreview={setPreviewCard}
                                />
                            </DropZone>
                        ) : (
                            <DropZone id="footer" className="drop-footer">
                                <Player2Deck
                                    cards={deckPlayer2}
                                    origin="deck"
                                    onPlay={jouerCarteDepuisDeck}
                                    onPreview={setPreviewCard}
                                />
                            </DropZone>
                        )
                    }
                    PlayerHUD={
                        phase === "shopPlayer1" ? (
                            <>
                                <PlayerHUD
                                    gold={gold}
                                    lvlTaverne={lvlTaverne}
                                    playerPv={playerPv}
                                /> 
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={async () => {
                                        setPhase("shopPlayer2");
                                        setActualPlayer(2)
                                        const tiragePhase = getCartesPourShop(lvlTavernePlayer2);
                                        const cartesPhase = getCartesAleatoires(tiragePhase, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));;
                                        setShopCards(cartesPhase);
                                    }}       
                                >
                                    Tour Joueur 2
                                </button>
                            </>
                        ) : phase === "shopPlayer2" ? (
                            <>
                                <Player2HUD
                                    goldPlayer2={goldPlayer2}
                                    lvlTavernePlayer2={lvlTavernePlayer2}
                                    player2Pv={player2Pv}
                                /> 
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={async () => {
                                        setPhase("combat");
                                        await deroulerCombat1v1({
                                            boardPlayer,
                                            setBoardPlayer,
                                            boardPlayer2,
                                            setBoardPlayer2,
                                            lvlTaverne,
                                            lvlTavernePlayer2,
                                            playerPv,
                                            setplayerPv,
                                            player2Pv,
                                            setGoldPlayer2,
                                            setplayer2Pv,
                                            setPhase,
                                            setBoardCombat,
                                            setBoardCombatPlayer2,
                                            setCarteAttaquantId,
                                            setCarteDefenseurId,
                                            goldTour1,
                                            setgoldTour1,
                                            setGold,
                                            setShopCards,
                                            navigate,
                                            setActualPlayer,
                                            setAnimAoEVisuelle,
                                            setProjectileAnim,
                                            setGriffeEffects
                                          });
                                    }}       
                                >
                                    Fight !!
                                </button>
                            </>
                        ) : (
                            <PlayerHUD
                                    gold={gold}
                                    lvlTaverne={lvlTaverne}
                                    playerPv={playerPv}
                            />
                        )                                             
                    }
                /> 
                {griffeEffects.map((effet, index) => (
                    <div
                        key={`${effet.id}-${index}`}
                        className="griffe-effect"
                        style={{ top: effet.y, left: effet.x }}
                    />
                ))}
                {projectileAnim && (
                    <ProjectileImage
                        key={projectileAnim.id}
                        startX={projectileAnim.startX}
                        startY={projectileAnim.startY}
                        endX={projectileAnim.endX}
                        endY={projectileAnim.endY}
                        onEnd={() => {
                        projectileAnim.onEnd?.(); // 👈 ceci résout la promesse
                        setProjectileAnim(null);  // 👈 ceci enlève l’animation de l’écran
                        }}
                    />
                )}

                {/* 🌊 AoE Wave Animation */}
                {phase === "combat" && animAoEVisuelle && (
                    <div className="aoe-wave" />
                )}
                <CardPreview card={previewCard} onClose={() => setPreviewCard(null)} /> 
                <MusicControl
                    volume={volume}
                    setVolume={setVolume}
                    muted={muted}
                    setMuted={setMuted}
                    audioRefs={[shopMusicRef, combatMusicRef]}
                    soundVolume={soundVolume}
                    setSoundVolume={setSoundVolume}
                />
                {fusionAnim && (
                    <div className="fusion-overlay">
                        <div className="fusion-effect animate__animated animate__zoomIn">
                            <img src={fusionAnim.carteResultat.imgMinia} alt="Fusion Dorée" />
                            <p className="fusion-text">Fusion en {fusionAnim.carteResultat.nom} !</p>
                        </div>
                    </div>
                )}
            </DndContext>
        )
}
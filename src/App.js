import {useState} from 'react'

let buildingId = 0;
let isSpy = false;
let isTech = false;
let isEconomy = false;
let isPirates = false;
let isMagic = false;
let isMerc = false;

export default function App(){
  const [currentFaction, setCurrentFaction] = useState("");
  const [currentMetal, setCurrentMetal] = useState(2);
  const [currentNucMat, setCurrentNucMat] = useState(2);
  const [currentMoney, setCurrentMoney] = useState(2);
  const [metalProd, setCurrentMetalProd] = useState(2);
  const [nucMatProd, setCurrentNucMatProd] = useState(2);
  const [moneyProd, setCurrentMoneyProd] = useState(2);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentBuildings, setCurrentBuildings] = useState([]);
  const [buildingCount, setBuildingCount] = useState(0);
  //const [currentUnits, setCurrentUnits] = useState([]);
  

  function nextTurnButton(){
    setCurrentTurn(currentTurn => currentTurn + 1);
    setCurrentMetal(currentMetal => currentMetal + metalProd);
    setCurrentNucMat(currentNucMat => currentNucMat + nucMatProd);
    setCurrentMoney(currentMoney => currentMoney + moneyProd)
  }
  function chooseFactionButton(faction){
    setCurrentFaction(faction);
    switch(faction){
      case 'Golden Horde Pirates':
        isPirates = true;
        break;
      case 'Nabichi Holdings':
        isEconomy = true;
        break;
      case 'Gnomeland Security':
        isMagic = true;
        break;
      case 'The Syndicate':
        isSpy = true;
        break;
      case 'Verzon Ceter':
        isTech = true
        break;
      case 'The Eternal Mercenary Company':
        isMerc = true;
        break;
      default:
        break;
    }
  }
  function buildMetal(){
    if(buildingCount === 5){
      alert("This cannot be built as you have reached the building cap.")
    } else if(currentMetal < 3){
      alert("This cannot be built as you do not have the resources required")
    } else {
      setCurrentMetalProd(metalProd => metalProd + 1);
      setCurrentBuildings([...currentBuildings, 
        {id: buildingId++, name: "Metal Refinery", isUpgraded: false, type: "metal"}]);
      setBuildingCount(buildingCount => buildingCount + 1);
      setCurrentMetal(currentMetal => currentMetal - 3);
    }
  }
  function buildMoney(){
    if(buildingCount === 5){
      alert("This cannot be built as you have reached the building cap.")
    } else if(currentMoney < 2 | currentMetal < 1){
      alert("This cannot be built as you do not have the resources required")
    } else {
      setCurrentMoneyProd(moneyProd => moneyProd + 1)
      setCurrentBuildings([...currentBuildings, 
        {id: buildingId++, name: "Bank", isUpgraded: false, type: "bank"}]);
      setBuildingCount(buildingCount => buildingCount + 1);
      setCurrentMoney(currentMoney => currentMoney -2);
      setCurrentMetal(currentMetal => currentMetal -1)
    }
  }
  function buildNucMat(){
    if(buildingCount === 5){
      alert("This cannot be built as you have reached the building cap.")
    } else if(currentNucMat < 2 | currentMetal < 1){
      alert("This cannot be built as you do not have the resources required")
    } else {
      setCurrentNucMatProd(nucMatProd => nucMatProd + 1)
      setCurrentBuildings([...currentBuildings, 
        {id: buildingId++, name: "Nuclear Refinery", isUpgraded: false, type: "nuc"}]);
      setBuildingCount(buildingCount => buildingCount + 1);
      setCurrentNucMat(currentNucMat => currentNucMat -2);
      setCurrentMetal(currentMetal => currentMetal -1)
    }
  }
  function upgradeBuilding(building){
    for(let i = 0; i<currentBuildings.length; i++){
      if(currentBuildings[i].id === building.id){
        switch (building.type){
          case "bank":
            setCurrentMoneyProd(currentMoneyProd => currentMoneyProd + 1)
            currentBuildings[i].isUpgraded = true;
            break;
          case "nuc": 
            setCurrentNucMatProd(nucMatProd => nucMatProd + 1)
            currentBuildings[i].isUpgraded = true;
            break;
          case "metal":
            setCurrentMetalProd(currentMetalProd => currentMetalProd + 1)
            currentBuildings[i].isUpgraded = true;
            break;
          default:
            break;
        }
      }
    }
  }
  
  if (currentFaction === ""){
    return(
      <div>
        Choose your faction
        <button onClick={()=> chooseFactionButton("Golden Horde Pirates")}>
          Golden Horde Pirates</button>
        <button onClick={()=> chooseFactionButton("Nabichi Holdings")}>
          Nabichi Holdings</button>
        <button onClick = {()=> chooseFactionButton("Gnomeland Security")}>
          Gnomeland Security</button>
        <button onClick = {()=> chooseFactionButton("The Syndicate")}>
          The Syndicate</button>
        <button onClick = {()=> chooseFactionButton("Verzon Ceter")}>
          Verzon Ceter</button>
        <button onClick = {()=> chooseFactionButton("The Eternal Mercenary Company")}>
          The Eternal Mercenary Company</button>
      </div>
    )
    } else {
      return (
        <div>
          Your current faction is {currentFaction} <br/>
          Your current metal is {currentMetal} <br/>
          Your current Nuclear Material is {currentNucMat} <br/>
          Your current Money is {currentMoney} <br/>
          Your current metal production is {metalProd} <br/>
          Your current Nuclear Material Production is {nucMatProd} <br/>
          Your current Money Production is {moneyProd} <br/>
          <button onClick = {nextTurnButton}>Next Turn</button>
          <button onClick = {buildMetal}>Build a Metal Mill</button>
          <button onClick = {buildNucMat}>Build a Nuclear Refinery</button>
          <button onClick = {buildMoney}>Build a Bank</button>
          Current turn: {currentTurn}
          <ul>
            {currentBuildings.map(building => (
              <li key={building.id}>{building.name} <UpgradeButtonBuilding buildingTU={building} isTech={isTech}
              upgradeBuildingFunction={upgradeBuilding}/>
              </li>
            ))}
          </ul><br/>
          <EconActions isEcon={isEconomy}/>
          <PirateActions isPirates={isPirates}/>
          <SpyActions isSpy={isSpy}/>
          <MercActions isMerc={isMerc}/>
          <MagicActions isMagic={isMagic}/>
          <TechActions isTech={isTech}/>
        </div>
      )
    }
  }
  function UpgradeButtonBuilding({buildingTU, isTech, upgradeBuildingFunction}){
    if(isTech){
      if(buildingTU.isUpgraded === false){
        console.log(buildingTU)
        console.log(upgradeBuildingFunction)
        return(
          <button onClick ={()=> upgradeBuildingFunction(buildingTU)}>Upgrade</button>
        )
      }
    }
  }
  function SpyActions (isSpy){
    let spySupport = [
      {id: 1, cost: 1, description: "Bribe shipyard workers. Gain one extra resource of your choice the next time you attack"},
      {id: 2, cost: 1, description: "Intercept defense communications. The next attack you make has a 50% change to bypass the defenders defense card if used"},
      {id: 3, cost: 1, description: "First Strike Capabilities. When someone next makes an attack, you are able to send a First Strike craft to disable any unit used in the attack one turn. This support card requires a Strike Fighter. Your Strike Fighter takes no damage as a result of this. This can be used against any faction on the board (You can use this to “trade” defense with another faction)"},
      {id: 4, cost: 2, description: "Advanced Alert Systems. The next time someone attacks you, you are able to select which attacks to block, regardless of the order they were placed in."},
      {id: 5, cost: 1, description: "Fund Intergalactic Guerilla Activities: Disable one of the buildings the player to your left has built for one turn"},
      {id: 6, cost: 1, description: "Decoy Buildings: The next attack against one of your buildings does not disable it"},
      {id: 7, cost: 3, description: "Activate Sleeper Agents. On your next attack, you are able to steal a player’s ship. If you steal a ship, you are not able to also steal resources for that attack"},
      {id: 8, cost: 0, description: "Impersonate Galactic Trade Nexus employees. You can discreetly activate this support action. Until your next turn, all trading fees at the Galactic Trade Nexus go towards you. This action has a 1 turn cooldown"}
    ]
    let subterfugeActoins = [
      {id: 1, description: "You are able to trade once with the Galactic Trade Nexus without paying the trading fee"},
      {id: 2, description: "You can sell the location of the player you able to attack to another player allowing the buyer to attack them for 1 turn"},
      {id: 3, description: "You can send your scout ship to any player on the board. The next time that player attacks, you can learn the exact makeup of their attack. If that attack is not directed at you, you can choose to sell that information to another player"},
      {id: 4, description: "You can send your scout ship to any player on the board. You are able to learn how many and what units that player has. You can choose to sell that information to another player"}
    ]
    if(isSpy.isSpy){
      return (
        <div>
          <p>Support Actions</p>
          <ul>
            {spySupport.map(spySupport => (
            <li key={spySupport.id}>{spySupport.description}<br/><button>Use for {spySupport.cost} money</button></li>
          ))}
          </ul>
          <p>Subterfuge Actions</p>
          <ul>
            {subterfugeActoins.map(subterfuge => (
            <li key={subterfuge.id}>{subterfuge.description}</li>
          ))}
          </ul>
        </div>
      )
    }
  }
  function TechActions(isTech){
    let techSupport = [
      {id: 1, cost: 1, description: "Redirect Space-Time. Reverse the order in which people attack/defend from (e.g. if you are supposed to attack to the left, you now attack to the right). This does not skip your turn. This support action can only be used twice over the course of a game, and cannot be used more than once in a row."},
      {id: 2, cost: 2, description: "Temporary Gravitational Anomaly. The next time you are attacked, the first unit to attack is instead sucked into a gravitational anomaly and is disabled for 1 turn"},
      {id: 3, cost: 3, description: "Thinking with portals. Steal up to 3 resources from another player. The resources you steal can be of any makeup (3 of one resource or 1 of each resource)"},
      {id: 4, cost: 2, description: "Advanced Piracy Protocols. The next time you are attacked, the attacking player is not able to steal any of your resources"},
      {id: 5, cost: 2, description: "Perfected Recycling Methods. The next time you lose a ship, you are able to build a new one with all resource costs reduced by 1"},
      {id: 6, cost: 1, descrption: "Experimental Hyperlane Transportation. For one turn you can attack any player"}

    ]
    if(isTech.isTech){
      return (
        <ul>
          {techSupport.map(techSupport => (
          <li key={techSupport.id}>{techSupport.description}<br/><button>Use for {techSupport.cost} money</button></li>
        ))}
        </ul>
      )
    }
  }
  function EconActions(isEcon){
    let econSupport = [
      {id: 1, cost: 2, description: "Castle Doctrine: Enemy units take two damage instead of one when they attack next"},
      {id: 2, cost: 1, description: "Your next trade generates 2 of a resource of your choosing instead of 1"},
      {id: 3, cost: 2, description: "You take no damage the next time you are attacked. This does not cause building output to be increased"},
      {id: 4, cost: 2, description: "Retaliatory Strikes: You can attack the last player to attack you. This does not count as your attack action when it becomes your turn."},
      {id: 5, cost: 1, description: "Galactic Economic Forum: Your trades will not have a cost for this turn"},
      {id: 6, cost: 1, description: "You can go up to 5 units of a single resource in debt. If you do not pay this debt back in 2 turns, none of your buildings will output resources for 2 turns. This card is considered active until you either pay back the debt or until the two turns of your buildings not outputting is done. You cannot use this for money"},
      {id: 7, cost: 0, description: "Stock Market Manipulation. Get 1 money for every 3 money you currently own (1 money for 3 money, 2 money for 6 money, etc)"},
      {id: 8, cost: 3, description: "Hostile Takeover: Until your next turn, you control the Galactic Trade Nexus. During this time, your trades are free, and the trade cost of other factions goes to you."}
    ]
    if(isEcon.isEcon){
      return (
        <ul>
          {econSupport.map(econSupport => (
          <li key={econSupport.id}>{econSupport.description}<br/><button>Use for {econSupport.cost} money</button></li>
        ))}
        </ul>
      )
    }
  }
  function PirateActions(isPirates){
    let pirateSupport = [
      {id: 1, cost: 1, description: "Steal ship building schematics from the next faction you attack. This makes the Freighter, or its next upgrade, cost 1 less for every resource"},
      {id: 2, cost: 1, description: "Bribe shipyard workers. Gain 2 extra resources of your choice the next time you attack"},
      {id: 3, cost: 1, description: "Intercept defense communications. The next attack you make has a 50% change to bypass the defenders defense card if used" },
      {id: 4, cost: 3, description: "Galactic Terror Campaign. For this turn only, you are able to attack more than one faction. The same restrictions for attack otherwise apply"},
      {id: 5, cost: 3, description: "Exceed Ship Limits. For this turn only, you can attack twice"},
      {id: 6, cost: 1, description: "Raiding Trade Routes. When a player trades with the The Galactic Trade Nexus, you are able attack that trade convoy in an attempt to damage or steal units, or to steal the resources that are being traded"},
      {id: 7, cost: 2, description: "What’s yours is mine. Raid The Galactic Trade Nexus. You are able to take up to 4 resources of your choice"}
    ]
    if(isPirates.isPirates){
      return (
        <ul>
          {pirateSupport.map(pirateSupport => (
          <li key={pirateSupport.id}>{pirateSupport.description}<br/><button>Use for {pirateSupport.cost} money</button></li>
        ))}
        </ul>
      )
    }
  }
  function MagicActions(isMagic){
    let wildMagicCount = 0;
    let magicSupport =[
      {id: 1, cost: 2, description: "Instantly Build any Building", augment: "You can augment this to build more buildings (3 wild magic per building)"},
      {id: 2, cost: 2, description: "Instantly Build any Unit", augment: "You can augment this to build more units (3 wild magic per unit)"},
      {id: 3, cost: 2, description: "Precognitive Defense Methods. When someone next attacks you, know the makeup of their attack and choose one of the attacks to defend against without the need to use a defense card",
        augment: "You can augment this to defend against more attacks (2 wild magic per attack defended)"},
      {id: 4, cost: 1, description: "Alchemic Matter Manipulation: Turn any amount of one resource into another resource",
        augment: "You can augment this to create resources. (1 wild magic per 1 resource)"},
      {id: 5, cost: 1, description: "Metallic Necromancy Methods: Rebuild any units you have lost",
        augment: "You can rebuild more units (2 wild magic unit rebuilt)"},
      {id: 6, cost: 2, description: "Illusory Attack Craft: You can create illusory attack craft to “fake” an attack on the player to your left. You must reveal you played this card after you attack. This makes the player waste units to defend against your illusions",
        augment: "Create more illusions (2 wild magic per 1 resource)"},
      {id: 7, cost: 4, description: "Mana Infused Shielding: All units on your next attack take 1 less damage than they normally would",
        augment: "Units take 1 less damage for the next X turns, where X is equal the number of mana used (4 wild magic for each turn)"},
      {id: 8, cost: 2, description: "Cargo Hold of Holding: For one attack, your Combat Freighter can hold twice the amount of resources it normally would be able to",
        augment: "Your freighter can hold even more resources (3 mana for each time the multiple is increase)"}

    ]
    function handleWildMagicChange(e){
      wildMagicCount = e.target.value;
      console.log(wildMagicCount)
    }
    if(isMagic.isMagic){
      return (
        <ul>
          {magicSupport.map(magicSupport => (
          <li key={magicSupport.id}>{magicSupport.description}<br/><button>Use for {magicSupport.cost} money</button>
            <ul>
              <li key={magicSupport.id}>{magicSupport.augment}</li>
                <label>Quantity (between 1 and 5):</label>
                <input onChange={handleWildMagicChange} type="number" id="quantity" name="quantity" min="1" max="5"></input>
            </ul>
          </li>
        ))}
        </ul>
      )
    }
  }
  function MercActions(isMerc){
    let mercSupport = [
      {id: 1, cost: 1, description: "For one turn only, you can attack and be hired to attack"},
      {id: 2, cost: 1, description: "For one turn only, you can be hired to defend another faction. This card is active until you are hired to attack"},
      {id: 3, cost: 2, description: "For one contract only, a player that you have been hired to attack can either pay you to cancel your attack, or to attack the person that originally hired you. This card is active until you accept payment from a target"},
      {id: 4, cost: 1, description: "The next unit you build costs 1 less for all resources"}

    ]
    if(isMerc.isMerc){
      return (
        <ul>
          {mercSupport.map(mercSupport => (
          <li key={mercSupport.id}>{mercSupport.description}<br/><button>Use for {mercSupport.cost} money</button></li>
        ))}
        </ul>
      )
      }
    }
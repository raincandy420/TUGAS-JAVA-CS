// Item pool available for random item generation
const itemPool = ['beer', 'cigarette', 'cuff', 'magnifying'];

let playerHp = 3;
let dealerHp = 3;
let chamber = [];
let currentTurn = 'player';
let skipNextTurn = { player: false, dealer: false };
let wave = 1;
let baseChamberSize = 6;
const maxWaves = 3;

let playerMagnifyingActive = false;

let playerInventory = {
  beer: 0,
  cigarette: 0,
  cuff: 0,
  magnifying: 0
};

let dealerInventory = {
  beer: 0,
  cigarette: 0,
  cuff: 0,
  magnifying: 0
};

// Function to update the game flow text
function updateGameFlow(message) {
  const gameFlowText = document.getElementById("gameFlowText");
  gameFlowText.textContent += `\n${message}`;
  gameFlowText.scrollTop = gameFlowText.scrollHeight; // Auto-scroll to the latest message
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function refillChamber() {
  const size = baseChamberSize + (wave - 1) * 2;
  const bullets = Array(size).fill('blank');
  let liveCount = Math.min(4 + wave - 1, Math.floor(size / 2));
  for (let i = 0; i < liveCount; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * size);
    } while (bullets[index] === 'live');
    bullets[index] = 'live';
  }
  chamber = shuffle(bullets);
  updateRoundInfo();
  if (playerMagnifyingActive) updateGameFlow(`(Magnifying) Next round is: ${chamber[0]?.toUpperCase() || 'UNKNOWN'}`);
}

function getInventorySize(inventory) {
  return Object.values(inventory).reduce((sum, count) => sum + count, 0);
}

function giveTwoRandomItems(inventory, isPlayer = false) {
  let messages = [];
  for (let i = 0; i < 2; i++) {
    if (getInventorySize(inventory) >= 4) break;
    const item = itemPool[Math.floor(Math.random() * itemPool.length)];
    inventory[item] = (inventory[item] || 0) + 1;
    messages.push(item.toUpperCase());
  }
  if (isPlayer && messages.length > 0) updateGameFlow(`You received: ${messages.join(' + ')}`);
  else if (isPlayer) updateGameFlow("Your inventory is full. No new items added.");
}

function updateHpUI() {
  document.getElementById('playerHp').innerText = playerHp;
  document.getElementById('dealerHp').innerText = dealerHp;
}

function updateInventoryUI() {
  const invText = `🍺 Beer: ${playerInventory.beer}    🚬 Cigarette: ${playerInventory.cigarette}\n⛓️ Cuff: ${playerInventory.cuff}    🔍 Magnifying: ${playerInventory.magnifying}`;
  document.querySelector('.inventory-box .ascii-art').innerText = `Your Inventory:\n${invText}`;
}

function updateDealerInventoryUI() {
  const invText = `🍺 Beer: ${dealerInventory.beer}    🚬 Cigarette: ${dealerInventory.cigarette}\n⛓️ Cuff: ${dealerInventory.cuff}    🔍 Magnifying: ${dealerInventory.magnifying}`;
  document.querySelector('.dealer-inventory-box .ascii-art').innerText = `Dealer's Inventory:\n${invText}`;
}

function updateRoundInfo() {
  const blanks = chamber.filter(c => c === 'blank').length;
  const lives = chamber.filter(c => c === 'live').length;
  document.querySelector('.shotgun-box .ascii-art').innerText = `Shotgun:\nBlanks: [${blanks}]  Live: [${lives}]\n\n╔════════════╗\n║ ▓ ▓ ▓ ▓ ▓ ║\n║ ▓ ▓ ▓ ▓ ▓ ║   Shotgun\n║ ▓ ▓ ▓ ▓ ▓ ║   Ready\n╚════════════╝`;
  if (playerMagnifyingActive) updateGameFlow(`(Magnifying) Next round is: ${chamber[0]?.toUpperCase() || 'UNKNOWN'}`);
}

function setGameplayButtonsEnabled(enabled) {
  document.getElementById('shootSelfButton').disabled = !enabled;
  document.getElementById('shootDealerButton').disabled = !enabled;
  document.getElementById('useItemButton').disabled = !enabled;
}

function checkGameOver() {
  if (playerHp <= 0) {
    updateGameFlow("You died. Game over!");
    setGameplayButtonsEnabled(false);
    return true;
  }
  if (dealerHp <= 0) {
    updateGameFlow("Dealer is dead. You won this wave!");
    setGameplayButtonsEnabled(false);
    if (wave < maxWaves) {
      wave++;
      setTimeout(startWave, 1500);
    } else {
      updateGameFlow("Congratulations! You survived all 3 waves!");
    }
    return true;
  }
  return false;
}

function takeShot(target) {
  const round = chamber.shift();
  const isLive = round === 'live';

  if (target === 'player') {
    if (isLive) playerHp--;
    updateGameFlow(`You shot yourself. It was a ${round.toUpperCase()} round.`);
  } else {
    if (isLive) dealerHp--;
    updateGameFlow(`You shot the dealer. It was a ${round.toUpperCase()} round.`);
  }

  updateHpUI();
  updateRoundInfo();

  if (checkGameOver()) return;

  // If the round was blank, the turn does not end, we continue
  if (round === 'blank') {
    currentTurn = currentTurn === 'player' ? 'dealer' : 'player';
  }

  if (chamber.length === 0) {
    updateGameFlow("All rounds used. Reloading and distributing new items...");
    refillChamber();
    giveTwoRandomItems(playerInventory, true);
    giveTwoRandomItems(dealerInventory);
    updateInventoryUI();
    updateDealerInventoryUI();
  }

  if (skipNextTurn[currentTurn]) {
    updateGameFlow(`${currentTurn === 'player' ? 'You' : 'Dealer'} are cuffed and skip a turn.`);
    skipNextTurn[currentTurn] = false;
    currentTurn = currentTurn === 'player' ? 'dealer' : 'player';
  }

  if (currentTurn === 'dealer') dealerTurn();
}

function dealerTurn() {
  setTimeout(() => {
    if (dealerHp === 1 && dealerInventory.cigarette > 0) {
      dealerInventory.cigarette--;
      dealerHp++;
      updateGameFlow("Dealer used a cigarette to heal.");
    } else if (chamber[0] === 'live' && dealerInventory.beer > 0) {
      dealerInventory.beer--;
      chamber.shift();
      updateGameFlow("Dealer used beer to discard a live round.");
    } else if (dealerInventory.magnifying > 0) {
      dealerInventory.magnifying--;
      updateGameFlow(`Dealer peeked: next shell is ${chamber[0].toUpperCase()}`);
    } else if (dealerInventory.cuff > 0 && Math.random() < 0.5) {
      dealerInventory.cuff--;
      skipNextTurn.player = true;
      updateGameFlow("Dealer used cuff. You will skip your next turn.");
    } else {
      const target = Math.random() > 0.5 ? 'player' : 'dealer';
      takeShot(target);
      return;
    }

    updateHpUI();
    updateDealerInventoryUI();
    currentTurn = 'player';
  }, 1000);
}

function startWave() {
  updateGameFlow(`Wave ${wave} begins! +1 HP, +2 chamber rounds.`);
  playerHp += 1;
  dealerHp += 1;
  refillChamber();
  giveTwoRandomItems(playerInventory, true);
  giveTwoRandomItems(dealerInventory);
  updateHpUI();
  updateInventoryUI();
  updateDealerInventoryUI();
  setGameplayButtonsEnabled(true);
  currentTurn = 'player';
}

document.getElementById('startButton').addEventListener('click', () => {
  wave = 1;
  playerHp = 3;
  dealerHp = 3;
  playerInventory = { beer: 0, cigarette: 0, cuff: 0, magnifying: 0 };
  dealerInventory = { beer: 0, cigarette: 0, cuff: 0, magnifying: 0 };
  skipNextTurn = { player: false, dealer: false };
  playerMagnifyingActive = false;
  startWave();
});

document.getElementById('shootSelfButton').addEventListener('click', () => {
  if (currentTurn === 'player') takeShot('player');
});

document.getElementById('shootDealerButton').addEventListener('click', () => {
  if (currentTurn === 'player') takeShot('dealer');
});

document.getElementById('useItemButton').addEventListener('click', () => {
  if (currentTurn !== 'player') {
    updateGameFlow("You can only use items on your turn.");
    return;
  }
  const availableItems = Object.keys(playerInventory).filter(item => playerInventory[item] > 0);
  if (availableItems.length === 0) {
    updateGameFlow("You have no items to use.");
    return;
  }

  const item = prompt(`Choose an item to use:\n${availableItems.map(i => `- ${i.toUpperCase()}`).join('\n')}`).toLowerCase();
  if (!availableItems.includes(item)) {
    updateGameFlow("Invalid item or you don't have that item.");
    return;
  }

  playerInventory[item]--;

  switch (item) {
    case 'beer':
      if (chamber[0] === 'live') {
        chamber.shift();
        updateGameFlow("You used BEER to discard a live round.");
      } else {
        updateGameFlow("You used BEER, but it was a blank round. Nothing discarded.");
      }
      break;
    case 'cigarette':
      playerHp++;
      updateGameFlow("You used CIGARETTE and gained 1 HP.");
      break;
    case 'cuff':
      skipNextTurn.dealer = true;
      updateGameFlow("You used CUFF. Dealer will skip their next turn.");
      break;
    case 'magnifying':
      playerMagnifyingActive = !playerMagnifyingActive;
      updateGameFlow(`You ${playerMagnifyingActive ? 'activated' : 'deactivated'} MAGNIFYING mode.`);
      break;
    default:
      updateGameFlow("Unknown item used.");
  }

  updateHpUI();
  updateInventoryUI();
  currentTurn = 'dealer';
  dealerTurn();
});

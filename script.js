// --- 永久升級數據結構 ---
const SINGULARITY_UPGRADES = {
    "QUANTUM_CLICK": {
        "name": "量子點擊強化",
        "description": "永久提升點擊收益 5%",
        "costBase": 10,
        "costGrowth": 1.5,
        "effectType": "clickPowerMultiplier",
        "effectValue": 0.05,
        "maxLevel": 10
    },
    "FUSION_EFFICIENCY": {
        "name": "聚變效率提升",
        "description": "永久提升所有元素產出的基礎粒子收益 10%",
        "costBase": 20,
        "costGrowth": 1.7,
        "effectType": "incomeRateMultiplier",
        "effectValue": 0.10,
        "maxLevel": 5
    },
    "CATALYST_REDUCTION": {
        "name": "催化劑成本減免",
        "description": "永久降低 Quark 成本 5%",
        "costBase": 50,
        "costGrowth": 2.0,
        "effectType": "quarkCostReduction",
        "effectValue": 0.05,
        "maxLevel": 5
    }
};

// --- 元素數據結構 ---
const ELEMENT_DATA = {
    "H": {
        "name": "氫 (Hydrogen)", "symbol": "H", "Z": 1, "period": 1, 
        "cost": null,
        "incomeRate": 0.1, 
        "baseYield": 1 
    },
    "He": {
        "name": "氦 (Helium)", "symbol": "He", "Z": 2, "period": 1, 
        "cost": {"resource": "Quark", "amount": 100},
        "requiredElement": "H", 
        "incomeRate": 0.5,
        "baseYield": 1
    },
    "Li": {
        "name": "鋰 (Lithium)", "symbol": "Li", "Z": 3, "period": 2,
        "cost": {"resource": "He", "amount": 5}, 
        "requiredElement": "He", 
        "incomeRate": 2.0,
        "baseYield": 1
    },
    "Be": {
        "name": "鈹 (Beryllium)", "symbol": "Be", "Z": 4, "period": 2,
        "cost": {"resource": "Li", "amount": 8},
        "requiredElement": "Li",
        "incomeRate": 5.0,
        "baseYield": 1
    },
    // --- 第三週期 (Period 3) ---
    "Na": {
        "name": "鈉 (Sodium)", "symbol": "Na", "Z": 11, "period": 3,
        "cost": {"resource": "Be", "amount": 10}, 
        "requiredElement": "Be", 
        "incomeRate": 8.0, 
        "baseYield": 1
    },
    "Mg": {
        "name": "鎂 (Magnesium)", "symbol": "Mg", "Z": 12, "period": 3,
        "cost": {"resource": "Na", "amount": 12}, 
        "requiredElement": "Na", 
        "incomeRate": 15.0,
        "baseYield": 1
    },
    "Al": {
        "name": "鋁 (Aluminum)", "symbol": "Al", "Z": 13, "period": 3,
        "cost": {"resource": "Mg", "amount": 15},
        "requiredElement": "Mg", 
        "incomeRate": 25.0,
        "baseYield": 1
    },
    "Si": {
        "name": "矽 (Silicon)", "symbol": "Si", "Z": 14, "period": 3,
        "cost": {"resource": "Al", "amount": 20},
        "requiredElement": "Al", 
        "incomeRate": 40.0,
        "baseYield": 1
    },
    "P": {
        "name": "磷 (Phosphorus)", "symbol": "P", "Z": 15, "period": 3,
        "cost": {"resource": "Si", "amount": 25},
        "requiredElement": "Si", 
        "incomeRate": 60.0,
        "baseYield": 1
    },
    "S": {
        "name": "硫 (Sulfur)", "symbol": "S", "Z": 16, "period": 3,
        "cost": {"resource": "P", "amount": 30},
        "requiredElement": "P", 
        "incomeRate": 90.0,
        "baseYield": 1
    },
    "Cl": {
        "name": "氯 (Chlorine)", "symbol": "Cl", "Z": 17, "period": 3,
        "cost": {"resource": "S", "amount": 35},
        "requiredElement": "S", 
        "incomeRate": 130.0,
        "baseYield": 1
    },
    "Ar": {
        "name": "氬 (Argon)", "symbol": "Ar", "Z": 18, "period": 3,
        "cost": {"resource": "Cl", "amount": 40},
        "requiredElement": "Cl", 
        "incomeRate": 180.0,
        "baseYield": 1
    }
};

// --- 遊戲狀態 (初始默認值) ---
const DEFAULT_GAME_STATE = {
    "Quark": 0,
    "clickPower": 1,
    "totalClicks": 0,
    "inventory": { "H": 1 },
    "playerLevel": 1, 
    "maxUnlockedPeriod": 1,
    "singularityShards": 0,
    "singularityUpgrades": {
        "QUANTUM_CLICK": 0,
        "FUSION_EFFICIENCY": 0,
        "CATALYST_REDUCTION": 0
    }
};

let gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)); // 使用深拷貝確保初始狀態獨立

// --- DOM 元素快取 ---
const $ = (id) => document.getElementById(id);
const $quarkDisplay = $('quark-display');
const $incomeDisplay = $('income-display');
const $levelDisplay = $('level-display');
const $shardDisplay = $('shard-display');
const $clickPowerDisplay = $('click-power-display');
const $mainClickButton = $('main-click-button');
const $inventoryList = $('inventory-list');
const $resetButton = $('reset-button');
const $upgradeList = $('upgrade-list');
const $saveMessage = $('save-message'); // 🚨 新增：存檔訊息


// --- 核心輔助函數 ---

/** 根據奇點升級計算當前所有永久增益的總和 */
function calculatePermanentEffects() {
    let effects = {
        clickPowerMultiplier: 1.0,
        incomeRateMultiplier: 1.0,
        quarkCostReduction: 0.0
    };

    for (const upgradeId in gameState.singularityUpgrades) {
        const level = gameState.singularityUpgrades[upgradeId];
        if (level > 0) {
            const data = SINGULARITY_UPGRADES[upgradeId];
            
            // 乘數是疊加的
            if (data.effectType === "clickPowerMultiplier" || data.effectType === "incomeRateMultiplier") {
                effects[data.effectType] += level * data.effectValue;
            } 
            // 減免是疊加的
            else if (data.effectType === "quarkCostReduction") {
                effects[data.effectType] += level * data.effectValue;
            }
        }
    }
    return effects;
}


// --- 存檔與載入函數 (新增!) ---

/** 保存遊戲狀態到 localStorage */
function saveGame() {
    try {
        const serializedState = JSON.stringify(gameState);
        localStorage.setItem('chemistry_clicker_save', serializedState);
        if ($saveMessage) {
            $saveMessage.textContent = '遊戲已自動儲存。';
            setTimeout(() => $saveMessage.textContent = '', 2000); // 2秒後清除訊息
        }
    } catch (e) {
        console.error("無法儲存遊戲進度", e);
        if ($saveMessage) $saveMessage.textContent = '儲存失敗！';
    }
}

/** 從 localStorage 載入遊戲狀態 */
function loadGame() {
    try {
        const savedState = localStorage.getItem('chemistry_clicker_save');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            // 🚨 重要：合併狀態，確保新屬性 (如新升級) 不會丟失
            gameState = {
                ...DEFAULT_GAME_STATE,
                ...parsedState,
                // 確保嵌套物件也被正確載入
                inventory: parsedState.inventory || DEFAULT_GAME_STATE.inventory,
                singularityUpgrades: parsedState.singularityUpgrades || DEFAULT_GAME_STATE.singularityUpgrades
            };
            
            $('status-message').textContent = '✅ 遊戲進度已載入！';
            return true;
        }
    } catch (e) {
        console.error("載入遊戲進度失敗", e);
        $('status-message').textContent = '❌ 載入存檔失敗，開始新遊戲。';
    }
    return false;
}

/** 清除遊戲存檔 (用於徹底重啟) */
function clearGame() {
    if (confirm("警告：這將永久清除所有遊戲進度，包括奇點碎片！確認清除嗎？")) {
        localStorage.removeItem('chemistry_clicker_save');
        gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)); // 恢復到初始狀態
        $('status-message').textContent = '💾 存檔已清除，遊戲已重啟。';
        updateUI();
    }
}


// --- 核心邏輯函數 (已更新應用永久增益) ---

/** 玩家點擊獲取 Quark */
function handleClick() {
    const effects = calculatePermanentEffects();
    const actualClickPower = gameState.clickPower * effects.clickPowerMultiplier; 
    
    gameState.Quark += actualClickPower;
    gameState.totalClicks++;
    
    // 點擊升級
    if (gameState.totalClicks % 100 === 0) {
        gameState.clickPower++;
    }
    updateUI();
}

/** 計算並執行被動收入 */
function passiveIncome() {
    const effects = calculatePermanentEffects();
    let totalIncome = 0;
    
    for (const elementId in gameState.inventory) {
        const count = gameState.inventory[elementId];
        const data = ELEMENT_DATA[elementId];
        if (count > 0 && data.incomeRate) {
            totalIncome += count * data.incomeRate;
        }
    }
    
    const finalIncome = totalIncome * effects.incomeRateMultiplier;
    gameState.Quark += finalIncome;
    updateUI(); 
}

/** 嘗試合成目標元素 */
function synthesizeElement(targetElementId) {
    const data = ELEMENT_DATA[targetElementId];
    if (!data) return;

    // 2. 資源檢查
    const requiredResource = data.cost.resource;
    let requiredAmount = data.cost.amount; 
    const effects = calculatePermanentEffects();

    if (requiredResource === "Quark") {
        const finalReduction = Math.min(effects.quarkCostReduction, 0.90);
        requiredAmount = requiredAmount * (1 - finalReduction); 
        
        if (gameState.Quark < requiredAmount) return;
        gameState.Quark -= requiredAmount;
    } else { 
        if ((gameState.inventory[requiredResource] || 0) < requiredAmount) return;
        gameState.inventory[requiredResource] -= requiredAmount;
    }
    
    // 3. 執行合成
    const yieldAmount = data.baseYield;
    gameState.inventory[targetElementId] = (gameState.inventory[targetElementId] || 0) + yieldAmount;

    // 4. 檢查週期解鎖
    if (data.period > gameState.maxUnlockedPeriod) {
        gameState.maxUnlockedPeriod = data.period;
        gameState.playerLevel++; 
        $('status-message').textContent = `🎉 成功解鎖第 ${data.period} 週期！`;
    }
    
    updateUI();
}

/** 購買奇點升級 */
function purchaseUpgrade(upgradeId) {
    const data = SINGULARITY_UPGRADES[upgradeId];
    const currentLevel = gameState.singularityUpgrades[upgradeId];

    if (currentLevel >= data.maxLevel) return;

    const cost = data.costBase * Math.pow(data.costGrowth, currentLevel);
    
    if (gameState.singularityShards < cost) {
        $('status-message').textContent = `碎片不足！需要 ${Math.ceil(cost)} 個奇點碎片。`;
        return;
    }

    gameState.singularityShards -= Math.ceil(cost);
    gameState.singularityUpgrades[upgradeId]++;
    
    $('status-message').textContent = `📈 ${data.name} 升級到 Lv.${gameState.singularityUpgrades[upgradeId]}！`;

    updateUI();
}


// --- UI 渲染函數 (已更新應用永久增益) ---

/** 渲染奇點升級列表 */
function renderUpgrades() {
    $upgradeList.innerHTML = '';
    
    for (const upgradeId in SINGULARITY_UPGRADES) {
        const data = SINGULARITY_UPGRADES[upgradeId];
        const currentLevel = gameState.singularityUpgrades[upgradeId];
        const nextCost = data.costBase * Math.pow(data.costGrowth, currentLevel);
        const isMaxLevel = currentLevel >= data.maxLevel;
        const isAffordable = gameState.singularityShards >= nextCost;

        const itemEl = document.createElement('div');
        itemEl.className = 'upgrade-item';
        itemEl.innerHTML = `
            <h4>${data.name} (Lv.${currentLevel}${isMaxLevel ? ' - MAX' : ''})</h4>
            <p>${data.description}</p>
            ${!isMaxLevel ? `
                <button 
                    class="upgrade-btn" 
                    data-id="${upgradeId}"
                    ${!isAffordable ? 'disabled' : ''}
                >
                    花費 ${Math.ceil(nextCost)} 碎片購買
                </button>` : `<button class="upgrade-btn" disabled>已達最高等級</button>`}
        `;

        const button = itemEl.querySelector('.upgrade-btn');
        if (button && !isMaxLevel) {
            button.onclick = () => purchaseUpgrade(upgradeId);
        }
        $upgradeList.appendChild(itemEl);
    }
}

/** 渲染單個元素在庫存或合成列表中 */
function renderElementItem(elementId, data) {
    const ownedCount = gameState.inventory[elementId] || 0;
    
    // ------------------------------------------------------------------
    // 🚨 修正後的顯示/解鎖邏輯：確保 H, He 和下一個元素始終可見
    let shouldDisplay = false;
    
    if (data.Z === 1) {
        // H 永遠顯示
        shouldDisplay = true;
    } else if (data.period <= gameState.maxUnlockedPeriod) {
        // 已解鎖週期內的所有元素必須顯示 (讓玩家知道所有已解鎖的合成路徑)
        shouldDisplay = true;
    } else if (data.period === gameState.maxUnlockedPeriod + 1) {
        // 這是下一個週期的新元素。我們需要知道它是週期中的第一個元素嗎？
        // 檢查前一個元素的原子序 Z-1 是否已解鎖。
        const previousElement = Object.values(ELEMENT_DATA).find(e => e.Z === data.Z - 1);
        
        // 只有當前置元素已經存在庫存中時，才顯示下一個週期的第一個元素
        if (previousElement && gameState.inventory[previousElement.symbol] > 0) {
             shouldDisplay = true;
        }
    }
    // ------------------------------------------------------------------

    let costText = "";
    let isAffordable = true;
    let buttonText = "合成 (Max)";

    // 只有當元素有成本時 (Z>1)，我們才需要計算成本並顯示合成按鈕
    const canSynthesize = data.cost && shouldDisplay;

    if (data.cost) {
        const costResource = data.cost.resource;
        let costAmount = data.cost.amount;

        if (costResource === "Quark") {
            const effects = calculatePermanentEffects();
            const finalReduction = Math.min(effects.quarkCostReduction, 0.90); 
            costAmount = costAmount * (1 - finalReduction); 
            
            costText = `成本: ${Math.ceil(costAmount).toLocaleString()} 粒子`;
            isAffordable = gameState.Quark >= costAmount;
        } else {
            const ownedResource = gameState.inventory[costResource] || 0;
            costText = `成本: ${costAmount} ${costResource}`;
            isAffordable = ownedResource >= costAmount;
            buttonText = `轉換`;
        }
    }
    
    // 如果不應顯示，直接返回
    if (!shouldDisplay) return document.createElement('div');

    const itemEl = document.createElement('div');
    itemEl.className = 'element-item';
    itemEl.innerHTML = `
        <div class="element-info">
            <h4>${data.symbol} - ${data.name} (Z=${data.Z})</h4>
            <p>庫存: <span class="inventory-count">${ownedCount.toLocaleString()}</span> | 收益: +${data.incomeRate}/s</p>
            ${data.cost ? `<p>${costText}</p>` : ''}
        </div>
        ${canSynthesize ? `
            <button 
                class="synthesis-btn" 
                data-id="${elementId}" 
                ${!isAffordable ? 'disabled' : ''}
            >
                ${buttonText}
            </button>` : ''
        }
    `;
    
    const button = itemEl.querySelector('.synthesis-btn');
    if (button) {
        button.onclick = () => synthesizeElement(elementId);
    }
    
    return itemEl;
}


/** 更新所有 UI 元素 */
function updateUI(currentIncome = null) {
    const effects = calculatePermanentEffects();
    
    // 1. 更新基礎資源面板
    $quarkDisplay.textContent = Math.floor(gameState.Quark).toLocaleString();
    $levelDisplay.textContent = gameState.playerLevel;
    $shardDisplay.textContent = gameState.singularityShards.toLocaleString();

    // 計算並顯示實時收入
    let totalIncome = 0;
    for (const elementId in gameState.inventory) {
        const count = gameState.inventory[elementId];
        const data = ELEMENT_DATA[elementId];
        if (count > 0 && data.incomeRate) {
             totalIncome += count * data.incomeRate;
        }
    }
    const finalIncome = totalIncome * effects.incomeRateMultiplier;
    $incomeDisplay.textContent = `(+${finalIncome.toFixed(1)}/s)`;
    
    const finalClickPower = gameState.clickPower * effects.clickPowerMultiplier;
    $clickPowerDisplay.textContent = `(x${finalClickPower.toFixed(2)})`;
    
    // 2. 渲染庫存、合成和升級面板
    $inventoryList.innerHTML = '';
    const sortedElements = Object.values(ELEMENT_DATA).sort((a, b) => a.Z - b.Z);
    
    // 🚨 修正：現在 rely on renderElementItem 的內部邏輯來決定是否顯示
    sortedElements.forEach(data => {
        // 直接調用 renderElementItem，它會根據邏輯決定是否返回一個可見的元素
        const item = renderElementItem(data.symbol, data);
        if (item) {
            $inventoryList.appendChild(item);
        }
    });

    renderUpgrades(); 

    // 3. 更新重置按鈕狀態
    const MIN_QUARK_FOR_RESET = 100000; // 提高門檻
    const MIN_PERIOD_FOR_RESET = 2;     // 必須至少解鎖到第 2 週期
    
    $resetButton.disabled = 
        gameState.Quark < MIN_QUARK_FOR_RESET || 
        gameState.maxUnlockedPeriod < MIN_PERIOD_FOR_RESET;
}


// --- 事件與初始化 ---

function attachEventListeners() {
    $mainClickButton.addEventListener('click', handleClick);
    $resetButton.addEventListener('click', handleReset);
}

function handleReset() {
    if (confirm("確認重置？您將失去所有 Quark 和元素，但會獲得奇點碎片。")) {
        const elementCount = Object.keys(gameState.inventory).reduce((acc, key) => acc + gameState.inventory[key], 0);
        const shardsGained = Math.floor(gameState.Quark / 10000) + elementCount * 5; 
        
        gameState.singularityShards += shardsGained;
        
        // 恢復到 DEFAULT 狀態，但保留永久升級等級和碎片數量
        const savedUpgrades = gameState.singularityUpgrades;
        const savedShards = gameState.singularityShards;
        
        gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
        gameState.singularityUpgrades = savedUpgrades;
        gameState.singularityShards = savedShards;

        $('status-message').textContent = `🚀 宇宙重啟！你獲得了 ${shardsGained} 個奇點碎片。`;
        
        saveGame(); // 重啟後立即存檔
        updateUI();
    }
}

function initGame() {
    loadGame(); // 嘗試載入存檔
    attachEventListeners();
    
    // 自動儲存與被動收入循環
    setInterval(passiveIncome, 1000); 
    setInterval(saveGame, 10000); // 🚨 每 10 秒自動儲存一次
    
    updateUI();
}

// 啟動遊戲
initGame();

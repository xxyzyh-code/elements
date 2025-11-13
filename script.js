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
    },
    // ✅ 新增：超維度合成升級
    "HYPER_SYNTHESIS": {
        "name": "超維度合成",
        "description": "解鎖元素批量合成 (x10) 功能，並永久降低元素材料成本 1%。",
        "costBase": 150,
        "costGrowth": 2.5,
        "effectType": "materialCostReduction",
        "effectValue": 0.01,
        "maxLevel": 10
    }
};

// --- 元素數據結構  ---
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
    },
    
    // --- 第四週期 (Period 4) ---
    "K": {
       "name": "鉀 (Potassium)", "symbol": "K", "Z": 19, "period": 4,
        "cost": {"resource": "Ar", "amount": 50}, 
        "requiredElement": "Ar", 
        "incomeRate": 300.0, 
        "baseYield": 1
    },
    "Ca": {
        "name": "鈣 (Calcium)", "symbol": "Ca", "Z": 20, "period": 4,
        "cost": {"resource": "K", "amount": 65},
        "requiredElement": "K", 
        "incomeRate": 450.0,
        "baseYield": 1
    },
    "Sc": {
        "name": "鈧 (Scandium)", "symbol": "Sc", "Z": 21, "period": 4,
        "cost": {"resource": "Ca", "amount": 70},
        "requiredElement": "Ca", 
        "incomeRate": 500.0,
        "baseYield": 1
    },
    "Ti": {
        "name": "鈦 (Titanium)",  "symbol": "Ti", "Z": 22, "period": 4,
        "cost": {"resource": "Sc", "amount": 75},
        "requiredElement": "Sc", 
        "incomeRate": 550.0,
        "baseYield": 1
    },
    "V": {
        "name": "釩 (Vanadium)", "symbol": "V", "Z": 23, "period": 4,
        "cost": {"resource": "Ti", "amount": 80},
        "requiredElement": "Ti", 
        "incomeRate": 600.0,
        "baseYield": 1
    },
    "Cr": {
        "name": "鉻 (Chromium)", "symbol": "Cr", "Z": 24, "period": 4,
        "cost": {"resource": "V", "amount": 85},
        "requiredElement": "V", 
        "incomeRate": 650.0,
        "baseYield": 1
    },
    "Mn": {
        "name": "錳 (Manganese)", "symbol": "Mn", "Z": 25, "period": 4,
        "cost": {"resource": "Cr", "amount": 90},
        "requiredElement": "Cr", 
        "incomeRate": 700.0,
        "baseYield": 1
    },
    "Fe": {
        "name": "鐵 (Iron)", "symbol": "Fe", "Z": 26, "period": 4,
        "cost": {"resource": "Mn", "amount": 100}, 
        "requiredElement": "Mn", 
        "incomeRate": 1200.0,
        "baseYield": 1
    }, // ✅ 逗號修正！
    "Co": {
        "name": "鈷 (Cobalt)", "symbol": "Co", "Z": 27, "period": 4,
        "cost": {"resource": "Fe", "amount": 110}, 
        "requiredElement": "Fe", 
        "incomeRate": 1400.0,
        "baseYield": 1
    },
    "Ni": {
        "name": "鎳 (Nickel)", "symbol": "Ni", "Z": 28, "period": 4,
        "cost": {"resource": "Co", "amount": 120}, 
        "requiredElement": "Co", 
        "incomeRate": 1600.0,
        "baseYield": 1
    },
    "Cu": {
        "name": "銅 (Copper)", "symbol": "Cu", "Z": 29, "period": 4,
        "cost": {"resource": "Ni", "amount": 130}, 
        "requiredElement": "Ni", 
        "incomeRate": 1800.0,
        "baseYield": 1
    },
    "Zn": {
        "name": "鋅 (Zinc)", "symbol": "Zn", "Z": 30, "period": 4,
        "cost": {"resource": "Cu", "amount": 140}, 
        "requiredElement": "Cu", 
        "incomeRate": 2100.0,
        "baseYield": 1
    },
    "Ga": {
        "name": "鎵 (Gallium)", "symbol": "Ga", "Z": 31, "period": 4,
        "cost": {"resource": "Zn", "amount": 160}, 
        "requiredElement": "Zn", 
        "incomeRate": 2500.0,
        "baseYield": 1
    },
    "Ge": {
        "name": "鍺 (Germanium)", "symbol": "Ge", "Z": 32, "period": 4,
        "cost": {"resource": "Ga", "amount": 180}, 
        "requiredElement": "Ga", 
        "incomeRate": 3000.0,
        "baseYield": 1
    },
    "As": {
        "name": "砷 (Arsenic)", "symbol": "As", "Z": 33, "period": 4,
        "cost": {"resource": "Ge", "amount": 200}, 
        "requiredElement": "Ge", 
        "incomeRate": 3600.0,
        "baseYield": 1
    },
    "Se": {
        "name": "硒 (Selenium)", "symbol": "Se", "Z": 34, "period": 4,
        "cost": {"resource": "As", "amount": 220}, 
        "requiredElement": "As", 
        "incomeRate": 4300.0,
        "baseYield": 1
    },
    "Br": {
        "name": "溴 (Bromine)", "symbol": "Br", "Z": 35, "period": 4,
        "cost": {"resource": "Se", "amount": 250}, 
        "requiredElement": "Se", 
        "incomeRate": 5100.0,
        "baseYield": 1
    },
    "Kr": {
        "name": "氪 (Krypton)", "symbol": "Kr", "Z": 36, "period": 4,
        "cost": {"resource": "Br", "amount": 300}, 
        "requiredElement": "Br", 
        "incomeRate": 6000.0, // 第四週期終點
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
        "CATALYST_REDUCTION": 0,
        "HYPER_SYNTHESIS": 0 // ✅ 已包含新升級
    }
};

let gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)); 

// --- DOM 元素快取 (保持不變) ---
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
const $saveMessage = $('save-message');


// --- 核心輔助函數 ---

/** 根據奇點升級計算當前所有永久增益的總和 (已更新) */
function calculatePermanentEffects() {
    let effects = {
        clickPowerMultiplier: 1.0,
        incomeRateMultiplier: 1.0,
        quarkCostReduction: 0.0,
        materialCostReduction: 0.0 // ✅ 新增
    };

    for (const upgradeId in gameState.singularityUpgrades) {
        const level = gameState.singularityUpgrades[upgradeId];
        if (level > 0) {
            const data = SINGULARITY_UPGRADES[upgradeId];
            
            if (data.effectType === "clickPowerMultiplier" || data.effectType === "incomeRateMultiplier") {
                effects[data.effectType] += level * data.effectValue;
            } 
            else if (data.effectType === "quarkCostReduction" || data.effectType === "materialCostReduction") {
                effects[data.effectType] += level * data.effectValue; // ✅ 已更新
            }
        }
    }
    return effects;
}


// --- 存檔與載入函數 (已更新) ---

/** 保存遊戲狀態到 localStorage */
function saveGame() {
    try {
        const serializedState = JSON.stringify(gameState);
        localStorage.setItem('chemistry_clicker_save', serializedState);
        if ($saveMessage) {
            $saveMessage.textContent = '遊戲已自動儲存。';
            setTimeout(() => $saveMessage.textContent = '', 2000);
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
            
            // ✅ 確保新的升級屬性被正確初始化
            gameState = {
                ...DEFAULT_GAME_STATE,
                ...parsedState,
                inventory: parsedState.inventory || DEFAULT_GAME_STATE.inventory,
                singularityUpgrades: {
                    ...DEFAULT_GAME_STATE.singularityUpgrades, 
                    ...parsedState.singularityUpgrades
                }
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
        gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)); 
        $('status-message').textContent = '💾 存檔已清除，遊戲已重啟。';
        updateUI();
    }
}


// --- 核心邏輯函數 ---

/** 玩家點擊獲取 Quark (保持不變) */
function handleClick() {
    const effects = calculatePermanentEffects();
    const actualClickPower = gameState.clickPower * effects.clickPowerMultiplier; 
    
    gameState.Quark += actualClickPower;
    gameState.totalClicks++;
    
    if (gameState.totalClicks % 100 === 0) {
        gameState.clickPower++;
    }
    updateUI();
}

/** 計算並執行被動收入 (保持不變) */
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

/** ✅ 新增：批量合成函數 (取代舊的 synthesizeElement) */
function synthesizeElementBatch(targetElementId, batchAmount) {
    const data = ELEMENT_DATA[targetElementId];
    if (!data || !data.cost) return;

    const requiredResource = data.cost.resource;
    let requiredAmount = data.cost.amount; 
    const effects = calculatePermanentEffects();

    let reduction = 0;
    if (requiredResource === "Quark") {
        reduction = Math.min(effects.quarkCostReduction, 0.90);
    } else {
        reduction = Math.min(effects.materialCostReduction, 0.90); // ✅ 應用材料減免
    }
    
    const singleCost = requiredAmount * (1 - reduction);
    const totalCost = singleCost * batchAmount;

    // 2. 資源檢查
    if (requiredResource === "Quark") {
        if (gameState.Quark < totalCost) return;
        gameState.Quark -= totalCost;
    } else { 
        if ((gameState.inventory[requiredResource] || 0) < totalCost) return;
        gameState.inventory[requiredResource] -= totalCost;
    }
    
    // 3. 執行合成
    const yieldAmount = data.baseYield * batchAmount;
    gameState.inventory[targetElementId] = (gameState.inventory[targetElementId] || 0) + yieldAmount;

    // 4. 檢查週期解鎖
    if (data.period > gameState.maxUnlockedPeriod) {
        gameState.maxUnlockedPeriod = data.period;
        gameState.playerLevel++; 
        $('status-message').textContent = `🎉 成功解鎖第 ${data.period} 週期！`;
    }
    
    updateUI();
}

/** 購買奇點升級 (保持不變) */
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


// --- UI 渲染函數 (已更新) ---

/** 渲染奇點升級列表 (保持不變) */
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

/** 渲染單個元素在庫存或合成列表中 (✅ 已更新為批量合成) */
function renderElementItem(elementId, data) {
    const ownedCount = gameState.inventory[elementId] || 0;
    const effects = calculatePermanentEffects();
    
    // --- 顯示/解鎖邏輯 (保持不變) ---
    let shouldDisplay = false;
    if (data.Z === 1) {
        shouldDisplay = true;
    } else if (data.period <= gameState.maxUnlockedPeriod) {
        shouldDisplay = true;
    } else if (data.period === gameState.maxUnlockedPeriod + 1) {
        const requiredElementId = data.requiredElement;
        if (requiredElementId && gameState.inventory[requiredElementId] > 0) {
             shouldDisplay = true;
        }
    }
    if (!shouldDisplay) return document.createElement('div');
    // ---------------------------------------------------

    let costText = "";
    let buttonHtml = "";
    let reduction = 0; // 用於顯示折扣
    const canSynthesize = data.cost;

    if (data.cost) {
        const costResource = data.cost.resource;
        let costAmount = data.cost.amount;

        // 應用成本減免
        if (costResource === "Quark") {
            reduction = Math.min(effects.quarkCostReduction, 0.90);
        } else {
            reduction = Math.min(effects.materialCostReduction, 0.90); 
        }
        costAmount = costAmount * (1 - reduction); 

        // x1 成本
        const ownedResource = gameState.inventory[costResource] || 0;
        const isAffordableX1 = (costResource === "Quark") 
            ? gameState.Quark >= costAmount 
            : ownedResource >= costAmount;
            
        costText = `成本: ${Math.ceil(costAmount).toLocaleString()} ${costResource === "Quark" ? '粒子' : costResource}`;
        
        // 批量合成邏輯
        const hyperSynthLevel = gameState.singularityUpgrades.HYPER_SYNTHESIS || 0;
        const canBatchSynthesize = hyperSynthLevel > 0;
        const batchAmount = 10;
        
        // --- 渲染按鈕群組 ---
        buttonHtml += `
            <button 
                class="synthesis-btn" 
                data-id="${elementId}" 
                data-batch="1"
                ${!isAffordableX1 ? 'disabled' : ''}
            >
                x1 合成
            </button>
        `;

        if (canBatchSynthesize) {
            const totalCostX10 = costAmount * batchAmount;
            const isAffordableX10 = (costResource === "Quark") 
                ? gameState.Quark >= totalCostX10
                : ownedResource >= totalCostX10;
            
            buttonHtml += `
                <button 
                    class="synthesis-btn" 
                    data-id="${elementId}" 
                    data-batch="${batchAmount}"
                    ${!isAffordableX10 ? 'disabled' : ''}
                >
                    x${batchAmount} (需 ${Math.ceil(totalCostX10).toLocaleString()})
                </button>
            `;
        }
    }

    const itemEl = document.createElement('div');
    itemEl.className = 'element-item';
    itemEl.innerHTML = `
        <div class="element-info">
            <h4>${data.symbol} - ${data.name} (Z=${data.Z})</h4>
            <p>庫存: <span class="inventory-count">${ownedCount.toLocaleString()}</span> | 收益: +${data.incomeRate}/s</p>
            ${data.cost ? `<p class="cost-info">${costText} ${reduction > 0 ? `( -${(reduction * 100).toFixed(0)}% )` : ''}</p>` : ''}
        </div>
        <div class="synthesis-buttons">
            ${buttonHtml}
        </div>
    `;
    
    // 為所有按鈕添加事件監聽器
    itemEl.querySelectorAll('.synthesis-btn').forEach(button => {
        if (!button.disabled) {
            const batch = parseInt(button.dataset.batch);
            button.onclick = () => synthesizeElementBatch(elementId, batch);
        }
    });
    
    return itemEl;
}


/** 更新所有 UI 元素 (保持不變) */
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
    
    sortedElements.forEach(data => {
        const item = renderElementItem(data.symbol, data);
        if (item) {
            $inventoryList.appendChild(item);
        }
    });

    renderUpgrades(); 

    // 3. 更新重置按鈕狀態
    const MIN_QUARK_FOR_RESET = 100000; 
    const MIN_PERIOD_FOR_RESET = 2;     
    
    $resetButton.disabled = 
        gameState.Quark < MIN_QUARK_FOR_RESET || 
        gameState.maxUnlockedPeriod < MIN_PERIOD_FOR_RESET;
}


// --- 事件與初始化 (保持不變) ---

function attachEventListeners() {
    $mainClickButton.addEventListener('click', handleClick);
    $resetButton.addEventListener('click', handleReset);
}

function handleReset() {
    if (confirm("確認重置？您將失去所有 Quark 和元素，但會獲得奇點碎片。")) {
        const elementCount = Object.keys(gameState.inventory).reduce((acc, key) => acc + gameState.inventory[key], 0);
        const shardsGained = Math.floor(gameState.Quark / 10000) + elementCount * 5; 
        
        gameState.singularityShards += shardsGained;
        
        const savedUpgrades = gameState.singularityUpgrades;
        const savedShards = gameState.singularityShards;
        
        gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
        gameState.singularityUpgrades = savedUpgrades;
        gameState.singularityShards = savedShards;

        $('status-message').textContent = `🚀 宇宙重啟！你獲得了 ${shardsGained} 個奇點碎片。`;
        
        saveGame();
        updateUI();
    }
}

function initGame() {
    loadGame(); 
    attachEventListeners();
    
    setInterval(passiveIncome, 1000); 
    setInterval(saveGame, 10000); 
    
    updateUI();
}

// 啟動遊戲
initGame();

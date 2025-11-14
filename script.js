// --- 永久升級數據結構 (奇點碎片購買) ---
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

// --- 研究實驗室數據 (科學點購買，重置時清空啟用狀態) ---
const RESEARCH_UPGRADES = {
    "H_CATALYSIS": {
        "name": "氫催化",
        "description": "H 的 Quark 產量 x3",
        "cost": 50, // 花費 50 SP
        "targetElement": "H",
        "effectType": "incomeMultiplier",
        "effectValue": 3
    },
    "FE_COST_REDUCTION": {
        "name": "高爐改良",
        "description": "Fe 的材料成本 (Mn) 降低 20%",
        "cost": 1000, // 花費 1000 SP
        "targetElement": "Fe",
        "effectType": "materialCostReduction",
        "effectValue": 0.20 // 降低 20%
    },
    "KR_BOOST": {
        "name": "氪氣激發",
        "description": "Kr 的科學點 (SP) 產量 x2",
        "cost": 5000,
        "targetElement": "Kr",
        "effectType": "scienceYieldMultiplier",
        "effectValue": 2
    }
};

// --- 里程碑解鎖數據 (達成庫存數量，永久解鎖研究選項) ---
const MILESTONE_UNLOCKS = {
    "inventory": {
        "Fe": { 
            100: "FE_COST_REDUCTION" // 擁有 100 個 Fe，解鎖 "FE_COST_REDUCTION"
        },
        "Kr": {
            10: "KR_BOOST" // 擁有 10 個 Kr，解鎖 "KR_BOOST"
        }
    }
};

// --- 元素數據結構 (已更新 Si 和 Kr 的 scienceYield) ---
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
        "baseYield": 1,
        "scienceYield": 0.5 // ✅ 新增 SP 產量
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
    }, 
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
        "baseYield": 1,
        "scienceYield": 5.0 // ✅ 新增 SP 產量
    }
};

// --- 遊戲狀態 (初始默認值) ---
const DEFAULT_GAME_STATE = {
    "Quark": 0,
    "SciencePoints": 0, // ✅ 新增：科學點 (SP)
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
        "HYPER_SYNTHESIS": 0 
    },
    // ✅ 新增：研究相關狀態
    "permanentlyUnlockedResearch": ["H_CATALYSIS"], // 永久解鎖的研究 ID (重置保留)
    "activeResearch": [] // 當前已花費 SP 購買並啟用的研究 ID (重置清空)
};

let gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)); 

// --- DOM 元素快取 (新增 $researchList) ---
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
const $researchList = $('research-list'); // 假設您在 HTML 中新增了 research-list 元素
const $saveMessage = $('save-message');
const $scienceDisplay = $('science-display'); // 假設您在 HTML 中新增了 science-display 元素


// --- 核心輔助函數 ---

/** 根據奇點升級計算當前所有永久增益的總和 */
function calculatePermanentEffects() {
    let effects = {
        clickPowerMultiplier: 1.0,
        incomeRateMultiplier: 1.0,
        quarkCostReduction: 0.0,
        materialCostReduction: 0.0 
    };

    for (const upgradeId in gameState.singularityUpgrades) {
        const level = gameState.singularityUpgrades[upgradeId];
        if (level > 0) {
            const data = SINGULARITY_UPGRADES[upgradeId];
            
            if (data.effectType === "clickPowerMultiplier" || data.effectType === "incomeRateMultiplier") {
                effects[data.effectType] += level * data.effectValue;
            } 
            else if (data.effectType === "quarkCostReduction" || data.effectType === "materialCostReduction") {
                effects[data.effectType] += level * data.effectValue; 
            }
        }
    }
    return effects;
}

/** ✅ 新增：計算當前所有已啟用研究的臨時增益總和 */
function calculateCurrentResearchEffects() {
    let effects = {
        incomeMultiplier: {}, // { "H": 3, "Fe": 1, ... }
        materialCostReduction: 0.0, // 獨立的總減免
        scienceYieldMultiplier: 1.0
    };

    for (const researchId of gameState.activeResearch) {
        const data = RESEARCH_UPGRADES[researchId];
        if (!data) continue;

        if (data.effectType === "incomeMultiplier") {
            // 由於多個研究可能作用於同一個元素，這裡我們累加乘數
            effects.incomeMultiplier[data.targetElement] = (effects.incomeMultiplier[data.targetElement] || 1.0) + data.effectValue - 1; 
        } 
        else if (data.effectType === "materialCostReduction") {
            effects.materialCostReduction += data.effectValue; 
        }
        else if (data.effectType === "scienceYieldMultiplier") {
            // 假設 scienceYieldMultiplier 也是疊加的
            effects.scienceYieldMultiplier += data.effectValue - 1; 
        }
    }
    return effects;
}


// --- 存檔與載入函數 (更新載入，確保新屬性初始化) ---

/** 從 localStorage 載入遊戲狀態 */
function loadGame() {
    try {
        const savedState = localStorage.getItem('chemistry_clicker_save');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            // ✅ 確保新的升級屬性被正確初始化，尤其是新的研究屬性
            gameState = {
                ...DEFAULT_GAME_STATE,
                ...parsedState,
                inventory: parsedState.inventory || DEFAULT_GAME_STATE.inventory,
                singularityUpgrades: {
                    ...DEFAULT_GAME_STATE.singularityUpgrades, 
                    ...parsedState.singularityUpgrades
                },
                // 保證新的研究屬性在舊存檔中能被正確設置
                permanentlyUnlockedResearch: parsedState.permanentlyUnlockedResearch || DEFAULT_GAME_STATE.permanentlyUnlockedResearch,
                activeResearch: parsedState.activeResearch || DEFAULT_GAME_STATE.activeResearch,
                SciencePoints: parsedState.SciencePoints || DEFAULT_GAME_STATE.SciencePoints
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

// ... (saveGame 和 clearGame 保持不變) ...


// --- 核心邏輯函數 ---

/** ✅ 更新：計算並執行被動收入 (同時計算 Quark 和 SP) */
function passiveIncome() {
    const permEffects = calculatePermanentEffects();
    const researchEffects = calculateCurrentResearchEffects(); // 獲取臨時研究增益
    
    let totalQuarkIncome = 0;
    let totalScienceIncome = 0;
    
    for (const elementId in gameState.inventory) {
        const count = gameState.inventory[elementId];
        const data = ELEMENT_DATA[elementId];
        if (count <= 0) continue;

        // 1. 計算 Quark 收入
        if (data.incomeRate) {
            let rate = data.incomeRate;
            // 應用臨時研究 incomeMultiplier
            rate *= researchEffects.incomeMultiplier[elementId] || 1.0; 
            totalQuarkIncome += count * rate;
        }

        // 2. 計算 SciencePoints 收入
        if (data.scienceYield) {
            let scienceRate = data.scienceYield;
            totalScienceIncome += count * scienceRate;
        }
    }
    
    // 應用奇點升級的全局收入乘數
    const finalQuarkIncome = totalQuarkIncome * permEffects.incomeRateMultiplier;
    // 應用臨時研究的全局 SP 乘數
    const finalScienceIncome = totalScienceIncome * researchEffects.scienceYieldMultiplier; 
    
    gameState.Quark += finalQuarkIncome;
    gameState.SciencePoints += finalScienceIncome;
    updateUI(); 
}

/** ✅ 更新：批量合成函數 (新增里程碑檢查) */
function synthesizeElementBatch(targetElementId, batchAmount) {
    const data = ELEMENT_DATA[targetElementId];
    if (!data || !data.cost) return;

    const requiredResource = data.cost.resource;
    let requiredAmount = data.cost.amount; 
    const permEffects = calculatePermanentEffects();
    const researchEffects = calculateCurrentResearchEffects(); // 獲取臨時研究增益

    let reduction = 0;
    if (requiredResource === "Quark") {
        reduction = Math.min(permEffects.quarkCostReduction, 0.90);
    } else {
        // 應用永久材料減免 + 臨時研究減免 (疊加)
        const totalMaterialReduction = permEffects.materialCostReduction + researchEffects.materialCostReduction;
        reduction = Math.min(totalMaterialReduction, 0.90); 
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

    // ✅ 5. 檢查里程碑解鎖
    checkMilestoneUnlock(targetElementId);
    
    updateUI();
}

/** ✅ 新增：檢查庫存里程碑，並解鎖新研究 */
function checkMilestoneUnlock(elementId) {
    const count = gameState.inventory[elementId] || 0;
    const milestones = MILESTONE_UNLOCKS.inventory[elementId];

    if (milestones) {
        for (const amount in milestones) {
            const requiredAmount = parseInt(amount);
            const researchId = milestones[amount];
            
            if (count >= requiredAmount && !gameState.permanentlyUnlockedResearch.includes(researchId)) {
                gameState.permanentlyUnlockedResearch.push(researchId);
                $('status-message').textContent = `🏆 里程碑達成：擁有 ${requiredAmount} 個 ${elementId}，永久解鎖研究：${RESEARCH_UPGRADES[researchId].name}！`;
            }
        }
    }
}

/** ✅ 新增：購買研究實驗室升級 (臨時增益) */
function purchaseResearch(researchId) {
    const data = RESEARCH_UPGRADES[researchId];

    if (gameState.activeResearch.includes(researchId)) return; // 已經買過此輪遊戲的研究

    if (gameState.SciencePoints < data.cost) {
        $('status-message').textContent = `科學點不足！需要 ${data.cost} 個科學點。`;
        return;
    }

    gameState.SciencePoints -= data.cost;
    gameState.activeResearch.push(researchId);
    
    $('status-message').textContent = `🔬 成功啟用研究：${data.name}！本輪遊戲中生效。`;

    updateUI();
}


// --- UI 渲染函數 (新增研究實驗室渲染) ---

/** 渲染奇點升級列表 (保持不變) */
function renderUpgrades() {
    $upgradeList.innerHTML = '<h3>奇點升級 (永久)</h3>';
    
    // ... (渲染奇點升級邏輯保持不變) ...
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

/** ✅ 新增：渲染研究實驗室列表 (臨時增益) */
function renderResearchLab() {
    $researchList.innerHTML = '<h3>研究實驗室 (重置清空)</h3>';
    
    if (gameState.permanentlyUnlockedResearch.length === 0) {
        $researchList.innerHTML += '<p>尚未解鎖任何研究。試著合成更多元素！</p>';
        return;
    }

    gameState.permanentlyUnlockedResearch.forEach(researchId => {
        const data = RESEARCH_UPGRADES[researchId];
        const isActive = gameState.activeResearch.includes(researchId);
        const isAffordable = gameState.SciencePoints >= data.cost;

        const itemEl = document.createElement('div');
        itemEl.className = 'research-item';
        itemEl.innerHTML = `
            <h4>${data.name} ${isActive ? ' (✅ 已啟用)' : ''}</h4>
            <p>${data.description}</p>
            ${!isActive ? `
                <button 
                    class="research-btn" 
                    data-id="${researchId}"
                    ${!isAffordable ? 'disabled' : ''}
                >
                    花費 ${data.cost} 科學點購買
                </button>` : `<button class="research-btn" disabled>已啟用</button>`}
        `;

        const button = itemEl.querySelector('.research-btn');
        if (button && !isActive) {
            button.onclick = () => purchaseResearch(researchId);
        }
        $researchList.appendChild(itemEl);
    });
}


/** 更新所有 UI 元素 (更新顯示 SP 和渲染研究實驗室) */
function updateUI(currentIncome = null) {
    const permEffects = calculatePermanentEffects();
    const researchEffects = calculateCurrentResearchEffects();
    
    // 1. 更新基礎資源面板
    $quarkDisplay.textContent = Math.floor(gameState.Quark).toLocaleString();
    $scienceDisplay.textContent = Math.floor(gameState.SciencePoints).toLocaleString(); // 顯示 SP
    $levelDisplay.textContent = gameState.playerLevel;
    $shardDisplay.textContent = gameState.singularityShards.toLocaleString();

    // 計算並顯示實時收入
    let totalQuarkIncome = 0;
    let totalScienceIncome = 0;
    for (const elementId in gameState.inventory) {
        const count = gameState.inventory[elementId];
        const data = ELEMENT_DATA[elementId];
        if (count > 0) {
             // Quark 收入
             let rate = data.incomeRate || 0;
             rate *= researchEffects.incomeMultiplier[elementId] || 1.0; 
             totalQuarkIncome += count * rate;

             // SP 收入
             totalScienceIncome += (data.scienceYield || 0) * count;
        }
    }
    const finalQuarkIncome = totalQuarkIncome * permEffects.incomeRateMultiplier;
    const finalScienceIncome = totalScienceIncome * researchEffects.scienceYieldMultiplier;

    $incomeDisplay.textContent = `(${finalQuarkIncome.toFixed(1)}/s) | SP: (+${finalScienceIncome.toFixed(2)}/s)`; // 整合 SP 收益顯示
    
    const finalClickPower = gameState.clickPower * permEffects.clickPowerMultiplier;
    $clickPowerDisplay.textContent = `(x${finalClickPower.toFixed(2)})`;
    
    // 2. 渲染庫存、合成、升級和研究面板
    $inventoryList.innerHTML = '';
    const sortedElements = Object.values(ELEMENT_DATA).sort((a, b) => a.Z - b.Z);
    
    sortedElements.forEach(data => {
        const item = renderElementItem(data.symbol, data);
        if (item) {
            $inventoryList.appendChild(item);
        }
    });

    renderUpgrades(); 
    renderResearchLab(); // ✅ 渲染研究實驗室

    // 3. 更新重置按鈕狀態 (保持不變)
    const MIN_QUARK_FOR_RESET = 100000; 
    const MIN_PERIOD_FOR_RESET = 2;     
    
    $resetButton.disabled = 
        gameState.Quark < MIN_QUARK_FOR_RESET || 
        gameState.maxUnlockedPeriod < MIN_PERIOD_FOR_RESET;
}


// --- 事件與初始化 (更新重置邏輯) ---

function attachEventListeners() {
    $mainClickButton.addEventListener('click', handleClick);
    $resetButton.addEventListener('click', handleReset);
}

/** ✅ 更新：處理重置，並保留永久解鎖的研究列表 */
function handleReset() {
    if (confirm("確認重置？您將失去所有 Quark、SP 和元素，但會獲得奇點碎片，且永久解鎖的研究選項將被保留。")) {
        const elementCount = Object.keys(gameState.inventory).reduce((acc, key) => acc + (gameState.inventory[key] || 0), 0);
        const shardsGained = Math.floor(gameState.Quark / 10000) + elementCount * 5; 
        
        // 儲存重置時需要保留的數據
        const savedUpgrades = gameState.singularityUpgrades;
        const savedShards = gameState.singularityShards + shardsGained;
        const savedUnlockedResearch = gameState.permanentlyUnlockedResearch; 
        
        // 重置為默認狀態
        gameState = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
        
        // 恢復保留的數據
        gameState.singularityUpgrades = savedUpgrades;
        gameState.singularityShards = savedShards;
        gameState.permanentlyUnlockedResearch = savedUnlockedResearch;

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

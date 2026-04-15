export const plants = [
  // ── Vegetables ────────────────────────────────────────────
  {
    id: "tomato",
    name: "Tomato",
    emoji: "🍅",
    category: "vegetable",
    perSqFt: 1,
    spacingInches: 24,
    sun: "full",
    water: "high",
    season: "warm",
    height: "tall",
    heightInches: 60,
    daysToHarvest: [60, 85],
    color: "#E53E3E",
    companions: ["basil", "carrot", "parsley", "marigold", "nasturtium"],
    enemies: ["broccoli", "cabbage", "fennel", "kale"],
    care: {
      watering: "2–3 inches per week at soil level. Avoid wetting leaves.",
      pruning: "Pinch off suckers between main stem and branches for better airflow.",
      staking: "Use a 5 ft stake or cage. Tie vine every 6 inches as it grows.",
      fertilizing: "Apply balanced fertilizer 2–3 weeks after planting, then again when fruit sets."
    }
  },
  {
    id: "pepper",
    name: "Pepper",
    emoji: "🌶️",
    category: "vegetable",
    perSqFt: 1,
    spacingInches: 18,
    sun: "full",
    water: "medium",
    season: "warm",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [60, 90],
    color: "#DD6B20",
    companions: ["basil", "onion", "spinach", "tomato", "carrot"],
    enemies: ["fennel", "bean"],
    care: {
      watering: "1–2 inches per week. Keep soil consistently moist.",
      pruning: "When 12 inches tall, pinch growing tip to encourage branching.",
      staking: "Add a small cage or stake once fruit begins to set.",
      fertilizing: "Use balanced fertilizer at planting and when flowering begins."
    }
  },
  {
    id: "lettuce",
    name: "Lettuce",
    emoji: "🥬",
    category: "vegetable",
    perSqFt: 4,
    spacingInches: 6,
    sun: "partial",
    water: "high",
    season: "cool",
    height: "short",
    heightInches: 10,
    daysToHarvest: [30, 50],
    color: "#68D391",
    companions: ["carrot", "radish", "chive", "marigold", "beet"],
    enemies: [],
    care: {
      watering: "Keep soil evenly moist. Water daily in warm weather.",
      pruning: "Harvest outer leaves to encourage continued growth.",
      staking: "Not needed.",
      fertilizing: "Light feeding every 2 weeks with nitrogen-rich fertilizer."
    }
  },
  {
    id: "carrot",
    name: "Carrot",
    emoji: "🥕",
    category: "vegetable",
    perSqFt: 16,
    spacingInches: 3,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 12,
    daysToHarvest: [50, 80],
    color: "#ED8936",
    companions: ["lettuce", "onion", "pea", "tomato", "rosemary"],
    enemies: ["dill"],
    care: {
      watering: "1 inch per week. Keep soil evenly moist for straight roots.",
      pruning: "Thin seedlings to 3 inches apart once they sprout.",
      staking: "Not needed.",
      fertilizing: "Low nitrogen. Use phosphorus-rich fertilizer for root growth."
    }
  },
  {
    id: "bean",
    name: "Bush Bean",
    emoji: "🫘",
    category: "vegetable",
    perSqFt: 9,
    spacingInches: 4,
    sun: "full",
    water: "medium",
    season: "warm",
    height: "medium",
    heightInches: 20,
    daysToHarvest: [50, 60],
    color: "#38A169",
    companions: ["corn", "cucumber", "carrot", "radish", "marigold"],
    enemies: ["garlic", "onion", "fennel", "chive"],
    care: {
      watering: "1 inch per week. Water at soil level to prevent disease.",
      pruning: "Not needed. Harvest frequently to encourage production.",
      staking: "Bush types don't need support.",
      fertilizing: "Beans fix nitrogen — minimal fertilizer needed."
    }
  },
  {
    id: "cucumber",
    name: "Cucumber",
    emoji: "🥒",
    category: "vegetable",
    perSqFt: 2,
    spacingInches: 12,
    sun: "full",
    water: "high",
    season: "warm",
    height: "tall",
    heightInches: 48,
    daysToHarvest: [50, 70],
    color: "#276749",
    companions: ["bean", "corn", "radish", "pea", "marigold"],
    enemies: ["sage", "mint"],
    care: {
      watering: "1–2 inches per week. Consistent moisture prevents bitterness.",
      pruning: "Remove yellow leaves. Pinch lateral shoots to manage sprawl.",
      staking: "Use a trellis to save space — train vines vertically.",
      fertilizing: "Apply balanced fertilizer at planting and when flowering."
    }
  },
  {
    id: "zucchini",
    name: "Zucchini",
    emoji: "🥒",
    category: "vegetable",
    perSqFt: 1,
    spacingInches: 24,
    sun: "full",
    water: "high",
    season: "warm",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [45, 55],
    color: "#2F855A",
    companions: ["corn", "bean", "nasturtium", "marigold"],
    enemies: ["potato"],
    care: {
      watering: "1–2 inches per week at soil level.",
      pruning: "Remove lower leaves for airflow. Harvest at 6–8 inches.",
      staking: "Not required but can be trained vertically.",
      fertilizing: "Heavy feeder. Apply compost and balanced fertilizer monthly."
    }
  },
  {
    id: "spinach",
    name: "Spinach",
    emoji: "🥬",
    category: "vegetable",
    perSqFt: 9,
    spacingInches: 4,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 8,
    daysToHarvest: [40, 50],
    color: "#48BB78",
    companions: ["strawberry", "pea", "bean", "radish", "lettuce"],
    enemies: [],
    care: {
      watering: "1 inch per week. Keep soil consistently moist.",
      pruning: "Harvest outer leaves first for continuous production.",
      staking: "Not needed.",
      fertilizing: "Apply nitrogen-rich fertilizer every 2–3 weeks."
    }
  },
  {
    id: "kale",
    name: "Kale",
    emoji: "🥬",
    category: "vegetable",
    perSqFt: 1,
    spacingInches: 18,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [55, 75],
    color: "#276749",
    companions: ["beet", "onion", "garlic", "lettuce"],
    enemies: ["tomato", "strawberry"],
    care: {
      watering: "1–1.5 inches per week.",
      pruning: "Harvest lower leaves first; the plant keeps producing from center.",
      staking: "Not usually needed.",
      fertilizing: "Apply nitrogen-rich fertilizer every 3–4 weeks."
    }
  },
  {
    id: "radish",
    name: "Radish",
    emoji: "🔴",
    category: "vegetable",
    perSqFt: 16,
    spacingInches: 2,
    sun: "full",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 6,
    daysToHarvest: [20, 30],
    color: "#FC8181",
    companions: ["carrot", "lettuce", "pea", "bean", "spinach"],
    enemies: [],
    care: {
      watering: "Keep soil evenly moist. Don't let soil dry out.",
      pruning: "Thin seedlings to 2 inches apart.",
      staking: "Not needed.",
      fertilizing: "Minimal — too much nitrogen causes leafy tops but small roots."
    }
  },
  {
    id: "beet",
    name: "Beet",
    emoji: "🟣",
    category: "vegetable",
    perSqFt: 9,
    spacingInches: 4,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 12,
    daysToHarvest: [50, 70],
    color: "#9B2C2C",
    companions: ["lettuce", "onion", "garlic", "kale", "broccoli"],
    enemies: ["bean"],
    care: {
      watering: "1 inch per week. Even moisture for best root development.",
      pruning: "Thin seedlings to 4 inches. Greens are edible!",
      staking: "Not needed.",
      fertilizing: "Light feeding. Avoid high nitrogen."
    }
  },
  {
    id: "broccoli",
    name: "Broccoli",
    emoji: "🥦",
    category: "vegetable",
    perSqFt: 1,
    spacingInches: 18,
    sun: "full",
    water: "high",
    season: "cool",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [60, 100],
    color: "#2F855A",
    companions: ["beet", "lettuce", "onion", "thyme", "celery"],
    enemies: ["tomato", "strawberry"],
    care: {
      watering: "1–1.5 inches per week. Keep soil consistently moist.",
      pruning: "Harvest main head when tight. Side shoots will produce more.",
      staking: "Not needed.",
      fertilizing: "Heavy feeder. Apply nitrogen-rich fertilizer every 3 weeks."
    }
  },
  {
    id: "onion",
    name: "Onion",
    emoji: "🧅",
    category: "vegetable",
    perSqFt: 9,
    spacingInches: 4,
    sun: "full",
    water: "low",
    season: "cool",
    height: "short",
    heightInches: 12,
    daysToHarvest: [90, 120],
    color: "#F6E05E",
    companions: ["carrot", "lettuce", "beet", "pepper", "tomato"],
    enemies: ["bean", "pea"],
    care: {
      watering: "1 inch per week. Stop watering when tops begin to fall over.",
      pruning: "Not needed.",
      staking: "Not needed.",
      fertilizing: "Apply nitrogen fertilizer every 2–3 weeks during growth."
    }
  },
  {
    id: "pea",
    name: "Pea",
    emoji: "🟢",
    category: "vegetable",
    perSqFt: 8,
    spacingInches: 3,
    sun: "full",
    water: "medium",
    season: "cool",
    height: "tall",
    heightInches: 48,
    daysToHarvest: [55, 70],
    color: "#9AE6B4",
    companions: ["carrot", "radish", "bean", "cucumber", "corn"],
    enemies: ["garlic", "onion"],
    care: {
      watering: "1 inch per week. Keep soil moist, especially when flowering.",
      pruning: "Harvest regularly to encourage continued production.",
      staking: "Provide a trellis or netting for climbing varieties.",
      fertilizing: "Peas fix nitrogen — minimal fertilizer needed."
    }
  },
  {
    id: "chard",
    name: "Swiss Chard",
    emoji: "🌿",
    category: "vegetable",
    perSqFt: 4,
    spacingInches: 6,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "medium",
    heightInches: 18,
    daysToHarvest: [50, 60],
    color: "#F56565",
    companions: ["bean", "onion", "lettuce", "cabbage"],
    enemies: [],
    care: {
      watering: "1 inch per week. Consistent moisture for best flavor.",
      pruning: "Harvest outer stalks to keep plant producing.",
      staking: "Not needed.",
      fertilizing: "Apply balanced fertilizer every 3–4 weeks."
    }
  },
  {
    id: "eggplant",
    name: "Eggplant",
    emoji: "🍆",
    category: "vegetable",
    perSqFt: 1,
    spacingInches: 24,
    sun: "full",
    water: "medium",
    season: "warm",
    height: "medium",
    heightInches: 30,
    daysToHarvest: [70, 85],
    color: "#6B46C1",
    companions: ["basil", "bean", "pepper", "spinach", "thyme"],
    enemies: ["fennel"],
    care: {
      watering: "1–2 inches per week. Consistent moisture is important.",
      pruning: "Remove suckers below first fork. Limit to 5–6 fruits per plant.",
      staking: "Stake or cage to support heavy fruit.",
      fertilizing: "Apply balanced fertilizer at planting and monthly after."
    }
  },

  // ── Herbs ─────────────────────────────────────────────────
  {
    id: "basil",
    name: "Basil",
    emoji: "🌿",
    category: "herb",
    perSqFt: 1,
    spacingInches: 12,
    sun: "full",
    water: "medium",
    season: "warm",
    height: "short",
    heightInches: 18,
    daysToHarvest: [50, 75],
    color: "#48BB78",
    companions: ["tomato", "pepper", "oregano", "marigold"],
    enemies: ["sage", "thyme"],
    care: {
      watering: "Keep soil consistently moist but not waterlogged.",
      pruning: "Pinch off flower buds immediately. Harvest from the top.",
      staking: "Not needed.",
      fertilizing: "Light feeding every 4–6 weeks."
    }
  },
  {
    id: "cilantro",
    name: "Cilantro",
    emoji: "🌿",
    category: "herb",
    perSqFt: 9,
    spacingInches: 4,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 12,
    daysToHarvest: [45, 70],
    color: "#68D391",
    companions: ["bean", "pea", "lettuce", "spinach"],
    enemies: ["fennel"],
    care: {
      watering: "Keep soil evenly moist. Bolts quickly in hot, dry conditions.",
      pruning: "Harvest outer leaves. Succession plant every 2–3 weeks.",
      staking: "Not needed.",
      fertilizing: "Light feeding. Avoid high nitrogen."
    }
  },
  {
    id: "parsley",
    name: "Parsley",
    emoji: "🌿",
    category: "herb",
    perSqFt: 4,
    spacingInches: 6,
    sun: "partial",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 12,
    daysToHarvest: [70, 90],
    color: "#38A169",
    companions: ["tomato", "carrot", "chive", "lettuce"],
    enemies: ["lettuce"],
    care: {
      watering: "Keep soil moist. Needs 12 inches of soil depth.",
      pruning: "Cut outer stalks at the base to encourage new growth.",
      staking: "Not needed.",
      fertilizing: "Light feeding every 3–4 weeks."
    }
  },
  {
    id: "thyme",
    name: "Thyme",
    emoji: "🌱",
    category: "herb",
    perSqFt: 4,
    spacingInches: 6,
    sun: "full",
    water: "low",
    season: "warm",
    height: "short",
    heightInches: 10,
    daysToHarvest: [75, 90],
    color: "#68D391",
    companions: ["broccoli", "cabbage", "eggplant", "strawberry"],
    enemies: ["basil"],
    care: {
      watering: "Drought tolerant. Water only when soil is dry.",
      pruning: "Trim after flowering to keep compact shape.",
      staking: "Not needed.",
      fertilizing: "Minimal. Prefers lean soil."
    }
  },
  {
    id: "oregano",
    name: "Oregano",
    emoji: "🌱",
    category: "herb",
    perSqFt: 1,
    spacingInches: 12,
    sun: "full",
    water: "low",
    season: "warm",
    height: "short",
    heightInches: 12,
    daysToHarvest: [80, 90],
    color: "#68D391",
    companions: ["basil", "pepper", "tomato"],
    enemies: [],
    care: {
      watering: "Drought tolerant. Water when top inch of soil is dry.",
      pruning: "Harvest frequently to keep bushy. Cut back by half in midsummer.",
      staking: "Not needed.",
      fertilizing: "Minimal. Rich soil reduces flavor."
    }
  },
  {
    id: "chive",
    name: "Chives",
    emoji: "🌱",
    category: "herb",
    perSqFt: 16,
    spacingInches: 3,
    sun: "full",
    water: "medium",
    season: "cool",
    height: "short",
    heightInches: 12,
    daysToHarvest: [60, 90],
    color: "#9AE6B4",
    companions: ["carrot", "lettuce", "tomato", "parsley"],
    enemies: ["bean", "pea"],
    care: {
      watering: "Keep soil evenly moist.",
      pruning: "Cut leaves to 2 inches above soil to encourage regrowth.",
      staking: "Not needed.",
      fertilizing: "Light feeding in spring."
    }
  },
  {
    id: "mint",
    name: "Mint",
    emoji: "🌿",
    category: "herb",
    perSqFt: 1,
    spacingInches: 12,
    sun: "partial",
    water: "high",
    season: "cool",
    height: "short",
    heightInches: 18,
    daysToHarvest: [60, 90],
    color: "#38A169",
    companions: ["cabbage", "pea", "broccoli"],
    enemies: ["cucumber"],
    care: {
      watering: "Keep soil consistently moist. High water needs.",
      pruning: "Harvest regularly. Warning: very aggressive spreader!",
      staking: "Not needed. Consider container planting to control spread.",
      fertilizing: "Light feeding in spring."
    }
  },
  {
    id: "rosemary",
    name: "Rosemary",
    emoji: "🌿",
    category: "herb",
    perSqFt: 1,
    spacingInches: 18,
    sun: "full",
    water: "low",
    season: "warm",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [80, 120],
    color: "#2F855A",
    companions: ["carrot", "bean", "cabbage", "sage"],
    enemies: [],
    care: {
      watering: "Drought tolerant. Water only when soil is fully dry.",
      pruning: "Prune after flowering. Never cut into old wood.",
      staking: "Not needed.",
      fertilizing: "Minimal. Prefers poor to average soil."
    }
  },
  {
    id: "sage",
    name: "Sage",
    emoji: "🌱",
    category: "herb",
    perSqFt: 1,
    spacingInches: 18,
    sun: "full",
    water: "low",
    season: "warm",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [75, 90],
    color: "#A0AEC0",
    companions: ["rosemary", "cabbage", "broccoli", "carrot"],
    enemies: ["basil", "cucumber"],
    care: {
      watering: "Drought tolerant. Avoid overwatering.",
      pruning: "Prune in spring. Cut back by one-third to keep shape.",
      staking: "Not needed.",
      fertilizing: "Minimal. Rich soil reduces essential oil production."
    }
  },
  {
    id: "dill",
    name: "Dill",
    emoji: "🌿",
    category: "herb",
    perSqFt: 4,
    spacingInches: 6,
    sun: "full",
    water: "medium",
    season: "cool",
    height: "medium",
    heightInches: 24,
    daysToHarvest: [40, 60],
    color: "#9AE6B4",
    companions: ["lettuce", "onion", "cucumber"],
    enemies: ["carrot", "tomato"],
    care: {
      watering: "Keep soil evenly moist.",
      pruning: "Harvest leaves before flowers open. Let some flower for seeds.",
      staking: "May need support in windy areas.",
      fertilizing: "Light feeding. Avoid excess nitrogen."
    }
  },

  // ── Flowers ───────────────────────────────────────────────
  {
    id: "marigold",
    name: "Marigold",
    emoji: "🌼",
    category: "flower",
    perSqFt: 4,
    spacingInches: 6,
    sun: "full",
    water: "low",
    season: "warm",
    height: "short",
    heightInches: 12,
    daysToHarvest: [50, 60],
    color: "#F6AD55",
    companions: ["tomato", "pepper", "bean", "cucumber", "lettuce"],
    enemies: [],
    care: {
      watering: "Drought tolerant once established. Water when dry.",
      pruning: "Deadhead spent flowers to encourage more blooms.",
      staking: "Not needed.",
      fertilizing: "Minimal. Too much fertilizer reduces flowers."
    }
  },
  {
    id: "nasturtium",
    name: "Nasturtium",
    emoji: "🌺",
    category: "flower",
    perSqFt: 1,
    spacingInches: 12,
    sun: "full",
    water: "low",
    season: "warm",
    height: "short",
    heightInches: 12,
    daysToHarvest: [35, 50],
    color: "#ED8936",
    companions: ["tomato", "cucumber", "bean", "cabbage"],
    enemies: [],
    care: {
      watering: "Water when soil is dry. Overwatering reduces flowers.",
      pruning: "Remove spent flowers. Leaves and flowers are edible!",
      staking: "Not needed. Trailing varieties can climb with support.",
      fertilizing: "None needed. Poor soil produces more flowers."
    }
  },
  {
    id: "sunflower",
    name: "Sunflower",
    emoji: "🌻",
    category: "flower",
    perSqFt: 1,
    spacingInches: 12,
    sun: "full",
    water: "medium",
    season: "warm",
    height: "tall",
    heightInches: 72,
    daysToHarvest: [70, 100],
    color: "#ECC94B",
    companions: ["corn", "cucumber", "bean", "lettuce"],
    enemies: ["potato"],
    care: {
      watering: "1 inch per week. Deep watering encourages deep roots.",
      pruning: "Remove lower leaves if they yellow.",
      staking: "Tall varieties need staking in windy areas.",
      fertilizing: "Light feeding at planting. Avoid excess nitrogen."
    }
  },
];

export const categories = [
  { id: "vegetable", label: "Vegetables", emoji: "🥬" },
  { id: "herb", label: "Herbs", emoji: "🌿" },
  { id: "flower", label: "Flowers", emoji: "🌼" },
];

export const sunLevels = [
  { id: "full", label: "Full Sun", description: "6+ hours direct sunlight", emoji: "☀️" },
  { id: "partial", label: "Partial Sun", description: "3–6 hours sunlight", emoji: "⛅" },
  { id: "shade", label: "Shade Tolerant", description: "Under 3 hours", emoji: "🌥️" },
];

export const waterLevels = [
  { id: "low", label: "Low", description: "Water when dry", emoji: "💧" },
  { id: "medium", label: "Medium", description: "1–2× per week", emoji: "💧💧" },
  { id: "high", label: "High", description: "Keep consistently moist", emoji: "💧💧💧" },
];

export const seasons = [
  { id: "cool", label: "Cool Season", description: "Plant in early spring or late summer", emoji: "🌸" },
  { id: "warm", label: "Warm Season", description: "Plant after last frost", emoji: "☀️" },
];

export function getPlantById(id) {
  return plants.find(p => p.id === id);
}

export function getPlantsByCategory(category) {
  return plants.filter(p => p.category === category);
}

export function getPlantsBySeason(season) {
  return plants.filter(p => p.season === season);
}

export function getPlantsBySun(sun) {
  return plants.filter(p => p.sun === sun);
}

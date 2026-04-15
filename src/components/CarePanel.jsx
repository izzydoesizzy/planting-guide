import { getPlantById } from '../data/plants';

export default function CarePanel({ grid, season, onBack }) {
  // Collect unique plants from grid
  const plantCounts = {};
  for (const cell of Object.values(grid)) {
    if (!cell?.plantId) continue;
    if (!plantCounts[cell.plantId]) {
      plantCounts[cell.plantId] = { squares: 0, totalPlants: 0 };
    }
    plantCounts[cell.plantId].squares += 1;
    plantCounts[cell.plantId].totalPlants += cell.count;
  }

  const uniquePlants = Object.keys(plantCounts).map(id => ({
    ...getPlantById(id),
    squares: plantCounts[id].squares,
    totalPlants: plantCounts[id].totalPlants,
  })).filter(Boolean);

  if (uniquePlants.length === 0) {
    return (
      <div className="max-w-3xl mx-auto card text-center py-12">
        <span className="text-5xl block mb-4">🌱</span>
        <h2 className="text-xl font-bold text-earth-600 mb-2">No plants placed yet</h2>
        <p className="text-earth-500 mb-4">Go back to the garden planner and drag some plants onto your grid!</p>
        <button onClick={onBack} className="btn-primary">
          ← Back to Planner
        </button>
      </div>
    );
  }

  // Group by water needs
  const waterGroups = { high: [], medium: [], low: [] };
  for (const p of uniquePlants) {
    waterGroups[p.water].push(p);
  }

  // Sort by harvest time
  const harvestTimeline = [...uniquePlants].sort(
    (a, b) => a.daysToHarvest[0] - b.daysToHarvest[0]
  );

  const seasonalTips = getSeasonalTips(season, uniquePlants);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">
          <span>📋</span> Your Garden Care Guide
        </h2>
        <button onClick={onBack} className="btn-secondary text-sm">
          ← Back to Planner
        </button>
      </div>

      {/* Summary */}
      <div className="card">
        <h3 className="font-bold text-garden-800 mb-3 flex items-center gap-2">
          <span>🌿</span> Garden Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-garden-50 rounded-garden p-3 text-center">
            <div className="text-2xl font-bold text-garden-700">{uniquePlants.length}</div>
            <div className="text-xs text-earth-500">Plant Types</div>
          </div>
          <div className="bg-garden-50 rounded-garden p-3 text-center">
            <div className="text-2xl font-bold text-garden-700">
              {uniquePlants.reduce((sum, p) => sum + p.totalPlants, 0)}
            </div>
            <div className="text-xs text-earth-500">Total Plants</div>
          </div>
          <div className="bg-garden-50 rounded-garden p-3 text-center">
            <div className="text-2xl font-bold text-garden-700">
              {Object.keys(grid).length}
            </div>
            <div className="text-xs text-earth-500">Squares Used</div>
          </div>
          <div className="bg-garden-50 rounded-garden p-3 text-center">
            <div className="text-2xl font-bold text-garden-700">
              {Math.min(...uniquePlants.map(p => p.daysToHarvest[0]))}
            </div>
            <div className="text-xs text-earth-500">Days to First Harvest</div>
          </div>
        </div>
      </div>

      {/* Watering Schedule */}
      <div className="card">
        <h3 className="font-bold text-garden-800 mb-3 flex items-center gap-2">
          <span>💧</span> Watering Schedule
        </h3>
        <div className="space-y-3">
          {waterGroups.high.length > 0 && (
            <WateringGroup
              level="High"
              emoji="💧💧💧"
              desc="Keep consistently moist — water daily in hot weather"
              plants={waterGroups.high}
              color="blue"
            />
          )}
          {waterGroups.medium.length > 0 && (
            <WateringGroup
              level="Medium"
              emoji="💧💧"
              desc="Water 2–3 times per week, 1–2 inches"
              plants={waterGroups.medium}
              color="sky"
            />
          )}
          {waterGroups.low.length > 0 && (
            <WateringGroup
              level="Low"
              emoji="💧"
              desc="Water when soil is dry — every 4–7 days"
              plants={waterGroups.low}
              color="gray"
            />
          )}
        </div>
      </div>

      {/* Harvest Timeline */}
      <div className="card">
        <h3 className="font-bold text-garden-800 mb-3 flex items-center gap-2">
          <span>📅</span> Harvest Timeline
        </h3>
        <div className="space-y-2">
          {harvestTimeline.map(plant => (
            <HarvestBar key={plant.id} plant={plant} />
          ))}
        </div>
        <p className="text-xs text-earth-400 mt-3">
          Timeline shows approximate days from planting to harvest.
        </p>
      </div>

      {/* Per-plant care cards */}
      <div className="card">
        <h3 className="font-bold text-garden-800 mb-3 flex items-center gap-2">
          <span>🌱</span> Individual Plant Care
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {uniquePlants.map(plant => (
            <PlantCareCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>

      {/* Seasonal tips */}
      <div className="card">
        <h3 className="font-bold text-garden-800 mb-3 flex items-center gap-2">
          <span>🌸</span> Seasonal Tips for {season.charAt(0).toUpperCase() + season.slice(1)}
        </h3>
        <ul className="space-y-2">
          {seasonalTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-earth-700">
              <span className="text-garden-500 mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WateringGroup({ level, emoji, desc, plants, color }) {
  return (
    <div className={`p-3 rounded-garden bg-${color}-50 border border-${color}-200`}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-sm">
          {emoji} {level} Water Needs
        </span>
        <span className="text-xs text-earth-500">{desc}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {plants.map(p => (
          <span key={p.id} className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full text-xs font-semibold">
            {p.emoji} {p.name} (×{p.totalPlants})
          </span>
        ))}
      </div>
    </div>
  );
}

function HarvestBar({ plant }) {
  const maxDays = 120;
  const startPct = (plant.daysToHarvest[0] / maxDays) * 100;
  const widthPct = ((plant.daysToHarvest[1] - plant.daysToHarvest[0]) / maxDays) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm font-semibold text-earth-700 flex items-center gap-1 flex-shrink-0">
        {plant.emoji} {plant.name}
      </span>
      <div className="flex-1 h-6 bg-earth-100 rounded-full relative overflow-hidden">
        <div
          className="absolute h-full rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{
            left: `${Math.min(startPct, 90)}%`,
            width: `${Math.max(widthPct, 8)}%`,
            backgroundColor: plant.color,
          }}
        >
          {plant.daysToHarvest[0]}–{plant.daysToHarvest[1]}d
        </div>
      </div>
    </div>
  );
}

function PlantCareCard({ plant }) {
  return (
    <div className="bg-garden-50 rounded-garden p-3 border border-garden-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{plant.emoji}</span>
        <div>
          <div className="font-bold text-sm text-garden-800">{plant.name}</div>
          <div className="text-[10px] text-earth-500">
            {plant.squares} square{plant.squares > 1 ? 's' : ''} · {plant.totalPlants} plant{plant.totalPlants > 1 ? 's' : ''}
          </div>
        </div>
      </div>
      <div className="text-xs space-y-1 text-earth-600">
        <div>💧 {plant.care.watering}</div>
        <div>✂️ {plant.care.pruning}</div>
        {plant.care.staking !== 'Not needed.' && plant.care.staking !== 'Not needed' && (
          <div>🪴 {plant.care.staking}</div>
        )}
        <div>🌿 {plant.care.fertilizing}</div>
      </div>
    </div>
  );
}

function getSeasonalTips(season, plants) {
  const tips = [];
  const coolPlants = plants.filter(p => p.season === 'cool');
  const warmPlants = plants.filter(p => p.season === 'warm');

  if (season === 'spring') {
    tips.push('Start cool-season crops (lettuce, peas, radishes) as soon as soil can be worked.');
    if (warmPlants.length > 0) {
      tips.push(`Wait until after last frost to transplant warm-season crops: ${warmPlants.map(p => p.name).join(', ')}.`);
    }
    tips.push('Prepare soil with compost before planting. Aim for 6–8 inches of rich, loose soil.');
    tips.push('Consider succession planting lettuce and radishes every 2–3 weeks for continuous harvest.');
  } else if (season === 'summer') {
    tips.push('Mulch around plants to retain moisture and suppress weeds.');
    tips.push('Water deeply in the morning to reduce evaporation and disease.');
    if (coolPlants.length > 0) {
      tips.push(`Provide shade for cool-season crops in heat: ${coolPlants.map(p => p.name).join(', ')}.`);
    }
    tips.push('Check for pests regularly — early morning is the best time to inspect.');
    tips.push('Start planning fall garden — seed cool-season crops indoors in late summer.');
  } else {
    tips.push('Plant cool-season crops for fall harvest: lettuce, spinach, kale, radishes, peas.');
    tips.push('Clean up spent summer plants to prevent disease overwintering.');
    tips.push('Add mulch or cover crops to protect soil over winter.');
    if (warmPlants.length > 0) {
      tips.push(`Harvest remaining warm-season crops before first frost: ${warmPlants.map(p => p.name).join(', ')}.`);
    }
  }

  return tips;
}

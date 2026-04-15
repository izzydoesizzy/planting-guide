import { getPlantById } from '../data/plants';
import { getCompanionAlerts } from '../data/companions';
import CompanionAlert from './CompanionAlert';

export default function PlantDetailModal({ plantId, cellKey, grid, plot, onRemove, onClose }) {
  const plant = getPlantById(plantId);
  if (!plant) return null;

  const [row, col] = cellKey.split('-').map(Number);
  const alerts = getCompanionAlerts(grid, row, col, plantId, plot.height, plot.width);

  const sunEmoji = plant.sun === 'full' ? '☀️' : plant.sun === 'partial' ? '⛅' : '🌥️';

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white rounded-garden shadow-garden-lg max-w-md w-full p-6 space-y-4"
           onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">{plant.emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-garden-800">{plant.name}</h3>
            <span className="text-sm text-earth-500 capitalize">{plant.category}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-garden-50 rounded-garden p-2">
            <div className="text-lg">{sunEmoji}</div>
            <div className="text-[10px] font-semibold text-earth-600 capitalize">{plant.sun} sun</div>
          </div>
          <div className="bg-garden-50 rounded-garden p-2">
            <div className="text-lg">
              {plant.water === 'high' ? '💧💧💧' : plant.water === 'medium' ? '💧💧' : '💧'}
            </div>
            <div className="text-[10px] font-semibold text-earth-600 capitalize">{plant.water} water</div>
          </div>
          <div className="bg-garden-50 rounded-garden p-2">
            <div className="text-lg">📅</div>
            <div className="text-[10px] font-semibold text-earth-600">
              {plant.daysToHarvest[0]}–{plant.daysToHarvest[1]} days
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="text-sm space-y-2 text-earth-700">
          <div className="flex justify-between">
            <span className="font-semibold">Plants per sq ft:</span>
            <span>×{plant.perSqFt}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Height:</span>
            <span>{plant.heightInches}" ({plant.height})</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Season:</span>
            <span className="capitalize">{plant.season} season</span>
          </div>
        </div>

        {/* Companion alerts */}
        <CompanionAlert companions={alerts.companions} enemies={alerts.enemies} />

        {/* Care */}
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-garden-800">Care Instructions</h4>
          <div className="text-xs space-y-1.5 text-earth-600">
            <div><span className="font-semibold">💧 Watering:</span> {plant.care.watering}</div>
            <div><span className="font-semibold">✂️ Pruning:</span> {plant.care.pruning}</div>
            <div><span className="font-semibold">🪴 Staking:</span> {plant.care.staking}</div>
            <div><span className="font-semibold">🌿 Fertilizing:</span> {plant.care.fertilizing}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button onClick={onRemove} className="flex-1 btn-secondary text-red-600 hover:bg-red-50">
            Remove Plant
          </button>
          <button onClick={onClose} className="flex-1 btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import { useDroppable } from '@dnd-kit/core';
import { getPlantById } from '../data/plants';
import { getCompanionAlerts } from '../data/companions';

export default function GridCell({ cellKey, placement, grid, plot, onClick, sunDirection }) {
  const { setNodeRef, isOver } = useDroppable({ id: cellKey });
  const plant = placement ? getPlantById(placement.plantId) : null;

  // Companion alerts for occupied cells
  const [row, col] = cellKey.split('-').map(Number);
  const alerts = plant
    ? getCompanionAlerts(grid, row, col, placement.plantId, plot.height, plot.width)
    : { companions: [], enemies: [] };

  const hasEnemies = alerts.enemies.length > 0;
  const hasCompanions = alerts.companions.length > 0;

  // Sun intensity for this cell (gradient from sun-facing side)
  const sunIntensity = getSunIntensity(row, col, plot, sunDirection);

  return (
    <div
      ref={setNodeRef}
      onClick={() => onClick(cellKey)}
      className={`grid-cell ${plant ? 'occupied' : ''} ${isOver ? 'drag-over' : ''} ${
        hasEnemies ? 'ring-2 ring-red-400' : ''
      } ${hasCompanions ? 'ring-2 ring-green-400' : ''}`}
      style={{
        background: plant
          ? `${plant.color}18`
          : `rgba(250, 204, 21, ${sunIntensity * 0.08})`,
      }}
      title={plant ? `${plant.name} (×${placement.count})` : `Cell ${row + 1}, ${col + 1}`}
    >
      {plant ? (
        <div className="animate-bounce-in flex flex-col items-center">
          <span className="text-2xl leading-none">{plant.emoji}</span>
          {placement.count > 1 && (
            <span className="text-[10px] font-bold text-earth-600 mt-0.5">
              ×{placement.count}
            </span>
          )}
        </div>
      ) : (
        <span className="text-earth-300 text-xs">
          {row + 1},{col + 1}
        </span>
      )}

      {/* Enemy warning dot */}
      {hasEnemies && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full
                         text-white text-[10px] font-bold flex items-center justify-center">
          !
        </span>
      )}
    </div>
  );
}

function getSunIntensity(row, col, plot, sunDirection) {
  switch (sunDirection) {
    case 'south': return 1 - row / (plot.height - 1 || 1);
    case 'north': return row / (plot.height - 1 || 1);
    case 'east': return 1 - col / (plot.width - 1 || 1);
    case 'west': return col / (plot.width - 1 || 1);
    default: return 0.5;
  }
}

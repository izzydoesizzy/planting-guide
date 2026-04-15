import { useDraggable } from '@dnd-kit/core';

export default function PlantCard({ plant }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${plant.id}`,
  });

  const sunEmoji = plant.sun === 'full' ? '☀️' : plant.sun === 'partial' ? '⛅' : '🌥️';
  const waterDots = plant.water === 'high' ? '💧💧💧' : plant.water === 'medium' ? '💧💧' : '💧';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`plant-card ${isDragging ? 'opacity-40 scale-95' : ''}`}
    >
      <span className="text-2xl flex-shrink-0">{plant.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-earth-800 truncate">{plant.name}</div>
        <div className="flex items-center gap-2 text-[10px] text-earth-500">
          <span>{sunEmoji}</span>
          <span>{waterDots}</span>
          <span className="bg-earth-100 px-1.5 rounded-full">
            ×{plant.perSqFt}/sq ft
          </span>
        </div>
      </div>
      <div className="flex-shrink-0 text-xs text-earth-400">
        {plant.daysToHarvest[0]}–{plant.daysToHarvest[1]}d
      </div>
    </div>
  );
}

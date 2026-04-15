import { getPlantById } from '../data/plants';

export default function CompanionAlert({ companions, enemies }) {
  if (companions.length === 0 && enemies.length === 0) return null;

  return (
    <div className="space-y-1">
      {companions.length > 0 && (
        <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-garden">
          ✅ Good neighbors: {companions.map(id => getPlantById(id)?.name).join(', ')}
        </div>
      )}
      {enemies.length > 0 && (
        <div className="text-xs text-red-700 bg-red-50 px-2 py-1 rounded-garden">
          ⚠️ Bad neighbors: {enemies.map(id => getPlantById(id)?.name).join(', ')}
        </div>
      )}
    </div>
  );
}

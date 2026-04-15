import { plants } from './plants';

/**
 * Check if two plants are good companions.
 */
export function areCompanions(plantIdA, plantIdB) {
  const a = plants.find(p => p.id === plantIdA);
  const b = plants.find(p => p.id === plantIdB);
  if (!a || !b) return false;
  return a.companions.includes(plantIdB) || b.companions.includes(plantIdA);
}

/**
 * Check if two plants are enemies (should not be planted together).
 */
export function areEnemies(plantIdA, plantIdB) {
  const a = plants.find(p => p.id === plantIdA);
  const b = plants.find(p => p.id === plantIdB);
  if (!a || !b) return false;
  return a.enemies.includes(plantIdB) || b.enemies.includes(plantIdA);
}

/**
 * Given a grid of placements and a cell position, return companion/enemy alerts
 * for the plant in that cell vs. all adjacent cells.
 */
export function getCompanionAlerts(grid, row, col, plantId, totalRows, totalCols) {
  const alerts = { companions: [], enemies: [] };
  if (!plantId) return alerts;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (const [dr, dc] of directions) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr < 0 || nr >= totalRows || nc < 0 || nc >= totalCols) continue;

    const key = `${nr}-${nc}`;
    const neighbor = grid[key];
    if (!neighbor?.plantId || neighbor.plantId === plantId) continue;

    if (areCompanions(plantId, neighbor.plantId)) {
      if (!alerts.companions.includes(neighbor.plantId)) {
        alerts.companions.push(neighbor.plantId);
      }
    }
    if (areEnemies(plantId, neighbor.plantId)) {
      if (!alerts.enemies.includes(neighbor.plantId)) {
        alerts.enemies.push(neighbor.plantId);
      }
    }
  }

  return alerts;
}

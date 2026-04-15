import { plants, getPlantById } from '../data/plants';
import { areCompanions, areEnemies } from '../data/companions';

/**
 * Get the recommended row range for a plant height based on sun direction.
 * Tall plants go opposite the sun, short plants go toward the sun.
 */
export function getRecommendedRows(height, sunDirection, totalRows) {
  const third = Math.ceil(totalRows / 3);

  if (sunDirection === 'south' || sunDirection === 'east') {
    // Sun from south/east: tall at north/west end (top rows), short at south/east end (bottom rows)
    if (height === 'tall') return { start: 0, end: third };
    if (height === 'medium') return { start: third, end: third * 2 };
    return { start: third * 2, end: totalRows };
  } else {
    // Sun from north/west: tall at south/east end (bottom rows), short at north/west end (top rows)
    if (height === 'tall') return { start: totalRows - third, end: totalRows };
    if (height === 'medium') return { start: third, end: third * 2 };
    return { start: 0, end: third };
  }
}

/**
 * Auto-fill empty cells with smart suggestions.
 * Respects companion planting, height layout, and season.
 */
export function autoFillGarden(grid, validCells, plot, sunDirection, season) {
  const newGrid = { ...grid };
  const seasonType = season === 'summer' ? 'warm' : season === 'fall' ? 'cool' : null;

  // Get available plants filtered by season
  let available = plants.filter(p => {
    if (seasonType && p.season !== seasonType) return false;
    return true;
  });

  // Sort by: flowers first (edges), then by height preference
  const emptyCells = [...validCells].filter(key => !newGrid[key]);

  for (const cellKey of emptyCells) {
    const [row, col] = cellKey.split('-').map(Number);
    const isEdge = row === 0 || row === plot.height - 1 || col === 0 || col === plot.width - 1;

    // Score each plant for this position
    let bestPlant = null;
    let bestScore = -Infinity;

    for (const plant of available) {
      let score = 0;

      // Height placement score
      const rec = getRecommendedRows(plant.height, sunDirection, plot.height);
      if (row >= rec.start && row < rec.end) score += 10;

      // Companion bonus
      const neighbors = getNeighborPlantIds(newGrid, row, col, plot);
      for (const nId of neighbors) {
        if (areCompanions(plant.id, nId)) score += 5;
        if (areEnemies(plant.id, nId)) score -= 15;
      }

      // Flowers on edges
      if (plant.category === 'flower' && isEdge) score += 8;
      if (plant.category === 'flower' && !isEdge) score -= 3;

      // Variety bonus: prefer plants not already heavily used
      const usedCount = Object.values(newGrid).filter(c => c?.plantId === plant.id).length;
      score -= usedCount * 2;

      if (score > bestScore) {
        bestScore = score;
        bestPlant = plant;
      }
    }

    if (bestPlant) {
      newGrid[cellKey] = { plantId: bestPlant.id, count: bestPlant.perSqFt };
    }
  }

  return newGrid;
}

function getNeighborPlantIds(grid, row, col, plot) {
  const ids = [];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of dirs) {
    const key = `${row + dr}-${col + dc}`;
    if (grid[key]?.plantId) ids.push(grid[key].plantId);
  }
  return ids;
}

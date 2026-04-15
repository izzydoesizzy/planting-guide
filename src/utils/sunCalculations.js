/**
 * Calculate sun intensity for a cell based on sun direction.
 * Returns 0-1 where 1 = brightest (closest to sun).
 */
export function getSunIntensity(row, col, plot, sunDirection) {
  const maxRow = plot.height - 1 || 1;
  const maxCol = plot.width - 1 || 1;

  switch (sunDirection) {
    case 'south': return (plot.height - 1 - row) / maxRow;
    case 'north': return row / maxRow;
    case 'east': return (plot.width - 1 - col) / maxCol;
    case 'west': return col / maxCol;
    default: return 0.5;
  }
}

/**
 * Check if a cell is in the shadow of a tall plant.
 * Tall plants cast shadows away from the sun direction.
 */
export function isInShadow(row, col, grid, plot, sunDirection) {
  // Look in the sun direction for tall plants that would shade this cell
  const checkDirections = {
    south: { dr: 1, dc: 0 },   // shadow falls north
    north: { dr: -1, dc: 0 },  // shadow falls south
    east: { dr: 0, dc: 1 },    // shadow falls west
    west: { dr: 0, dc: -1 },   // shadow falls east
  };

  const { dr, dc } = checkDirections[sunDirection] || { dr: 0, dc: 0 };

  // Check 1-2 cells in the sun direction for tall plants
  for (let dist = 1; dist <= 2; dist++) {
    const checkRow = row + dr * dist;
    const checkCol = col + dc * dist;
    const key = `${checkRow}-${checkCol}`;
    const cell = grid[key];
    if (cell?.plantId) {
      // Import would be circular, so we check height from the placement
      // This is a simplified check — the GridCell component handles the full logic
      return true; // There's a plant between this cell and the sun
    }
  }

  return false;
}

/**
 * Get the sun suitability for a position.
 * Returns "full", "partial", or "shade" based on sun intensity.
 */
export function getSunSuitability(intensity) {
  if (intensity > 0.6) return 'full';
  if (intensity > 0.3) return 'partial';
  return 'shade';
}

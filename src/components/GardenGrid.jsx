import GridCell from './GridCell';

export default function GardenGrid({ plot, grid, validCells, onCellClick, sunDirection }) {
  const cellSize = Math.min(80, 600 / Math.max(plot.width, plot.height));

  return (
    <div className="card p-6 overflow-x-auto">
      {/* Direction label */}
      <div className="text-center text-xs text-earth-400 font-semibold mb-2">
        {sunDirection === 'north' ? '☀️ NORTH (Sun)' : 'NORTH'}
      </div>

      <div className="flex items-center gap-2 justify-center">
        {/* West label */}
        <div className="text-xs text-earth-400 font-semibold writing-mode-vertical"
             style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          {sunDirection === 'west' ? '☀️ W' : 'W'}
        </div>

        {/* Grid */}
        <div
          className="inline-grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${plot.width}, ${cellSize}px)`,
            gridAutoRows: `${cellSize}px`,
          }}
        >
          {Array.from({ length: plot.height }).map((_, r) =>
            Array.from({ length: plot.width }).map((_, c) => {
              const key = `${r}-${c}`;
              if (!validCells.has(key)) {
                return <div key={key} className="rounded-lg" />;
              }
              return (
                <GridCell
                  key={key}
                  cellKey={key}
                  placement={grid[key]}
                  grid={grid}
                  plot={plot}
                  onClick={onCellClick}
                  sunDirection={sunDirection}
                />
              );
            })
          )}
        </div>

        {/* East label */}
        <div className="text-xs text-earth-400 font-semibold"
             style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          {sunDirection === 'east' ? '☀️ E' : 'E'}
        </div>
      </div>

      {/* South label */}
      <div className="text-center text-xs text-earth-400 font-semibold mt-2">
        {sunDirection === 'south' ? '☀️ SOUTH (Sun)' : 'SOUTH'}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs text-earth-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Good companion
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Bad neighbor
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-sunflower-300/30 inline-block border border-sunflower-400/30" /> Sunny side
        </span>
      </div>
    </div>
  );
}

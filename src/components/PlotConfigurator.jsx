import { useState } from 'react';

const SHAPE_OPTIONS = [
  { id: 'rectangle', label: 'Rectangle', emoji: '▬', desc: 'Classic raised bed' },
  { id: 'square', label: 'Square', emoji: '⬜', desc: 'Compact plot' },
  { id: 'lshape', label: 'L-Shape', emoji: '⌐', desc: 'Corner plots' },
];

const PRESETS = [
  { label: '4×4', width: 4, height: 4, shape: 'square' },
  { label: '4×8', width: 4, height: 8, shape: 'rectangle' },
  { label: '4×12', width: 4, height: 12, shape: 'rectangle' },
  { label: '3×6', width: 3, height: 6, shape: 'rectangle' },
  { label: '2×8', width: 2, height: 8, shape: 'rectangle' },
];

const SUN_DIRECTIONS = [
  { id: 'north', label: 'N', angle: 0 },
  { id: 'east', label: 'E', angle: 90 },
  { id: 'south', label: 'S', angle: 180 },
  { id: 'west', label: 'W', angle: 270 },
];

const SEASON_OPTIONS = [
  { id: 'spring', label: 'Spring', emoji: '🌸', months: 'Mar–May' },
  { id: 'summer', label: 'Summer', emoji: '☀️', months: 'Jun–Aug' },
  { id: 'fall', label: 'Fall', emoji: '🍂', months: 'Sep–Nov' },
];

export default function PlotConfigurator({
  plot, onPlotChange,
  sunDirection, onSunDirectionChange,
  season, onSeasonChange,
  onNext,
}) {
  const updatePlot = (updates) => {
    const next = { ...plot, ...updates };
    // Auto-set shape if width === height
    if (updates.width && updates.height && updates.width === updates.height) {
      next.shape = 'square';
    } else if (updates.width && updates.height && next.shape === 'square') {
      next.shape = 'rectangle';
    }
    onPlotChange(next);
  };

  const applyPreset = (preset) => {
    onPlotChange({
      ...plot,
      width: preset.width,
      height: preset.height,
      shape: preset.shape,
    });
  };

  const totalSqFt = plot.shape === 'lshape'
    ? (plot.width * plot.height) - (plot.lCutWidth * plot.lCutHeight)
    : plot.width * plot.height;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Shape Selector */}
      <section className="card">
        <h2 className="section-title mb-4">
          <span>📐</span> Plot Shape
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {SHAPE_OPTIONS.map(shape => (
            <button
              key={shape.id}
              onClick={() => updatePlot({ shape: shape.id })}
              className={`p-4 rounded-garden border-2 transition-all text-center ${
                plot.shape === shape.id
                  ? 'border-garden-500 bg-garden-50 shadow-garden'
                  : 'border-earth-200 hover:border-garden-300 bg-white'
              }`}
            >
              <div className="text-3xl mb-1">{shape.emoji}</div>
              <div className="font-bold text-sm">{shape.label}</div>
              <div className="text-xs text-earth-500">{shape.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Dimensions */}
      <section className="card">
        <h2 className="section-title mb-4">
          <span>📏</span> Plot Size
        </h2>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className={`filter-chip ${
                plot.width === p.width && plot.height === p.height ? 'active' : ''
              }`}
            >
              {p.label} ft
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-earth-600 mb-1">
              Width (ft)
            </label>
            <input
              type="range"
              min={2}
              max={12}
              value={plot.width}
              onChange={(e) => updatePlot({ width: parseInt(e.target.value) })}
              className="w-full accent-garden-500"
            />
            <div className="text-center font-bold text-garden-700">{plot.width} ft</div>
          </div>
          <div className="text-2xl text-earth-400">×</div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-earth-600 mb-1">
              Height (ft)
            </label>
            <input
              type="range"
              min={2}
              max={12}
              value={plot.height}
              onChange={(e) => updatePlot({ height: parseInt(e.target.value) })}
              className="w-full accent-garden-500"
            />
            <div className="text-center font-bold text-garden-700">{plot.height} ft</div>
          </div>
        </div>

        {/* L-shape cutout */}
        {plot.shape === 'lshape' && (
          <div className="mt-4 p-3 bg-earth-50 rounded-garden border border-earth-200">
            <p className="text-sm font-semibold text-earth-600 mb-2">L-Shape Cutout:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-earth-500">Cut Width</label>
                <input
                  type="range"
                  min={1}
                  max={plot.width - 1}
                  value={Math.min(plot.lCutWidth, plot.width - 1)}
                  onChange={(e) => updatePlot({ lCutWidth: parseInt(e.target.value) })}
                  className="w-full accent-terracotta-500"
                />
                <div className="text-center text-sm font-bold text-earth-700">
                  {Math.min(plot.lCutWidth, plot.width - 1)} ft
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-earth-500">Cut Height</label>
                <input
                  type="range"
                  min={1}
                  max={plot.height - 1}
                  value={Math.min(plot.lCutHeight, plot.height - 1)}
                  onChange={(e) => updatePlot({ lCutHeight: parseInt(e.target.value) })}
                  className="w-full accent-terracotta-500"
                />
                <div className="text-center text-sm font-bold text-earth-700">
                  {Math.min(plot.lCutHeight, plot.height - 1)} ft
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 bg-garden-100 text-garden-800 px-4 py-2 rounded-full font-bold">
            🌿 Total: {totalSqFt} sq ft
          </span>
        </div>
      </section>

      {/* Sun Direction */}
      <section className="card">
        <h2 className="section-title mb-4">
          <span>☀️</span> Sun Direction
          <span className="text-sm font-normal text-earth-500 ml-2">
            Where does the sun come from?
          </span>
        </h2>
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            {/* Center circle */}
            <div className="absolute inset-12 rounded-full bg-garden-100 border-2 border-garden-300
                            flex items-center justify-center">
              <span className="text-2xl sun-indicator">☀️</span>
            </div>
            {/* Direction buttons */}
            {SUN_DIRECTIONS.map(dir => {
              const positions = {
                north: 'top-0 left-1/2 -translate-x-1/2',
                south: 'bottom-0 left-1/2 -translate-x-1/2',
                east: 'top-1/2 right-0 -translate-y-1/2',
                west: 'top-1/2 left-0 -translate-y-1/2',
              };
              return (
                <button
                  key={dir.id}
                  onClick={() => onSunDirectionChange(dir.id)}
                  className={`absolute ${positions[dir.id]} w-12 h-12 rounded-full font-bold
                             text-sm transition-all flex items-center justify-center ${
                    sunDirection === dir.id
                      ? 'bg-sunflower-400 text-earth-800 shadow-lg scale-110'
                      : 'bg-white text-earth-600 border border-earth-300 hover:border-sunflower-400'
                  }`}
                >
                  {dir.label}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-center text-sm text-earth-500 mt-3">
          Tall plants will be placed opposite the sun to avoid shading shorter plants.
        </p>
      </section>

      {/* Season */}
      <section className="card">
        <h2 className="section-title mb-4">
          <span>📅</span> Planting Season
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {SEASON_OPTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => onSeasonChange(s.id)}
              className={`p-4 rounded-garden border-2 transition-all text-center ${
                season === s.id
                  ? 'border-garden-500 bg-garden-50 shadow-garden'
                  : 'border-earth-200 hover:border-garden-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="font-bold text-sm">{s.label}</div>
              <div className="text-xs text-earth-500">{s.months}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Preview + Next */}
      <section className="card text-center">
        <h2 className="section-title justify-center mb-4">
          <span>👀</span> Plot Preview
        </h2>
        <PlotPreview plot={plot} sunDirection={sunDirection} />
        <button
          onClick={onNext}
          className="btn-primary text-lg px-8 py-3 mt-6"
        >
          Start Planting →
        </button>
      </section>
    </div>
  );
}

function PlotPreview({ plot, sunDirection }) {
  const cellSize = Math.min(40, 240 / Math.max(plot.width, plot.height));
  const cutR = plot.height - plot.lCutHeight;
  const cutC = plot.width - plot.lCutWidth;

  return (
    <div className="inline-block relative">
      {/* Sun indicator */}
      <div className={`absolute text-xl sun-indicator ${
        sunDirection === 'north' ? '-top-8 left-1/2 -translate-x-1/2' :
        sunDirection === 'south' ? '-bottom-8 left-1/2 -translate-x-1/2' :
        sunDirection === 'east' ? 'top-1/2 -right-8 -translate-y-1/2' :
        'top-1/2 -left-8 -translate-y-1/2'
      }`}>
        ☀️
      </div>
      <div className="inline-grid gap-0.5" style={{
        gridTemplateColumns: `repeat(${plot.width}, ${cellSize}px)`,
      }}>
        {Array.from({ length: plot.height * plot.width }).map((_, i) => {
          const r = Math.floor(i / plot.width);
          const c = i % plot.width;
          const iscut = plot.shape === 'lshape' && r >= cutR && c >= cutC;
          return (
            <div
              key={i}
              className={`rounded-sm transition-all ${
                iscut
                  ? 'bg-transparent'
                  : 'bg-earth-200 border border-earth-300'
              }`}
              style={{ width: cellSize, height: cellSize }}
            />
          );
        })}
      </div>
    </div>
  );
}

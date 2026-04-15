import { useState, useCallback } from 'react';
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import Header from './components/Header';
import PlotConfigurator from './components/PlotConfigurator';
import GardenGrid from './components/GardenGrid';
import PlantPalette from './components/PlantPalette';
import SunOverlay from './components/SunOverlay';
import CarePanel from './components/CarePanel';
import PlantDetailModal from './components/PlantDetailModal';
import { getPlantById } from './data/plants';
import { autoFillGarden } from './utils/gardenLogic';

const DEFAULT_PLOT = {
  shape: 'rectangle',
  width: 4,
  height: 8,
  lCutWidth: 2,
  lCutHeight: 2,
};

export default function App() {
  const [plot, setPlot] = useState(DEFAULT_PLOT);
  const [sunDirection, setSunDirection] = useState('south');
  const [season, setSeason] = useState('spring');
  const [grid, setGrid] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showCare, setShowCare] = useState(false);
  const [step, setStep] = useState('configure'); // configure | plan | review

  // Build the set of valid cells based on plot shape
  const getValidCells = useCallback(() => {
    const cells = new Set();
    for (let r = 0; r < plot.height; r++) {
      for (let c = 0; c < plot.width; c++) {
        if (plot.shape === 'lshape') {
          const cutR = plot.height - plot.lCutHeight;
          const cutC = plot.width - plot.lCutWidth;
          if (r >= cutR && c >= cutC) continue;
        }
        cells.add(`${r}-${c}`);
      }
    }
    return cells;
  }, [plot]);

  const validCells = getValidCells();

  const placedPlantCount = Object.keys(grid).length;

  const handlePlotChange = (newPlot) => {
    setPlot(newPlot);
    // Clear cells that are no longer valid
    setGrid(prev => {
      const next = {};
      const cells = new Set();
      for (let r = 0; r < newPlot.height; r++) {
        for (let c = 0; c < newPlot.width; c++) {
          if (newPlot.shape === 'lshape') {
            const cutR = newPlot.height - newPlot.lCutHeight;
            const cutC = newPlot.width - newPlot.lCutWidth;
            if (r >= cutR && c >= cutC) continue;
          }
          cells.add(`${r}-${c}`);
        }
      }
      for (const [key, val] of Object.entries(prev)) {
        if (cells.has(key)) next[key] = val;
      }
      return next;
    });
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const cellKey = over.id;
    if (!validCells.has(cellKey)) return;

    const plantId = active.id.replace('palette-', '');
    const plant = getPlantById(plantId);
    if (!plant) return;

    setGrid(prev => ({
      ...prev,
      [cellKey]: { plantId: plant.id, count: plant.perSqFt },
    }));
  };

  const handleCellClick = (cellKey) => {
    if (grid[cellKey]) {
      setSelectedCell(cellKey);
    }
  };

  const handleRemovePlant = (cellKey) => {
    setGrid(prev => {
      const next = { ...prev };
      delete next[cellKey];
      return next;
    });
    setSelectedCell(null);
  };

  const handleClearAll = () => {
    setGrid({});
    setSelectedCell(null);
  };

  const handleAutoFill = () => {
    setGrid(prev => autoFillGarden(prev, validCells, plot, sunDirection, season));
  };

  const activePlant = activeId ? getPlantById(activeId.replace('palette-', '')) : null;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          {/* Step tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setStep('configure')}
              className={`px-4 py-2 rounded-garden font-semibold text-sm transition-all ${
                step === 'configure'
                  ? 'bg-garden-600 text-white shadow-garden'
                  : 'bg-white text-earth-600 border border-earth-300 hover:border-garden-400'
              }`}
            >
              1. Configure Plot
            </button>
            <button
              onClick={() => setStep('plan')}
              className={`px-4 py-2 rounded-garden font-semibold text-sm transition-all ${
                step === 'plan'
                  ? 'bg-garden-600 text-white shadow-garden'
                  : 'bg-white text-earth-600 border border-earth-300 hover:border-garden-400'
              }`}
            >
              2. Plan Garden
            </button>
            <button
              onClick={() => setStep('review')}
              className={`px-4 py-2 rounded-garden font-semibold text-sm transition-all ${
                step === 'review'
                  ? 'bg-garden-600 text-white shadow-garden'
                  : 'bg-white text-earth-600 border border-earth-300 hover:border-garden-400'
              }`}
            >
              3. Care Guide
            </button>
          </div>

          {/* Step 1: Configure */}
          {step === 'configure' && (
            <PlotConfigurator
              plot={plot}
              onPlotChange={handlePlotChange}
              sunDirection={sunDirection}
              onSunDirectionChange={setSunDirection}
              season={season}
              onSeasonChange={setSeason}
              onNext={() => setStep('plan')}
            />
          )}

          {/* Step 2: Plan */}
          {step === 'plan' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <PlantPalette season={season} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="section-title">
                    <span>🌾</span> Your Garden Plot
                    <span className="text-sm font-normal text-earth-500 ml-2">
                      ({plot.width}×{plot.height} ft — {validCells.size} sq ft)
                    </span>
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={handleAutoFill} className="btn-primary text-sm">
                      ✨ Auto-Fill
                    </button>
                    {placedPlantCount > 0 && (
                      <button onClick={handleClearAll} className="btn-secondary text-sm">
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <SunOverlay
                    sunDirection={sunDirection}
                    width={plot.width}
                    height={plot.height}
                  />
                  <GardenGrid
                    plot={plot}
                    grid={grid}
                    validCells={validCells}
                    onCellClick={handleCellClick}
                    sunDirection={sunDirection}
                  />
                </div>
                {placedPlantCount > 0 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setStep('review')}
                      className="btn-primary text-lg px-8 py-3"
                    >
                      View Care Guide →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Care Guide */}
          {step === 'review' && (
            <CarePanel
              grid={grid}
              season={season}
              onBack={() => setStep('plan')}
            />
          )}
        </main>

        {/* Drag overlay */}
        <DragOverlay>
          {activePlant ? (
            <div className="plant-card opacity-80 shadow-garden-lg scale-105">
              <span className="text-2xl">{activePlant.emoji}</span>
              <span className="font-semibold text-sm">{activePlant.name}</span>
            </div>
          ) : null}
        </DragOverlay>

        {/* Plant detail modal */}
        {selectedCell && grid[selectedCell] && (
          <PlantDetailModal
            plantId={grid[selectedCell].plantId}
            cellKey={selectedCell}
            grid={grid}
            plot={plot}
            onRemove={() => handleRemovePlant(selectedCell)}
            onClose={() => setSelectedCell(null)}
          />
        )}

        <footer className="bg-white border-t border-garden-200 py-4 text-center text-sm text-earth-400">
          Made with 🌱 for community gardeners everywhere
        </footer>
      </div>
    </DndContext>
  );
}

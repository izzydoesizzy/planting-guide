import { useState } from 'react';
import { plants, categories } from '../data/plants';
import PlantCard from './PlantCard';

export default function PlantPalette({ season }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sunFilter, setSunFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');

  const currentSeasonType = season === 'summer' ? 'warm' : season === 'fall' ? 'cool' : 'all';

  const filtered = plants.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (sunFilter !== 'all' && p.sun !== sunFilter) return false;
    if (seasonFilter !== 'all' && p.season !== seasonFilter) return false;
    return true;
  });

  // Group by category
  const grouped = {};
  for (const p of filtered) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  return (
    <div className="w-full lg:w-72 flex-shrink-0">
      <div className="card sticky top-4 max-h-[calc(100vh-120px)] flex flex-col">
        <h2 className="section-title mb-3">
          <span>🌱</span> Plants
        </h2>

        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 pl-8 rounded-garden border border-earth-300
                       focus:border-garden-500 focus:ring-1 focus:ring-garden-500
                       outline-none text-sm"
          />
          <span className="absolute left-2.5 top-2.5 text-earth-400 text-sm">🔍</span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`filter-chip text-xs ${categoryFilter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`filter-chip text-xs ${categoryFilter === cat.id ? 'active' : ''}`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Sun & Season filters */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          <select
            value={sunFilter}
            onChange={(e) => setSunFilter(e.target.value)}
            className="text-xs px-2 py-1 rounded-garden border border-earth-300 bg-white
                       focus:border-garden-500 outline-none"
          >
            <option value="all">Any Sun</option>
            <option value="full">☀️ Full Sun</option>
            <option value="partial">⛅ Partial</option>
            <option value="shade">🌥️ Shade</option>
          </select>
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className="text-xs px-2 py-1 rounded-garden border border-earth-300 bg-white
                       focus:border-garden-500 outline-none"
          >
            <option value="all">Any Season</option>
            <option value="cool">🌸 Cool Season</option>
            <option value="warm">☀️ Warm Season</option>
          </select>
        </div>

        {/* Seasonal tip */}
        {currentSeasonType !== 'all' && seasonFilter === 'all' && (
          <div className="text-xs bg-sunflower-300/20 text-earth-700 px-3 py-2 rounded-garden mb-3">
            💡 Tip: Filter by <strong>{currentSeasonType} season</strong> for plants that
            thrive in {season}.
          </div>
        )}

        {/* Plant list */}
        <div className="flex-1 overflow-y-auto space-y-1 min-h-0 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center text-earth-400 py-8">
              <span className="text-3xl block mb-2">🔍</span>
              No plants match your filters.
            </div>
          ) : (
            Object.entries(grouped).map(([cat, catPlants]) => (
              <div key={cat}>
                <div className="text-xs font-bold text-earth-500 uppercase tracking-wider mt-2 mb-1 px-1">
                  {categories.find(c => c.id === cat)?.emoji}{' '}
                  {categories.find(c => c.id === cat)?.label}
                </div>
                {catPlants.map(plant => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            ))
          )}
        </div>

        <div className="text-xs text-earth-400 mt-3 pt-2 border-t border-earth-200 text-center">
          Drag a plant onto the grid to place it
        </div>
      </div>
    </div>
  );
}

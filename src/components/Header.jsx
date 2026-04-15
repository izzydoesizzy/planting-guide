export default function Header() {
  return (
    <header className="bg-white border-b border-garden-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌱</span>
          <div>
            <h1 className="text-2xl font-extrabold text-garden-800 leading-tight">
              Garden Planner
            </h1>
            <p className="text-sm text-earth-500 font-medium">
              Square Foot Gardening for Small Plots
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-earth-500">
          <span>🏡</span>
          <span>Community Garden Edition</span>
        </div>
      </div>
    </header>
  );
}

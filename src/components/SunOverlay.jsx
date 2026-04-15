export default function SunOverlay({ sunDirection, width, height }) {
  const positions = {
    north: { top: '-32px', left: '50%', transform: 'translateX(-50%)' },
    south: { bottom: '-32px', left: '50%', transform: 'translateX(-50%)' },
    east: { top: '50%', right: '-32px', transform: 'translateY(-50%)' },
    west: { top: '50%', left: '-32px', transform: 'translateY(-50%)' },
  };

  const gradients = {
    north: 'linear-gradient(to bottom, rgba(250,204,21,0.12), transparent)',
    south: 'linear-gradient(to top, rgba(250,204,21,0.12), transparent)',
    east: 'linear-gradient(to left, rgba(250,204,21,0.12), transparent)',
    west: 'linear-gradient(to right, rgba(250,204,21,0.12), transparent)',
  };

  return (
    <>
      {/* Floating sun icon */}
      <div
        className="absolute z-10 text-3xl sun-indicator pointer-events-none"
        style={positions[sunDirection]}
      >
        ☀️
      </div>
    </>
  );
}

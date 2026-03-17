import { useData } from '../../context/DataContext';

export default function RunningText() {
  const { runningTexts } = useData();
  const activeTexts = runningTexts.filter((t) => t.active);

  if (activeTexts.length === 0) return null;

  // Duplicate items for seamless infinite scroll
  const items = [...activeTexts, ...activeTexts, ...activeTexts, ...activeTexts];

  return (
    <div className="rt-wrapper">
      {/* Decorative top line */}
      <div className="rt-edge-top" />

      <div className="rt-stage">
        {/* Animated background particles/streaks */}
        <div className="rt-bg-streaks" />
        
        {/* Left/Right vignette */}
        <div className="rt-vignette-left" />
        <div className="rt-vignette-right" />

        {/* Scrolling Track */}
        <div className="rt-track">
          {items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="rt-item-group">
              <span className="rt-text">{item.text}</span>
              <span className="rt-dot">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="rt-edge-bottom" />
    </div>
  );
}

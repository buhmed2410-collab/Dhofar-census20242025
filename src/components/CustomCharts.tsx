/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// ==================== INTERFACES ====================
interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

interface Dataset {
  label: string;
  data: number[];
  color: string;
}

interface GroupedBarChartProps {
  labels: string[];
  datasets: Dataset[];
  height?: number;
  width?: number;
  theme?: string;
}

interface HorizontalBarChartProps {
  labels: string[];
  data: number[];
  colors?: string[];
  height?: number;
  scrollable?: boolean;
  theme?: string;
}

interface DoughnutChartProps {
  data: ChartDataItem[];
  height?: number;
  size?: number;
  innerLabel?: string;
  innerValue?: string;
  theme?: string;
}

interface RadarChartProps {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
    fillColor: string;
  }>;
  theme?: string;
}

// ==================== UTILITIES ====================
const formatNumber = (num: number) => num.toLocaleString('en-US');

// ==================== GROUPED BAR CHART ====================
export const GroupedBarChart: React.FC<GroupedBarChartProps> = ({ labels, datasets, height = 250, width, theme }) => {
  const [hovered, setHovered] = useState<{ label: string; datasetLabel: string; value: number; x: number; y: number } | null>(null);

  // Auto-scale
  const allValues = datasets.flatMap(d => d.data);
  const maxValue = Math.max(...allValues, 10) * 1.1; // 10% safety margin

  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width || (labels.length > 5 ? 800 : 500);
  const chartHeight = height;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  // Render Horizontal Gridlines
  const gridTicks = 5;
  const gridlines = Array.from({ length: gridTicks }).map((_, i) => {
    const val = (maxValue / (gridTicks - 1)) * i;
    const y = paddingTop + graphHeight - (val / maxValue) * graphHeight;
    return { val, y };
  });

  const numGroups = labels.length;
  const groupWidth = graphWidth / numGroups;
  const numSets = datasets.length;
  const barWidth = (groupWidth * 0.7) / numSets;

  return (
    <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full select-none">
        {/* Y Axis Gridlines & Labels */}
        {gridlines.map((g, idx) => (
          <g key={idx} className="opacity-40 transition-opacity hover:opacity-80">
            <line
              x1={paddingLeft}
              y1={g.y}
              x2={chartWidth - paddingRight}
              y2={g.y}
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            <text
              x={paddingLeft - 10}
              y={g.y + 4}
              textAnchor="end"
              className="text-[10px] font-mono fill-current font-medium"
            >
              {formatNumber(Math.round(g.val))}
            </text>
          </g>
        ))}

        {/* X Axis Line */}
        <line
          x1={paddingLeft}
          y1={paddingTop + graphHeight}
          x2={chartWidth - paddingRight}
          y2={paddingTop + graphHeight}
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-60"
        />

        {/* Draw Bars */}
        {labels.map((grpLabel, grpIdx) => {
          const grpX = paddingLeft + grpIdx * groupWidth + (groupWidth * 0.15);

          return (
            <g key={grpIdx}>
              {/* Group Label on X Axis */}
              <text
                x={grpX + (groupWidth * 0.7) / 2}
                y={paddingTop + graphHeight + 16}
                textAnchor="middle"
                className="text-[9px] fill-current font-medium"
              >
                {grpLabel}
              </text>

              {/* Individual Bars */}
              {datasets.map((dataset, setIdx) => {
                const val = dataset.data[grpIdx] || 0;
                const barHeight = (val / maxValue) * graphHeight;
                const barX = grpX + setIdx * barWidth;
                const barY = paddingTop + graphHeight - barHeight;

                return (
                  <rect
                    key={setIdx}
                    x={barX}
                    y={barY}
                    width={barWidth - 2}
                    height={Math.max(barHeight, 2)}
                    fill={dataset.color}
                    rx="3"
                    className="transition-all duration-300 cursor-pointer hover:brightness-125"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                      if (parentRect) {
                        setHovered({
                          label: grpLabel,
                          datasetLabel: dataset.label,
                          value: val,
                          x: rect.left - parentRect.left + rect.width / 2,
                          y: rect.top - parentRect.top - 12
                        });
                      }
                    }}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      {hovered && (
        <div
          className="absolute z-25 pointer-events-none rounded-md px-2.5 py-1.5 text-xs font-semibold shadow-xl border border-current bg-slate-900 border-opacity-30 text-white flex flex-col items-center gap-0.5"
          style={{
            left: `${hovered.x}px`,
            top: `${hovered.y}px`,
            transform: 'translate(-50%, -100%)',
            transition: 'all 0.1s ease-out'
          }}
        >
          <span className="text-[10px] opacity-75">{hovered.datasetLabel} - {hovered.label}</span>
          <span className="font-mono text-sm">{formatNumber(hovered.value)}</span>
        </div>
      )}
    </div>
  );
};

// ==================== HORIZONTAL BAR CHART ====================
export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  labels,
  data,
  colors,
  height = 250,
  scrollable = true,
  theme
}) => {
  const [hovered, setHovered] = useState<{ label: string; value: number; x: number; y: number } | null>(null);

  const maxValue = Math.max(...data, 10);
  const defaultColors = ['#00b4d8', '#f72585', '#06d6a0', '#ffd166', '#a29bfe', '#74b9ff', '#ffeaa7', '#fab1a0', '#0984e3', '#d63031'];
  const isMinimal = theme === 'minimal';

  return (
    <div 
      className={`flex flex-col gap-3 w-full pr-1 ${scrollable ? 'hide-scrollbar overflow-y-auto' : ''}`} 
      style={scrollable ? { maxHeight: `${height}px` } : undefined}
    >
      {labels.map((lbl, idx) => {
        const val = data[idx] || 0;
        const pct = (val / maxValue) * 100;
        const barColor = colors ? colors[idx % colors.length] : defaultColors[idx % defaultColors.length];

        return (
          <div
            key={idx}
            className="group flex flex-col gap-1 w-full relative cursor-pointer"
            onMouseEnter={(e) => {
              const boundary = e.currentTarget.getBoundingClientRect();
              const parentBoundary = e.currentTarget.parentElement?.getBoundingClientRect();
              if (parentBoundary) {
                setHovered({
                  label: lbl,
                  value: val,
                  x: boundary.left - parentBoundary.left + boundary.width / 2,
                  y: boundary.top - parentBoundary.top
                });
              }
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="truncate max-w-[70%] fill-current font-medium">{lbl}</span>
              <span className={`font-mono text-[11px] ${isMinimal ? 'text-gray-500' : 'opacity-90'}`}>{formatNumber(val)}</span>
            </div>
            <div className={`w-full h-2.5 rounded-full overflow-hidden border ${isMinimal ? 'bg-gray-100 border-gray-200' : 'bg-slate-800/40 border-white/5'}`}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out group-hover:brightness-110"
                style={{ width: `${pct}%`, backgroundColor: barColor }}
              />
            </div>
          </div>
        );
      })}

      {/* Hover Tooltip tooltip */}
      {hovered && (
        <div
          className="absolute z-20 pointer-events-none rounded px-2.5 py-1 text-xs font-semibold shadow-lg bg-slate-900 text-white border border-white/10 flex flex-col items-center"
          style={{
            left: `${hovered.x}px`,
            top: `${hovered.y - 10}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <span className="text-[10px] opacity-75">{hovered.label}</span>
          <span className="font-mono">{formatNumber(hovered.value)}</span>
        </div>
      )}
    </div>
  );
};

// ==================== DOUGHNUT CHART ====================
export const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, height = 200, size = 180, innerLabel, innerValue, theme }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const defaultColors = ['#00b4d8', '#f72585', '#06d6a0', '#ffd166', '#a29bfe', '#74b9ff', '#e040fb', '#ffeaa7'];
  const isMinimal = theme === 'minimal';

  // Highlight index is either hovered or clicked
  const activeIdx = activeIndex !== null ? activeIndex : clickedIndex;

  // Circle dimensions dynamically calculated from the size parameter
  const center = size / 2;
  const radius = (size / 2) - 30;
  const strokeWidth = Math.round(size * 0.12);
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-4 w-full">
      {/* SVG Doughnut */}
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none">
          {/* Base Background Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={isMinimal ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}
            strokeWidth={strokeWidth}
          />

          {/* Dynamic Fill Color Circle representing percentage on selection/click */}
          {activeIdx !== null && (() => {
            const baseColor = data[activeIdx].color || defaultColors[activeIdx % defaultColors.length];
            return (
              <circle
                cx={center}
                cy={center}
                r={radius - strokeWidth / 2}
                fill={baseColor}
                fillOpacity={isMinimal ? 0.05 : 0.12}
                className="transition-all duration-500 ease-out animate-pulse"
                style={{
                  filter: isMinimal ? 'none' : 'blur(4px)',
                }}
              />
            );
          })()}

          {/* Individual Segment Rings */}
          {data.map((item, idx) => {
            const pct = item.value / (total || 1);
            const strokeLength = pct * circumference;
            const strokeOffset = circumference - currentOffset;
            currentOffset += strokeLength;

            const color = item.color || defaultColors[idx % defaultColors.length];

            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                transform={`rotate(-90 ${center} ${center})`}
                className="transition-all duration-300 cursor-pointer origin-center hover:opacity-90"
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setClickedIndex(clickedIndex === idx ? null : idx)}
              />
            );
          })}

          {/* Active Overlay: Renders on top of all segments to prevent clipping/overlapping cuts */}
          {activeIdx !== null && (() => {
            let activeOffset = 0;
            for (let i = 0; i < activeIdx; i++) {
              activeOffset += (data[i].value / (total || 1)) * circumference;
            }
            const activeItem = data[activeIdx];
            const activePct = activeItem.value / (total || 1);
            const activeStrokeLength = activePct * circumference;
            const activeStrokeOffset = circumference - activeOffset;
            const activeColor = activeItem.color || defaultColors[activeIdx % defaultColors.length];

            return (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={activeColor}
                strokeWidth={strokeWidth + 4}
                strokeDasharray={`${activeStrokeLength} ${circumference}`}
                strokeDashoffset={activeStrokeOffset}
                transform={`rotate(-90 ${center} ${center})`}
                style={{ 
                  filter: isMinimal ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.18))' : `drop-shadow(0 0 10px ${activeColor})`,
                  pointerEvents: 'none'
                }}
                className="origin-center transition-all duration-300 scale-[1.01]"
              />
            );
          })()}
        </svg>

        {/* Center Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          {activeIdx !== null ? (
            <>
              <span className={`text-[10px] truncate max-w-[110px] font-semibold ${isMinimal ? 'text-gray-500' : 'opacity-75'}`}>
                {data[activeIdx].label}
              </span>
              <span className={`font-mono text-base font-black ${isMinimal ? 'text-gray-900' : 'text-white'}`}>
                {((data[activeIdx].value / (total || 1)) * 100).toFixed(1)}%
              </span>
              <span className={`font-mono text-[9px] ${isMinimal ? 'text-gray-400' : 'opacity-60'}`}>
                {formatNumber(data[activeIdx].value)}
              </span>
            </>
          ) : (
            <>
              <span className={`text-[11px] font-semibold ${isMinimal ? 'text-gray-500' : 'opacity-75'}`}>
                {innerLabel || 'الإجمالي'}
              </span>
              <span className={`font-mono text-xs sm:text-sm font-black tracking-wider ${isMinimal ? 'text-gray-900' : 'text-slate-100'}`}>
                {innerValue || formatNumber(total)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Legend Column list */}
      <div className={`grid ${data.length > 2 ? 'grid-cols-2 min-w-[260px]' : 'grid-cols-2 min-w-[150px]'} gap-x-4 gap-y-1.5 select-none text-[11px] max-w-full shrink-0`}>
        {data.map((item, idx) => {
          const color = item.color || defaultColors[idx % defaultColors.length];
          const pct = ((item.value / (total || 1)) * 100).toFixed(1);
          const isSelected = activeIdx === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 transition-all p-1.5 rounded-md cursor-pointer ${
                isSelected
                  ? isMinimal ? 'bg-gray-150 scale-105 border border-gray-200' : 'bg-white/10 scale-105 font-bold'
                  : isMinimal ? 'hover:bg-gray-100/50' : 'hover:bg-white/5'
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setClickedIndex(clickedIndex === idx ? null : idx)}
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform ${isSelected ? 'scale-125' : ''}`} 
                style={{ 
                  backgroundColor: color,
                  boxShadow: isSelected && !isMinimal ? `0 0 8px ${color}` : 'none'
                }} 
              />
              <div className="flex flex-col truncate">
                <span className={`font-medium truncate max-w-[110px] leading-tight ${isMinimal ? 'text-gray-800' : 'text-white'}`}>{item.label}</span>
                <span className={`text-[9.5px] font-mono mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-70'}`}>{pct}% ({formatNumber(item.value)})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== RADAR CHART ====================
export const RadarChart: React.FC<RadarChartProps> = ({ labels, datasets, theme }) => {
  const size = 320;
  const center = size / 2;
  const radius = 100;
  const isMinimal = theme === 'minimal';

  // Find max value to normalize coordinates
  const allVals = datasets.flatMap(d => d.data);
  const maxValue = Math.max(...allVals, 100) * 1.05;

  const numAxes = labels.length;

  // Compute standard geometry points
  const getCoordinatesForValue = (val: number, axisIdx: number) => {
    const d = (val / maxValue) * radius;
    const angle = (axisIdx * 2 * Math.PI) / numAxes - Math.PI / 2; // Subtract PI/2 to point upwards
    return {
      x: center + d * Math.cos(angle),
      y: center + d * Math.sin(angle)
    };
  };

  // Concentric polygon grids (e.g. 5 steps of the web)
  const steps = 5;
  const gridPolygons = Array.from({ length: steps }).map((_, stepIdx) => {
    const scale = ((stepIdx + 1) / steps);
    const stepVal = maxValue * scale;
    const pts = labels.map((_, axisIdx) => {
      const { x, y } = getCoordinatesForValue(stepVal, axisIdx);
      return `${x},${y}`;
    }).join(' ');

    return { pts, val: stepVal };
  });

  return (
    <div className="flex flex-col items-center w-full bg-transparent">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full max-w-full select-none">
        {/* Draw Polygon Rings (The Web) */}
        {gridPolygons.map((grid, sIdx) => (
          <polygon
            key={sIdx}
            points={grid.pts}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="0.5"
            className="opacity-20"
          />
        ))}

        {/* Draw Axis Lines */}
        {labels.map((_, axisIdx) => {
          const outerPt = getCoordinatesForValue(maxValue, axisIdx);
          return (
            <line
              key={axisIdx}
              x1={center}
              y1={center}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="currentColor"
              strokeWidth="0.5"
              className="opacity-20"
            />
          );
        })}

        {/* Draw Axis Labels Text */}
        {labels.map((lbl, axisIdx) => {
          // Push text outward a bit extra
          const labelDist = maxValue * 1.25;
          const { x, y } = getCoordinatesForValue(labelDist, axisIdx);

          let textAnchor = 'middle';
          if (x < center - 10) textAnchor = 'end';
          else if (x > center + 10) textAnchor = 'start';

          return (
            <text
              key={axisIdx}
              x={x}
              y={y + 4}
              textAnchor={textAnchor}
              className="text-[9px] fill-current font-bold"
            >
              {lbl}
            </text>
          );
        })}

        {/* Draw Datasets Polygons */}
        {datasets.map((dataset, setIdx) => {
          const pts = dataset.data.map((val, axisIdx) => {
            const { x, y } = getCoordinatesForValue(val, axisIdx);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={setIdx}>
              {/* Filled poly */}
              <polygon
                points={pts}
                fill={dataset.fillColor}
                stroke={dataset.color}
                strokeWidth="2.5"
                className="transition-all duration-300 hover:fill-opacity-40 cursor-pointer"
              />

              {/* Individual Dots */}
              {dataset.data.map((val, axisIdx) => {
                const { x, y } = getCoordinatesForValue(val, axisIdx);
                return (
                  <circle
                    key={axisIdx}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={dataset.color}
                    stroke="#fff"
                    strokeWidth="1"
                    className="cursor-pointer hover:r-[6]"
                    title={`${dataset.label}: ${val}`}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Small Inline Legends */}
      <div className="flex gap-4 justify-center items-center mt-2 flex-wrap">
        {datasets.map((d, sIdx) => (
          <div key={sIdx} className="flex items-center gap-1.5 text-xs">
            <div className={`w-3 h-3 rounded-full border ${isMinimal ? 'border-gray-250' : 'border-white/10'}`} style={{ backgroundColor: d.color }} />
            <span className={`font-semibold ${isMinimal ? 'text-gray-800' : 'text-white'}`}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

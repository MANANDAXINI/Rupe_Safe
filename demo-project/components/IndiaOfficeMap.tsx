'use client';

import React, { useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { MapPin } from 'lucide-react';

export const OFFICE_LOCATIONS = [
  {
    id: 'nagpur',
    city: 'Nagpur',
    state: 'Maharashtra',
    title: 'Registered Corporate Office',
    addressLines: [
      'Block No.101/102, Shriram Tower',
      'Next To NIT Kingsway Civil Lines, Sadar',
      'Nagpur, Maharashtra 440001',
    ],
    lat: 21.1539,
    lng: 79.0831,
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Rupexa+Private+Limited,+Tent+Line,+Sadar,+Nagpur,+Maharashtra',
    /** Card anchor on the map (% left / top) for hover popup */
    cardX: 40,
    cardY: 52,
  },
] as const;

export type OfficeLocation = (typeof OFFICE_LOCATIONS)[number] & {
  comingSoon?: boolean;
  cardX?: number;
  cardY?: number;
};

/** TopoJSON from india-map-react (library India states data) */
const INDIA_TOPO_URL = '/geo/india-states.topo.json';

type Props = {
  locations?: OfficeLocation[];
};

export default function IndiaOfficeMap({
  locations = OFFICE_LOCATIONS as unknown as OfficeLocation[],
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hovered = locations.find((l) => l.id === hoveredId) ?? null;

  const highlightStates = useMemo(
    () => new Set<string>(locations.map((l) => l.state)),
    [locations]
  );

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveId(null);
            setHoveredId(null);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 border-dotted transition-all ${
            activeId === null && !hoveredId
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
          }`}
        >
          All Cities
        </button>

        {locations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onMouseEnter={() => setHoveredId(loc.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveId(loc.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 border-dotted transition-all ${
              activeId === loc.id || hoveredId === loc.id
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-slate-700 border-slate-300 hover:border-red-400 hover:text-red-600'
            }`}
          >
            {loc.city}
            {loc.comingSoon ? ' · Soon' : ''}
          </button>
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div
          className="relative mx-auto w-full bg-transparent"
          style={{
            aspectRatio: '800 / 960',
            maxHeight: 'min(88vh, 780px)',
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1360,
              center: [82.4, 22.9],
            }}
            width={800}
            height={960}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={INDIA_TOPO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = String(geo.properties?.ST_NM || '');
                  const highlighted = highlightStates.has(name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={highlighted ? '#fecaca' : '#e2e8f0'}
                      stroke="#334155"
                      strokeWidth={0.45}
                      style={{
                        default: { outline: 'none' },
                        hover: {
                          outline: 'none',
                          fill: highlighted ? '#fca5a5' : '#cbd5e1',
                          cursor: highlighted ? 'pointer' : 'default',
                        },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => {
                        if (name === 'Maharashtra') setHoveredId('nagpur');
                      }}
                      onMouseLeave={() => {
                        if (name === 'Maharashtra') setHoveredId(null);
                      }}
                      onClick={() => {
                        if (name === 'Maharashtra') setActiveId('nagpur');
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {locations.map((loc) => {
              const isHot = hoveredId === loc.id;
              return (
                <Marker key={loc.id} coordinates={[loc.lng, loc.lat]}>
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredId(loc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setActiveId(loc.id)}
                  >
                    <circle r={32} fill="transparent" />
                    <circle
                      r={isHot ? 18 : 15}
                      fill="none"
                      stroke={loc.comingSoon ? '#64748b' : '#ef4444'}
                      strokeWidth={1.75}
                      strokeDasharray="2.5 2"
                      opacity={0.9}
                    />
                    <circle
                      r={8}
                      fill={loc.comingSoon ? '#64748b' : '#ef4444'}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                    <text
                      textAnchor="middle"
                      y={28}
                      style={{
                        fontFamily: 'inherit',
                        fontSize: 13,
                        fontWeight: 700,
                        fill: '#0f172a',
                        pointerEvents: 'none',
                      }}
                    >
                      {loc.city}
                    </text>
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Large HTML hover card — real CSS size, not SVG-scaled */}
          {hovered && (
            <div
              className="absolute z-20 w-[min(260px,85vw)] -translate-x-1/2 -translate-y-[108%] rounded-xl border-2 border-dotted border-slate-400 bg-white p-3.5 shadow-xl"
              style={{
                left: `${hovered.cardX ?? 40}%`,
                top: `${hovered.cardY ?? 52}%`,
              }}
              onMouseEnter={() => setHoveredId(hovered.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="mb-2 flex items-start gap-2 border-b border-dotted border-slate-300 pb-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-dotted border-red-400 bg-red-50">
                  <MapPin className="h-3.5 w-3.5 text-red-600" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                    {hovered.title}
                  </p>
                  <p className="mt-0.5 text-[14px] font-bold leading-tight text-slate-900">
                    {hovered.city}
                    <span className="font-semibold text-slate-500"> · {hovered.state}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {hovered.addressLines.map((line) => (
                  <p key={line} className="text-[12px] leading-snug text-slate-700">
                    {line}
                  </p>
                ))}
              </div>

              {!hovered.comingSoon && (
                <a
                  href={hovered.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex text-[12px] font-semibold text-blue-600 hover:underline"
                >
                  Open in Google Maps →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import type { Incident } from '@/lib/data';

export default function ControlTowerMap({ incidents }: { incidents: Incident[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let map: any;

    (async () => {
      try {
        const maplibregl = (await import('maplibre-gl')).default;
        await import('maplibre-gl/dist/maplibre-gl.css');
        if (cancelled || !containerRef.current) return;

        const style: any = {
          version: 8,
          sources: {
            carto: {
              type: 'raster',
              tiles: [
                'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors © CARTO'
            }
          },
          layers: [{ id: 'carto-base', type: 'raster', source: 'carto' }]
        };

        map = new maplibregl.Map({
          container: containerRef.current,
          style,
          center: [-51.52, -29.18],
          zoom: 8.55,
          pitch: 28,
          bearing: -8,
          attributionControl: false,
          maxPitch: 60
        });

        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
        map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

        map.on('load', () => {
          if (cancelled) return;
          setReady(true);
          setError(false);
        });

        map.on('error', () => {
          if (!cancelled) setError(true);
        });
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      if (map) map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    let disposed = false;

    (async () => {
      const maplibregl = (await import('maplibre-gl')).default;
      if (disposed) return;

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      incidents
        .filter((item) => Number.isFinite(item.lon) && Number.isFinite(item.lat))
        .forEach((item) => {
          const element = document.createElement('button');
          element.type = 'button';
          element.style.width = '18px';
          element.style.height = '18px';
          element.style.borderRadius = '999px';
          element.style.border = '3px solid rgba(255,255,255,.95)';
          element.style.cursor = 'pointer';
          element.style.boxShadow = '0 5px 18px rgba(0,0,0,.42)';
          element.style.background = item.severity === 'alta' ? '#ff4d55' : item.severity === 'media' ? '#f2ad38' : '#22c77a';
          element.setAttribute('aria-label', `${item.type} em ${item.road}`);

          const popup = new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(
            `<div style="font-family:Inter,Arial,sans-serif;min-width:170px;padding:2px;color:#13202a"><b style="display:block;font-size:12px">${item.type}</b><span style="display:block;font-size:10px;margin-top:4px">${item.road} · ${item.place}</span><small style="display:block;font-size:9px;color:#687982;margin-top:5px">${item.source} · ${item.updated}</small></div>`
          );

          const marker = new maplibregl.Marker({ element })
            .setLngLat([item.lon, item.lat])
            .setPopup(popup)
            .addTo(map);

          markersRef.current.push(marker);
        });
    })();

    return () => {
      disposed = true;
    };
  }, [incidents, ready]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      {!ready && !error && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0a1a23', color: '#7f98a6', fontSize: 11, zIndex: 3 }}>
          Carregando mapa operacional…
        </div>
      )}
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0a1a23', color: '#a9bdc8', fontSize: 11, zIndex: 3 }}>
          Não foi possível carregar a camada cartográfica.
        </div>
      )}
    </div>
  );
}

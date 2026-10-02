'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import {
  Bell,
  ChevronRight,
  CloudRain,
  Layers3,
  LocateFixed,
  MapPinned,
  Mountain,
  Navigation2,
  Search,
  ShieldAlert,
  TriangleAlert,
  Waves,
  Wind,
  Zap,
} from 'lucide-react';
import styles from './RotaVisionPublic.module.css';

const routeGeoJSON: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Corredor Serra' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-51.5184, -29.1713],
          [-51.474, -29.152],
          [-51.415, -29.12],
          [-51.356, -29.087],
          [-51.292, -29.04],
          [-51.236, -29.0],
          [-51.179, -28.978],
        ],
      },
    },
  ],
};

const hazardGeoJSON: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { severity: 'attention', label: 'Chuva intensa' },
      geometry: { type: 'Point', coordinates: [-51.385, -29.11] },
    },
    {
      type: 'Feature',
      properties: { severity: 'critical', label: 'Risco hidrológico' },
      geometry: { type: 'Point', coordinates: [-51.278, -29.031] },
    },
    {
      type: 'Feature',
      properties: { severity: 'safe', label: 'Fluxo normal' },
      geometry: { type: 'Point', coordinates: [-51.475, -29.15] },
    },
  ],
};

const TIMELINE = ['-24h', '-6h', 'Agora', '+3h', '+6h', '+12h', '+24h'];

export default function RotaVisionPublic() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [activeTime, setActiveTime] = useState('Agora');
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-51.36, -29.08],
      zoom: 9.1,
      pitch: 42,
      bearing: -9,
      attributionControl: true,
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addSource('rotasegura-route', {
        type: 'geojson',
        data: routeGeoJSON,
        lineMetrics: true,
      });

      map.addLayer({
        id: 'rotasegura-route-casing',
        type: 'line',
        source: 'rotasegura-route',
        paint: {
          'line-color': '#ffffff',
          'line-width': 8,
          'line-opacity': 0.92,
        },
      });

      map.addLayer({
        id: 'rotasegura-route-risk',
        type: 'line',
        source: 'rotasegura-route',
        paint: {
          'line-width': 5,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            '#16a36b',
            0.55,
            '#16a36b',
            0.72,
            '#e7a12d',
            0.84,
            '#d84a4f',
            1,
            '#d84a4f',
          ],
        },
      });

      map.addSource('rotasegura-hazards', {
        type: 'geojson',
        data: hazardGeoJSON,
      });

      map.addLayer({
        id: 'rotasegura-hazards',
        type: 'circle',
        source: 'rotasegura-hazards',
        paint: {
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
          'circle-color': [
            'match',
            ['get', 'severity'],
            'critical',
            '#d84a4f',
            'attention',
            '#e7a12d',
            '#16a36b',
          ],
        },
      });

      setMapReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const recenter = () => {
    mapRef.current?.flyTo({
      center: [-51.36, -29.08],
      zoom: 9.1,
      pitch: 42,
      bearing: -9,
      duration: 900,
    });
  };

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Rota Segura">
          <Image
            src="/rota-segura-logo.png"
            alt="Rota Segura"
            width={154}
            height={54}
            className={styles.logo}
            priority
          />
          <span className={styles.productName}>RotaVision</span>
        </Link>

        <div className={styles.searchBox}>
          <Search size={17} strokeWidth={1.8} />
          <input placeholder="Cidade, rodovia, município ou ponto de interesse" />
          <kbd>Ctrl K</kbd>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.liveBadge}>
            <span /> AO VIVO
          </div>
          <button className={styles.iconButton} aria-label="Alertas">
            <Bell size={18} strokeWidth={1.8} />
          </button>
          <Link href="/login" className={styles.loginButton}>
            Acessar plataforma <ChevronRight size={15} />
          </Link>
        </div>
      </header>

      <section className={styles.mapStage}>
        <div ref={mapContainer} className={styles.mapCanvas} />

        {!mapReady && (
          <div className={styles.mapLoading}>
            <span className={styles.loaderDot} /> Carregando malha viária
          </div>
        )}

        <aside className={styles.toolRail} aria-label="Ferramentas do mapa">
          <button className={styles.toolActive} title="Camadas">
            <Layers3 size={19} />
          </button>
          <button title="Clima">
            <CloudRain size={19} />
          </button>
          <button title="Hidrologia">
            <Waves size={19} />
          </button>
          <button title="Encostas">
            <Mountain size={19} />
          </button>
          <button title="Ocorrências">
            <ShieldAlert size={19} />
          </button>
          <div className={styles.toolSpacer} />
          <button title="Centralizar" onClick={recenter}>
            <LocateFixed size={19} />
          </button>
        </aside>

        <div className={styles.contextBar}>
          <div>
            <MapPinned size={15} />
            <span>Serra Gaúcha</span>
          </div>
          <span className={styles.divider} />
          <div className={styles.sourceStatus}>
            <i /> fontes operacionais conectadas
          </div>
        </div>

        <section className={styles.conditionsPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.kicker}>CONDIÇÕES REGIONAIS</span>
              <strong>Serra Gaúcha</strong>
            </div>
            <CloudRain size={22} />
          </div>

          <div className={styles.weatherReading}>
            <strong>18°</strong>
            <div>
              <span>Chuva moderada</span>
              <small>atualizado há 4 min</small>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div>
              <Wind size={15} />
              <span>Vento</span>
              <b>22 km/h</b>
            </div>
            <div>
              <CloudRain size={15} />
              <span>Chuva</span>
              <b>14 mm/h</b>
            </div>
            <div>
              <Waves size={15} />
              <span>Hidrologia</span>
              <b className={styles.attention}>Atenção</b>
            </div>
            <div>
              <Zap size={15} />
              <span>Tempestades</span>
              <b>2 células</b>
            </div>
          </div>
        </section>

        <section className={styles.operationCard}>
          <div className={styles.operationTop}>
            <div>
              <span className={styles.kicker}>CORREDOR MONITORADO</span>
              <strong>Bento Gonçalves → Caxias do Sul</strong>
            </div>
            <span className={styles.riskPill}>atenção</span>
          </div>

          <div className={styles.routeStats}>
            <div>
              <span>Distância</span>
              <strong>43 km</strong>
            </div>
            <div>
              <span>Trechos críticos</span>
              <strong>1</strong>
            </div>
            <div>
              <span>Eventos ativos</span>
              <strong>2</strong>
            </div>
          </div>

          <div className={styles.incidentRow}>
            <TriangleAlert size={16} />
            <div>
              <b>Risco hidrológico em observação</b>
              <span>Trecho próximo ao corredor principal</span>
            </div>
          </div>
        </section>

        <div className={styles.mapLegend}>
          <span><i className={styles.safe} /> normal</span>
          <span><i className={styles.watch} /> atenção</span>
          <span><i className={styles.critical} /> crítico</span>
        </div>

        <footer className={styles.timeline}>
          <div className={styles.timelineTitle}>
            <Navigation2 size={15} />
            <div>
              <span>RotaVision 4D</span>
              <small>linha do tempo operacional</small>
            </div>
          </div>
          <div className={styles.timelineTrack}>
            {TIMELINE.map((item) => (
              <button
                key={item}
                className={activeTime === item ? styles.timeActive : ''}
                onClick={() => setActiveTime(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
}

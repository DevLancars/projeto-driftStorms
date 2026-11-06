import React, { useState } from 'react';
import { VehicleComparisonCard } from '../components/VehicleComparisonCard';
import { SpecRow } from '../components/SpecRow';
import { comparisonData } from '../data/mockComparison';

export const ComparisonScreen = () => {
  const [vehicles, setVehicles] = useState(comparisonData.vehicles);

  const handleRemove = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div style={styles.screen}>
      {/* Barra de Pesquisa e Filtro */}
      <div style={styles.searchBarContainer}>
        <div style={styles.searchInputWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search" style={styles.searchInput} />
        </div>
        <button style={styles.filterBtn}>🎛️</button>
      </div>

      {/* Grid Superior dos Veículos */}
      <div style={styles.vehiclesHeaderGrid}>
        {vehicles.map((v) => (
          <VehicleComparisonCard key={v.id} vehicle={v} onRemove={handleRemove} />
        ))}
      </div>

      {/* Tabela de Comparação */}
      <div style={styles.tableContainer}>
        <SpecRow 
          label="Tabela FIPE" 
          values={vehicles.map(v => v.fipePrice)} 
        />
        <SpecRow 
          label="Menor Preço Regional (Raio 50km)" 
          values={vehicles.map(v => v.lowestPrice)} 
          subtitles={vehicles.map(v => v.distance)}
          badges={vehicles.map(v => v.badge)}
          isHighlight={true}
        />
        
        <div style={styles.specsCategoryTitle}>Specs</div>

        <SpecRow 
          label="Potência" 
          values={vehicles.map(v => v.specs.power)} 
        />
        <SpecRow 
          label="Fuel" 
          values={vehicles.map(v => v.specs.fuel)} 
        />
        <SpecRow 
          label="0-100km/h" 
          values={vehicles.map(v => v.specs.acceleration)} 
        />
      </div>

      {/* Botão Principal de Ação (CTA) */}
      <button style={styles.ctaButton}>
        [ Ver {vehicles.length * 5} Ofertas Próximas Dessest Modelos ]
      </button>
    </div>
  );
};

const styles = {
  screen: {
    padding: '16px 16px 90px 16px',
    backgroundColor: 'var(--preto-orbita)',
    minHeight: '100vh',
  },
  searchBarContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
  },
  searchInputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    padding: '0 12px',
    border: '1px solid var(--cinza-urbano)',
  },
  searchIcon: {
    fontSize: '14px',
    color: 'var(--cinza-urbano)',
    marginRight: '8px',
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--branco-puro)',
    width: '100%',
    padding: '10px 0',
    outline: 'none',
  },
  filterBtn: {
    backgroundColor: '#1E1E1E',
    border: '1px solid var(--cinza-urbano)',
    borderRadius: '8px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  vehiclesHeaderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    marginBottom: '20px',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  specsCategoryTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--cinza-urbano)',
    margin: '16px 0 4px 0',
    textTransform: 'uppercase',
  },
  ctaButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontWeight: '700',
    fontSize: '12px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }
};
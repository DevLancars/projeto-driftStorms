import React, { useState } from 'react';
import { Header } from './components/Header';
import { VehicleCard } from './components/VehicleCard';
import { BottomNavigation } from './components/BottomNavigation';
import { mockVehicles } from './data/mockVehicles';

export default function App() {
  const [vehicles] = useState(mockVehicles);

  return (
    <div style={styles.mobileContainer}>
      <Header userName="Gabriel" />

      <main style={styles.content}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Seus Veículos ({vehicles.length})</span>
          <button style={styles.addTextButton}>+ Adicionar</button>
        </div>

        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </main>

      <BottomNavigation />
    </div>
  );
}

const styles = {
  mobileContainer: {
    maxWidth: '430px',
    minHeight: '100vh',
    margin: '0 auto',
    backgroundColor: 'var(--preto-orbita)',
    position: 'relative',
    paddingBottom: '80px',
  },
  content: {
    padding: '0 20px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0 16px 0',
  },
  sectionTitle: {
    fontSize: '14px',
    color: 'var(--cinza-urbano)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  addTextButton: {
    backgroundColor: 'transparent',
    color: 'var(--dourado-champagne)',
    fontSize: '13px',
    fontWeight: '600',
  }
};
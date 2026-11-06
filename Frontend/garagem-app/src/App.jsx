import React, { useState } from 'react';
import { Header } from './components/Header';
import { VehicleCard } from './components/VehicleCard';
import { BottomNavigation } from './components/BottomNavigation';
import { ComparisonScreen } from './screens/ComparisonScreen';
import { AddVehicleModal } from './components/AddVehicleModal';
import { mockVehicles } from './data/mockVehicles';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('garagem');
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função disparada ao escolher um veículo no modal (Tela 3)
  const handleAddVehicleFromModal = (newVehicle) => {
    const formattedVehicle = {
      id: Date.now().toString(),
      make: newVehicle.name.split(' ')[0],
      model: newVehicle.name.split(' ').slice(1).join(' '),
      year: '2024',
      plate: 'NEW-2024',
      fipePrice: newVehicle.fipe,
      lowestPriceBadge: false,
      image: newVehicle.image
    };
    setVehicles([...vehicles, formattedVehicle]);
  };

  return (
    <div style={styles.mobileContainer}>
      {/* TELA 1: GARAGEM DO USUÁRIO */}
      {currentScreen === 'garagem' ? (
        <main style={styles.content}>
          <Header userName="Gabriel" />

          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Seus Veículos ({vehicles.length})</span>
            <button 
              style={styles.addTextButton}
              onClick={() => setIsModalOpen(true)}
            >
              + Adicionar
            </button>
          </div>

          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}

          <button 
            style={styles.compareShortcutBtn}
            onClick={() => setCurrentScreen('comparar')}
          >
            + Comparar Meu Carro Agora
          </button>
        </main>
      ) : (
        /* TELA 2: COMPARADOR DE VEÍCULOS */
        <ComparisonScreen />
      )}

      {/* TELA 3: MODAL ADICIONAR VEÍCULO */}
      <AddVehicleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectVehicle={handleAddVehicleFromModal}
      />

      {/* NAVEGAÇÃO INFERIOR */}
      <BottomNavigation 
        activeTab={currentScreen} 
        onTabChange={setCurrentScreen}
        onAddClick={() => setIsModalOpen(true)}
      />
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
    border: 'none',
    cursor: 'pointer',
  },
  compareShortcutBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'transparent',
    border: '1px solid var(--dourado-champagne)',
    color: 'var(--dourado-champagne)',
    fontWeight: '700',
    fontSize: '12px',
    borderRadius: '8px',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginTop: '10px',
    cursor: 'pointer',
  }
};
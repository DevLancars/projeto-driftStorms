import { useEffect, useState } from 'react';
import { BottomNavigation } from './components/BottomNavigation';
import { Header } from './components/Header';
import { Icon } from './components/Icon';
import { VehicleCard } from './components/VehicleCard';
import { mockVehicles } from './data/mockVehicles';
import { LoginPage } from './pages/LoginPage';
import { CarComparisonPage } from './pages/CarComparisonPage';
import { VehicleProfilePage } from './pages/VehicleProfilePage';
import { VehicleSearchPage } from './pages/VehicleSearchPage';

const validPages = ['login', 'garage', 'search', 'compare'];

function getPageFromHash() {
  const [page, vehicleId] = window.location.hash.slice(1).split('/');
  if (page === 'profile' && mockVehicles.some((vehicle) => vehicle.id === vehicleId)) return 'profile';
  return validPages.includes(page) ? page : 'garage';
}

function getProfileIdFromHash() {
  const [page, vehicleId] = window.location.hash.slice(1).split('/');
  return page === 'profile' && mockVehicles.some((vehicle) => vehicle.id === vehicleId)
    ? vehicleId
    : null;
}

function setLocationHash(hash) {
  window.location.hash = hash;
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('garagem-demo-authenticated') === 'true',
  );
  const [profileVehicleId, setProfileVehicleId] = useState(getProfileIdFromHash);
  const [previousPage, setPreviousPage] = useState('search');
  const [selectedVehicleIds, setSelectedVehicleIds] = useState(
    () => mockVehicles.filter((vehicle) => vehicle.isOwned).map((vehicle) => vehicle.id),
  );
  const [ownedVehicleIds, setOwnedVehicleIds] = useState(
    () => mockVehicles.filter((vehicle) => vehicle.isOwned).map((vehicle) => vehicle.id),
  );
  const ownedVehicles = mockVehicles
    .filter((vehicle) => ownedVehicleIds.includes(vehicle.id))
    .map((vehicle) => ({ ...vehicle, isOwned: true }));
  const selectedVehicles = ownedVehicles.filter((vehicle) => selectedVehicleIds.includes(vehicle.id));
  const excludedGarageVehicles = ownedVehicles.filter((vehicle) => !selectedVehicleIds.includes(vehicle.id));

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
      setProfileVehicleId(getProfileIdFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page) => {
    if (!validPages.includes(page)) return;
    if (window.location.hash === `#${page}`) {
      setActivePage(page);
      return;
    }
    window.location.hash = page;
  };

  const openProfile = (vehicleId) => {
    setPreviousPage(activePage === 'profile' ? previousPage : activePage);
    setLocationHash(`profile/${vehicleId}`);
  };

  const profileVehicle = mockVehicles.find((vehicle) => vehicle.id === profileVehicleId);

  const toggleCompare = (vehicleId) => {
    setSelectedVehicleIds((currentIds) => {
      if (currentIds.includes(vehicleId)) {
        return currentIds.filter((id) => id !== vehicleId);
      }
      return [...currentIds, vehicleId];
    });
  };

  const removeFromCompare = (vehicleId) => {
    setSelectedVehicleIds((currentIds) => currentIds.filter((id) => id !== vehicleId));
  };

  const removeFromGarage = (vehicleId) => {
    setOwnedVehicleIds((currentIds) => currentIds.filter((id) => id !== vehicleId));
    removeFromCompare(vehicleId);
  };

  const addToGarage = (vehicleId) => {
    setOwnedVehicleIds((currentIds) => (
      currentIds.includes(vehicleId) ? currentIds : [...currentIds, vehicleId]
    ));
    setSelectedVehicleIds((currentIds) => (
      currentIds.includes(vehicleId) ? currentIds : [...currentIds, vehicleId]
    ));
  };

  const signIn = () => {
    sessionStorage.setItem('garagem-demo-authenticated', 'true');
    setIsAuthenticated(true);
    setLocationHash('garage');
  };

  const signOut = () => {
    sessionStorage.removeItem('garagem-demo-authenticated');
    setIsAuthenticated(false);
    setLocationHash('login');
  };

  return (
    <div style={styles.mobileContainer}>
      {!isAuthenticated ? (
        <LoginPage onLogin={signIn} />
      ) : (
        <>
      {activePage === 'garage' && (
        <>
          <Header userName="Gabriel" onSignOut={signOut} />
          <main style={styles.content}>
            <section style={styles.introCard}>
              <span style={styles.introIcon}><Icon name="sparkles" size={20} /></span>
              <div>
                <strong style={styles.introTitle}>Sua garagem digital</strong>
                <p style={styles.introText}>Acompanhe seus veículos e compare opções para escolher com confiança.</p>
              </div>
            </section>
            <div style={styles.sectionHeader}>
              <div>
                <span style={styles.sectionTitle}>Meus veículos</span>
                <p style={styles.sectionCaption}>{ownedVehicles.length} veículos na sua garagem</p>
              </div>
              <button className="text-action" type="button" onClick={() => navigate('search')} style={styles.addTextButton}>
                <span aria-hidden="true">+</span> Buscar veículos
              </button>
            </div>

            {ownedVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                actionLabel={selectedVehicleIds.includes(vehicle.id) ? 'COMPARAR ESTE VEÍCULO' : 'ADICIONAR À COMPARAÇÃO'}
                onAction={() => {
                  if (!selectedVehicleIds.includes(vehicle.id)) toggleCompare(vehicle.id);
                  navigate('compare');
                }}
                onProfile={() => openProfile(vehicle.id)}
                onRemove={() => removeFromGarage(vehicle.id)}
              />
            ))}
          </main>
        </>
      )}

      {activePage === 'search' && (
        <VehicleSearchPage
          vehicles={mockVehicles}
          ownedVehicleIds={ownedVehicleIds}
          selectedVehicleIds={selectedVehicleIds}
          onAddToGarage={addToGarage}
          onRemoveFromGarage={removeFromGarage}
          onOpenCompare={() => navigate('compare')}
          onOpenProfile={openProfile}
        />
      )}

      {activePage === 'compare' && (
        <CarComparisonPage
          vehicles={selectedVehicles}
          excludedVehicles={excludedGarageVehicles}
          catalog={mockVehicles}
          onRemoveVehicle={removeFromCompare}
          onAddVehicle={toggleCompare}
          onBrowseVehicles={() => navigate('search')}
          onOpenProfile={openProfile}
        />
      )}

      {activePage === 'profile' && profileVehicle && (
        <VehicleProfilePage
          vehicle={profileVehicle}
          catalog={mockVehicles}
          onBack={() => navigate(previousPage)}
          onCompare={() => {
            addToGarage(profileVehicle.id);
            navigate('compare');
          }}
        />
      )}

      {activePage !== 'profile' && <BottomNavigation activePage={activePage} onNavigate={navigate} />}
        </>
      )}
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
    paddingBottom: '90px',
  },
  content: {
    padding: '0 20px 20px',
  },
  introCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    padding: '16px',
    background: 'linear-gradient(120deg, #1d1b16 0%, #121212 70%)',
    border: '1px solid #342f24',
    borderRadius: '14px',
    margin: '18px 0 24px',
  },
  introIcon: {
    width: '38px',
    height: '38px',
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    borderRadius: '12px',
    backgroundColor: 'rgba(218, 199, 156, .14)',
    color: 'var(--dourado-champagne)',
    fontSize: '12px',
    fontWeight: '700',
  },
  introTitle: {
    color: 'var(--branco-puro)',
    fontSize: '13px',
  },
  introText: {
    color: 'var(--cinza-urbano)',
    fontSize: '11px',
    lineHeight: 1.5,
    marginTop: '4px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 14px',
  },
  sectionTitle: {
    fontSize: '16px',
    color: 'var(--branco-puro)',
    fontWeight: '700',
  },
  sectionCaption: {
    color: 'var(--cinza-urbano)',
    fontSize: '11px',
    marginTop: '4px',
  },
  addTextButton: {
    backgroundColor: 'transparent',
    color: 'var(--dourado-champagne)',
    fontSize: '13px',
    fontWeight: '600',
  },
};

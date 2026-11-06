import { useMemo, useState } from 'react';
import { VehicleCard } from '../components/VehicleCard';
import { Icon } from '../components/Icon';

const normalize = (value) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function VehicleSearchPage({
  vehicles,
  ownedVehicleIds,
  selectedVehicleIds,
  onAddToGarage,
  onRemoveFromGarage,
  onOpenCompare,
  onOpenProfile,
}) {
  const [query, setQuery] = useState('');
  const [make, setMake] = useState('');
  const [fuel, setFuel] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const makes = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.make))].sort((a, b) => a.localeCompare(b)),
    [vehicles],
  );
  const fuelTypes = useMemo(
    () => [...new Set(vehicles.map((vehicle) => (
      normalize(vehicle.fuel).includes('hibrido') ? 'Híbrido' : vehicle.fuel
    )))].sort((a, b) => a.localeCompare(b)),
    [vehicles],
  );

  const filteredVehicles = useMemo(() => {
    const searchTerm = normalize(query.trim());
    const result = vehicles.filter((vehicle) => {
      const matchesQuery = !searchTerm
        || normalize(`${vehicle.make} ${vehicle.model}`).includes(searchTerm);
      const matchesFuel = !fuel
        || (fuel === 'Híbrido'
          ? normalize(vehicle.fuel).includes('hibrido')
          : vehicle.fuel === fuel);
      return matchesQuery
        && (!make || vehicle.make === make)
        && matchesFuel;
    });

    if (sortOrder) {
      result.sort((a, b) => sortOrder === 'ascending' ? a.price - b.price : b.price - a.price);
    }

    return result;
  }, [vehicles, query, make, fuel, sortOrder]);

  const ownedCount = ownedVehicleIds.length;
  const ownedLabel = ownedCount === 1 ? 'veículo' : 'veículos';
  const selectedCount = selectedVehicleIds.length;
  const selectedLabel = selectedCount === 1 ? 'veículo' : 'veículos';

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.eyebrow}>EXPLORE O CATÁLOGO</span>
          <h1 style={styles.title}>Buscar veículos</h1>
          <p style={styles.subtitle}>Pesquise por marca ou modelo e refine por preço e motorização.</p>
        </div>
      </header>

      <div style={styles.filters}>
        <div style={styles.filterHeading}>
          <span style={styles.filterIcon}><Icon name="filter" size={17} /></span>
          <div>
            <strong style={styles.filterTitle}>Encontre o veículo ideal</strong>
            <span style={styles.filterDescription}>Combine busca, marca, combustível e preço.</span>
          </div>
          {(query || make || fuel || sortOrder) && (
            <button
              className="text-action"
              type="button"
              onClick={() => { setQuery(''); setMake(''); setFuel(''); setSortOrder(''); }}
              style={styles.clearButton}
            >
              Limpar
            </button>
          )}
        </div>
        <label className="search-control" style={styles.searchLabel}>
          <Icon name="search" size={18} />
          <input
            aria-label="Buscar por marca ou modelo"
            placeholder="Marca ou modelo"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            style={styles.searchInput}
          />
        </label>

        <div style={styles.selectRow}>
          <label style={styles.selectWrap}>
            <span style={styles.filterLabel}>Marca</span>
            <select className="filter-select" aria-label="Filtrar por marca" value={make} onChange={(event) => setMake(event.target.value)} style={styles.select}>
              <option value="">Todas</option>
              {makes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label style={styles.selectWrap}>
            <span style={styles.filterLabel}>Combustível</span>
            <select className="filter-select" aria-label="Filtrar por combustível" value={fuel} onChange={(event) => setFuel(event.target.value)} style={styles.select}>
              <option value="">Todos</option>
              {fuelTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <label style={styles.selectWrap}>
          <span style={styles.filterLabel}>Ordenar por preço</span>
          <select className="filter-select" aria-label="Ordenar por preço" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} style={styles.select}>
            <option value="">Relevância</option>
            <option value="ascending">Menor preço</option>
            <option value="descending">Maior preço</option>
          </select>
        </label>
      </div>

      <div style={styles.resultsHeader}>
        <div>
          <strong style={styles.resultsTitle}>Veículos disponíveis</strong>
          <span style={styles.resultsCount}>{filteredVehicles.length} resultados</span>
        </div>
        <span aria-live="polite" style={styles.selectedCount}>
          <Icon name="car" size={14} /> {ownedCount} {ownedLabel} na garagem
        </span>
      </div>

      {filteredVehicles.length > 0 ? (
        filteredVehicles.map((vehicle) => {
          const isOwned = ownedVehicleIds.includes(vehicle.id);

          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              actionLabel={isOwned ? 'REMOVER DA GARAGEM' : 'ADICIONAR À GARAGEM'}
              onAction={() => (isOwned
                ? onRemoveFromGarage(vehicle.id)
                : onAddToGarage(vehicle.id))}
              onProfile={() => onOpenProfile(vehicle.id)}
            />
          );
        })
      ) : (
        <div style={styles.emptyState}>
          <Icon name="search" size={28} />
          <strong>Nenhum veículo encontrado</strong>
          <span>Tente mudar a marca, o combustível ou a busca.</span>
          <button
            className="text-action"
            type="button"
            onClick={() => { setQuery(''); setMake(''); setFuel(''); setSortOrder(''); }}
            style={styles.clearEmptyButton}
          >
            Limpar filtros
          </button>
        </div>
      )}

      <button
        type="button"
        className="compare-action"
        onClick={onOpenCompare}
        disabled={ownedCount === 0}
        style={{ ...styles.compareButton, ...(ownedCount === 0 ? styles.disabledButton : {}) }}
      >
        <Icon name="compare" size={18} />
        Ver comparação de {selectedCount} {selectedLabel}
        {selectedCount > 0 && <Icon name="arrowRight" size={17} />}
      </button>
    </main>
  );
}

const styles = {
  page: { maxWidth: '430px', minHeight: '100vh', margin: '0 auto', padding: '22px 20px 120px', backgroundColor: 'var(--preto-orbita)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  eyebrow: { color: 'var(--cinza-urbano)', fontSize: '10px', fontWeight: '700', letterSpacing: '1px' },
  title: { color: 'var(--branco-puro)', fontSize: '23px', marginTop: '5px' },
  subtitle: { maxWidth: '320px', color: 'var(--cinza-urbano)', fontSize: '12px', lineHeight: 1.6, marginTop: '6px' },
  filters: { display: 'grid', gap: '12px', padding: '14px', backgroundColor: 'var(--cinza-card)', border: '1px solid #222', borderRadius: '14px' },
  filterHeading: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' },
  filterIcon: { display: 'grid', placeItems: 'center', width: '32px', height: '32px', flexShrink: 0, borderRadius: '9px', backgroundColor: 'rgba(218, 199, 156, .12)', color: 'var(--dourado-champagne)' },
  filterTitle: { display: 'block', color: 'var(--branco-puro)', fontSize: '12px' },
  filterDescription: { display: 'block', color: 'var(--cinza-urbano)', fontSize: '10px', marginTop: '3px' },
  clearButton: { marginLeft: 'auto', color: 'var(--dourado-champagne)', background: 'transparent', fontSize: '10px', fontWeight: '700' },
  searchLabel: { display: 'flex', alignItems: 'center', gap: '9px', padding: '11px 12px', color: 'var(--cinza-urbano)', backgroundColor: '#090909', border: '1px solid #333', borderRadius: '9px' },
  searchInput: { width: '100%', color: 'var(--branco-puro)', background: 'transparent', border: 0, outline: 0, font: 'inherit', fontSize: '13px' },
  selectRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  selectWrap: { display: 'grid', gap: '6px', minWidth: 0 },
  filterLabel: { color: 'var(--cinza-urbano)', fontSize: '11px', fontWeight: '600' },
  select: { width: '100%', padding: '10px 8px', color: 'var(--branco-puro)', backgroundColor: '#090909', border: '1px solid #333', borderRadius: '8px', font: 'inherit', fontSize: '12px' },
  resultsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', margin: '20px 0 12px' },
  resultsTitle: { display: 'block', color: 'var(--branco-puro)', fontSize: '13px' },
  resultsCount: { display: 'block', color: 'var(--cinza-urbano)', fontSize: '10px', marginTop: '3px' },
  selectedCount: { display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--dourado-champagne)', fontSize: '10px', whiteSpace: 'nowrap' },
  emptyState: { display: 'grid', gap: '9px', justifyItems: 'center', padding: '38px 16px', color: 'var(--cinza-urbano)', textAlign: 'center', fontSize: '13px' },
  clearEmptyButton: { marginTop: '5px', padding: '9px 13px', color: 'var(--dourado-champagne)', background: '#1b1a17', borderRadius: '8px', fontWeight: '600' },
  compareButton: { position: 'fixed', bottom: '88px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: '390px', minHeight: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', padding: '12px 14px', color: 'var(--preto-orbita)', backgroundColor: 'var(--dourado-champagne)', borderRadius: '12px', fontSize: '13px', fontWeight: '700', zIndex: 9 },
  disabledButton: { color: '#888', backgroundColor: '#292929', cursor: 'not-allowed' },
};

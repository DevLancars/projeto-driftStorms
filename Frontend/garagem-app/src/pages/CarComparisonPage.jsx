import { Icon } from '../components/Icon';
import { VehicleComparisonCard } from '../components/VehicleComparisonCard';
import { getVehicleIndicators } from '../data/vehicleIndicators';

export function CarComparisonPage({
  vehicles,
  excludedVehicles,
  catalog,
  onRemoveVehicle,
  onAddVehicle,
  onBrowseVehicles,
  onOpenProfile,
}) {
  const rows = [
    { label: 'Preço', value: (vehicle) => vehicle.priceLabel },
    { label: 'Combustível', value: (vehicle) => vehicle.fuel },
    { label: 'Potência', value: (vehicle) => vehicle.power },
    { label: '0–100 km/h', value: (vehicle) => vehicle.acceleration },
    { label: 'Ano', value: (vehicle) => vehicle.year },
  ];
  const columns = `minmax(102px, 1fr) repeat(${Math.max(vehicles.length, 1)}, minmax(88px, 1fr))`;

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.eyebrow}>DECIDA COM MAIS INFORMAÇÃO</span>
          <h1 style={styles.title}>Comparar veículos</h1>
          <p style={styles.subtitle}>Compare os principais dados lado a lado e escolha o que combina com você.</p>
        </div>
        <button className="text-action" type="button" onClick={onBrowseVehicles} style={styles.backButton}>
          <span aria-hidden="true">+</span> Adicionar
        </button>
      </header>

      {vehicles.length === 0 ? (
        <section style={styles.emptyState}>
          <strong>Nenhum veículo selecionado para comparar</strong>
          <span>Adicione veículos à garagem pela busca ou selecione um dos veículos excluídos abaixo.</span>
          <button type="button" onClick={onBrowseVehicles} style={styles.primaryButton}>Buscar veículos</button>
        </section>
      ) : (
        <>
          <div style={styles.cards}>
            {vehicles.map((vehicle) => (
              <VehicleComparisonCard
                key={vehicle.id}
                vehicle={vehicle}
                isUserVehicle={vehicle.isOwned}
                indicators={getVehicleIndicators(vehicle, catalog)}
                onRemove={() => onRemoveVehicle(vehicle.id)}
                onOpenProfile={() => onOpenProfile(vehicle.id)}
              />
            ))}
          </div>

          <section style={styles.comparisonIntro}>
            <span style={styles.comparisonIcon}><Icon name="compare" size={18} /></span>
            <div>
              <strong style={styles.comparisonTitle}>Comparativo técnico</strong>
              <p style={styles.comparisonDescription}>
                {vehicles.length} veículos selecionados · use o ícone de remoção no cartão para retirar um modelo.
              </p>
            </div>
          </section>

          <div style={styles.tableScroller}>
            <section style={{ ...styles.table, minWidth: `${102 + vehicles.length * 88}px` }}>
              {rows.map((row) => (
                <div key={row.label} style={{ ...styles.row, gridTemplateColumns: columns }}>
                  <span style={styles.rowLabel}>{row.label}</span>
                  {vehicles.map((vehicle) => (
                    <span key={vehicle.id} style={styles.cell}>{row.value(vehicle) || '—'}</span>
                  ))}
                </div>
              ))}
            </section>
          </div>
          {vehicles.length > 1 && <p style={styles.hint}>Deslize horizontalmente para ver todos os veículos.</p>}
        </>
      )}

      {excludedVehicles.length > 0 && (
        <section style={styles.excludedSection}>
          <h2 style={styles.excludedTitle}>Veículos da garagem fora da comparação</h2>
          <p style={styles.excludedDescription}>Adicione novamente qualquer veículo sem removê-lo da garagem.</p>
          <div style={styles.excludedList}>
            {excludedVehicles.map((vehicle) => (
              <div key={vehicle.id} style={styles.excludedVehicle}>
                <div>
                  <strong style={styles.excludedName}>{vehicle.make} {vehicle.model}</strong>
                  <span style={styles.excludedMeta}>{vehicle.year} · {vehicle.fuel}</span>
                </div>
                <button
                  type="button"
                  className="text-action"
                  onClick={() => onAddVehicle(vehicle.id)}
                  aria-label={`Adicionar ${vehicle.make} ${vehicle.model} à comparação`}
                  style={styles.restoreButton}
                >
                  + Adicionar
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default CarComparisonPage;

const styles = {
  page: { maxWidth: '430px', minHeight: '100vh', margin: '0 auto', padding: '22px 20px 110px', color: 'var(--branco-puro)', backgroundColor: 'var(--preto-orbita)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  eyebrow: { color: 'var(--cinza-urbano)', fontSize: '10px', fontWeight: '700', letterSpacing: '1px' },
  title: { marginTop: '5px', fontSize: '22px' },
  subtitle: { maxWidth: '275px', color: 'var(--cinza-urbano)', fontSize: '11px', lineHeight: 1.5, marginTop: '6px' },
  backButton: { padding: '10px 12px', color: 'var(--dourado-champagne)', backgroundColor: '#171717', borderRadius: '8px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' },
  cards: { display: 'grid', gridAutoColumns: '182px', gridAutoFlow: 'column', alignItems: 'stretch', gap: '12px', overflowX: 'auto', padding: '2px 2px 16px' },
  comparisonIntro: { display: 'flex', alignItems: 'center', gap: '10px', margin: '12px 0 9px' },
  comparisonIcon: { display: 'grid', placeItems: 'center', width: '32px', height: '32px', flexShrink: 0, color: 'var(--dourado-champagne)', backgroundColor: 'rgba(218, 199, 156, .12)', borderRadius: '9px' },
  comparisonTitle: { display: 'block', color: 'var(--branco-puro)', fontSize: '12px' },
  comparisonDescription: { color: 'var(--cinza-urbano)', fontSize: '10px', marginTop: '3px' },
  tableScroller: { overflowX: 'auto', marginTop: '8px' },
  table: { width: '100%' },
  row: { display: 'grid', alignItems: 'center', minHeight: '54px', borderBottom: '1px solid #292929' },
  rowLabel: { paddingRight: '8px', color: 'var(--cinza-urbano)', fontSize: '11px', fontWeight: '600' },
  cell: { padding: '5px 3px', color: 'var(--branco-puro)', fontSize: '11px', fontWeight: '600', textAlign: 'center' },
  hint: { marginTop: '12px', color: 'var(--cinza-urbano)', fontSize: '10px', textAlign: 'center' },
  emptyState: { display: 'grid', gap: '10px', justifyItems: 'center', padding: '42px 12px', color: 'var(--cinza-urbano)', textAlign: 'center', fontSize: '13px' },
  primaryButton: { marginTop: '8px', padding: '12px 18px', color: 'var(--preto-orbita)', backgroundColor: 'var(--dourado-champagne)', borderRadius: '8px', fontWeight: '700' },
  excludedSection: { marginTop: '22px', paddingTop: '16px', borderTop: '1px solid #292929' },
  excludedTitle: { color: 'var(--branco-puro)', fontSize: '13px' },
  excludedDescription: { marginTop: '5px', color: 'var(--cinza-urbano)', fontSize: '10px', lineHeight: 1.5 },
  excludedList: { display: 'grid', gap: '8px', marginTop: '12px' },
  excludedVehicle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: '11px', background: '#141414', border: '1px solid #292929', borderRadius: '9px' },
  excludedName: { display: 'block', color: 'var(--branco-puro)', fontSize: '11px' },
  excludedMeta: { display: 'block', marginTop: '4px', color: 'var(--cinza-urbano)', fontSize: '9px' },
  restoreButton: { flexShrink: 0, padding: '8px 9px', color: 'var(--dourado-champagne)', background: '#211f19', borderRadius: '7px', fontSize: '10px', fontWeight: '700' },
};

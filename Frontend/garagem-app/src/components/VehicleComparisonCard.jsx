import { Icon } from './Icon';

export function VehicleComparisonCard({ vehicle, isUserVehicle, indicators, onRemove, onOpenProfile }) {
  const strengthCount = indicators.strengths.length;
  const considerationCount = indicators.considerations.length;
  const summaryLabel = `${strengthCount} ${strengthCount === 1 ? 'ponto forte' : 'pontos fortes'} e ${considerationCount} ${considerationCount === 1 ? 'ponto de atenção' : 'pontos de atenção'}`;

  return (
    <article className="comparison-card" style={{ ...styles.card, ...(isUserVehicle ? styles.userCard : {}) }}>
      <div style={styles.cardHeader}>
        <span style={styles.badge}>{isUserVehicle ? 'Seu veículo' : vehicle.fuel}</span>
        {onRemove && (
          <button className="icon-button" type="button" onClick={onRemove} aria-label={`Remover ${vehicle.make} ${vehicle.model} da comparação`} style={styles.removeButton}>
            <Icon name="close" size={15} />
          </button>
        )}
      </div>
      <img src={vehicle.image} alt="" style={styles.image} />
      <strong style={styles.name}>{vehicle.make} {vehicle.model}</strong>
      <span style={styles.year}>{vehicle.year}</span>
      <div
        aria-label={summaryLabel}
        style={styles.indicatorSummary}
      >
        <span title="Pontos fortes" style={styles.strengthCount}><Icon name="check" size={11} /> {strengthCount}</span>
        <span title="Pontos de atenção" style={styles.attentionCount}><Icon name="close" size={11} /> {considerationCount}</span>
      </div>
      <button className={`text-action profile-button${isUserVehicle ? ' profile-button--owned' : ''}`} type="button" onClick={onOpenProfile} style={styles.profileButton}>
        <Icon name="info" size={13} /> Informações
      </button>
    </article>
  );
}

const styles = {
  card: { boxSizing: 'border-box', flex: '0 0 182px', width: '182px', minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', color: '#fff', backgroundColor: '#171717', border: '1px solid #303030', borderRadius: '14px', textAlign: 'center' },
  userCard: { color: '#000', backgroundColor: 'var(--dourado-champagne)', borderColor: 'var(--dourado-champagne)' },
  cardHeader: { display: 'flex', width: '100%', minHeight: '24px', justifyContent: 'space-between', alignItems: 'center' },
  badge: { fontSize: '9px', fontWeight: '700' },
  removeButton: { display: 'grid', placeItems: 'center', flexShrink: 0, width: '24px', height: '24px', color: 'inherit', background: 'transparent', borderRadius: '50%' },
  image: { display: 'block', width: '100%', height: '76px', flexShrink: 0, margin: '8px 0', objectFit: 'cover', borderRadius: '7px' },
  name: { display: '-webkit-box', width: '100%', minHeight: '30px', overflow: 'hidden', fontSize: '11px', lineHeight: '15px', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  year: { display: 'grid', placeItems: 'center', minHeight: '16px', marginTop: '3px', fontSize: '10px', opacity: 0.7 },
  indicatorSummary: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '20px', gap: '12px', marginTop: '5px' },
  strengthCount: { display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#237443', fontSize: '10px', fontWeight: '700' },
  attentionCount: { display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#8b5a11', fontSize: '10px', fontWeight: '700' },
  profileButton: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '32px', gap: '5px', marginTop: 'auto', padding: '6px 8px', color: 'var(--dourado-champagne)', background: 'rgba(0,0,0,.12)', borderRadius: '7px', fontSize: '10px', fontWeight: '700' },
};

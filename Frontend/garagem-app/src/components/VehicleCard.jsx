import { Icon } from './Icon';

export const VehicleCard = ({
  vehicle,
  actionLabel = 'VER DETALHES DO VEÍCULO',
  onAction,
  onProfile,
  onRemove,
  actionDisabled = false,
}) => {
  return (
    <article className="vehicle-card" style={styles.card}>
      <div style={styles.imageContainer}>
        {vehicle.lowestPriceBadge && (
          <span style={styles.badge}>Menor Preço Garantido</span>
        )}
        <img src={vehicle.image} alt={vehicle.model} style={styles.image} />
      </div>

      <div style={styles.infoContainer}>
        <div style={styles.headerRow}>
          <div>
            <span style={styles.make}>{vehicle.make}</span>
            <h2 style={styles.model}>{vehicle.model}</h2>
          </div>
          {vehicle.plate && <span style={styles.plate}>{vehicle.plate}</span>}
        </div>

        <div style={styles.divider} />

        <div style={styles.fipeRow}>
          <span style={styles.fipeLabel}>{vehicle.fuel || 'Tabela FIPE'}</span>
          <span style={styles.fipeValue}>{vehicle.priceLabel || vehicle.fipePrice}</span>
        </div>

        <button
          type="button"
          style={{ ...styles.ctaButton, ...(actionDisabled ? styles.disabledButton : {}) }}
          onClick={onAction}
          disabled={actionDisabled}
        >
          {actionLabel}
        </button>
        {onProfile && (
          <button className="text-action" type="button" onClick={onProfile} style={styles.profileButton}>
            <Icon name="info" size={14} /> Ver informações
          </button>
        )}
        {onRemove && (
          <button
            className="text-action"
            type="button"
            onClick={onRemove}
            aria-label={`Remover ${vehicle.make} ${vehicle.model} da garagem`}
            style={styles.removeButton}
          >
            <Icon name="close" size={14} /> Remover da garagem
          </button>
        )}
      </div>
    </article>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--cinza-card)',
    borderRadius: '16px',
    border: '1px solid #222222',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  imageContainer: {
    position: 'relative',
    height: '180px',
    backgroundColor: '#0A0A0A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontSize: '10px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    zIndex: 2,
  },
  infoContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '20px',
  },
  headerRow: {
    display: 'flex',
    minHeight: '48px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
  },
  make: {
    color: 'var(--cinza-urbano)',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  model: {
    display: '-webkit-box',
    overflow: 'hidden',
    color: 'var(--branco-puro)',
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '2px',
    lineHeight: 1.25,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  plate: {
    flexShrink: 0,
    color: 'var(--cinza-urbano)',
    fontSize: '12px',
    border: '1px solid var(--cinza-urbano)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '500',
  },
  divider: {
    height: '1px',
    backgroundColor: '#222222',
    margin: '16px 0',
  },
  fipeRow: {
    display: 'flex',
    minHeight: '26px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '8px',
  },
  fipeLabel: {
    color: 'var(--cinza-urbano)',
    fontSize: '13px',
  },
  fipeValue: {
    color: 'var(--dourado-champagne)',
    fontSize: '16px',
    fontWeight: '700',
  },
  ctaButton: {
    width: '100%',
    minHeight: '46px',
    padding: '14px',
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontWeight: '700',
    fontSize: '12px',
    borderRadius: '8px',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  disabledButton: {
    opacity: 0.55,
    cursor: 'not-allowed',
  },
  profileButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    width: '100%',
    minHeight: '32px',
    marginTop: '11px',
    padding: '7px',
    color: 'var(--cinza-urbano)',
    background: 'transparent',
    fontSize: '11px',
    fontWeight: '600',
  },
  removeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    width: '100%',
    minHeight: '32px',
    marginTop: '5px',
    padding: '7px',
    color: 'var(--cinza-urbano)',
    background: 'transparent',
    fontSize: '11px',
    fontWeight: '600',
  },
};
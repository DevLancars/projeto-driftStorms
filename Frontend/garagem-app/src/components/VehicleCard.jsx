import React from 'react';

export const VehicleCard = ({ vehicle }) => {
  return (
    <div style={styles.card}>
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
          <span style={styles.plate}>{vehicle.plate}</span>
        </div>

        <div style={styles.divider} />

        <div style={styles.fipeRow}>
          <span style={styles.fipeLabel}>Tabela FIPE</span>
          <span style={styles.fipeValue}>{vehicle.fipePrice}</span>
        </div>

        <button style={styles.ctaButton}>
          VER DETALHES DO VEÍCULO
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
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
    padding: '20px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  make: {
    color: 'var(--cinza-urbano)',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  model: {
    color: 'var(--branco-puro)',
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '2px',
  },
  plate: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
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
    padding: '14px',
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontWeight: '700',
    fontSize: '12px',
    borderRadius: '8px',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  }
};
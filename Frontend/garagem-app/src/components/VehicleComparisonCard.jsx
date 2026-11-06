import React from 'react';

export const VehicleComparisonCard = ({ vehicle, onRemove }) => {
  return (
    <div style={styles.cardContainer}>
      <div style={styles.topBadgeContainer}>
        {vehicle.isUserCar ? (
          <span style={styles.userCarBadge}>Seu Veículo</span>
        ) : (
          <button style={styles.removeBtn} onClick={() => onRemove(vehicle.id)}>✕</button>
        )}
      </div>

      <div style={styles.imageBox}>
        <img src={vehicle.image} alt={vehicle.name} style={styles.image} />
      </div>

      <h3 style={styles.vehicleTitle}>{vehicle.name}</h3>
    </div>
  );
};

const styles = {
  cardContainer: {
    flex: 1,
    minWidth: '105px',
    backgroundColor: '#121212',
    borderRadius: '12px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #222222',
    position: 'relative',
  },
  topBadgeContainer: {
    minHeight: '20px',
    marginBottom: '4px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  userCarBadge: {
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontSize: '9px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  removeBtn: {
    position: 'absolute',
    top: '4px',
    right: '6px',
    background: 'none',
    color: 'var(--cinza-urbano)',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  imageBox: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4px 0',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  vehicleTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--branco-puro)',
    textAlign: 'center',
    marginTop: '4px',
  }
};

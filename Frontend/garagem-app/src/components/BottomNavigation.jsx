import React from 'react';

export const BottomNavigation = () => {
  return (
    <nav style={styles.nav}>
      <button style={{ ...styles.navItem, color: 'var(--dourado-champagne)' }}>
        <span style={styles.icon}>🚘</span>
        <span style={styles.label}>Garagem</span>
      </button>
      <button style={styles.navItem}>
        <span style={styles.icon}>🔍</span>
        <span style={styles.label}>Buscar</span>
      </button>

      <button style={styles.addButton}>+</button>

      <button style={styles.navItem}>
        <span style={styles.icon}>📊</span>
        <span style={styles.label}>FIPE</span>
      </button>
      <button style={styles.navItem}>
        <span style={styles.icon}>⚙️</span>
        <span style={styles.label}>Ajustes</span>
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '430px',
    height: '65px',
    backgroundColor: '#090909',
    borderTop: '1px solid #222222',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 10px',
    zIndex: 10,
  },
  navItem: {
    backgroundColor: 'transparent',
    color: 'var(--cinza-urbano)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  icon: {
    fontSize: '18px',
  },
  label: {
    fontSize: '10px',
    fontWeight: '500',
  },
  addButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-20px',
    boxShadow: '0 4px 12px rgba(218, 199, 156, 0.3)',
  }
};
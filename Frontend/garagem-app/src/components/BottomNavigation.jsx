import React from 'react';

export const BottomNavigation = ({ activeTab, onTabChange, onAddClick }) => {
  return (
    <nav style={styles.nav}>
      <button 
        style={{
          ...styles.navItem, 
          color: activeTab === 'garagem' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)'
        }}
        onClick={() => onTabChange && onTabChange('garagem')}
      >
        <span style={styles.icon}>🚘</span>
        <span style={styles.label}>Garagem</span>
      </button>

      <button 
        style={{
          ...styles.navItem, 
          color: activeTab === 'comparar' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)'
        }}
        onClick={() => onTabChange && onTabChange('comparar')}
      >
        <span style={styles.icon}>⚖️</span>
        <span style={styles.label}>Comparar</span>
      </button>

      {/* Botão Central de Adicionar - Dispara o Modal */}
      <button style={styles.addButton} onClick={onAddClick}>+</button>

      <button 
        style={{
          ...styles.navItem, 
          color: activeTab === 'alertas' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)'
        }}
        onClick={() => onTabChange && onTabChange('alertas')}
      >
        <span style={styles.icon}>🔔</span>
        <span style={styles.label}>Alertas</span>
      </button>

      <button 
        style={{
          ...styles.navItem, 
          color: activeTab === 'perfil' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)'
        }}
        onClick={() => onTabChange && onTabChange('perfil')}
      >
        <span style={styles.icon}>👤</span>
        <span style={styles.label}>Perfil</span>
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
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
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
    border: 'none',
    boxShadow: '0 4px 12px rgba(218, 199, 156, 0.3)',
    cursor: 'pointer',
  }
};
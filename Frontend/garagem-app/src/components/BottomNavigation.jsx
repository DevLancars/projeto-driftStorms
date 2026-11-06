import { Icon } from './Icon';

export const BottomNavigation = ({ activePage, onNavigate }) => {
  return (
    <nav style={styles.nav}>
      <button
        type="button"
        className={`bottom-nav__item${activePage === 'garage' ? ' bottom-nav__item--active' : ''}`}
        aria-label="Ir para a garagem"
        aria-current={activePage === 'garage' ? 'page' : undefined}
        onClick={() => onNavigate('garage')}
        style={{ ...styles.navItem, color: activePage === 'garage' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)' }}
      >
        <Icon name="car" size={21} />
        <span style={styles.label}>Garagem</span>
      </button>
      <button
        type="button"
        className={`bottom-nav__item${activePage === 'search' ? ' bottom-nav__item--active' : ''}`}
        aria-label="Buscar veículos"
        aria-current={activePage === 'search' ? 'page' : undefined}
        onClick={() => onNavigate('search')}
        style={{ ...styles.navItem, color: activePage === 'search' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)' }}
      >
        <Icon name="search" size={21} />
        <span style={styles.label}>Buscar</span>
      </button>

      <button
        type="button"
        className={`bottom-nav__item bottom-nav__compare${activePage === 'compare' ? ' bottom-nav__item--active' : ''}`}
        aria-label="Comparar veículos"
        aria-current={activePage === 'compare' ? 'page' : undefined}
        onClick={() => onNavigate('compare')}
        style={{ ...styles.compareItem, color: activePage === 'compare' ? 'var(--dourado-champagne)' : 'var(--cinza-urbano)' }}
      >
        <span style={styles.compareCircle}><Icon name="compare" size={22} /></span>
        <span style={styles.label}>Comparar</span>
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
    height: '76px',
    backgroundColor: '#090909',
    borderTop: '1px solid #222222',
    display: 'flex',
    justifyContent: 'space-evenly',
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
  compareItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    backgroundColor: 'transparent',
    color: 'var(--cinza-urbano)',
  },
  label: {
    fontSize: '10px',
    fontWeight: '500',
  },
  compareCircle: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'var(--dourado-champagne)',
    color: 'var(--preto-orbita)',
    fontSize: '20px',
    boxShadow: '0 4px 12px rgba(218, 199, 156, 0.3)',
  },
};
import { Icon } from './Icon';

export const Header = ({ userName = 'Gabriel', onSignOut }) => {
  return (
    <header style={styles.header}>
      <div>
        <span style={styles.greeting}>BEM-VINDO DE VOLTA</span>
        <h1 style={styles.title}>Garagem de {userName}</h1>
        <p style={styles.subtitle}>Seus carros e suas próximas escolhas, em um só lugar.</p>
      </div>
      <div style={styles.accountActions}>
        <div aria-label={`Usuário ${userName}`} style={styles.avatar}>{userName.charAt(0)}</div>
        {onSignOut && (
          <button type="button" className="sign-out-button" onClick={onSignOut} style={styles.signOut}>
            <Icon name="logout" size={15} /> Sair
          </button>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 20px 10px 20px',
  },
  greeting: {
    color: 'var(--cinza-urbano)',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
  },
  title: {
    color: 'var(--branco-puro)',
    fontSize: '22px',
    fontWeight: '700',
    marginTop: '2px',
  },
  subtitle: {
    color: 'var(--cinza-urbano)',
    fontSize: '12px',
    marginTop: '7px',
    lineHeight: 1.5,
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1E1E1E',
    border: '1px solid var(--cinza-urbano)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--dourado-champagne)',
    fontWeight: '700',
  },
  accountActions: {
    display: 'grid',
    justifyItems: 'center',
    gap: '7px',
  },
  signOut: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 8px',
    color: 'var(--cinza-urbano)',
    background: '#151515',
    borderRadius: '7px',
    fontSize: '10px',
    fontWeight: '600',
  },
};
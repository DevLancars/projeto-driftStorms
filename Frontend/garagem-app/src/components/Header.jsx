import React from 'react';

export const Header = ({ userName = 'Gabriel' }) => {
  return (
    <header style={styles.header}>
      <div>
        <span style={styles.greeting}>BEM-VINDO DE VOLTA</span>
        <h1 style={styles.title}>Garagem de {userName}</h1>
      </div>
      <div style={styles.avatar}>
        {userName.charAt(0)}
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
  }
};
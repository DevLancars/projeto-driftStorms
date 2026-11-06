import { useState } from 'react';
import { Icon } from '../components/Icon';
import { demoCredentials } from '../data/demoCredentials';

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim().toLowerCase() !== demoCredentials.email || password !== demoCredentials.password) {
      setError('E-mail ou senha incorretos. Use as credenciais demonstrativas abaixo.');
      return;
    }

    setError('');
    onLogin();
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.brandIcon}><Icon name="car" size={25} /></div>
        <span style={styles.eyebrow}>SUA GARAGEM DIGITAL</span>
        <h1 style={styles.title}>Entre na sua conta</h1>
        <p style={styles.subtitle}>Acesse seus veículos, compare modelos e encontre sua próxima escolha.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="login-email">E-mail</label>
          <input
            id="login-email"
            autoComplete="username"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@exemplo.com"
            style={styles.input}
          />

          <label style={styles.label} htmlFor="login-password">Senha</label>
          <input
            id="login-password"
            autoComplete="current-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
            style={styles.input}
          />

          {error && <p role="alert" style={styles.error}>{error}</p>}

          <button type="submit" className="login-submit" style={styles.submitButton}>
            Entrar <Icon name="arrowRight" size={17} />
          </button>
        </form>

      </section>
    </main>
  );
}

const styles = {
  page: { display: 'grid', minHeight: '100vh', placeItems: 'center', padding: '24px 20px', background: 'radial-gradient(ellipse at 50% 0%, #211e17 0%, #090909 48%, #000 100%)' },
  card: { width: '100%', maxWidth: '390px', padding: '28px 24px', background: 'rgba(18,18,18,.96)', border: '1px solid #2c2922', borderRadius: '20px', boxShadow: '0 24px 70px rgba(0,0,0,.4)' },
  brandIcon: { display: 'grid', placeItems: 'center', width: '48px', height: '48px', marginBottom: '20px', color: 'var(--dourado-champagne)', background: 'rgba(218,199,156,.12)', borderRadius: '14px' },
  eyebrow: { color: 'var(--dourado-champagne)', fontSize: '10px', fontWeight: '700', letterSpacing: '1.2px' },
  title: { marginTop: '8px', color: 'var(--branco-puro)', fontSize: '24px' },
  subtitle: { marginTop: '8px', color: 'var(--cinza-urbano)', fontSize: '12px', lineHeight: 1.6 },
  form: { display: 'grid', gap: '9px', marginTop: '24px' },
  label: { marginTop: '5px', color: '#dedede', fontSize: '11px', fontWeight: '600' },
  input: { width: '100%', minHeight: '45px', padding: '0 12px', color: 'var(--branco-puro)', background: '#090909', border: '1px solid #353535', borderRadius: '9px', font: 'inherit', fontSize: '12px' },
  error: { padding: '10px', color: '#ffc3b8', background: 'rgba(166,60,45,.15)', border: '1px solid rgba(255,120,100,.25)', borderRadius: '8px', fontSize: '11px', lineHeight: 1.5 },
  submitButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '46px', marginTop: '8px', color: '#080808', background: 'var(--dourado-champagne)', borderRadius: '9px', fontSize: '13px', fontWeight: '700' },
};

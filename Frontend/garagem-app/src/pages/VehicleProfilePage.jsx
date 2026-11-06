import { useState } from 'react';
import { Icon } from '../components/Icon';
import { getVehicleIndicators } from '../data/vehicleIndicators';

const profileTabs = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'strengths', label: 'Pontos fortes' },
  { id: 'considerations', label: 'Pontos de atenção' },
];

export function VehicleProfilePage({ vehicle, catalog, onBack, onCompare }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { strengths, considerations } = getVehicleIndicators(vehicle, catalog);

  return (
    <main style={styles.page}>
      <button className="text-action" type="button" onClick={onBack} style={styles.backButton}>
        <span aria-hidden="true">‹</span> Voltar
      </button>

      <section style={styles.hero}>
        <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} style={styles.image} />
        <div style={styles.heroShade} />
        <div style={styles.heroContent}>
          <span style={styles.make}>{vehicle.make} · {vehicle.year}</span>
          <h1 style={styles.title}>{vehicle.model}</h1>
          <span style={styles.price}>{vehicle.priceLabel}</span>
        </div>
      </section>

      <nav role="tablist" aria-label="Abas de informações do veículo" style={styles.tabs}>
        {profileTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`profile-tab-${tab.id}`}
            aria-controls={`profile-panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            className={`profile-tab${activeTab === tab.id ? ' profile-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={styles.tab}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <section id="profile-panel-overview" aria-labelledby="profile-tab-overview" role="tabpanel" style={styles.panel}>
          <h2 style={styles.sectionTitle}>Informações do veículo</h2>
          <p style={styles.sectionDescription}>Dados principais para conhecer este modelo.</p>
          <div style={styles.specGrid}>
            <Spec label="Preço de referência" value={vehicle.priceLabel} />
            <Spec label="Motorização" value={vehicle.fuel} />
            <Spec label="Potência" value={vehicle.power} />
            <Spec label="0–100 km/h" value={vehicle.acceleration} />
            <Spec label="Ano-modelo" value={vehicle.year} />
            {vehicle.plate && <Spec label="Placa cadastrada" value={vehicle.plate} />}
          </div>
          <p style={styles.disclaimer}>
            Valores e especificações são demonstrativos e devem ser confirmados com fontes oficiais.
          </p>
        </section>
      )}

      {activeTab === 'strengths' && (
        <IndicatorPanel
          id="strengths"
          title="Pontos fortes"
          description="Destaques observados em relação à média do catálogo demonstrativo."
          items={strengths}
          kind="strength"
        />
      )}

      {activeTab === 'considerations' && (
        <IndicatorPanel
          id="considerations"
          title="Pontos de atenção"
          description="Aspectos que podem pesar na escolha, conforme os dados disponíveis."
          items={considerations}
          kind="consideration"
        />
      )}

      <button className="compare-action" type="button" onClick={onCompare} style={styles.compareButton}>
        <Icon name="compare" size={18} />
        Comparar este veículo
        <Icon name="arrowRight" size={17} />
      </button>
    </main>
  );
}

function Spec({ label, value }) {
  return (
    <div style={styles.spec}>
      <span style={styles.specLabel}>{label}</span>
      <strong style={styles.specValue}>{value || 'Não informado'}</strong>
    </div>
  );
}

function IndicatorPanel({ id, title, description, items, kind }) {
  const isStrength = kind === 'strength';

  return (
    <section id={`profile-panel-${id}`} aria-labelledby={`profile-tab-${id}`} role="tabpanel" style={styles.panel}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.sectionDescription}>{description}</p>
      <ul style={styles.indicatorList}>
        {items.map((item) => (
          <li key={item} style={styles.indicator}>
            <span style={{ ...styles.indicatorIcon, ...(isStrength ? styles.strengthIcon : styles.attentionIcon) }}>
              <Icon name={isStrength ? 'check' : 'close'} size={15} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p style={styles.disclaimer}>Indicadores comparativos calculados apenas com os dados demonstrativos cadastrados neste catálogo.</p>
    </section>
  );
}

const styles = {
  page: { maxWidth: '430px', minHeight: '100vh', margin: '0 auto', padding: '18px 20px 116px', color: 'var(--branco-puro)', backgroundColor: 'var(--preto-orbita)' },
  backButton: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', padding: '7px 0', color: 'var(--cinza-urbano)', background: 'transparent', fontSize: '12px', fontWeight: '600' },
  hero: { position: 'relative', height: '230px', overflow: 'hidden', borderRadius: '16px', backgroundColor: '#171717' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  heroShade: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,.82) 100%)' },
  heroContent: { position: 'absolute', right: '16px', bottom: '16px', left: '16px' },
  make: { color: 'var(--dourado-champagne)', fontSize: '11px', fontWeight: '700', letterSpacing: '.8px', textTransform: 'uppercase' },
  title: { margin: '4px 0', fontSize: '23px', lineHeight: 1.2 },
  price: { color: '#f4e3ba', fontSize: '14px', fontWeight: '700' },
  tabs: { display: 'flex', gap: '4px', margin: '16px 0', padding: '4px', overflowX: 'auto', background: '#121212', border: '1px solid #252525', borderRadius: '11px' },
  tab: { flex: '1 0 auto', padding: '10px 9px', color: 'var(--cinza-urbano)', background: 'transparent', borderRadius: '8px', fontSize: '10px', fontWeight: '600' },
  panel: { padding: '17px', background: '#121212', border: '1px solid #252525', borderRadius: '14px' },
  sectionTitle: { fontSize: '15px' },
  sectionDescription: { marginTop: '5px', color: 'var(--cinza-urbano)', fontSize: '11px', lineHeight: 1.5 },
  specGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridAutoRows: 'minmax(72px, auto)', alignItems: 'stretch', gap: '9px', marginTop: '15px' },
  spec: { display: 'grid', minWidth: 0, gap: '6px', alignContent: 'center', padding: '10px', background: '#090909', border: '1px solid #242424', borderRadius: '9px' },
  specLabel: { color: 'var(--cinza-urbano)', fontSize: '9px' },
  specValue: { color: 'var(--branco-puro)', fontSize: '12px' },
  disclaimer: { marginTop: '13px', color: '#777', fontSize: '9px', lineHeight: 1.5 },
  indicatorList: { display: 'grid', gap: '9px', marginTop: '15px', padding: 0, listStyle: 'none' },
  indicator: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '11px', color: '#e8e8e8', background: '#090909', border: '1px solid #242424', borderRadius: '9px', fontSize: '11px', lineHeight: 1.5 },
  indicatorIcon: { display: 'grid', placeItems: 'center', width: '23px', height: '23px', flexShrink: 0, borderRadius: '50%' },
  strengthIcon: { color: '#9ed6ae', background: 'rgba(80, 170, 105, .15)' },
  attentionIcon: { color: '#e5c27e', background: 'rgba(218, 160, 60, .15)' },
  compareButton: { position: 'fixed', bottom: '88px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: '390px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', padding: '12px', color: 'var(--preto-orbita)', background: 'var(--dourado-champagne)', borderRadius: '11px', fontSize: '12px', fontWeight: '700', zIndex: 9 },
};

import React from 'react';

export const SpecRow = ({ label, values, isHighlight, badges, subtitles }) => {
  return (
    <div style={{
      ...styles.rowContainer,
      backgroundColor: isHighlight ? '#181818' : 'transparent'
    }}>
      <div style={styles.labelCol}>{label}</div>
      <div style={styles.valuesGrid}>
        {values.map((val, idx) => (
          <div key={idx} style={styles.valueItem}>
            <span style={{
              ...styles.valueText,
              color: isHighlight ? 'var(--dourado-champagne)' : 'var(--branco-puro)'
            }}>
              {val}
            </span>
            {subtitles && subtitles[idx] && (
              <span style={styles.subText}>{subtitles[idx]}</span>
            )}
            {badges && badges[idx] && (
              <span style={styles.bestOfferBadge}>{badges[idx]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  rowContainer: {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid #222222',
    alignItems: 'center',
  },
  labelCol: {
    width: '85px',
    fontSize: '11px',
    color: 'var(--cinza-urbano)',
    fontWeight: '600',
    paddingRight: '6px',
  },
  valuesGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  valueItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: '12px',
    fontWeight: '700',
  },
  subText: {
    fontSize: '9px',
    color: 'var(--cinza-urbano)',
  },
  bestOfferBadge: {
    backgroundColor: 'var(--branco-puro)',
    color: 'var(--preto-orbita)',
    fontSize: '8px',
    fontWeight: '700',
    padding: '2px 4px',
    borderRadius: '3px',
    marginTop: '2px',
    lineHeight: '1.1',
    maxWidth: '75px',
  }
};
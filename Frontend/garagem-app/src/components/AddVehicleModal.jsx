import { useState } from 'react';
import { mockSuggestions } from '../data/mockSuggestions';

export const AddVehicleModal = ({ isOpen, onClose, onSelectVehicle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState('Todos');

  if (!isOpen) return null;

  const chips = ['Todos', 'Elétricos', 'SUVs', 'Até R$ 200k'];

  const filteredSuggestions = mockSuggestions.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChip = activeChip === 'Todos' || item.category === activeChip;
    return matchesSearch && matchesChip;
  });

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Barra Superior / Drag Handle */}
        <div style={styles.headerBar}>
          <div style={styles.dragHandle} />
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Input de Pesquisa */}
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Digite marca, modelo ou ano..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            autoFocus
          />
        </div>

        {/* Chips de Filtro Rápido */}
        <div style={styles.chipsContainer}>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              style={{
                ...styles.chip,
                backgroundColor: activeChip === chip ? 'var(--dourado-champagne)' : '#1E1E1E',
                color: activeChip === chip ? 'var(--preto-orbita)' : 'var(--branco-puro)',
                border: activeChip === chip ? 'none' : '1px solid var(--cinza-urbano)'
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Seção de Sugestões */}
        <div style={styles.suggestionsHeader}>
          <span style={styles.suggestionsTitle}>Sugestões</span>
        </div>

        <div style={styles.suggestionsList}>
          {filteredSuggestions.map((item) => (
            <div 
              key={item.id} 
              style={styles.suggestionCard}
              onClick={() => {
                if (onSelectVehicle) onSelectVehicle(item);
                onClose();
              }}
            >
              <div style={styles.imageBox}>
                <img src={item.image} alt={item.name} style={styles.image} />
              </div>
              
              <div style={styles.itemInfo}>
                <h4 style={styles.itemName}>{item.name}</h4>
                <span style={styles.itemVersion}>{item.version}</span>
                <span style={styles.itemFipe}>FIPE: {item.fipe}</span>
              </div>

              <span style={styles.arrowIcon}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 100,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    width: '100%',
    maxWidth: '430px',
    backgroundColor: '#121212',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    border: '1px solid #222222',
    borderBottom: 'none',
    padding: '16px 20px 30px 20px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    position: 'relative',
  },
  dragHandle: {
    width: '36px',
    height: '4px',
    backgroundColor: 'var(--cinza-urbano)',
    borderRadius: '2px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '0',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    color: 'var(--cinza-urbano)',
    fontSize: '16px',
    marginLeft: 'auto',
    cursor: 'pointer',
    border: 'none',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: '10px',
    padding: '0 12px',
    border: '1px solid #333333',
    marginBottom: '14px',
  },
  searchIcon: {
    fontSize: '14px',
    color: 'var(--cinza-urbano)',
    marginRight: '8px',
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--branco-puro)',
    width: '100%',
    padding: '12px 0',
    outline: 'none',
    fontSize: '13px',
  },
  chipsContainer: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '8px',
    marginBottom: '16px',
  },
  chip: {
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  suggestionsHeader: {
    marginBottom: '10px',
  },
  suggestionsTitle: {
    fontSize: '12px',
    color: 'var(--cinza-urbano)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  suggestionsList: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  suggestionCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: '12px',
    padding: '10px',
    border: '1px solid #262626',
    cursor: 'pointer',
  },
  imageBox: {
    width: '60px',
    height: '45px',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#0A0A0A',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    fontSize: '13px',
    color: 'var(--branco-puro)',
    fontWeight: '700',
  },
  itemVersion: {
    fontSize: '11px',
    color: 'var(--cinza-urbano)',
    margin: '2px 0',
  },
  itemFipe: {
    fontSize: '11px',
    color: 'var(--dourado-champagne)',
    fontWeight: '600',
  },
  arrowIcon: {
    color: 'var(--cinza-urbano)',
    fontSize: '18px',
    marginLeft: '8px',
  }
};
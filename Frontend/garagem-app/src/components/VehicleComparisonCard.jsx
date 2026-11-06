import React from 'react';
import { X } from 'lucide-react';
import '../styles/comparison.css';

export const VehicleComparisonCard = ({ vehicle, onRemove }) => {
  return (
    <div
      className={`relative min-w-[140px] max-w-[150px] p-3 rounded-[16px] flex flex-col items-center justify-between text-center transition-all ${
        isUserVehicle ? 'card-user-vehicle' : 'card-other-vehicle'
      }`}
    >
      {/* Header do Card / Tag */}
      <div className="w-full flex justify-between items-center mb-1">
        {isUserVehicle ? (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/10 text-black">
            Seu Veículo
          </span>
        ) : (
          <div className="h-4" />
        )}

        {!isUserVehicle && onRemove && (
          <button
            onClick={onRemove}
            className="p-1 rounded-full text-[#898989] hover:bg-black/5"
            aria-label="Remover veículo"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div style={styles.imageBox}>
        <img src={vehicle.image} alt={vehicle.name} style={styles.image} />
      </div>

      <h3 style={styles.vehicleTitle}>{vehicle.name}</h3>
    </div>
  );
}

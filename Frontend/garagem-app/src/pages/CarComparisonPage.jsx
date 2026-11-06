import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { VehicleComparisonCard } from '../components/VehicleComparisonCard';
import '../styles/comparison.css';

const initialVehicles = [
  {
    id: '1',
    name: 'BMW 320i GP 2024',
    isUserVehicle: true,
    image: 'https://pngimg.com/d/bmw_PNG1710.png',
    fipePrice: 'R$ 285.000',
    regionalLowestPrice: 'R$ 272k',
    regionalDistance: '(Raio 50km)',
    isBestOffer: false,
    power: '184cv',
    fuel: 'Flex',
    acceleration: '7.1s',
  },
  {
    id: '2',
    name: 'BYD Seal 2025',
    isUserVehicle: false,
    image: 'https://pngimg.com/d/car_PNG102875.png',
    fipePrice: 'R$ 296k',
    regionalLowestPrice: 'R$ 289k',
    regionalDistance: '(12 km)',
    isBestOffer: true,
    power: '531cv',
    fuel: 'Elétrico',
    acceleration: '3.8s',
  },
  {
    id: '3',
    name: 'Volvo EX30',
    isUserVehicle: false,
    image: 'https://pngimg.com/d/car_PNG102857.png',
    fipePrice: 'R$ 225k',
    regionalLowestPrice: 'R$ 215k',
    regionalDistance: '(5 km)',
    isBestOffer: false,
    power: '272cv',
    fuel: 'Elétrico',
    acceleration: '5.7s',
  },
];

export function CarComparisonPage() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRemoveVehicle = (id) => {
    setVehicles(vehicles.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-[430px] min-h-screen bg-[#000000] text-[#FFFFFF] font-sans mx-auto flex flex-col pb-8">
      {/* 1. Busca */}
      <div className="p-4 flex items-center gap-3">
        <div className="flex-1 flex items-center bg-[#1A1A1A] border border-[#898989]/30 rounded-xl px-3 py-2.5">
          <Search size={18} className="text-[#898989] mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#FFFFFF] focus:outline-none w-full placeholder-[#898989]"
          />
        </div>
        <button className="p-2.5 bg-[#DAC79C] text-[#000000] rounded-xl flex items-center justify-center">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* 2. Carrossel de Cards */}
      <div className="px-4 overflow-x-auto no-scrollbar flex gap-3 pb-4">
        {vehicles.map((v) => (
          <VehicleComparisonCard
            key={v.id}
            vehicle={v}
            isUserVehicle={v.isUserVehicle}
            onRemove={() => handleRemoveVehicle(v.id)}
          />
        ))}
      </div>

      {/* 3. Tabela de Especificações */}
      <div className="px-4 mt-2 flex-1">
        {/* FIPE */}
        <div className="py-3 border-divider grid grid-cols-4 items-center text-xs">
          <span className="text-[#898989] font-medium">Tabela FIPE</span>
          {vehicles.map((v) => (
            <span key={v.id} className="font-bold text-center text-sm">
              {v.fipePrice}
            </span>
          ))}
        </div>

        {/* Menor Preço Regional */}
        <div className="py-4 border-divider grid grid-cols-4 items-start text-xs">
          <div className="flex flex-col">
            <span className="text-[#898989] font-medium leading-tight">
              Menor Preço Regional
            </span>
            <span className="text-[10px] text-[#898989]/70">(Raio 50km)</span>
          </div>

          {vehicles.map((v) => (
            <div key={v.id} className="flex flex-col items-center">
              <span className="font-bold text-sm">{v.regionalLowestPrice}</span>
              <span className="text-[10px] text-[#898989]">{v.regionalDistance}</span>

              {v.isBestOffer && (
                <div className="mt-1 badge-gold text-[9px] px-1.5 py-0.5 rounded text-center leading-tight">
                  Melhor Oferta Regional
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Especificações */}
        <div className="py-3 border-divider grid grid-cols-4 items-center text-xs">
          <span className="text-[#898989]">Potência</span>
          {vehicles.map((v) => (
            <span key={v.id} className="text-center font-medium">
              {v.power}
            </span>
          ))}
        </div>

        <div className="py-3 border-divider grid grid-cols-4 items-center text-xs">
          <span className="text-[#898989]">Fuel</span>
          {vehicles.map((v) => (
            <span key={v.id} className="text-center font-medium">
              {v.fuel}
            </span>
          ))}
        </div>

        <div className="py-3 border-divider grid grid-cols-4 items-center text-xs">
          <span className="text-[#898989]">0-100km/h</span>
          {vehicles.map((v) => (
            <span key={v.id} className="text-center font-medium">
              {v.acceleration}
            </span>
          ))}
        </div>
      </div>

      {/* 4. CTA */}
      <div className="px-4 mt-6">
        <button className="w-full bg-[#DAC79C] text-[#000000] font-bold py-3.5 rounded-xl hover:bg-[#c9b485] transition-colors text-sm">
          [ Ver 14 Ofertas Próximas Dessas Modelos ]
        </button>
      </div>
    </div>
  );
}

export default CarComparisonPage;
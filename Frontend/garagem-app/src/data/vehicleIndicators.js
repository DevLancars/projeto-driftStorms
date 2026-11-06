const toNumber = (value) => Number.parseFloat(String(value).replace(',', '.'));

export function getVehicleIndicators(vehicle, catalog) {
  const vehicles = catalog.length > 0 ? catalog : [vehicle];
  const averagePrice = vehicles.reduce((total, item) => total + item.price, 0) / vehicles.length;
  const averagePower = vehicles.reduce((total, item) => total + toNumber(item.power), 0) / vehicles.length;
  const averageAcceleration = vehicles.reduce(
    (total, item) => total + toNumber(item.acceleration),
    0,
  ) / vehicles.length;

  const strengths = [];
  const considerations = [];

  if (vehicle.price <= averagePrice) {
    strengths.push('Preço abaixo da média dos veículos deste catálogo.');
  } else {
    considerations.push('Preço acima da média dos veículos deste catálogo.');
  }

  if (toNumber(vehicle.power) >= averagePower) {
    strengths.push('Potência acima da média deste catálogo.');
  } else {
    considerations.push('Potência abaixo da média deste catálogo.');
  }

  if (toNumber(vehicle.acceleration) <= averageAcceleration) {
    strengths.push('Aceleração de 0 a 100 km/h mais rápida que a média do catálogo.');
  } else {
    considerations.push('Aceleração de 0 a 100 km/h mais lenta que a média do catálogo.');
  }

  if (/elétric|híbrido/i.test(vehicle.fuel)) {
    strengths.push('Motorização eletrificada.');
  } else {
    considerations.push('Motorização a combustão, sem opção de condução elétrica.');
  }

  return { strengths, considerations };
}

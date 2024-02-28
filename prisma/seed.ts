import prisma from '../lib/prisma';

const carsarr = [
  {
    title: 'BMW 3 Series #1',
    type: 'Sedan',
    fuelCapacity: 80,
    rentPrice: 100,
    capacity: 5,
    transmission: 'Automatic',
    location: 'New York',
    userId: '1',
    description:
      'The BMW 3 Series is a compact executive car manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.',
    images: [
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
    ],
  },
  {
    title: 'BMW 3 Series #2',
    type: 'Sedan',
    fuelCapacity: 80,
    rentPrice: 100,
    capacity: 5,
    transmission: 'Automatic',
    location: 'New York',
    userId: '1',
    description:
      'The BMW 3 Series is a compact executive car manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.',
    images: [
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
    ],
  },
  {
    title: 'BMW 3 Series #3',
    type: 'Sedan',
    fuelCapacity: 80,
    rentPrice: 100,
    capacity: 5,
    transmission: 'Automatic',
    location: 'New York',
    userId: '1',
    description:
      'The BMW 3 Series is a compact executive car manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.',
    images: [
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
      'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
    ],
  },
];

async function seed() {
  const cars = await prisma.car.createMany({
    data: [
      {
        title: 'BMW 3 Series #1',
        type: 'Sedan',
        fuelCapacity: 80,
        rentPrice: 100,
        capacity: 5,
        transmission: 'Automatic',
        location: 'New York',
        userId: 'ee1ff41a-36a3-420e-ac16-2d135d3c436d',
        description:
          'The BMW 3 Series is a compact executive car manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.',
        images: [
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
        ],
      },
      {
        title: 'BMW 3 Series #2',
        type: 'Sedan',
        fuelCapacity: 80,
        rentPrice: 100,
        capacity: 5,
        transmission: 'Automatic',
        location: 'New York',
        userId: 'ee1ff41a-36a3-420e-ac16-2d135d3c436d',
        description:
          'The BMW 3 Series is a compact executive car manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.',
        images: [
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
        ],
      },
      {
        title: 'BMW 3 Series #3',
        type: 'Sedan',
        fuelCapacity: 80,
        rentPrice: 100,
        capacity: 5,
        transmission: 'Automatic',
        location: 'New York',
        userId: 'ee1ff41a-36a3-420e-ac16-2d135d3c436d',
        description:
          'The BMW 3 Series is a compact executive car manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.',
        images: [
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
          'https://www.bmwusa.com/content/dam/bmwusa/vehicles/3-series/2022/3-series-sedan/3-series-sedan-gallery-01.jpg',
        ],
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

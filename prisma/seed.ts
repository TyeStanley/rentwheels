import prisma from '../lib/prisma';

async function seed() {
  await prisma.car.createMany({
    data: [
      {
        title: 'BMW 3 Series #1',
        type: 'Sedan',
        fuelCapacity: 80,
        rentPrice: 100,
        capacity: 5,
        transmission: 'Automatic',
        location: 'new york',
        userId: '97f96014-777f-48c5-9f54-cf814df5d2b7',
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
        location: 'houston',
        userId: '97f96014-777f-48c5-9f54-cf814df5d2b7',
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
        location: 'irvine',
        userId: '97f96014-777f-48c5-9f54-cf814df5d2b7',
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

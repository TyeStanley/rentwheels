import prisma from '../lib/prisma';

async function seed() {
  await prisma.car.createMany({
    data: [
      {
        title: 'Audi A4 Premium',
        type: 'Sedan',
        fuelCapacity: 58,
        rentPrice: 120,
        capacity: 5,
        transmission: 'Automatic',
        location: 'los angeles',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group.',
        images: [
          'https://www.jsonline.com/gcdn/-mm-/a44db88aa646bcd7112301699bb795554233d388/c=0-114-3516-2100/local/-/media/2016/11/08/WIGroup/Milwaukee/636142247260215223-audi-a4a.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Mercedes-Benz C-Class',
        type: 'Sedan',
        fuelCapacity: 66,
        rentPrice: 150,
        capacity: 5,
        transmission: 'Automatic',
        location: 'miami',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Mercedes-Benz C-Class is a line of compact executive cars produced by Daimler AG. Introduced in 1993 as a replacement for the 190 (W201) range.',
        images: [
          'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/c/coupe/class-page/amg/2023-AMG-C-COUPE-HERO-DR.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Tesla Model 3',
        type: 'Sedan',
        fuelCapacity: 0,
        rentPrice: 200,
        capacity: 5,
        transmission: 'Automatic',
        location: 'san francisco',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Tesla Model 3 is an electric four-door sedan developed by Tesla. The Model 3 Standard Range Plus version delivers an EPA-rated all-electric range of 263 miles.',
        images: [
          'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Exterior-Desktop-NA.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Honda Accord LX',
        type: 'Sedan',
        fuelCapacity: 56,
        rentPrice: 90,
        capacity: 5,
        transmission: 'Automatic',
        location: 'chicago',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Honda Accord is a series of automobiles manufactured by Honda since 1976, best known for its four-door sedan variant, which has been one of the best-selling cars in the US since 1989.',
        images: [
          'https://file.kelleybluebookimages.com/kbb/base/house/2021/2021-Honda-Accord-FrontSide_HOACCT2101_640x480.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Toyota Camry SE',
        type: 'Sedan',
        fuelCapacity: 60,
        rentPrice: 95,
        capacity: 5,
        transmission: 'Automatic',
        location: 'seattle',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Toyota Camry is an automobile sold internationally by the Japanese manufacturer Toyota since 1982, spanning multiple generations. Known for its spacious interior, smooth ride, and efficient performance.',
        images: [
          'https://hips.hearstapps.com/hmg-prod/images/2024-toyota-camry-102-64cbc4858e198.jpg?crop=0.544xw:0.461xh;0.293xw,0.234xh&resize=1200:*',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Ford Mustang GT',
        type: 'Coupe',
        fuelCapacity: 61,
        rentPrice: 150,
        capacity: 4,
        transmission: 'Manual',
        location: 'las vegas',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Ford Mustang GT is an iconic American muscle car known for its powerful V8 engine and classic design. It offers thrilling performance combined with modern technology and comfort.',
        images: [
          'https://www.motortrend.com/uploads/sites/5/2018/06/2018-Ford-Mustang-GT-front-three-quarter-in-motion-02.jpg?fit=around%7C875:492',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Chevrolet Corvette Stingray',
        type: 'Sports Car',
        fuelCapacity: 70,
        rentPrice: 200,
        capacity: 2,
        transmission: 'Automatic',
        location: 'miami',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Chevrolet Corvette Stingray is a legendary American sports car that offers an unmatched combination of performance, innovation, and style. It features a mid-engine design for incredible handling and acceleration.',
        images: [
          'https://cdn.carbuzz.com/gallery-images/1600/763000/100/763143.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Volkswagen Golf GTI',
        type: 'Hatchback',
        fuelCapacity: 50,
        rentPrice: 80,
        capacity: 5,
        transmission: 'Manual',
        location: 'boston',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Volkswagen Golf GTI is a hot hatch that combines performance, comfort, and practicality. Known for its sporty design and responsive handling, it has been a popular choice among driving enthusiasts.',
        images: [
          'https://media.ed.edmunds-media.com/volkswagen/golf-gti/2024/oem/2024_volkswagen_golf-gti_4dr-hatchback_380-autobahn_fq_oem_1_815.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Porsche 911 Carrera',
        type: 'Sports Car',
        fuelCapacity: 64,
        rentPrice: 300,
        capacity: 4,
        transmission: 'Automatic',
        location: 'san diego',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Porsche 911 Carrera is an iconic sports car that offers exceptional performance, precision, and luxury. Its distinctive design and engineering excellence make it a timeless choice for car enthusiasts.',
        images: [
          'https://www.motortrend.com/uploads/sites/5/2020/06/2020-Porsche-911-Carrera-35.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Lexus ES 350',
        type: 'Sedan',
        fuelCapacity: 65,
        rentPrice: 110,
        capacity: 5,
        transmission: 'Automatic',
        location: 'atlanta',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Lexus ES 350 is a luxury sedan that combines elegance with performance. Offering a smooth ride, spacious interior, and advanced safety features, it represents the pinnacle of comfort in its class.',
        images: [
          'https://vehicle-images.dealerinspire.com/2802-11001896/58AJZ1B15RU166451/06bcd0619c4378f4212d6c5dcd86473d.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Nissan Altima',
        type: 'Sedan',
        fuelCapacity: 61,
        rentPrice: 85,
        capacity: 5,
        transmission: 'Automatic',
        location: 'denver',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Nissan Altima offers a blend of comfort, style, and efficiency. It stands out with its spacious interior, advanced safety features, and smooth ride, making it a great choice for family trips or commuting.',
        images: [
          'https://images.cars.com/cldstatic/wp-content/uploads/2021-Altima-Blue_8-source.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Subaru Outback',
        type: 'SUV',
        fuelCapacity: 73,
        rentPrice: 99,
        capacity: 5,
        transmission: 'Automatic',
        location: 'portland',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          "The Subaru Outback is renowned for its rugged build, all-wheel drive, and ample cargo space. It's the perfect companion for adventure seekers looking to explore off the beaten path.",
        images: [
          'https://media.ed.edmunds-media.com/subaru/outback/2024/oem/2024_subaru_outback_4dr-suv_onyx-edition-xt_fq_oem_1_1280.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Mazda CX-5',
        type: 'SUV',
        fuelCapacity: 58,
        rentPrice: 105,
        capacity: 5,
        transmission: 'Automatic',
        location: 'austin',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Mazda CX-5 stands out with its sleek design, engaging driving experience, and cutting-edge technology. It offers a premium feel at an accessible price point, making it a favorite among SUV enthusiasts.',
        images: [
          'https://npr.brightspotcdn.com/dims4/default/5a552f8/2147483647/strip/true/crop/3366x1767+0+250/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F4a%2F86%2Fa719d1ab47cbbf6b2921f785a575%2Fmazda2.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Chevrolet Bolt EV',
        type: 'Hatchback',
        fuelCapacity: 0,
        rentPrice: 70,
        capacity: 5,
        transmission: 'Automatic',
        location: 'san jose',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          "The Chevrolet Bolt EV is a game-changer in the electric vehicle market, offering impressive range, spacious interiors, and affordable pricing. It's an excellent option for eco-conscious drivers looking to reduce their carbon footprint.",
        images: [
          'https://media.ed.edmunds-media.com/chevrolet/bolt-ev/2023/oem/2023_chevrolet_bolt-ev_4dr-hatchback_2lt_fq_oem_1_1280.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Hyundai Sonata',
        type: 'Sedan',
        fuelCapacity: 60,
        rentPrice: 80,
        capacity: 5,
        transmission: 'Automatic',
        location: 'phoenix',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Hyundai Sonata blends modern styling with refined performance. Known for its spacious interior, advanced safety features, and smooth ride, it offers great value and comfort.',
        images: [
          'https://di-uploads-pod27.dealerinspire.com/patriothyundaiofbartlesville/uploads/2021/12/The-New-2022-Hyundai-Sonata.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Jeep Wrangler',
        type: 'SUV',
        fuelCapacity: 70,
        rentPrice: 120,
        capacity: 4,
        transmission: 'Manual',
        location: 'salt lake city',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Jeep Wrangler is the ultimate off-road vehicle, offering unmatched capability and ruggedness. Its iconic design and versatility make it a favorite for adventure enthusiasts.',
        images: [
          'https://images.cars.com/cldstatic/wp-content/uploads/jeep-wrangler-willys-4xe-2023-exterior-oem-02.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Ford Explorer',
        type: 'SUV',
        fuelCapacity: 70,
        rentPrice: 130,
        capacity: 7,
        transmission: 'Automatic',
        location: 'orlando',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Ford Explorer is a versatile SUV that offers spacious seating for seven, making it ideal for family adventures. Equipped with advanced safety features and a powerful engine, it provides a comfortable and secure ride.',
        images: [
          'https://www.motortrend.com/uploads/sites/5/2021/08/2022-Ford-Explorer-ST-Line-17.jpg?fit=around%7C875:492',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Tesla Model Y',
        type: 'SUV',
        fuelCapacity: 0,
        rentPrice: 220,
        capacity: 7,
        transmission: 'Automatic',
        location: 'boulder',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Tesla Model Y is an all-electric SUV that combines performance, safety, and versatility. It offers ample space for passengers and cargo, along with advanced autonomous driving features for a futuristic driving experience.',
        images: [
          'https://media.ed.edmunds-media.com/tesla/model-y/2024/oem/2024_tesla_model-y_4dr-suv_performance_fq_oem_1_1600.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'BMW X5',
        type: 'SUV',
        fuelCapacity: 83,
        rentPrice: 180,
        capacity: 5,
        transmission: 'Automatic',
        location: 'minneapolis',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The BMW X5 is a luxury SUV that offers an exceptional blend of performance, comfort, and technology. With its spacious interior and state-of-the-art features, it provides a superior driving experience.',
        images: [
          'https://images.pistonheads.com/nimg/47190/mceu_62963505811683799246973.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
        ],
      },
      {
        title: 'Audi Q7',
        type: 'SUV',
        fuelCapacity: 75,
        rentPrice: 200,
        capacity: 7,
        transmission: 'Automatic',
        location: 'san antonio',
        userId: 'f47414a4-38ab-42ed-9ff9-af27618afd3a',
        description:
          'The Audi Q7 is a full-size luxury SUV that combines elegance with powerful performance. It features a spacious and sophisticated interior, advanced driving aids, and a smooth, commanding ride.',
        images: [
          'https://www.autotrader.com/wp-content/uploads/2023/10/2024-audi-q7-black-front-right-3qtr.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
          'https://alanarent.ro/uploads/images/cars/img-placeholder.jpg',
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

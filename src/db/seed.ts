import * as mongoose from 'mongoose'
import { User, Court } from '.'

const users = [
  {
    role: 'USER',
    fullName: 'John Doe',
    username: 'johndoe',
    password: '$2b$10$.1CCJBrvzuR1e17YRaMY/ubN87EFsWJ92j8dlsD4BB2fTFPUlSY4O' // 00000000
  },
  {
    role: 'USER',
    fullName: 'Jane Doe',
    username: 'janedoe',
    password: '$2b$10$Gqe1xdwJk55OjbT0q/Ed6.4Pw.yJemsh1tgQ4oqWDPml/5HdE4QWq' // 00000000
  }
]

const courts = [
  {
    name: 'Olathe Community Center',
    numberOfCourts: 3,
    phone: '913-971-8563',
    address: {
      streetNumber: '1205',
      street: 'E Kansas City Rd',
      city: 'Olathe',
      state: 'KS',
      zipCode: '66061',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 38.890247,
      longitude: -94.798611
    },
    type: ['Indoor']
  },
  {
    name: 'Matt Ross Community Center',
    numberOfCourts: 2,
    phone: '913-895-6350',
    address: {
      streetNumber: '8101',
      street: 'Marty St',
      city: 'Overland Park',
      state: 'KS',
      zipCode: '66204',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 38.9822192,
      longitude: -94.669175
    },
    type: ['Indoor']
  },
  {
    name: 'Sylvester Powell, Jr. Community Center',
    numberOfCourts: 2,
    phone: '913-722-8200',
    address: {
      streetNumber: '6200',
      street: 'Martway St',
      city: 'Mission',
      state: 'KS',
      zipCode: '66202',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.0206048,
      longitude: -94.65674039999999
    },
    type: ['Indoor']
  },
  {
    name: 'Irene B. French Community Center',
    numberOfCourts: 1,
    phone: '913-322-5550',
    address: {
      streetNumber: '5701',
      street: 'Merriam Dr',
      city: 'Merriam',
      state: 'KS',
      zipCode: '66203',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.0254844,
      longitude: -94.6932449
    },
    type: ['Indoor']
  },
  {
    name: 'Gladstone Community Center',
    numberOfCourts: 2,
    phone: '816-423-4200',
    address: {
      streetNumber: '6901',
      street: 'N Holmes St',
      city: 'Gladstone',
      state: 'MO',
      zipCode: '64118',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.2205418,
      longitude: -94.5709351
    },
    type: ['Indoor']
  },
  {
    name: 'Westport Roanoke Community Center',
    numberOfCourts: 1,
    phone: '816-513-7660',
    address: {
      streetNumber: '3601',
      street: 'Roanoke Rd',
      city: 'Kansas City',
      state: 'MO',
      zipCode: '64111',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.0603334,
      longitude: -94.6000541
    },
    type: ['Indoor']
  },
  {
    name: 'Tony Aguirre Community Center',
    numberOfCourts: 1,
    phone: '816-513-8530',
    address: {
      streetNumber: '2050',
      street: 'W Pennway St',
      city: 'Kansas City',
      state: 'MO',
      zipCode: '64108',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.0882288,
      longitude: -94.59545639999999
    },
    type: ['Indoor']
  },
  {
    name: 'Platte County South YMCA',
    numberOfCourts: 1,
    phone: '816-505-2622',
    address: {
      streetNumber: '8875',
      street: 'Clark Ave',
      city: 'Parkville',
      state: 'MO',
      zipCode: '64152',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.2069132,
      longitude: -94.68358219999999
    },
    type: ['Indoor']
  },
  {
    name: 'Linwood YMCA',
    numberOfCourts: 1,
    phone: '816-923-5675',
    address: {
      streetNumber: '3800',
      street: 'Linwood Blvd',
      city: 'Kansas City',
      state: 'MO',
      zipCode: '64128',
      country: 'USA',
      timeZone: 'America/Chicago'
    },
    coords: {
      latitude: 39.0681121,
      longitude: -94.5387125
    },
    type: ['Indoor']
  }
]

async function main() {
  try {
    const uri = process.env.MONGO_URI

    await mongoose.connect(uri!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })

    await User.create(users)
    await Court.create(courts)

    await mongoose.disconnect()
  } catch (error) {
    return console.error(error)
  }

  return
}

main()

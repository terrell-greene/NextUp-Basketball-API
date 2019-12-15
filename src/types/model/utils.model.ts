interface Address {
  streetNumber: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Formats address into one long string
export const courtAddress = (address: Address): string => {
  return `${address.streetNumber} ${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
}

import { CountryCode, CountryName } from '@/interfaces/utilities/enums';

export const countries: Array<Record<string, string>> = [
  { id: CountryCode.CL, name: CountryName.Chile },
  { id: CountryCode.MX, name: CountryName.Mexico },
];
export const countryNames = [CountryName.Chile, CountryName.Mexico];

export const getCountryName = (id: string) => (
  countries.find((obj) => obj.id === id)?.name
);

export const getCountryId = (name: string) => (
  countries.find((obj) => obj.name === name)?.id
);

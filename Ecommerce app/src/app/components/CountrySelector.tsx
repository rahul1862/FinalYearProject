import { useCountry } from '../context/CountryContext';
import { products } from '../data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function CountrySelector() {
  const { selectedCountry, setSelectedCountry } = useCountry();

  // Get unique countries from products
  const countries = Array.from(
    new Map(
      products.map(product => [product.country, { flag: product.flag, country: product.country }])
    ).values()
  ).sort((a, b) => a.country.localeCompare(b.country));

  const ALL_VALUE = 'ALL_COUNTRIES';

  return (
    <Select
      value={selectedCountry ?? ALL_VALUE}
      onValueChange={(value) => setSelectedCountry(value === ALL_VALUE ? null : value)}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_VALUE}>All Countries</SelectItem>
        {countries.map(({ flag, country }) => (
          <SelectItem key={country} value={country}>
            {flag} {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

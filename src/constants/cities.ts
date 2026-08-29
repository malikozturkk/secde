import { TR_CITIES, type TrCity } from "@/src/constants/registration";
import { slugify } from "@/src/lib/slug";

export interface CityRoute extends TrCity {
  slug: string;
}

export const CITY_ROUTES: readonly CityRoute[] = TR_CITIES.map((city) => ({
  ...city,
  slug: slugify(city.city),
}));

const CITY_BY_SLUG = new Map(CITY_ROUTES.map((city) => [city.slug, city]));

export const findCityBySlug = (slug: string): CityRoute | undefined =>
  CITY_BY_SLUG.get(slug.toLowerCase());

export const FEATURED_CITY_SLUGS = [
  "istanbul",
  "ankara",
  "izmir",
  "bursa",
  "antalya",
  "konya",
  "adana",
  "gaziantep",
  "kayseri",
  "sanliurfa",
  "diyarbakir",
  "trabzon",
] as const;

export const FEATURED_CITIES: readonly CityRoute[] = FEATURED_CITY_SLUGS.map(
  (slug) => CITY_BY_SLUG.get(slug)
).filter((city): city is CityRoute => Boolean(city));

export function nearbyCities(city: CityRoute, count = 6): CityRoute[] {
  return CITY_ROUTES.filter((candidate) => candidate.slug !== city.slug)
    .map((candidate) => ({
      candidate,
      distance:
        (candidate.latitude - city.latitude) ** 2 +
        (candidate.longitude - city.longitude) ** 2,
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
    .map(({ candidate }) => candidate);
}

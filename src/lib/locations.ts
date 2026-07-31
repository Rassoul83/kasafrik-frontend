export const SENEGAL_CITIES = [
  "Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack",
  "Saly", "Mbour", "Touba", "Tambacounda", "Kolda",
  "Fatick", "Kaffrine", "Matam", "Sédhiou", "Diourbel",
  "Louga", "Tivaouane", "Rufisque", "Pikine", "Guédiawaye",
  "Bargny", "Joal-Fadiouth", "Foundiougne", "Bignona", "Oussouye",
];

export const GUINEA_CITIES = [
  "Conakry", "Kindia", "Labé", "N'Zérékoré", "Kankan",
  "Siguiri", "Coyah", "Dubréka", "Mamou", "Faranah",
  "Boké", "Fria", "Kamsar", "Télimélé", "Pita",
  "Kissidougou", "Guéckédou", "Macenta", "Beyla", "Kérouané",
];

export const OTHER_CITIES = [
  "Abidjan", "Bamako", "Lomé", "Cotonou", "Ouagadougou",
  "Niamey", "Banjul", "Bissau", "Freetown", "Monrovia",
  "Accra", "Lagos", "Douala", "Yaoundé", "Libreville",
  "Brazzaville", "Kinshasa", "Nouakchott", "Casablanca", "Tunis",
];

export interface CityGroup {
  label: string;
  cities: string[];
}

export const CITY_GROUPS: CityGroup[] = [
  { label: "Sénégal", cities: SENEGAL_CITIES },
  { label: "Guinée", cities: GUINEA_CITIES },
  { label: "Autres pays", cities: OTHER_CITIES },
];

export const ALL_CITIES: string[] = [
  ...SENEGAL_CITIES,
  ...GUINEA_CITIES,
  ...OTHER_CITIES,
];

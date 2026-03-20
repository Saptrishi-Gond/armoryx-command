export interface Weapon {
  rank: number;
  name: string;
  country: string;
  countryCode: string;
  range: number;
  speed: number;
  power: number;
  category: string;
}

export const topWeapons: Weapon[] = [
  { rank: 1, name: "RS-28 Sarmat", country: "Russia", countryCode: "🇷🇺", range: 18000, speed: 20.7, power: 98, category: "ICBM" },
  { rank: 2, name: "LGM-30G Minuteman III", country: "USA", countryCode: "🇺🇸", range: 13000, speed: 23.0, power: 95, category: "ICBM" },
  { rank: 3, name: "DF-41", country: "China", countryCode: "🇨🇳", range: 15000, speed: 25.0, power: 94, category: "ICBM" },
  { rank: 4, name: "Agni-V", country: "India", countryCode: "🇮🇳", range: 8000, speed: 24.0, power: 88, category: "ICBM" },
  { rank: 5, name: "Trident II D5", country: "USA", countryCode: "🇺🇸", range: 12000, speed: 18.0, power: 92, category: "SLBM" },
  { rank: 6, name: "Avangard", country: "Russia", countryCode: "🇷🇺", range: 6000, speed: 27.0, power: 91, category: "HGV" },
  { rank: 7, name: "B-2 Spirit", country: "USA", countryCode: "🇺🇸", range: 11100, speed: 0.95, power: 86, category: "Aircraft" },
  { rank: 8, name: "Kinzhal", country: "Russia", countryCode: "🇷🇺", range: 2000, speed: 12.0, power: 84, category: "Hypersonic" },
  { rank: 9, name: "BrahMos-II", country: "India", countryCode: "🇮🇳", range: 600, speed: 7.0, power: 79, category: "Cruise" },
  { rank: 10, name: "Tomahawk Block V", country: "USA", countryCode: "🇺🇸", range: 2500, speed: 0.74, power: 76, category: "Cruise" },
];

export const activityFeed = [
  { time: "00:14", country: "USA", countryCode: "🇺🇸", event: "Satellite recon sweep — Pacific theater" },
  { time: "00:11", country: "Russia", countryCode: "🇷🇺", event: "Sarmat silo maintenance cycle completed" },
  { time: "00:08", country: "China", countryCode: "🇨🇳", event: "Naval fleet repositioned — South China Sea" },
  { time: "00:05", country: "India", countryCode: "🇮🇳", event: "Agni-V telemetry test launch detected" },
  { time: "00:03", country: "UK", countryCode: "🇬🇧", event: "Trident patrol submarine surfaced" },
  { time: "00:01", country: "France", countryCode: "🇫🇷", event: "Rafale squadron deployed — Mediterranean" },
];

export const countryPower = [
  { country: "USA", power: 94 },
  { country: "Russia", power: 91 },
  { country: "China", power: 87 },
  { country: "India", power: 78 },
  { country: "France", power: 72 },
];

export const trendingWeapons = [
  { name: "Avangard", country: "Russia", tag: "Fastest", speed: "Mach 27", range: "6,000 km" },
  { name: "RS-28 Sarmat", country: "Russia", tag: "Most Powerful", speed: "Mach 20.7", range: "18,000 km" },
  { name: "DF-41", country: "China", tag: "Longest Range", speed: "Mach 25", range: "15,000 km" },
  { name: "Kinzhal", country: "Russia", tag: "Air-Launched", speed: "Mach 12", range: "2,000 km" },
];

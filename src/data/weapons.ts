export interface Weapon {
  rank: number;
  name: string;
  country: string;
  countryCode: string;
  range: number;
  speed: number;
  power: number;
  category: string;
  votes: number;
  trend: number; // percentage change
}

export const topWeapons: Weapon[] = [
  { rank: 1, name: "RS-28 Sarmat", country: "Russia", countryCode: "🇷🇺", range: 18000, speed: 20.7, power: 98, category: "ICBM", votes: 14832, trend: 3.2 },
  { rank: 2, name: "LGM-30G Minuteman III", country: "USA", countryCode: "🇺🇸", range: 13000, speed: 23.0, power: 95, category: "ICBM", votes: 13204, trend: 1.8 },
  { rank: 3, name: "DF-41", country: "China", countryCode: "🇨🇳", range: 15000, speed: 25.0, power: 94, category: "ICBM", votes: 12890, trend: 5.1 },
  { rank: 4, name: "Agni-V", country: "India", countryCode: "🇮🇳", range: 8000, speed: 24.0, power: 88, category: "ICBM", votes: 9456, trend: -0.5 },
  { rank: 5, name: "Trident II D5", country: "USA", countryCode: "🇺🇸", range: 12000, speed: 18.0, power: 92, category: "SLBM", votes: 8923, trend: 2.4 },
  { rank: 6, name: "Avangard", country: "Russia", countryCode: "🇷🇺", range: 6000, speed: 27.0, power: 91, category: "HGV", votes: 8410, trend: 7.3 },
  { rank: 7, name: "B-2 Spirit", country: "USA", countryCode: "🇺🇸", range: 11100, speed: 0.95, power: 86, category: "Aircraft", votes: 7654, trend: -1.2 },
  { rank: 8, name: "Kinzhal", country: "Russia", countryCode: "🇷🇺", range: 2000, speed: 12.0, power: 84, category: "Hypersonic", votes: 7102, trend: 4.6 },
  { rank: 9, name: "BrahMos-II", country: "India", countryCode: "🇮🇳", range: 600, speed: 7.0, power: 79, category: "Cruise", votes: 5890, trend: 8.2 },
  { rank: 10, name: "Tomahawk Block V", country: "USA", countryCode: "🇺🇸", range: 2500, speed: 0.74, power: 76, category: "Cruise", votes: 5234, trend: -0.8 },
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
  { country: "USA", code: "🇺🇸", power: 94, change: 1.2 },
  { country: "Russia", code: "🇷🇺", power: 91, change: -0.3 },
  { country: "China", code: "🇨🇳", power: 87, change: 2.8 },
  { country: "India", code: "🇮🇳", power: 78, change: 1.5 },
  { country: "France", code: "🇫🇷", power: 72, change: -0.1 },
  { country: "UK", code: "🇬🇧", power: 70, change: 0.4 },
  { country: "Israel", code: "🇮🇱", power: 68, change: 3.1 },
  { country: "Pakistan", code: "🇵🇰", power: 64, change: -1.2 },
];

export const trendingWeapons = [
  { name: "Avangard", country: "Russia", tag: "Fastest", speed: "Mach 27", range: "6,000 km" },
  { name: "RS-28 Sarmat", country: "Russia", tag: "Most Powerful", speed: "Mach 20.7", range: "18,000 km" },
  { name: "DF-41", country: "China", tag: "Longest Range", speed: "Mach 25", range: "15,000 km" },
  { name: "Kinzhal", country: "Russia", tag: "Air-Launched", speed: "Mach 12", range: "2,000 km" },
];

export const newsFeed = [
  { title: "India successfully tests Agni-V with MIRV capability", country: "India", countryCode: "🇮🇳", time: "2 min ago", category: "Test Launch" },
  { title: "US deploys carrier strike group to Western Pacific", country: "USA", countryCode: "🇺🇸", time: "15 min ago", category: "Deployment" },
  { title: "Russia upgrades Sarmat silo defense systems", country: "Russia", countryCode: "🇷🇺", time: "32 min ago", category: "Upgrade" },
  { title: "China reveals new hypersonic glide vehicle variant", country: "China", countryCode: "🇨🇳", time: "1 hr ago", category: "Development" },
  { title: "UK Trident patrol completes North Atlantic sweep", country: "UK", countryCode: "🇬🇧", time: "2 hr ago", category: "Patrol" },
  { title: "France tests next-gen submarine-launched missile", country: "France", countryCode: "🇫🇷", time: "3 hr ago", category: "Test Launch" },
];

export const techUpdates = [
  { title: "AI-Guided Targeting Systems", desc: "Next-gen autonomous targeting using machine learning for precision strikes", icon: "🤖" },
  { title: "Swarm Drone Technology", desc: "Coordinated drone swarms for reconnaissance and tactical operations", icon: "🛸" },
  { title: "Directed Energy Weapons", desc: "Laser-based defense systems entering operational deployment phase", icon: "⚡" },
];

export const categories = [
  { name: "Missiles", icon: "🚀", count: 342 },
  { name: "Aircraft", icon: "✈️", count: 218 },
  { name: "Naval", icon: "🚢", count: 156 },
  { name: "Tanks", icon: "🛡️", count: 284 },
  { name: "Drones", icon: "🤖", count: 193 },
  { name: "Nuclear", icon: "☢️", count: 54 },
];

export const countryMapData = [
  { country: "USA", code: "🇺🇸", rank: 1, weapons: 1420, air: 520, naval: 380, drones: 340, nuclear: 180 },
  { country: "Russia", code: "🇷🇺", rank: 2, weapons: 1350, air: 480, naval: 290, drones: 280, nuclear: 300 },
  { country: "China", code: "🇨🇳", rank: 3, weapons: 1180, air: 420, naval: 350, drones: 310, nuclear: 100 },
  { country: "India", code: "🇮🇳", rank: 4, weapons: 780, air: 280, naval: 180, drones: 200, nuclear: 120 },
  { country: "UK", code: "🇬🇧", rank: 5, weapons: 520, air: 180, naval: 150, drones: 120, nuclear: 70 },
  { country: "France", code: "🇫🇷", rank: 6, weapons: 490, air: 170, naval: 140, drones: 110, nuclear: 70 },
  { country: "Israel", code: "🇮🇱", rank: 7, weapons: 340, air: 120, naval: 80, drones: 90, nuclear: 50 },
  { country: "Pakistan", code: "🇵🇰", rank: 8, weapons: 310, air: 100, naval: 70, drones: 80, nuclear: 60 },
];

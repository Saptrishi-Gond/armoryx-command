export interface Weapon {
  id: number;
  name: string;
  category: string;
  type: string;
  country: string;
  range_km: number;
  speed_mach: number;
  power_level: number; // 1-10
  platform: string[];
  year: number;
  votes: number;
  trend: number;
}

export const countryFlags: Record<string, string> = {
  "USA": "🇺🇸", "Russia": "🇷🇺", "China": "🇨🇳", "India": "🇮🇳", "UK": "🇬🇧",
  "France": "🇫🇷", "Israel": "🇮🇱", "Pakistan": "🇵🇰", "Germany": "🇩🇪", "Japan": "🇯🇵",
  "South Korea": "🇰🇷", "Turkey": "🇹🇷", "Italy": "🇮🇹", "Sweden": "🇸🇪", "Brazil": "🇧🇷",
  "Taiwan": "🇹🇼", "Australia": "🇦🇺", "Spain": "🇪🇸", "Norway": "🇳🇴", "India/Russia": "🇮🇳",
  "USA/UK": "🇺🇸", "UK/France": "🇬🇧", "South Africa": "🇿🇦", "Iran": "🇮🇷",
  "North Korea": "🇰🇵", "Ukraine": "🇺🇦", "Poland": "🇵🇱", "Netherlands": "🇳🇱",
  "Saudi Arabia": "🇸🇦", "Egypt": "🇪🇬", "Indonesia": "🇮🇩", "Singapore": "🇸🇬",
};

export const getFlag = (country: string): string => countryFlags[country] || "🏳️";

export const allWeapons: Weapon[] = [
  // ═══════════════════════════════════════════════════
  // MISSILES (id 1-50)
  // ═══════════════════════════════════════════════════
  { id: 1, name: "BrahMos", category: "Missile", type: "Cruise", country: "India/Russia", range_km: 500, speed_mach: 3, power_level: 9, platform: ["Land", "Sea", "Air"], year: 2001, votes: 12450, trend: 5.2 },
  { id: 2, name: "Agni-V", category: "Missile", type: "Ballistic", country: "India", range_km: 5000, speed_mach: 20, power_level: 10, platform: ["Land"], year: 2012, votes: 9456, trend: -0.5 },
  { id: 3, name: "Prithvi-II", category: "Missile", type: "Ballistic", country: "India", range_km: 350, speed_mach: 5, power_level: 7, platform: ["Land"], year: 2003, votes: 3200, trend: -1.1 },
  { id: 4, name: "Tomahawk", category: "Missile", type: "Cruise", country: "USA", range_km: 1600, speed_mach: 0.75, power_level: 8, platform: ["Sea", "Air"], year: 1983, votes: 5234, trend: -0.8 },
  { id: 5, name: "Minuteman III", category: "Missile", type: "ICBM", country: "USA", range_km: 13000, speed_mach: 23, power_level: 10, platform: ["Land"], year: 1970, votes: 13204, trend: 1.8 },
  { id: 6, name: "Trident II", category: "Missile", type: "SLBM", country: "USA/UK", range_km: 12000, speed_mach: 24, power_level: 10, platform: ["Sea"], year: 1990, votes: 8923, trend: 2.4 },
  { id: 7, name: "DF-41", category: "Missile", type: "ICBM", country: "China", range_km: 15000, speed_mach: 25, power_level: 10, platform: ["Land"], year: 2017, votes: 12890, trend: 5.1 },
  { id: 8, name: "DF-21D", category: "Missile", type: "Anti-Ship", country: "China", range_km: 1500, speed_mach: 10, power_level: 9, platform: ["Land"], year: 2010, votes: 6780, trend: 3.4 },
  { id: 9, name: "YJ-18", category: "Missile", type: "Cruise", country: "China", range_km: 540, speed_mach: 3, power_level: 8, platform: ["Sea"], year: 2015, votes: 4120, trend: 2.1 },
  { id: 10, name: "Kalibr", category: "Missile", type: "Cruise", country: "Russia", range_km: 2500, speed_mach: 0.8, power_level: 8, platform: ["Sea"], year: 2012, votes: 5890, trend: 1.5 },
  { id: 11, name: "Iskander", category: "Missile", type: "Ballistic", country: "Russia", range_km: 500, speed_mach: 6, power_level: 9, platform: ["Land"], year: 2006, votes: 7200, trend: 4.2 },
  { id: 12, name: "RS-28 Sarmat", category: "Missile", type: "ICBM", country: "Russia", range_km: 18000, speed_mach: 20, power_level: 10, platform: ["Land"], year: 2022, votes: 14832, trend: 3.2 },
  { id: 13, name: "Javelin", category: "Missile", type: "ATGM", country: "USA", range_km: 4, speed_mach: 1.3, power_level: 6, platform: ["Land"], year: 1996, votes: 8900, trend: 6.1 },
  { id: 14, name: "Spike", category: "Missile", type: "ATGM", country: "Israel", range_km: 8, speed_mach: 1.5, power_level: 6, platform: ["Land"], year: 1997, votes: 5600, trend: 2.3 },
  { id: 15, name: "Nirbhay", category: "Missile", type: "Cruise", country: "India", range_km: 1000, speed_mach: 0.8, power_level: 7, platform: ["Land"], year: 2019, votes: 3400, trend: 1.9 },
  { id: 16, name: "Exocet", category: "Missile", type: "Anti-Ship", country: "France", range_km: 200, speed_mach: 0.9, power_level: 7, platform: ["Sea"], year: 1975, votes: 4300, trend: -0.6 },
  { id: 17, name: "Harpoon", category: "Missile", type: "Anti-Ship", country: "USA", range_km: 280, speed_mach: 0.85, power_level: 7, platform: ["Sea", "Air"], year: 1977, votes: 4800, trend: -0.3 },
  { id: 18, name: "Storm Shadow", category: "Missile", type: "Cruise", country: "UK/France", range_km: 560, speed_mach: 0.8, power_level: 8, platform: ["Air"], year: 2002, votes: 6200, trend: 8.5 },
  { id: 19, name: "Kinzhal", category: "Missile", type: "Hypersonic", country: "Russia", range_km: 2000, speed_mach: 10, power_level: 9, platform: ["Air"], year: 2018, votes: 7102, trend: 4.6 },
  { id: 20, name: "Zircon", category: "Missile", type: "Hypersonic", country: "Russia", range_km: 1000, speed_mach: 8, power_level: 9, platform: ["Sea"], year: 2020, votes: 8200, trend: 7.3 },
  { id: 21, name: "Avangard", category: "Missile", type: "Hypersonic", country: "Russia", range_km: 6000, speed_mach: 27, power_level: 10, platform: ["Land"], year: 2019, votes: 8410, trend: 7.3 },
  { id: 22, name: "BrahMos-II", category: "Missile", type: "Hypersonic", country: "India", range_km: 600, speed_mach: 7, power_level: 9, platform: ["Land", "Sea"], year: 2024, votes: 5890, trend: 8.2 },
  { id: 23, name: "SCALP Naval", category: "Missile", type: "Cruise", country: "France", range_km: 1000, speed_mach: 0.8, power_level: 8, platform: ["Sea"], year: 2015, votes: 3100, trend: 1.2 },
  { id: 24, name: "Taurus KEPD 350", category: "Missile", type: "Cruise", country: "Germany", range_km: 500, speed_mach: 0.9, power_level: 8, platform: ["Air"], year: 2005, votes: 4500, trend: 5.0 },
  { id: 25, name: "AGM-158 JASSM", category: "Missile", type: "Cruise", country: "USA", range_km: 370, speed_mach: 0.8, power_level: 8, platform: ["Air"], year: 2009, votes: 5100, trend: 2.5 },
  { id: 26, name: "AGM-183 ARRW", category: "Missile", type: "Hypersonic", country: "USA", range_km: 1600, speed_mach: 17, power_level: 9, platform: ["Air"], year: 2023, votes: 6300, trend: 9.1 },
  { id: 27, name: "Shaheen-III", category: "Missile", type: "Ballistic", country: "Pakistan", range_km: 2750, speed_mach: 14, power_level: 9, platform: ["Land"], year: 2015, votes: 3800, trend: 1.5 },
  { id: 28, name: "DF-17", category: "Missile", type: "Hypersonic", country: "China", range_km: 2500, speed_mach: 10, power_level: 9, platform: ["Land"], year: 2019, votes: 7400, trend: 6.8 },
  { id: 29, name: "Babur", category: "Missile", type: "Cruise", country: "Pakistan", range_km: 700, speed_mach: 0.8, power_level: 7, platform: ["Land", "Sea"], year: 2005, votes: 2900, trend: 0.8 },
  { id: 30, name: "S-400 Missile", category: "Missile", type: "SAM", country: "Russia", range_km: 400, speed_mach: 14, power_level: 9, platform: ["Land"], year: 2007, votes: 9800, trend: 4.1 },
  { id: 31, name: "Patriot PAC-3", category: "Missile", type: "SAM", country: "USA", range_km: 160, speed_mach: 5, power_level: 8, platform: ["Land"], year: 2001, votes: 8600, trend: 5.5 },
  { id: 32, name: "Iron Dome Tamir", category: "Missile", type: "SAM", country: "Israel", range_km: 70, speed_mach: 2.2, power_level: 7, platform: ["Land"], year: 2011, votes: 11200, trend: 9.5 },
  { id: 33, name: "THAAD", category: "Missile", type: "SAM", country: "USA", range_km: 200, speed_mach: 8.2, power_level: 9, platform: ["Land"], year: 2008, votes: 7800, trend: 3.8 },
  { id: 34, name: "Akash", category: "Missile", type: "SAM", country: "India", range_km: 30, speed_mach: 2.5, power_level: 6, platform: ["Land"], year: 2014, votes: 3100, trend: 2.0 },
  { id: 35, name: "LRASM", category: "Missile", type: "Anti-Ship", country: "USA", range_km: 930, speed_mach: 0.85, power_level: 8, platform: ["Air", "Sea"], year: 2018, votes: 4600, trend: 3.2 },
  { id: 36, name: "NSM", category: "Missile", type: "Anti-Ship", country: "Norway", range_km: 185, speed_mach: 0.9, power_level: 7, platform: ["Sea", "Land"], year: 2012, votes: 3200, trend: 2.0 },
  { id: 37, name: "Hyunmoo-4", category: "Missile", type: "Ballistic", country: "South Korea", range_km: 800, speed_mach: 8, power_level: 8, platform: ["Land"], year: 2020, votes: 3900, trend: 4.5 },
  { id: 38, name: "Shaurya", category: "Missile", type: "Ballistic", country: "India", range_km: 1900, speed_mach: 7.5, power_level: 8, platform: ["Land"], year: 2011, votes: 3600, trend: 2.8 },
  { id: 39, name: "Hwasong-18", category: "Missile", type: "ICBM", country: "North Korea", range_km: 15000, speed_mach: 22, power_level: 9, platform: ["Land"], year: 2023, votes: 5400, trend: 7.0 },
  { id: 40, name: "Fateh-313", category: "Missile", type: "Ballistic", country: "Iran", range_km: 500, speed_mach: 5, power_level: 7, platform: ["Land"], year: 2015, votes: 2100, trend: 1.3 },
  { id: 41, name: "CJ-100", category: "Missile", type: "Cruise", country: "China", range_km: 2000, speed_mach: 4, power_level: 8, platform: ["Land"], year: 2019, votes: 3700, trend: 3.5 },
  { id: 42, name: "Oniks", category: "Missile", type: "Anti-Ship", country: "Russia", range_km: 600, speed_mach: 2.6, power_level: 8, platform: ["Sea", "Land"], year: 2002, votes: 4200, trend: 1.8 },
  { id: 43, name: "AGM-88 HARM", category: "Missile", type: "Anti-Radiation", country: "USA", range_km: 150, speed_mach: 2, power_level: 7, platform: ["Air"], year: 1985, votes: 3400, trend: 1.0 },
  { id: 44, name: "R-77", category: "Missile", type: "Air-to-Air", country: "Russia", range_km: 110, speed_mach: 4, power_level: 7, platform: ["Air"], year: 1994, votes: 3800, trend: 1.5 },
  { id: 45, name: "AIM-120 AMRAAM", category: "Missile", type: "Air-to-Air", country: "USA", range_km: 180, speed_mach: 4, power_level: 8, platform: ["Air"], year: 1991, votes: 6200, trend: 2.0 },
  { id: 46, name: "Meteor", category: "Missile", type: "Air-to-Air", country: "UK/France", range_km: 200, speed_mach: 4, power_level: 8, platform: ["Air"], year: 2016, votes: 5400, trend: 3.5 },
  { id: 47, name: "PL-15", category: "Missile", type: "Air-to-Air", country: "China", range_km: 300, speed_mach: 4.5, power_level: 8, platform: ["Air"], year: 2016, votes: 4800, trend: 4.2 },
  { id: 48, name: "Astra Mk-II", category: "Missile", type: "Air-to-Air", country: "India", range_km: 160, speed_mach: 4.5, power_level: 7, platform: ["Air"], year: 2022, votes: 3000, trend: 5.0 },
  { id: 49, name: "Hellfire", category: "Missile", type: "ATGM", country: "USA", range_km: 11, speed_mach: 1.3, power_level: 7, platform: ["Air", "Land"], year: 1984, votes: 7200, trend: 1.2 },
  { id: 50, name: "Nag", category: "Missile", type: "ATGM", country: "India", range_km: 7, speed_mach: 1.4, power_level: 6, platform: ["Land"], year: 2019, votes: 2400, trend: 2.5 },

  // ═══════════════════════════════════════════════════
  // AIRCRAFT (id 51-85)
  // ═══════════════════════════════════════════════════
  { id: 51, name: "F-35 Lightning II", category: "Aircraft", type: "Stealth Fighter", country: "USA", range_km: 2200, speed_mach: 1.6, power_level: 9, platform: ["Air"], year: 2015, votes: 14200, trend: 3.8 },
  { id: 52, name: "F-22 Raptor", category: "Aircraft", type: "Stealth Fighter", country: "USA", range_km: 3000, speed_mach: 2.25, power_level: 10, platform: ["Air"], year: 2005, votes: 15600, trend: 2.1 },
  { id: 53, name: "Su-57 Felon", category: "Aircraft", type: "Stealth Fighter", country: "Russia", range_km: 3500, speed_mach: 2, power_level: 9, platform: ["Air"], year: 2020, votes: 9800, trend: 3.5 },
  { id: 54, name: "Su-35 Flanker-E", category: "Aircraft", type: "Fighter", country: "Russia", range_km: 3600, speed_mach: 2.25, power_level: 9, platform: ["Air"], year: 2014, votes: 7400, trend: 1.2 },
  { id: 55, name: "J-20 Mighty Dragon", category: "Aircraft", type: "Stealth Fighter", country: "China", range_km: 3400, speed_mach: 2, power_level: 9, platform: ["Air"], year: 2017, votes: 8900, trend: 4.8 },
  { id: 56, name: "Rafale", category: "Aircraft", type: "Multirole Fighter", country: "France", range_km: 3700, speed_mach: 1.8, power_level: 9, platform: ["Air"], year: 2001, votes: 9200, trend: 3.2 },
  { id: 57, name: "Tejas Mk-II", category: "Aircraft", type: "Light Fighter", country: "India", range_km: 1700, speed_mach: 1.6, power_level: 7, platform: ["Air"], year: 2016, votes: 7800, trend: 6.5 },
  { id: 58, name: "Gripen E", category: "Aircraft", type: "Fighter", country: "Sweden", range_km: 3200, speed_mach: 2, power_level: 7, platform: ["Air"], year: 1997, votes: 5100, trend: 2.0 },
  { id: 59, name: "F-16 Viper", category: "Aircraft", type: "Fighter", country: "USA", range_km: 4200, speed_mach: 2, power_level: 7, platform: ["Air"], year: 1978, votes: 8400, trend: 0.5 },
  { id: 60, name: "F/A-18 Super Hornet", category: "Aircraft", type: "Fighter", country: "USA", range_km: 3300, speed_mach: 1.8, power_level: 8, platform: ["Air"], year: 1999, votes: 7200, trend: 1.0 },
  { id: 61, name: "Eurofighter Typhoon", category: "Aircraft", type: "Multirole Fighter", country: "Germany", range_km: 3790, speed_mach: 2, power_level: 8, platform: ["Air"], year: 2003, votes: 7600, trend: 1.8 },
  { id: 62, name: "B-2 Spirit", category: "Aircraft", type: "Stealth Bomber", country: "USA", range_km: 11100, speed_mach: 0.95, power_level: 10, platform: ["Air"], year: 1997, votes: 12300, trend: 1.5 },
  { id: 63, name: "B-21 Raider", category: "Aircraft", type: "Stealth Bomber", country: "USA", range_km: 14000, speed_mach: 0.95, power_level: 10, platform: ["Air"], year: 2023, votes: 11800, trend: 12.5 },
  { id: 64, name: "Tu-160 Blackjack", category: "Aircraft", type: "Bomber", country: "Russia", range_km: 12300, speed_mach: 2.05, power_level: 9, platform: ["Air"], year: 1987, votes: 6800, trend: 1.0 },
  { id: 65, name: "H-20", category: "Aircraft", type: "Stealth Bomber", country: "China", range_km: 8500, speed_mach: 0.9, power_level: 9, platform: ["Air"], year: 2025, votes: 7200, trend: 10.2 },
  { id: 66, name: "A-10 Thunderbolt II", category: "Aircraft", type: "Attack", country: "USA", range_km: 1300, speed_mach: 0.56, power_level: 7, platform: ["Air"], year: 1977, votes: 11500, trend: -1.5 },
  { id: 67, name: "Su-25 Frogfoot", category: "Aircraft", type: "Attack", country: "Russia", range_km: 1250, speed_mach: 0.79, power_level: 7, platform: ["Air"], year: 1981, votes: 4200, trend: 0.5 },
  { id: 68, name: "Su-34 Fullback", category: "Aircraft", type: "Fighter-Bomber", country: "Russia", range_km: 4500, speed_mach: 1.8, power_level: 8, platform: ["Air"], year: 2014, votes: 5600, trend: 2.5 },
  { id: 69, name: "F-15EX Eagle II", category: "Aircraft", type: "Fighter", country: "USA", range_km: 3900, speed_mach: 2.5, power_level: 9, platform: ["Air"], year: 2021, votes: 8100, trend: 5.0 },
  { id: 70, name: "JF-17 Thunder", category: "Aircraft", type: "Light Fighter", country: "Pakistan", range_km: 2200, speed_mach: 1.6, power_level: 6, platform: ["Air"], year: 2007, votes: 4800, trend: 2.0 },
  { id: 71, name: "KF-21 Boramae", category: "Aircraft", type: "Fighter", country: "South Korea", range_km: 2900, speed_mach: 1.8, power_level: 8, platform: ["Air"], year: 2024, votes: 5200, trend: 8.5 },
  { id: 72, name: "HAL AMCA", category: "Aircraft", type: "Stealth Fighter", country: "India", range_km: 3000, speed_mach: 2.2, power_level: 8, platform: ["Air"], year: 2026, votes: 4600, trend: 11.0 },
  { id: 73, name: "TAI TF-X Kaan", category: "Aircraft", type: "Stealth Fighter", country: "Turkey", range_km: 2800, speed_mach: 2, power_level: 8, platform: ["Air"], year: 2025, votes: 4100, trend: 9.0 },
  { id: 74, name: "MiG-31 Foxhound", category: "Aircraft", type: "Interceptor", country: "Russia", range_km: 3000, speed_mach: 2.83, power_level: 8, platform: ["Air"], year: 1981, votes: 5500, trend: 0.8 },
  { id: 75, name: "Dassault Mirage 2000", category: "Aircraft", type: "Multirole Fighter", country: "France", range_km: 3340, speed_mach: 2.2, power_level: 7, platform: ["Air"], year: 1984, votes: 4900, trend: -0.5 },
  { id: 76, name: "J-16", category: "Aircraft", type: "Fighter", country: "China", range_km: 3900, speed_mach: 2.4, power_level: 8, platform: ["Air"], year: 2015, votes: 4300, trend: 3.0 },
  { id: 77, name: "MiG-29 Fulcrum", category: "Aircraft", type: "Fighter", country: "Russia", range_km: 2100, speed_mach: 2.25, power_level: 7, platform: ["Air"], year: 1983, votes: 5800, trend: 0.3 },
  { id: 78, name: "C-17 Globemaster III", category: "Aircraft", type: "Transport", country: "USA", range_km: 4482, speed_mach: 0.77, power_level: 5, platform: ["Air"], year: 1995, votes: 3400, trend: 0.2 },
  { id: 79, name: "Il-76", category: "Aircraft", type: "Transport", country: "Russia", range_km: 4000, speed_mach: 0.77, power_level: 5, platform: ["Air"], year: 1974, votes: 2200, trend: 0.1 },
  { id: 80, name: "AC-130J Ghostrider", category: "Aircraft", type: "Gunship", country: "USA", range_km: 4600, speed_mach: 0.52, power_level: 8, platform: ["Air"], year: 2017, votes: 6800, trend: 2.5 },
  { id: 81, name: "P-8 Poseidon", category: "Aircraft", type: "Maritime Patrol", country: "USA", range_km: 7500, speed_mach: 0.83, power_level: 7, platform: ["Air"], year: 2013, votes: 4100, trend: 1.8 },
  { id: 82, name: "E-7 Wedgetail", category: "Aircraft", type: "AEW&C", country: "Australia", range_km: 6500, speed_mach: 0.8, power_level: 7, platform: ["Air"], year: 2009, votes: 2800, trend: 1.5 },
  { id: 83, name: "V-22 Osprey", category: "Aircraft", type: "Tiltrotor", country: "USA", range_km: 1627, speed_mach: 0.4, power_level: 6, platform: ["Air"], year: 2007, votes: 5200, trend: 1.0 },
  { id: 84, name: "AH-64E Apache", category: "Aircraft", type: "Attack Helicopter", country: "USA", range_km: 480, speed_mach: 0.25, power_level: 8, platform: ["Air"], year: 2011, votes: 9400, trend: 2.2 },
  { id: 85, name: "Ka-52 Alligator", category: "Aircraft", type: "Attack Helicopter", country: "Russia", range_km: 520, speed_mach: 0.25, power_level: 8, platform: ["Air"], year: 2011, votes: 5100, trend: 3.0 },

  // ═══════════════════════════════════════════════════
  // NAVAL (id 86-125)
  // ═══════════════════════════════════════════════════
  { id: 86, name: "USS Gerald R. Ford", category: "Naval", type: "Aircraft Carrier", country: "USA", range_km: 22000, speed_mach: 0.04, power_level: 10, platform: ["Sea"], year: 2017, votes: 14500, trend: 3.0 },
  { id: 87, name: "USS Nimitz", category: "Naval", type: "Aircraft Carrier", country: "USA", range_km: 20000, speed_mach: 0.04, power_level: 10, platform: ["Sea"], year: 1975, votes: 12100, trend: 0.5 },
  { id: 88, name: "INS Vikrant", category: "Naval", type: "Aircraft Carrier", country: "India", range_km: 14000, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2022, votes: 7800, trend: 8.0 },
  { id: 89, name: "Liaoning", category: "Naval", type: "Aircraft Carrier", country: "China", range_km: 13000, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2012, votes: 5600, trend: 2.0 },
  { id: 90, name: "Fujian (Type 003)", category: "Naval", type: "Aircraft Carrier", country: "China", range_km: 18000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2024, votes: 8200, trend: 11.0 },
  { id: 91, name: "HMS Queen Elizabeth", category: "Naval", type: "Aircraft Carrier", country: "UK", range_km: 19000, speed_mach: 0.03, power_level: 9, platform: ["Sea"], year: 2017, votes: 6400, trend: 1.5 },
  { id: 92, name: "Charles de Gaulle", category: "Naval", type: "Aircraft Carrier", country: "France", range_km: 22000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2001, votes: 5200, trend: 0.8 },
  { id: 93, name: "USS Virginia (SSN-774)", category: "Naval", type: "Submarine", country: "USA", range_km: 18000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2004, votes: 8900, trend: 3.5 },
  { id: 94, name: "Ohio-class SSBN", category: "Naval", type: "Submarine", country: "USA", range_km: 20000, speed_mach: 0.03, power_level: 10, platform: ["Sea"], year: 1981, votes: 10200, trend: 1.0 },
  { id: 95, name: "Yasen-M (Kazan)", category: "Naval", type: "Submarine", country: "Russia", range_km: 16000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2021, votes: 7600, trend: 5.0 },
  { id: 96, name: "Borei-A class", category: "Naval", type: "Submarine", country: "Russia", range_km: 18000, speed_mach: 0.04, power_level: 10, platform: ["Sea"], year: 2020, votes: 6800, trend: 4.2 },
  { id: 97, name: "Type 096 SSBN", category: "Naval", type: "Submarine", country: "China", range_km: 16000, speed_mach: 0.03, power_level: 9, platform: ["Sea"], year: 2025, votes: 5400, trend: 9.0 },
  { id: 98, name: "INS Arihant", category: "Naval", type: "Submarine", country: "India", range_km: 12000, speed_mach: 0.03, power_level: 8, platform: ["Sea"], year: 2016, votes: 5100, trend: 3.0 },
  { id: 99, name: "HMS Astute", category: "Naval", type: "Submarine", country: "UK", range_km: 16000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2010, votes: 4800, trend: 1.5 },
  { id: 100, name: "Arleigh Burke III", category: "Naval", type: "Destroyer", country: "USA", range_km: 8300, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2024, votes: 7200, trend: 6.0 },
  { id: 101, name: "DDG(X)", category: "Naval", type: "Destroyer", country: "USA", range_km: 10000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2028, votes: 4500, trend: 8.0 },
  { id: 102, name: "Type 055 Renhai", category: "Naval", type: "Destroyer", country: "China", range_km: 9000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2020, votes: 6800, trend: 5.5 },
  { id: 103, name: "INS Visakhapatnam", category: "Naval", type: "Destroyer", country: "India", range_km: 7500, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2021, votes: 4200, trend: 3.8 },
  { id: 104, name: "Admiral Gorshkov", category: "Naval", type: "Frigate", country: "Russia", range_km: 8000, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2018, votes: 5100, trend: 2.8 },
  { id: 105, name: "FREMM Frigate", category: "Naval", type: "Frigate", country: "France", range_km: 11000, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2012, votes: 4300, trend: 1.5 },
  { id: 106, name: "INS Nilgiri (P17A)", category: "Naval", type: "Frigate", country: "India", range_km: 7800, speed_mach: 0.04, power_level: 7, platform: ["Sea"], year: 2024, votes: 3800, trend: 6.0 },
  { id: 107, name: "Type 26 Frigate", category: "Naval", type: "Frigate", country: "UK", range_km: 13000, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2025, votes: 4100, trend: 4.5 },
  { id: 108, name: "Constellation-class", category: "Naval", type: "Frigate", country: "USA", range_km: 11000, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2026, votes: 3900, trend: 5.5 },
  { id: 109, name: "Braunschweig-class", category: "Naval", type: "Corvette", country: "Germany", range_km: 4000, speed_mach: 0.03, power_level: 6, platform: ["Sea"], year: 2008, votes: 2100, trend: 0.5 },
  { id: 110, name: "Visby-class", category: "Naval", type: "Corvette", country: "Sweden", range_km: 4600, speed_mach: 0.04, power_level: 7, platform: ["Sea"], year: 2002, votes: 3200, trend: 1.0 },
  { id: 111, name: "Karakurt-class", category: "Naval", type: "Corvette", country: "Russia", range_km: 4500, speed_mach: 0.04, power_level: 7, platform: ["Sea"], year: 2018, votes: 3400, trend: 2.5 },
  { id: 112, name: "Ticonderoga-class", category: "Naval", type: "Cruiser", country: "USA", range_km: 11000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 1983, votes: 5800, trend: -0.5 },
  { id: 113, name: "Kirov-class Battlecruiser", category: "Naval", type: "Cruiser", country: "Russia", range_km: 14000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 1980, votes: 6200, trend: 0.5 },
  { id: 114, name: "Mistral-class", category: "Naval", type: "Amphibious", country: "France", range_km: 19800, speed_mach: 0.02, power_level: 7, platform: ["Sea"], year: 2006, votes: 2800, trend: 0.8 },
  { id: 115, name: "Wasp-class LHD", category: "Naval", type: "Amphibious", country: "USA", range_km: 18000, speed_mach: 0.03, power_level: 8, platform: ["Sea"], year: 1989, votes: 3600, trend: 0.5 },
  { id: 116, name: "San Antonio-class", category: "Naval", type: "Amphibious", country: "USA", range_km: 16000, speed_mach: 0.03, power_level: 7, platform: ["Sea"], year: 2006, votes: 2900, trend: 0.4 },
  { id: 117, name: "Soryu-class", category: "Naval", type: "Submarine", country: "Japan", range_km: 12000, speed_mach: 0.03, power_level: 7, platform: ["Sea"], year: 2009, votes: 4100, trend: 1.8 },
  { id: 118, name: "Type 214", category: "Naval", type: "Submarine", country: "Germany", range_km: 12000, speed_mach: 0.03, power_level: 7, platform: ["Sea"], year: 2004, votes: 3200, trend: 1.0 },
  { id: 119, name: "Scorpene-class", category: "Naval", type: "Submarine", country: "France", range_km: 10000, speed_mach: 0.03, power_level: 7, platform: ["Sea"], year: 2005, votes: 3800, trend: 2.0 },
  { id: 120, name: "Sejong-class", category: "Naval", type: "Destroyer", country: "South Korea", range_km: 9500, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2008, votes: 3600, trend: 2.5 },
  { id: 121, name: "Kolkata-class", category: "Naval", type: "Destroyer", country: "India", range_km: 7800, speed_mach: 0.04, power_level: 8, platform: ["Sea"], year: 2014, votes: 4000, trend: 2.0 },
  { id: 122, name: "Mogami-class", category: "Naval", type: "Frigate", country: "Japan", range_km: 8000, speed_mach: 0.04, power_level: 7, platform: ["Sea"], year: 2022, votes: 3100, trend: 4.0 },
  { id: 123, name: "AUKUS SSN", category: "Naval", type: "Submarine", country: "Australia", range_km: 20000, speed_mach: 0.04, power_level: 9, platform: ["Sea"], year: 2030, votes: 4600, trend: 12.0 },
  { id: 124, name: "Sa'ar 6", category: "Naval", type: "Corvette", country: "Israel", range_km: 5000, speed_mach: 0.04, power_level: 7, platform: ["Sea"], year: 2020, votes: 2800, trend: 3.5 },
  { id: 125, name: "Dokdo-class", category: "Naval", type: "Amphibious", country: "South Korea", range_km: 18000, speed_mach: 0.03, power_level: 7, platform: ["Sea"], year: 2007, votes: 2400, trend: 1.0 },

  // ═══════════════════════════════════════════════════
  // TANKS & ARMORED (id 126-160)
  // ═══════════════════════════════════════════════════
  { id: 126, name: "M1A2 SEPv3 Abrams", category: "Tank", type: "MBT", country: "USA", range_km: 480, speed_mach: 0.06, power_level: 10, platform: ["Land"], year: 2020, votes: 13200, trend: 2.5 },
  { id: 127, name: "T-14 Armata", category: "Tank", type: "MBT", country: "Russia", range_km: 500, speed_mach: 0.06, power_level: 9, platform: ["Land"], year: 2015, votes: 10800, trend: 3.0 },
  { id: 128, name: "Leopard 2A7+", category: "Tank", type: "MBT", country: "Germany", range_km: 450, speed_mach: 0.06, power_level: 10, platform: ["Land"], year: 2014, votes: 11400, trend: 5.5 },
  { id: 129, name: "Challenger 3", category: "Tank", type: "MBT", country: "UK", range_km: 450, speed_mach: 0.05, power_level: 9, platform: ["Land"], year: 2025, votes: 6200, trend: 7.0 },
  { id: 130, name: "K2 Black Panther", category: "Tank", type: "MBT", country: "South Korea", range_km: 450, speed_mach: 0.06, power_level: 9, platform: ["Land"], year: 2014, votes: 8200, trend: 4.5 },
  { id: 131, name: "Merkava Mk 4", category: "Tank", type: "MBT", country: "Israel", range_km: 500, speed_mach: 0.05, power_level: 9, platform: ["Land"], year: 2004, votes: 9600, trend: 3.8 },
  { id: 132, name: "Type 99A", category: "Tank", type: "MBT", country: "China", range_km: 600, speed_mach: 0.06, power_level: 9, platform: ["Land"], year: 2011, votes: 6400, trend: 2.8 },
  { id: 133, name: "Leclerc", category: "Tank", type: "MBT", country: "France", range_km: 550, speed_mach: 0.06, power_level: 8, platform: ["Land"], year: 1992, votes: 5100, trend: 1.0 },
  { id: 134, name: "Arjun Mk-2", category: "Tank", type: "MBT", country: "India", range_km: 500, speed_mach: 0.06, power_level: 8, platform: ["Land"], year: 2015, votes: 5800, trend: 4.0 },
  { id: 135, name: "T-90MS Tagil", category: "Tank", type: "MBT", country: "Russia", range_km: 550, speed_mach: 0.05, power_level: 8, platform: ["Land"], year: 2011, votes: 6200, trend: 1.5 },
  { id: 136, name: "Type 10", category: "Tank", type: "MBT", country: "Japan", range_km: 400, speed_mach: 0.06, power_level: 8, platform: ["Land"], year: 2012, votes: 4200, trend: 1.2 },
  { id: 137, name: "Altay", category: "Tank", type: "MBT", country: "Turkey", range_km: 450, speed_mach: 0.06, power_level: 8, platform: ["Land"], year: 2023, votes: 4600, trend: 6.0 },
  { id: 138, name: "Bradley M2A4", category: "Tank", type: "IFV", country: "USA", range_km: 480, speed_mach: 0.05, power_level: 7, platform: ["Land"], year: 2021, votes: 5200, trend: 2.0 },
  { id: 139, name: "BMP-3", category: "Tank", type: "IFV", country: "Russia", range_km: 600, speed_mach: 0.06, power_level: 7, platform: ["Land"], year: 1987, votes: 3800, trend: 0.5 },
  { id: 140, name: "Puma IFV", category: "Tank", type: "IFV", country: "Germany", range_km: 600, speed_mach: 0.06, power_level: 7, platform: ["Land"], year: 2015, votes: 4100, trend: 3.0 },
  { id: 141, name: "Kurganets-25", category: "Tank", type: "IFV", country: "Russia", range_km: 800, speed_mach: 0.06, power_level: 8, platform: ["Land"], year: 2020, votes: 3200, trend: 2.5 },
  { id: 142, name: "CV90 Mk IV", category: "Tank", type: "IFV", country: "Sweden", range_km: 600, speed_mach: 0.06, power_level: 7, platform: ["Land"], year: 2018, votes: 3600, trend: 2.0 },
  { id: 143, name: "Stryker ICVD", category: "Tank", type: "APC", country: "USA", range_km: 530, speed_mach: 0.08, power_level: 6, platform: ["Land"], year: 2002, votes: 4200, trend: 1.0 },
  { id: 144, name: "Boxer CRV", category: "Tank", type: "APC", country: "Germany", range_km: 1050, speed_mach: 0.08, power_level: 6, platform: ["Land"], year: 2009, votes: 2900, trend: 1.5 },
  { id: 145, name: "BTR-82A", category: "Tank", type: "APC", country: "Russia", range_km: 600, speed_mach: 0.07, power_level: 6, platform: ["Land"], year: 2013, votes: 2400, trend: 0.5 },
  { id: 146, name: "PzH 2000", category: "Tank", type: "Self-Propelled Artillery", country: "Germany", range_km: 56, speed_mach: 0.05, power_level: 8, platform: ["Land"], year: 1998, votes: 6100, trend: 6.5 },
  { id: 147, name: "M109A7 Paladin", category: "Tank", type: "Self-Propelled Artillery", country: "USA", range_km: 40, speed_mach: 0.05, power_level: 7, platform: ["Land"], year: 2015, votes: 4800, trend: 2.0 },
  { id: 148, name: "K9 Thunder", category: "Tank", type: "Self-Propelled Artillery", country: "South Korea", range_km: 54, speed_mach: 0.05, power_level: 8, platform: ["Land"], year: 1999, votes: 5900, trend: 5.0 },
  { id: 149, name: "CAESAR 8x8", category: "Tank", type: "Self-Propelled Artillery", country: "France", range_km: 55, speed_mach: 0.08, power_level: 7, platform: ["Land"], year: 2008, votes: 4200, trend: 4.0 },
  { id: 150, name: "2S35 Koalitsiya-SV", category: "Tank", type: "Self-Propelled Artillery", country: "Russia", range_km: 70, speed_mach: 0.05, power_level: 8, platform: ["Land"], year: 2020, votes: 3600, trend: 3.0 },
  { id: 151, name: "ATAGS", category: "Tank", type: "Towed Artillery", country: "India", range_km: 48, speed_mach: 0, power_level: 7, platform: ["Land"], year: 2023, votes: 3200, trend: 5.5 },
  { id: 152, name: "M270 MLRS", category: "Tank", type: "Rocket Artillery", country: "USA", range_km: 300, speed_mach: 3, power_level: 8, platform: ["Land"], year: 1983, votes: 5800, trend: 4.0 },
  { id: 153, name: "BM-30 Smerch", category: "Tank", type: "Rocket Artillery", country: "Russia", range_km: 90, speed_mach: 3, power_level: 8, platform: ["Land"], year: 1989, votes: 4100, trend: 1.5 },
  { id: 154, name: "HIMARS", category: "Tank", type: "Rocket Artillery", country: "USA", range_km: 300, speed_mach: 3, power_level: 8, platform: ["Land"], year: 2005, votes: 12400, trend: 11.0 },
  { id: 155, name: "Pinaka Mk-II", category: "Tank", type: "Rocket Artillery", country: "India", range_km: 75, speed_mach: 3, power_level: 7, platform: ["Land"], year: 2020, votes: 4500, trend: 6.0 },
  { id: 156, name: "Namer APC", category: "Tank", type: "APC", country: "Israel", range_km: 500, speed_mach: 0.05, power_level: 7, platform: ["Land"], year: 2008, votes: 3400, trend: 2.0 },
  { id: 157, name: "Al-Khalid II", category: "Tank", type: "MBT", country: "Pakistan", range_km: 450, speed_mach: 0.06, power_level: 7, platform: ["Land"], year: 2017, votes: 3100, trend: 2.5 },
  { id: 158, name: "AMV XP", category: "Tank", type: "APC", country: "Poland", range_km: 700, speed_mach: 0.08, power_level: 6, platform: ["Land"], year: 2018, votes: 2100, trend: 1.5 },
  { id: 159, name: "Type 15 Light Tank", category: "Tank", type: "Light Tank", country: "China", range_km: 450, speed_mach: 0.06, power_level: 7, platform: ["Land"], year: 2018, votes: 3800, trend: 3.0 },
  { id: 160, name: "Eitan APC", category: "Tank", type: "APC", country: "Israel", range_km: 600, speed_mach: 0.07, power_level: 7, platform: ["Land"], year: 2022, votes: 2800, trend: 4.0 },

  // ═══════════════════════════════════════════════════
  // DRONES (id 161-195)
  // ═══════════════════════════════════════════════════
  { id: 161, name: "MQ-9 Reaper", category: "Drone", type: "UCAV", country: "USA", range_km: 1850, speed_mach: 0.27, power_level: 8, platform: ["Air"], year: 2007, votes: 11200, trend: 2.0 },
  { id: 162, name: "MQ-1C Gray Eagle", category: "Drone", type: "UCAV", country: "USA", range_km: 400, speed_mach: 0.2, power_level: 7, platform: ["Air"], year: 2009, votes: 5400, trend: 1.5 },
  { id: 163, name: "RQ-4 Global Hawk", category: "Drone", type: "HALE", country: "USA", range_km: 22780, speed_mach: 0.47, power_level: 6, platform: ["Air"], year: 2001, votes: 7800, trend: 1.0 },
  { id: 164, name: "XQ-58 Valkyrie", category: "Drone", type: "Loyal Wingman", country: "USA", range_km: 5560, speed_mach: 0.85, power_level: 7, platform: ["Air"], year: 2019, votes: 6200, trend: 8.5 },
  { id: 165, name: "MQ-25 Stingray", category: "Drone", type: "Tanker UCAV", country: "USA", range_km: 2800, speed_mach: 0.6, power_level: 6, platform: ["Air", "Sea"], year: 2021, votes: 4800, trend: 5.0 },
  { id: 166, name: "RQ-180 White Bat", category: "Drone", type: "Stealth Recon", country: "USA", range_km: 20000, speed_mach: 0.6, power_level: 8, platform: ["Air"], year: 2019, votes: 5400, trend: 7.0 },
  { id: 167, name: "Bayraktar TB2", category: "Drone", type: "UCAV", country: "Turkey", range_km: 300, speed_mach: 0.16, power_level: 7, platform: ["Air"], year: 2014, votes: 13600, trend: 8.0 },
  { id: 168, name: "Bayraktar Akinci", category: "Drone", type: "UCAV", country: "Turkey", range_km: 750, speed_mach: 0.32, power_level: 8, platform: ["Air"], year: 2021, votes: 8400, trend: 9.5 },
  { id: 169, name: "Bayraktar Kizilelma", category: "Drone", type: "UCAV", country: "Turkey", range_km: 930, speed_mach: 0.9, power_level: 8, platform: ["Air"], year: 2024, votes: 6800, trend: 12.0 },
  { id: 170, name: "Wing Loong II", category: "Drone", type: "UCAV", country: "China", range_km: 4000, speed_mach: 0.2, power_level: 7, platform: ["Air"], year: 2017, votes: 4200, trend: 2.5 },
  { id: 171, name: "CH-7", category: "Drone", type: "Stealth UCAV", country: "China", range_km: 2500, speed_mach: 0.7, power_level: 8, platform: ["Air"], year: 2023, votes: 5100, trend: 8.0 },
  { id: 172, name: "GJ-11 Sharp Sword", category: "Drone", type: "Stealth UCAV", country: "China", range_km: 4000, speed_mach: 0.8, power_level: 8, platform: ["Air"], year: 2019, votes: 4800, trend: 6.0 },
  { id: 173, name: "Okhotnik-B", category: "Drone", type: "Stealth UCAV", country: "Russia", range_km: 6000, speed_mach: 0.8, power_level: 8, platform: ["Air"], year: 2019, votes: 5600, trend: 5.0 },
  { id: 174, name: "Orion (Inokhodets)", category: "Drone", type: "UCAV", country: "Russia", range_km: 300, speed_mach: 0.15, power_level: 6, platform: ["Air"], year: 2020, votes: 3100, trend: 3.0 },
  { id: 175, name: "Heron TP", category: "Drone", type: "MALE", country: "Israel", range_km: 1000, speed_mach: 0.26, power_level: 7, platform: ["Air"], year: 2010, votes: 5200, trend: 2.0 },
  { id: 176, name: "Hermes 900", category: "Drone", type: "MALE", country: "Israel", range_km: 350, speed_mach: 0.18, power_level: 6, platform: ["Air"], year: 2012, votes: 4100, trend: 2.5 },
  { id: 177, name: "Harop", category: "Drone", type: "Kamikaze", country: "Israel", range_km: 1000, speed_mach: 0.3, power_level: 7, platform: ["Air"], year: 2009, votes: 6400, trend: 5.0 },
  { id: 178, name: "Switchblade 600", category: "Drone", type: "Kamikaze", country: "USA", range_km: 90, speed_mach: 0.15, power_level: 6, platform: ["Land"], year: 2020, votes: 7200, trend: 10.0 },
  { id: 179, name: "Lancet-3", category: "Drone", type: "Kamikaze", country: "Russia", range_km: 70, speed_mach: 0.25, power_level: 6, platform: ["Land"], year: 2022, votes: 6800, trend: 11.0 },
  { id: 180, name: "Shahed-136", category: "Drone", type: "Kamikaze", country: "Iran", range_km: 2500, speed_mach: 0.14, power_level: 6, platform: ["Land"], year: 2021, votes: 8200, trend: 13.0 },
  { id: 181, name: "Tapas BH-201", category: "Drone", type: "MALE", country: "India", range_km: 250, speed_mach: 0.18, power_level: 5, platform: ["Air"], year: 2022, votes: 2400, trend: 4.0 },
  { id: 182, name: "Rustom-2", category: "Drone", type: "MALE", country: "India", range_km: 250, speed_mach: 0.19, power_level: 6, platform: ["Air"], year: 2020, votes: 3200, trend: 5.0 },
  { id: 183, name: "Ghatak UCAV", category: "Drone", type: "Stealth UCAV", country: "India", range_km: 2000, speed_mach: 0.8, power_level: 7, platform: ["Air"], year: 2025, votes: 4100, trend: 10.0 },
  { id: 184, name: "nEUROn", category: "Drone", type: "Stealth UCAV", country: "France", range_km: 3000, speed_mach: 0.8, power_level: 7, platform: ["Air"], year: 2012, votes: 3800, trend: 1.5 },
  { id: 185, name: "Taranis", category: "Drone", type: "Stealth UCAV", country: "UK", range_km: 3500, speed_mach: 0.9, power_level: 7, platform: ["Air"], year: 2013, votes: 3200, trend: 1.0 },
  { id: 186, name: "MQ-28 Ghost Bat", category: "Drone", type: "Loyal Wingman", country: "Australia", range_km: 3700, speed_mach: 0.9, power_level: 7, platform: ["Air"], year: 2021, votes: 4600, trend: 7.0 },
  { id: 187, name: "Anka-3", category: "Drone", type: "Stealth UCAV", country: "Turkey", range_km: 2000, speed_mach: 0.7, power_level: 7, platform: ["Air"], year: 2024, votes: 3900, trend: 9.0 },
  { id: 188, name: "LCAAS Archer", category: "Drone", type: "Loyal Wingman", country: "India", range_km: 800, speed_mach: 0.7, power_level: 6, platform: ["Air"], year: 2026, votes: 2100, trend: 8.0 },
  { id: 189, name: "Wing Loong III", category: "Drone", type: "UCAV", country: "China", range_km: 6000, speed_mach: 0.3, power_level: 7, platform: ["Air"], year: 2024, votes: 3400, trend: 6.0 },
  { id: 190, name: "Puma AE", category: "Drone", type: "Reconnaissance", country: "USA", range_km: 20, speed_mach: 0.05, power_level: 3, platform: ["Land"], year: 2008, votes: 2100, trend: 0.5 },
  { id: 191, name: "ScanEagle", category: "Drone", type: "Reconnaissance", country: "USA", range_km: 100, speed_mach: 0.07, power_level: 3, platform: ["Sea", "Land"], year: 2005, votes: 2800, trend: 0.5 },
  { id: 192, name: "Black Hornet Nano", category: "Drone", type: "Micro UAV", country: "Norway", range_km: 2, speed_mach: 0.02, power_level: 2, platform: ["Land"], year: 2012, votes: 4800, trend: 3.0 },
  { id: 193, name: "KARGU-2", category: "Drone", type: "Kamikaze", country: "Turkey", range_km: 10, speed_mach: 0.1, power_level: 5, platform: ["Land"], year: 2020, votes: 3600, trend: 5.0 },
  { id: 194, name: "Loyal Wingman CCA", category: "Drone", type: "Loyal Wingman", country: "USA", range_km: 3200, speed_mach: 0.9, power_level: 8, platform: ["Air"], year: 2025, votes: 5800, trend: 11.0 },
  { id: 195, name: "Dogo", category: "Drone", type: "Ground Robot", country: "Israel", range_km: 5, speed_mach: 0.01, power_level: 4, platform: ["Land"], year: 2020, votes: 3200, trend: 4.0 },

  // ═══════════════════════════════════════════════════
  // NUCLEAR (id 196-210)
  // ═══════════════════════════════════════════════════
  { id: 196, name: "B83 Nuclear Bomb", category: "Nuclear", type: "Gravity Bomb", country: "USA", range_km: 0, speed_mach: 0, power_level: 10, platform: ["Air"], year: 1983, votes: 8400, trend: -1.0 },
  { id: 197, name: "W88 Warhead", category: "Nuclear", type: "Warhead", country: "USA", range_km: 0, speed_mach: 0, power_level: 10, platform: ["Sea"], year: 1988, votes: 7200, trend: 0.5 },
  { id: 198, name: "W76-2 Warhead", category: "Nuclear", type: "Warhead", country: "USA", range_km: 0, speed_mach: 0, power_level: 8, platform: ["Sea"], year: 2019, votes: 4600, trend: 3.0 },
  { id: 199, name: "RS-24 Yars", category: "Nuclear", type: "ICBM System", country: "Russia", range_km: 11000, speed_mach: 20, power_level: 10, platform: ["Land"], year: 2010, votes: 6800, trend: 1.5 },
  { id: 200, name: "Tsar Bomba Legacy", category: "Nuclear", type: "Historical", country: "Russia", range_km: 0, speed_mach: 0, power_level: 10, platform: ["Air"], year: 1961, votes: 15200, trend: 0.2 },
  { id: 201, name: "Agni-P", category: "Nuclear", type: "Canisterized MRBM", country: "India", range_km: 2000, speed_mach: 12, power_level: 8, platform: ["Land"], year: 2021, votes: 4200, trend: 6.0 },
  { id: 202, name: "K-4 SLBM", category: "Nuclear", type: "SLBM", country: "India", range_km: 3500, speed_mach: 15, power_level: 9, platform: ["Sea"], year: 2020, votes: 3800, trend: 5.0 },
  { id: 203, name: "DF-5B", category: "Nuclear", type: "ICBM System", country: "China", range_km: 13000, speed_mach: 22, power_level: 10, platform: ["Land"], year: 1981, votes: 4600, trend: 1.0 },
  { id: 204, name: "JL-3 SLBM", category: "Nuclear", type: "SLBM", country: "China", range_km: 12000, speed_mach: 20, power_level: 9, platform: ["Sea"], year: 2021, votes: 4100, trend: 5.5 },
  { id: 205, name: "M51 SLBM", category: "Nuclear", type: "SLBM", country: "France", range_km: 10000, speed_mach: 20, power_level: 9, platform: ["Sea"], year: 2010, votes: 3600, trend: 1.2 },
  { id: 206, name: "Trident (UK)", category: "Nuclear", type: "SLBM", country: "UK", range_km: 12000, speed_mach: 24, power_level: 10, platform: ["Sea"], year: 1994, votes: 4800, trend: 0.8 },
  { id: 207, name: "Shaheen-III Nuclear", category: "Nuclear", type: "MRBM System", country: "Pakistan", range_km: 2750, speed_mach: 14, power_level: 9, platform: ["Land"], year: 2015, votes: 3200, trend: 1.5 },
  { id: 208, name: "Jericho III", category: "Nuclear", type: "ICBM System", country: "Israel", range_km: 6500, speed_mach: 20, power_level: 9, platform: ["Land"], year: 2008, votes: 3800, trend: 1.0 },
  { id: 209, name: "Poseidon Torpedo", category: "Nuclear", type: "Nuclear Torpedo", country: "Russia", range_km: 10000, speed_mach: 0.09, power_level: 10, platform: ["Sea"], year: 2023, votes: 7800, trend: 8.0 },
  { id: 210, name: "Burevestnik", category: "Nuclear", type: "Nuclear Cruise Missile", country: "Russia", range_km: 22000, speed_mach: 0.8, power_level: 10, platform: ["Land"], year: 2025, votes: 6200, trend: 7.0 },

  // ═══════════════════════════════════════════════════
  // RADAR & DEFENSE SYSTEMS (id 211-230)
  // ═══════════════════════════════════════════════════
  { id: 211, name: "AN/TPY-2 (THAAD Radar)", category: "Radar", type: "Early Warning", country: "USA", range_km: 1000, speed_mach: 0, power_level: 9, platform: ["Land"], year: 2006, votes: 5200, trend: 2.0 },
  { id: 212, name: "AN/SPY-6 AMDR", category: "Radar", type: "AESA Naval", country: "USA", range_km: 550, speed_mach: 0, power_level: 9, platform: ["Sea"], year: 2022, votes: 4800, trend: 5.0 },
  { id: 213, name: "Voronezh-DM", category: "Radar", type: "Early Warning", country: "Russia", range_km: 6000, speed_mach: 0, power_level: 9, platform: ["Land"], year: 2009, votes: 3600, trend: 1.5 },
  { id: 214, name: "SAMPSON Radar", category: "Radar", type: "AESA Naval", country: "UK", range_km: 400, speed_mach: 0, power_level: 7, platform: ["Sea"], year: 2006, votes: 2800, trend: 1.0 },
  { id: 215, name: "S-500 Prometheus", category: "Radar", type: "Air Defense System", country: "Russia", range_km: 600, speed_mach: 0, power_level: 10, platform: ["Land"], year: 2021, votes: 7200, trend: 6.0 },
  { id: 216, name: "Iron Dome System", category: "Radar", type: "Air Defense System", country: "Israel", range_km: 70, speed_mach: 0, power_level: 8, platform: ["Land"], year: 2011, votes: 14200, trend: 9.0 },
  { id: 217, name: "David's Sling", category: "Radar", type: "Air Defense System", country: "Israel", range_km: 300, speed_mach: 0, power_level: 8, platform: ["Land"], year: 2017, votes: 5600, trend: 5.0 },
  { id: 218, name: "Arrow 3", category: "Radar", type: "ABM System", country: "Israel", range_km: 2400, speed_mach: 9, power_level: 9, platform: ["Land"], year: 2017, votes: 6200, trend: 6.5 },
  { id: 219, name: "Aegis BMD", category: "Radar", type: "Naval BMD", country: "USA", range_km: 500, speed_mach: 0, power_level: 9, platform: ["Sea"], year: 2004, votes: 7800, trend: 3.0 },
  { id: 220, name: "SAMP/T Aster 30", category: "Radar", type: "Air Defense System", country: "France", range_km: 120, speed_mach: 4.5, power_level: 7, platform: ["Land"], year: 2008, votes: 3200, trend: 3.0 },
  { id: 221, name: "HQ-9B", category: "Radar", type: "Air Defense System", country: "China", range_km: 300, speed_mach: 4.2, power_level: 8, platform: ["Land"], year: 2018, votes: 4100, trend: 3.5 },
  { id: 222, name: "Barak-8", category: "Radar", type: "Air Defense System", country: "Israel", range_km: 100, speed_mach: 2, power_level: 7, platform: ["Sea", "Land"], year: 2014, votes: 4600, trend: 3.0 },
  { id: 223, name: "Pantsir-S1", category: "Radar", type: "SHORAD", country: "Russia", range_km: 20, speed_mach: 3, power_level: 7, platform: ["Land"], year: 2012, votes: 5100, trend: 2.5 },
  { id: 224, name: "AN/APG-81 (F-35)", category: "Radar", type: "AESA Fighter", country: "USA", range_km: 300, speed_mach: 0, power_level: 9, platform: ["Air"], year: 2011, votes: 4200, trend: 2.0 },
  { id: 225, name: "Irbis-E (Su-35)", category: "Radar", type: "PESA Fighter", country: "Russia", range_km: 400, speed_mach: 0, power_level: 8, platform: ["Air"], year: 2007, votes: 3100, trend: 1.0 },
  { id: 226, name: "DRDO LRDE AESA", category: "Radar", type: "AESA Fighter", country: "India", range_km: 200, speed_mach: 0, power_level: 7, platform: ["Air"], year: 2022, votes: 2800, trend: 5.0 },
  { id: 227, name: "Swordfish Radar", category: "Radar", type: "Early Warning", country: "India", range_km: 800, speed_mach: 0, power_level: 8, platform: ["Land"], year: 2011, votes: 2400, trend: 2.0 },
  { id: 228, name: "Green Pine", category: "Radar", type: "ABM Radar", country: "Israel", range_km: 900, speed_mach: 0, power_level: 8, platform: ["Land"], year: 2000, votes: 3200, trend: 1.5 },
  { id: 229, name: "NASAMS", category: "Radar", type: "Air Defense System", country: "Norway", range_km: 40, speed_mach: 3, power_level: 7, platform: ["Land"], year: 1994, votes: 5800, trend: 7.0 },
  { id: 230, name: "Gepard SPAAG", category: "Radar", type: "SHORAD", country: "Germany", range_km: 5, speed_mach: 0, power_level: 6, platform: ["Land"], year: 1976, votes: 4200, trend: 8.0 },
];

// ═══════════════════════════════════════════════════
// DERIVED DATA (for dashboard panels)
// ═══════════════════════════════════════════════════

export const categories = [
  { name: "Missiles", icon: "🚀", count: allWeapons.filter(w => w.category === "Missile").length },
  { name: "Aircraft", icon: "✈️", count: allWeapons.filter(w => w.category === "Aircraft").length },
  { name: "Naval", icon: "🚢", count: allWeapons.filter(w => w.category === "Naval").length },
  { name: "Tanks", icon: "🛡️", count: allWeapons.filter(w => w.category === "Tank").length },
  { name: "Drones", icon: "🤖", count: allWeapons.filter(w => w.category === "Drone").length },
  { name: "Nuclear", icon: "☢️", count: allWeapons.filter(w => w.category === "Nuclear").length },
  { name: "Radar", icon: "📡", count: allWeapons.filter(w => w.category === "Radar").length },
];

// Top 10 by votes for leaderboard
export const topWeapons = [...allWeapons].sort((a, b) => b.votes - a.votes).slice(0, 10);

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
  { name: "Shahed-136", country: "Iran", tag: "Most Trending", speed: "Mach 0.14", range: "2,500 km" },
  { name: "B-21 Raider", country: "USA", tag: "Newest Bomber", speed: "Mach 0.95", range: "14,000 km" },
  { name: "Bayraktar TB2", country: "Turkey", tag: "Most Popular Drone", speed: "Mach 0.16", range: "300 km" },
  { name: "HIMARS", country: "USA", tag: "Battle Proven", speed: "Mach 3", range: "300 km" },
  { name: "Iron Dome System", country: "Israel", tag: "Best Defense", speed: "—", range: "70 km" },
];

export const newsFeed = [
  { title: "India successfully tests Agni-V with MIRV capability", country: "India", countryCode: "🇮🇳", time: "2 min ago", category: "Test Launch" },
  { title: "US deploys carrier strike group to Western Pacific", country: "USA", countryCode: "🇺🇸", time: "15 min ago", category: "Deployment" },
  { title: "Russia upgrades Sarmat silo defense systems", country: "Russia", countryCode: "🇷🇺", time: "32 min ago", category: "Upgrade" },
  { title: "China reveals new hypersonic glide vehicle variant", country: "China", countryCode: "🇨🇳", time: "1 hr ago", category: "Development" },
  { title: "Turkey tests Bayraktar Kizilelma jet drone", country: "Turkey", countryCode: "🇹🇷", time: "2 hr ago", category: "Test" },
  { title: "South Korea K2 tank order expanded to 200 units", country: "South Korea", countryCode: "🇰🇷", time: "3 hr ago", category: "Production" },
];

export const techUpdates = [
  { title: "AI-Guided Targeting Systems", desc: "Next-gen autonomous targeting using machine learning for precision strikes", icon: "🤖" },
  { title: "Swarm Drone Technology", desc: "Coordinated drone swarms for reconnaissance and tactical operations", icon: "🛸" },
  { title: "Directed Energy Weapons", desc: "Laser-based defense systems entering operational deployment phase", icon: "⚡" },
];

export const countryMapData = [
  { country: "USA", code: "🇺🇸", rank: 1, weapons: allWeapons.filter(w => w.country === "USA").length, air: 520, naval: 380, drones: 340, nuclear: 180 },
  { country: "Russia", code: "🇷🇺", rank: 2, weapons: allWeapons.filter(w => w.country === "Russia").length, air: 480, naval: 290, drones: 280, nuclear: 300 },
  { country: "China", code: "🇨🇳", rank: 3, weapons: allWeapons.filter(w => w.country === "China").length, air: 420, naval: 350, drones: 310, nuclear: 100 },
  { country: "India", code: "🇮🇳", rank: 4, weapons: allWeapons.filter(w => w.country === "India").length, air: 280, naval: 180, drones: 200, nuclear: 120 },
  { country: "UK", code: "🇬🇧", rank: 5, weapons: allWeapons.filter(w => w.country === "UK").length, air: 180, naval: 150, drones: 120, nuclear: 70 },
  { country: "France", code: "🇫🇷", rank: 6, weapons: allWeapons.filter(w => w.country === "France").length, air: 170, naval: 140, drones: 110, nuclear: 70 },
  { country: "Israel", code: "🇮🇱", rank: 7, weapons: allWeapons.filter(w => w.country === "Israel").length, air: 120, naval: 80, drones: 90, nuclear: 50 },
  { country: "Turkey", code: "🇹🇷", rank: 8, weapons: allWeapons.filter(w => w.country === "Turkey").length, air: 100, naval: 70, drones: 150, nuclear: 0 },
];

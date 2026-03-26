import missileImg from "@/assets/weapons/missile.png";
import aircraftImg from "@/assets/weapons/aircraft.png";
import navalImg from "@/assets/weapons/naval.png";
import tankImg from "@/assets/weapons/tank.png";
import droneImg from "@/assets/weapons/drone.png";
import nuclearImg from "@/assets/weapons/nuclear.png";
import radarImg from "@/assets/weapons/radar.png";
import destroyerImg from "@/assets/weapons/destroyer.png";
import submarineImg from "@/assets/weapons/submarine.png";
import carrierImg from "@/assets/weapons/carrier.png";
import fighterImg from "@/assets/weapons/fighter.png";
import bomberImg from "@/assets/weapons/bomber.png";
import helicopterImg from "@/assets/weapons/helicopter.png";
import frigateImg from "@/assets/weapons/frigate.png";
import artilleryImg from "@/assets/weapons/artillery.png";
import icbmImg from "@/assets/weapons/icbm.png";
import kamikazeDroneImg from "@/assets/weapons/kamikaze-drone.png";

const categoryImages: Record<string, string> = {
  Missile: missileImg,
  Aircraft: aircraftImg,
  Naval: navalImg,
  Tank: tankImg,
  Drone: droneImg,
  Nuclear: nuclearImg,
  Radar: radarImg,
};

// More specific type-based images
const typeImages: Record<string, string> = {
  // Naval sub-types
  "Aircraft Carrier": carrierImg,
  "Destroyer": destroyerImg,
  "Submarine": submarineImg,
  "Frigate": frigateImg,
  "Corvette": navalImg,
  // Aircraft sub-types
  "Stealth Fighter": fighterImg,
  "Fighter": fighterImg,
  "Multirole Fighter": fighterImg,
  "Light Fighter": fighterImg,
  "Interceptor": fighterImg,
  "Stealth Bomber": bomberImg,
  "Bomber": bomberImg,
  "Fighter-Bomber": bomberImg,
  "Attack": aircraftImg,
  "Gunship": aircraftImg,
  "Attack Helicopter": helicopterImg,
  "Tiltrotor": helicopterImg,
  "Transport": aircraftImg,
  "AEW&C": aircraftImg,
  "Maritime Patrol": aircraftImg,
  // Tank sub-types
  "Self-Propelled Artillery": artilleryImg,
  "Towed Artillery": artilleryImg,
  "Rocket Artillery": artilleryImg,
  "MBT": tankImg,
  "IFV": tankImg,
  "APC": tankImg,
  "Light Tank": tankImg,
  // Missile sub-types
  "ICBM": icbmImg,
  "ICBM System": icbmImg,
  "SLBM": icbmImg,
  "Ballistic": missileImg,
  "Cruise": missileImg,
  "Hypersonic": missileImg,
  "Anti-Ship": missileImg,
  "SAM": radarImg,
  "ATGM": missileImg,
  "Air-to-Air": missileImg,
  "Anti-Radiation": missileImg,
  // Drone sub-types
  "Kamikaze": kamikazeDroneImg,
  "UCAV": droneImg,
  "Stealth UCAV": droneImg,
  "Loyal Wingman": droneImg,
  "HALE": droneImg,
  "MALE": droneImg,
  "Reconnaissance": droneImg,
  "Micro UAV": droneImg,
  "Ground Robot": droneImg,
  "Stealth Recon": droneImg,
  "Tanker UCAV": droneImg,
  // Nuclear sub-types
  "Gravity Bomb": nuclearImg,
  "Warhead": nuclearImg,
  "Nuclear Torpedo": submarineImg,
  "Nuclear Cruise Missile": icbmImg,
  "Canisterized MRBM": icbmImg,
  "MRBM System": icbmImg,
  "Historical": nuclearImg,
  // Radar sub-types
  "Air Defense System": radarImg,
  "ABM System": radarImg,
  "Naval BMD": radarImg,
  "SHORAD": radarImg,
  "Early Warning": radarImg,
  "AESA Naval": radarImg,
  "AESA Fighter": radarImg,
  "PESA Fighter": radarImg,
  "ABM Radar": radarImg,
};

export const getWeaponImage = (category: string, type?: string): string => {
  if (type && typeImages[type]) return typeImages[type];
  return categoryImages[category] || missileImg;
};

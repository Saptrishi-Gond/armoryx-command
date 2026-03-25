import missileImg from "@/assets/weapons/missile.png";
import aircraftImg from "@/assets/weapons/aircraft.png";
import navalImg from "@/assets/weapons/naval.png";
import tankImg from "@/assets/weapons/tank.png";
import droneImg from "@/assets/weapons/drone.png";
import nuclearImg from "@/assets/weapons/nuclear.png";
import radarImg from "@/assets/weapons/radar.png";

const categoryImages: Record<string, string> = {
  Missile: missileImg,
  Aircraft: aircraftImg,
  Naval: navalImg,
  Tank: tankImg,
  Drone: droneImg,
  Nuclear: nuclearImg,
  Radar: radarImg,
};

export const getWeaponImage = (category: string): string =>
  categoryImages[category] || missileImg;

export interface DomainNode {
  name: string;
  icon?: string;
  children?: DomainNode[];
  description?: string;
}

export const warDomains: DomainNode[] = [
  {
    name: "Land Warfare",
    icon: "🟢",
    description: "Ground-based military operations including infantry, armored, and artillery forces",
    children: [
      { name: "Infantry", description: "Foot soldiers and mechanized infantry units" },
      { name: "Tanks & Armored Vehicles", description: "Main battle tanks, IFVs, and APCs", children: [
        { name: "Main Battle Tanks (MBT)" },
        { name: "Infantry Fighting Vehicles (IFV)" },
        { name: "Armored Personnel Carriers (APC)" },
        { name: "Light Tanks" },
        { name: "MRAP Vehicles" },
      ]},
      { name: "Artillery", description: "Indirect fire support systems", children: [
        { name: "Self-Propelled Artillery" },
        { name: "Towed Artillery" },
        { name: "Rocket Artillery (MLRS)" },
        { name: "Mortars" },
      ]},
      { name: "Special Forces", description: "Elite commando and special operations units" },
      { name: "Military Logistics", description: "Transport, supply chain, fuel & ammunition" },
    ],
  },
  {
    name: "Naval Warfare",
    icon: "🔵",
    description: "Maritime military operations across surface, sub-surface, and coastal domains",
    children: [
      { name: "Aircraft Carriers", description: "Capital ships serving as mobile air bases" },
      { name: "Destroyers", description: "Multi-mission surface combatants" },
      { name: "Frigates", description: "Escort and patrol warships" },
      { name: "Corvettes", description: "Small, agile coastal warships" },
      { name: "Submarines", description: "Sub-surface warfare platforms", children: [
        { name: "Nuclear Attack Submarines (SSN)" },
        { name: "Ballistic Missile Submarines (SSBN)" },
        { name: "Diesel-Electric Submarines (SSK)" },
      ]},
      { name: "Amphibious Ships", description: "Landing and expeditionary warfare vessels" },
      { name: "Patrol Boats", description: "Coastal and riverine patrol craft" },
    ],
  },
  {
    name: "Air Warfare",
    icon: "🔴",
    description: "Aerial combat, air superiority, and air support operations",
    children: [
      { name: "Fighter Jets", description: "Air superiority and multirole combat aircraft", children: [
        { name: "Stealth Fighters (5th Gen)" },
        { name: "Multirole Fighters (4.5th Gen)" },
        { name: "Light Combat Aircraft" },
        { name: "Interceptors" },
      ]},
      { name: "Bombers", description: "Strategic and tactical bombing platforms", children: [
        { name: "Stealth Bombers" },
        { name: "Strategic Bombers" },
        { name: "Fighter-Bombers" },
      ]},
      { name: "Attack Aircraft", description: "Close air support and ground attack" },
      { name: "Transport Aircraft", description: "Strategic and tactical airlift" },
      { name: "Helicopters", description: "Rotary-wing combat and utility", children: [
        { name: "Attack Helicopters" },
        { name: "Utility Helicopters" },
        { name: "Transport Helicopters" },
      ]},
      { name: "Special Mission Aircraft", description: "AWACS, maritime patrol, electronic warfare" },
    ],
  },
  {
    name: "Space Warfare",
    icon: "🟣",
    description: "Military operations in outer space and orbital domains",
    children: [
      { name: "Military Satellites", description: "Communications, reconnaissance, and navigation" },
      { name: "Anti-Satellite Weapons (ASAT)", description: "Kinetic and directed-energy ASAT systems" },
      { name: "Space Surveillance", description: "Space situational awareness systems" },
      { name: "Space-Based Interceptors", description: "Conceptual orbital defense platforms" },
    ],
  },
  {
    name: "Cyber Warfare",
    icon: "⚫",
    description: "Digital domain operations including offensive and defensive cyber capabilities",
    children: [
      { name: "Offensive Cyber Operations", description: "Hacking, malware, infrastructure disruption" },
      { name: "Cyber Espionage", description: "Intelligence gathering through digital means" },
      { name: "Defensive Cyber", description: "Network defense, firewalls, threat detection" },
      { name: "Information Warfare", description: "Propaganda, disinformation, psychological ops" },
    ],
  },
  {
    name: "Electronic Warfare",
    icon: "🟡",
    description: "Electromagnetic spectrum operations for detection, disruption, and protection",
    children: [
      { name: "Radar Jamming", description: "Active and passive radar countermeasures" },
      { name: "Signal Interception (SIGINT)", description: "Electronic intelligence gathering" },
      { name: "Communication Disruption", description: "Jamming and denial of communications" },
      { name: "Electronic Protection", description: "Hardening systems against EW attacks" },
    ],
  },
  {
    name: "Nuclear Warfare",
    icon: "☢️",
    description: "Nuclear deterrence and strategic weapons systems",
    children: [
      { name: "ICBMs", description: "Intercontinental ballistic missiles" },
      { name: "SLBMs", description: "Submarine-launched ballistic missiles" },
      { name: "Nuclear Gravity Bombs", description: "Air-delivered nuclear weapons" },
      { name: "Tactical Nuclear Weapons", description: "Short-range nuclear warheads" },
      { name: "Nuclear Torpedo Systems", description: "Underwater nuclear delivery" },
    ],
  },
  {
    name: "Drone & Autonomous Systems",
    icon: "🤖",
    description: "Unmanned and autonomous combat, recon, and support platforms",
    children: [
      { name: "UCAV (Combat Drones)", description: "Armed unmanned combat aerial vehicles" },
      { name: "Reconnaissance Drones", description: "HALE, MALE, and tactical ISR platforms" },
      { name: "Kamikaze / Loitering Munitions", description: "One-way attack drones" },
      { name: "Loyal Wingman", description: "AI-piloted combat drones paired with manned aircraft" },
      { name: "Drone Swarms", description: "Coordinated autonomous drone formations" },
      { name: "Ground Robots", description: "Unmanned ground vehicles for combat and EOD" },
      { name: "Naval Drones", description: "Unmanned surface and underwater vehicles" },
    ],
  },
  {
    name: "Missile Systems",
    icon: "🚀",
    description: "Guided and unguided missile weapons across all domains",
    children: [
      { name: "Ballistic Missiles", description: "Parabolic trajectory weapons", children: [
        { name: "ICBMs" },
        { name: "MRBMs" },
        { name: "SRBMs" },
      ]},
      { name: "Cruise Missiles", description: "Low-altitude guided missiles" },
      { name: "Hypersonic Missiles", description: "Mach 5+ glide vehicles and cruise missiles" },
      { name: "Anti-Ship Missiles", description: "Naval strike weapons" },
      { name: "Anti-Tank Guided Missiles", description: "Precision armor-piercing weapons" },
      { name: "Air-to-Air Missiles", description: "Beyond and within visual range" },
      { name: "Surface-to-Air Missiles (SAM)", description: "Air defense interceptors" },
      { name: "Anti-Radiation Missiles", description: "Radar-seeking suppression weapons" },
    ],
  },
  {
    name: "Defense & Radar Systems",
    icon: "📡",
    description: "Detection, tracking, and integrated air/missile defense",
    children: [
      { name: "Early Warning Radars", description: "Long-range ballistic missile detection" },
      { name: "AESA Radars", description: "Active electronically scanned arrays for fighters and ships" },
      { name: "Air Defense Systems", description: "Integrated SAM batteries and C2" },
      { name: "BMD Systems", description: "Ballistic missile defense interceptors" },
      { name: "SHORAD", description: "Short-range air defense for point protection" },
    ],
  },
];

export const weaponCounts: Record<string, number> = {
  "Land Warfare": 30,
  "Naval Warfare": 40,
  "Air Warfare": 35,
  "Space Warfare": 8,
  "Cyber Warfare": 12,
  "Electronic Warfare": 10,
  "Nuclear Warfare": 15,
  "Drone & Autonomous Systems": 35,
  "Missile Systems": 50,
  "Defense & Radar Systems": 20,
};

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const mapBackgrounds: Record<string, string> = {
  ancient: `${B}/maps/Bomb-B-Ancient-CS-2.jpg`,
  anubis: `${B}/maps/Anubis-CS2.jpg`,
  "dust ii": `${B}/maps/dust2_ct_ramp_Cs2.jpg`,
  dust2: `${B}/maps/dust2_ct_ramp_Cs2.jpg`,
  inferno: `${B}/maps/Banana-Inferno-CS2-31.03.2025.jpg`,
  mirage: `${B}/maps/Bomb-A-Mirage-CS-2.jpg`,
  nuke: `${B}/maps/Bomb-B-Nuke-CS-2.jpg`,
  overpass: `${B}/maps/Overpass-CS2_Counter-Strike-anti-cheat-VAC-Live.jpg`,
  tuscan: `${B}/news/stage.jpg`,
  vertigo: `${B}/news/headphones.jpg`,
};

export const mapIcons: Record<string, string> = {
  ancient: `${B}/mapIcons/Map_icon_de_ancient.webp`,
  anubis: `${B}/mapIcons/Map_icon_de_anubis.webp`,
  "dust ii": `${B}/mapIcons/Map_icon_de_dust2.webp`,
  dust2: `${B}/mapIcons/Map_icon_de_dust2.webp`,
  inferno: `${B}/mapIcons/CS2_inferno_logo.webp`,
  mirage: `${B}/mapIcons/Set_mirage.webp`,
  nuke: `${B}/mapIcons/Set_nuke_2.webp`,
  overpass: `${B}/mapIcons/CS2_overpass_logo.webp`,
  tuscan: `${B}/mapIcons/CS2_overpass_logo.webp`,
  vertigo: `${B}/mapIcons/CS2_overpass_logo.webp`,
};

export function getMapBackground(map?: string) {
  if (!map) {
    return `${B}/news/katowice-bg.jpg`;
  }
  return mapBackgrounds[map.toLowerCase()] ?? `${B}/news/katowice-bg.jpg`;
}

export function getMapIcon(map: string) {
  return mapIcons[map.toLowerCase()];
}

export function getMapAsset(assets: Record<string, string>, map?: string) {
  if (!map) return undefined;
  return assets[map.toLowerCase()];
}

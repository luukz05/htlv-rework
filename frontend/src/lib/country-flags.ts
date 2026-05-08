const REGIONAL_INDICATOR_BASE = 0x1f1e6;
const ASCII_A = 65;
const REGIONAL_INDICATOR_RE = /[\u{1f1e6}-\u{1f1ff}]{2}/u;
const LANGUAGE_COUNTRY_CODES: Record<string, string> = {
  EN: "GB",
  PT: "BR",
  RU: "RU",
};

export function countryFlag(countryCode?: string, preferredFlag?: string): string {
  if (preferredFlag && REGIONAL_INDICATOR_RE.test(preferredFlag)) {
    return preferredFlag;
  }

  const normalizedCode = countryCode?.trim().toUpperCase();
  if (!normalizedCode || normalizedCode.length !== 2 || !/^[A-Z]{2}$/.test(normalizedCode)) {
    return "";
  }

  return Array.from(normalizedCode)
    .map((letter) => String.fromCodePoint(REGIONAL_INDICATOR_BASE + letter.charCodeAt(0) - ASCII_A))
    .join("");
}

export function countryLabel(countryCode?: string, preferredFlag?: string): string {
  return [countryFlag(countryCode, preferredFlag), countryCode].filter(Boolean).join(" ");
}

export function languageFlag(languageCode?: string): string {
  const normalizedCode = languageCode?.trim().toUpperCase();
  return countryFlag(normalizedCode ? LANGUAGE_COUNTRY_CODES[normalizedCode] || normalizedCode : undefined);
}

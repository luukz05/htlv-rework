import { countryFlag } from "@/lib/country-flags";

const LANGUAGE_COUNTRY_CODES: Record<string, string> = {
  EN: "GB",
  PT: "BR",
  RU: "RU",
};

type CountryFlagProps = {
  countryCode?: string;
  preferredFlag?: string;
  className?: string;
  label?: boolean;
};

function normalizeFlagCode(countryCode?: string): string | undefined {
  const normalized = countryCode?.trim().toUpperCase();
  if (!normalized || normalized.length !== 2 || !/^[A-Z]{2}$/.test(normalized)) {
    return undefined;
  }

  return normalized;
}

export function flagImageCode(countryCode?: string): string | undefined {
  const normalized = normalizeFlagCode(countryCode);
  if (!normalized) {
    return undefined;
  }

  return normalized.toLowerCase();
}

export function languageFlagImageCode(languageCode?: string): string | undefined {
  const normalized = normalizeFlagCode(languageCode);
  return flagImageCode(normalized ? LANGUAGE_COUNTRY_CODES[normalized] || normalized : undefined);
}

export default function CountryFlag({ countryCode, preferredFlag, className = "", label = false }: CountryFlagProps) {
  const normalized = normalizeFlagCode(countryCode);
  const imageCode = flagImageCode(normalized);
  const fallback = countryFlag(normalized, preferredFlag) || normalized || "";

  if (!imageCode) {
    return fallback ? <span className={className}>{fallback}</span> : null;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w40/${imageCode}.png`}
        srcSet={`https://flagcdn.com/w40/${imageCode}.png 1x, https://flagcdn.com/w80/${imageCode}.png 2x`}
        width="20"
        height="15"
        alt={normalized ? `${normalized} flag` : "Country flag"}
        className="inline-block h-[0.8em] w-[1.07em] rounded-[1px] object-cover shadow-sm ring-1 ring-black/10"
        loading="lazy"
      />
      {label && normalized ? <span>{normalized}</span> : <span className="sr-only">{fallback}</span>}
    </span>
  );
}

export function CountryLabel({ countryCode, preferredFlag, className = "" }: Omit<CountryFlagProps, "label">) {
  return <CountryFlag countryCode={countryCode} preferredFlag={preferredFlag} className={className} label />;
}

export function LanguageFlag({ languageCode, className = "" }: { languageCode?: string; className?: string }) {
  const normalized = normalizeFlagCode(languageCode);
  const countryCode = normalized ? LANGUAGE_COUNTRY_CODES[normalized] || normalized : undefined;
  return <CountryFlag countryCode={countryCode} className={className} />;
}

export const locales = ["en", "ar", "fa"] as const;
export type Locale = (typeof locales)[number];

export function isRtl(locale: string): boolean {
  return locale === "ar" || locale === "fa";
}

export const defaultLocale: Locale = "en";

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Validate supported locales; fallback to 'en'
  const supported = ["en", "ar", "fa"] as const;
  const useLocale = (supported as readonly string[]).includes(locale)
    ? locale
    : "fa";
  const messages = (await import(`./messages/${useLocale}.json`)).default;
  return {
    messages,
    locale: useLocale,
    timeZone: "UTC",
  };
});

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const supported = ["en", "ar", "fa"] as const;
  const locale = await requestLocale;
  if (!locale) {
    return {
      messages: {},
      locale: "en",
      timeZone: "UTC",
    };
  }
  const useLocale = (supported as readonly string[]).includes(locale)
    ? locale
    : "fa";
  const messages = (await import(`../messages/${useLocale}.json`)).default;
  return {
    messages,
    locale: useLocale,
    timeZone: "UTC",
  };
});

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar", "fa"],
  defaultLocale: "en",
  localeDetection: true,
  alternateLinks: true,
});

export const config = {
  matcher: ["/", "/(en|ar|fa)/:path*"],
};

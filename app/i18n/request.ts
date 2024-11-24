// import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  // this will error
  // if (!routing.locales.includes(locale as any)) notFound();
  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../message/${locale}/${locale}.json`)).default,
      ...(await import(`../message/${locale}/characters.json`)).default,
      ...(await import(`../message/${locale}/battle.json`)).default,
    },
  };
});

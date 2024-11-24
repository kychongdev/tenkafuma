// import { getLocale } from 'next-intl/server';

import { redirect } from 'next/navigation';

// import { useRouter } from './i18n/routing';

// This page only renders when the app is built statically (output: 'export')
export default async function RootPage() {
  redirect('/en');
  // const local = await getLocale();
  // redirect(locale ? `/${locale}` : '/en');
}

import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "cn", "zh"],
  //locales: ['en', 'cn', 'zh', 'jp', 'kr'],
  defaultLocale: "en",
  // pathnames: {
  //   '/': '/',
  //   '/battle': {
  //     en: '/battle',
  //     cn: '/battle',
  //     zh: '/battle',
  //     jp: '/battle',
  //     kr: '/battle',
  //   },
  // },
});

// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);

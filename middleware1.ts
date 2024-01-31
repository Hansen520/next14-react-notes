/*
 * @Date: 2024-01-26 17:38:15
 * @Description: description
 */
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
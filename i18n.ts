/*
 * @Date: 2024-01-29 11:04:30
 * @Description: description
 */
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config";

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as string)) notFound();
  return {
    messages: (await import(`./message/${locale}.json`)).default
  };
});

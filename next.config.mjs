/*
 * @Date: 2024-01-24 18:01:39
 * @Description: description
 */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);

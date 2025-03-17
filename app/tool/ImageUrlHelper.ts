export const formatLocalHostImageUrl = (url: string | null) => {
  if (!url) return null;

  if (url.includes(process.env.EXPO_PUBLIC_BACKEND_URL_NEST)) {
    const formatedUrl = process.env.EXPO_PUBLIC_BACKEND_URL_NEST.replace(
      "localhost",
      process.env.EXPO_PUBLIC_IP_ADDRESS
    );
    url = url.replace(process.env.EXPO_PUBLIC_BACKEND_URL_NEST, formatedUrl);
  }
  return url;
};

export const apiBaseUrl = process.env.EXPO_PUBLIC_BACKEND_URL_NEST.replace(
  "localhost",
  // "10.0.2.2"
  process.env.EXPO_PUBLIC_IP_ADDRESS
);
// export const apiBaseUrl = process.env.EXPO_PUBLIC_BACKEND_URL_NEST;

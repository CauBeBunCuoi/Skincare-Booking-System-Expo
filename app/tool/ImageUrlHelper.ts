export const formatLocalHostImageUrl = (url: string | null) => {
    if (!url) return null;

    if (url.includes(process.env.EXPO_PUBLIC_BACKEND_URL_NEST)) {
        const formatedUrl =(process.env.EXPO_PUBLIC_BACKEND_URL_NEST).replace('localhost', '10.0.2.2')
        url = url.replace(process.env.EXPO_PUBLIC_BACKEND_URL_NEST, formatedUrl);
    }
    return url;
}
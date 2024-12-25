export default function getImage(src) {
    if (src)
        return `${process.env.APP_BACKEND_HOME_URL}/@main/storage/app/public/${src}`
    return '/default.webp';
}
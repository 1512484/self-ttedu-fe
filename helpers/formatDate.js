import dayjs from "dayjs";

export default function formatDate (date, format = false) {
    if (format && format.length) {
        return dayjs(date).format(format);
    }

    const d = new Date(date);
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];;
    let date_str = `${d.getDate()} ${shortMonths[d.getMonth()]} ${d.getFullYear()}`;
    return date_str;
}

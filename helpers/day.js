import day from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import localizedFormat from 'dayjs/plugin/localizedFormat'

day.extend(calendar)
day.extend(localizedFormat)

export default day

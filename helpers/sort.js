import { useState } from 'react'
import { SORTS } from '@/helpers/enums'

/**
 * A hook that takes care of the sort settings.
 *
 * @param {string} defaultSort The default sort key
 * @returns {array}
 */
export function useSort(defaultSort) {
  const [sort, setSort] = useState(defaultSort)

  const sorted = key =>
    sort === key ? SORTS.ASC : sort === `-${key}` ? SORTS.DESC : SORTS.NONE

  const nextSort = key => (sort !== key ? setSort(key) : setSort(`-${key}`))

  return [sort, sorted, nextSort]
}

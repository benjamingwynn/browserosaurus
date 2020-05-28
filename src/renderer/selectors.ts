import last from 'lodash/fp/last'
import { selector } from 'recoil'

import { UrlHistoryItem } from '../main/store'
import { urlHistoryAtom, urlIdAtom } from './atoms'

export const urlIdSelector = selector({
  key: 'urlIdSelector',
  // TODO [+@types/recoil] this should be typed when recoil types are ready
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  get: ({ get }): string | undefined => {
    const selectedId: string | undefined = get(urlIdAtom)
    const urlHistory: UrlHistoryItem[] = get(urlHistoryAtom)

    // If no ID selected, use the latest from history, else undefined
    if (!selectedId) {
      const lastestUrlHistoryItem = last(urlHistory)
      return lastestUrlHistoryItem?.id
    }

    // If id exists, return it, else undefined
    return urlHistory.find((u) => u.id === selectedId)?.id
  },
  // TODO [+@types/recoil] this should be typed when recoil types are ready
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  set: ({ set }, urlId) => set(urlIdAtom, urlId),
})

export const urlItemSelector = selector({
  key: 'urlItemSelector',
  // TODO [+@types/recoil] this should be typed when recoil types are ready
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  get: ({ get }): UrlHistoryItem | undefined => {
    const urlId: string | undefined = get(urlIdSelector)
    const urlHistory: UrlHistoryItem[] = get(urlHistoryAtom)

    if (urlId) {
      return urlHistory.find((u) => u.id === urlId)
    }
  },
})

import cc from 'classcat'
import React, { useCallback } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useRecoilValue } from 'recoil'
import Url from 'url'

import { UrlHistoryItem } from '../../main/store'
import { urlItemSelector } from '../selectors'
import { copyUrl } from '../sendToMain'
import ProtocolIcon from './protocol-icon'

interface Props {
  className?: string
}

const TheUrlBar: React.FC<Props> = ({ className }) => {
  const urlItem: UrlHistoryItem | undefined = useRecoilValue(urlItemSelector)

  const parsedUrl = urlItem ? Url.parse(urlItem.url) : undefined

  const handleCopyClick = useCallback(() => {
    copyUrl(urlItem?.id)
  }, [urlItem?.id])

  return (
    <div className={cc([className, 'flex items-center space-x-4'])}>
      <div
        className={cc([
          'flex-grow',
          'bg-grey-800',
          'rounded-full',
          'shadow-inner',
          'text-xs text-grey-500 tracking-wider font-medium',
          'h-10 pl-4 pr-2',
          'flex items-center justify-between',
          'overflow-hidden',
        ])}
      >
        {parsedUrl ? (
          <>
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={urlItem?.id}
                classNames="url-bar-anim"
                timeout={{
                  appear: 0,
                  enter: 150,
                  exit: 150,
                }}
              >
                <div className="flex items-center space-x-2 truncate">
                  <ProtocolIcon
                    className="flex-shrink-0"
                    urlProtocol={parsedUrl.protocol}
                  />
                  <div className="truncate">
                    <span className="font-bold text-grey-200 text-sm">
                      {parsedUrl.hostname}
                    </span>
                    <span>
                      {parsedUrl.port && `:${parsedUrl.port}`}
                      {parsedUrl.pathname}
                      {parsedUrl.search}
                      {parsedUrl.hash}
                    </span>
                  </div>
                </div>
              </CSSTransition>
            </SwitchTransition>
            <button
              className="flex-shrink-0 rounded-full bg-grey-600 w-6 h-6 text-grey-300 focus:outline-none flex items-center justify-center cursor-default"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="w-2 h-2"
                focusable="false"
                role="img"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </>
        ) : (
          <span className="text-grey-500">
            Most recently clicked link will show here
          </span>
        )}
      </div>

      <button
        className={cc([
          'bg-grey-700',
          'border border-grey-900 rounded shadow-md active:shadow-none focus:outline-none',
          'text-xs active:text-grey-200 font-bold',
          'py-1 px-2 space-x-2',
          'cursor-default',
        ])}
        onClick={handleCopyClick}
        type="button"
      >
        <span>Copy</span>
        <kbd className="opacity-50 tracking-widest">⌘+C</kbd>
      </button>
    </div>
  )
}

export default TheUrlBar

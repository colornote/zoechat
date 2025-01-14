'use client'

import { useCallback, useState } from 'react'
import { Avatar, Flex, IconButton, Tooltip, Text } from '@radix-ui/themes'
import { FaRegCopy } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import { Markdown } from '@/components'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ChatMessage } from './interface'

export interface MessageProps {
  message: ChatMessage
}

const Message = (props: MessageProps) => {
  const { role, content } = props.message
  const isUser = role === 'user'
  const copy = useCopyToClipboard()
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  const handleCopy = useCallback(() => {
    copy(content, (isSuccess) => {
      if (isSuccess) {
        setTooltipOpen(true)
      }
    })
  }, [content, copy])

  return (
    <Flex gap="4" className="mb-5 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Avatar
        fallback={isUser ? 
          <HiUser className="size-4 text-gray-600" /> : 
          <div className="size-8 p-1 flex items-center justify-center">
            <img src="/bot-icon.png" alt="Bot" className="size-full object-contain" />
          </div>
        }
        color={isUser ? undefined : 'pink'}
        size="2"
        radius="full"
        className="shrink-0 shadow-sm"
      />
      <Flex direction="column" gap="1">
        <Flex justify="between" align="center">
          <Text as="span" size="2" weight="medium" className={`${isUser ? 'text-gray-700' : 'text-tomato-900'}`}>
            {isUser ? '你' : 'Spark'}
          </Text>
          <Tooltip content="复制">
            <IconButton
              size="1"
              variant="ghost"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaRegCopy />
            </IconButton>
          </Tooltip>
        </Flex>
        <div className="prose prose-sm max-w-none">
          <Markdown>{content}</Markdown>
        </div>
      </Flex>
    </Flex>
  )
}

export default Message

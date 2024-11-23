'use client'

import React, { useContext } from 'react'
import { Box, Flex, IconButton, ScrollArea, Text, Tabs } from '@radix-ui/themes'
import cs from 'classnames'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiMessageDetail, BiPlusCircle, BiTable } from 'react-icons/bi'
import { RiRobot2Line } from 'react-icons/ri'
import ChatContext from './chatContext'
import type { Scale } from './interface'
import ScaleContext from './scaleContext'

import './index.scss'

export const ChatSideBar = () => {
  const {
    currentChatRef,
    chatList,
    DefaultPersonas,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    onOpenPersonaPanel,
  } = useContext(ChatContext)

  const {
    sacleList,
    startTest,
    showTest,
    closeTest
  } = useContext(ScaleContext)

  const handleChatClick = (chat: any) => {
    if (showTest) {
      closeTest();
    }
    onChangeChat?.(chat);
  };

  const handleScaleClick = (scale: Scale) => {
    startTest(scale);
  };

  return (
    <Flex direction="column" className={cs('chat-side-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Tabs.Root defaultValue="scales" className="p-2 h-full overflow-hidden w-64">
          <Tabs.List className="flex justify-between">
            <Tabs.Trigger value="scales" className="flex-1 flex justify-center">
              <BiTable className="size-4" />
              <Text>量表</Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="chat" className="flex-1 flex justify-center">
              <BiMessageDetail className="size-4" />
              <Text>Chat</Text>
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="scales">
              <ScrollArea className={cs('flex-1')} style={{ width: '100%' }} type="auto">
                <Flex direction="column" gap="3">
                  {sacleList.map((scale) => (
                    <Box
                      key={scale.id}
                      width="auto"
                      className="bg-token-surface hover:bg-gray-100 active:scale-95 cursor-pointer p-3 rounded-lg"
                      onClick={() => handleScaleClick(scale)}
                    >
                      <Flex direction="column" gap="1">
                        <Text as="div" className="font-medium">{scale.name}</Text>
                        <Text as="div" size="1" className="text-gray-500">{scale.description}</Text>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </ScrollArea>
            </Tabs.Content>

            <Tabs.Content value="chat">
              <ScrollArea className={cs('flex-1')} style={{ width: '100%' }} type="auto">
                <Flex direction="column" gap="3">
                  <Box
                    width="auto"
                    onClick={() => onCreateChat?.(DefaultPersonas[0])}
                    className="bg-token-surface-primary active:scale-95 cursor-pointer flex-1 flex items-center justify-center"
                  >
                    <BiPlusCircle className="size-4" />
                    <Text>New Chat</Text>
                  </Box>
                  {chatList.map((chat) => (
                    <Box
                      key={chat.id}
                      width="auto"
                      className={cs('bg-token-surface active:scale-95 truncate cursor-pointer', {
                        active: currentChatRef?.current?.id === chat.id
                      })}
                      onClick={() => handleChatClick(chat)}
                    >
                      <Flex gap="2" align="center" className="overflow-hidden whitespace-nowrap">
                        <BiMessageDetail className="size-4" />
                        <Text as="p" className="truncate">
                          {chat.persona?.name}
                        </Text>
                      </Flex>
                      <IconButton
                        size="2"
                        className="cursor-pointer"
                        variant="ghost"
                        color="gray"
                        radius="full"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteChat?.(chat)
                        }}
                      >
                        <AiOutlineCloseCircle className="size-4" />
                      </IconButton>
                    </Box>
                  ))}
                </Flex>
              </ScrollArea>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
        <Box
          width="auto"
          onClick={() => onOpenPersonaPanel?.('chat')}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <RiRobot2Line className="size-4" />
          <Text>AI 助手</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ChatSideBar

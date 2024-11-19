'use client'

import React, { useContext } from 'react'
import { Box, Flex, IconButton, ScrollArea, Text, Tabs } from '@radix-ui/themes'
import cs from 'classnames'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiEdit, BiMessageDetail, BiPlusCircle, BiTable } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import { RiRobot2Line } from 'react-icons/ri'
import ChatContext from './chatContext'

import './index.scss'
import { set } from 'react-hook-form'
import { Fa500Px } from 'react-icons/fa'

export const ChatSideBar = () => {
  const {
    currentChatRef,
    chatList,
    sacleList,
    DefaultPersonas,
    toggleSidebar,
    toggleChatList,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    onOpenPersonaPanel
  } = useContext(ChatContext)


  return (
    <Flex direction="column" className={cs('chat-side-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Tabs.Root defaultValue="account" className="p-2 h-full overflow-hidden w-64">
          <Tabs.List className="flex justify-between">
            <Tabs.Trigger value="account" className="flex-1 flex justify-center">
              <BiTable className="size-4" />
              <Text>量表</Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="documents" className="flex-1 flex justify-center">
              <BiMessageDetail className="size-4" />
              <Text>Chat</Text>
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="account">
              <ScrollArea className={cs('flex-1')} style={{ width: '100%' }} type="auto">
                <Flex direction="column" gap="3">
                  {sacleList.map((sacle) => (
                    <Box
                      key={sacle.id}
                      width="auto"
                      className={cs('bg-token-surface active:scale-95 truncate cursor-pointer', {
                        active: currentChatRef?.current?.id === sacle.id
                      })}
                      onClick={() => onChangeChat?.(sacle)}
                    >
                      <Flex gap="2" align="center" className="overflow-hidden whitespace-nowrap">
                        <BiEdit className="size-4" />
                        <Text as="p" className="truncate">
                          {sacle.name}
                        </Text>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </ScrollArea>
            </Tabs.Content>

            <Tabs.Content value="documents">
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
                      onClick={() => onChangeChat?.(chat)}
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
          <Text>Persona Store</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ChatSideBar

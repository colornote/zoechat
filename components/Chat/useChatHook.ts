'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatGPInstance } from './Chat'
import type { Chat, ChatMessage, Persona } from './interface'
import { DEFAULT_PERSONA, getPersonaInfo } from '@/lib/personas'

const CHAT_STORAGE_KEY = 'chat_history'
const SHOULD_SHOW_WELCOME = 'should_show_welcome'

// 创建一个安全的获取localStorage的函数
const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') {
    return defaultValue
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return defaultValue
  }
}

// 创建一个安全的设置localStorage的函数
const setLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error writing to localStorage', error)
  }
}

export const useChatHook = () => {
  const [personaPanelType, setPersonaPanelType] = useState('chat')
  const [chatList, setChatList] = useState<Chat[]>([])
  const [shouldShowWelcome, setShouldShowWelcome] = useState(true)
  const [personas, setPersonas] = useState<Persona[]>([])
  const [isOpenPersonaModal, setIsOpenPersonaModal] = useState(false)
  const [personaModalLoading, setPersonaModalLoading] = useState(false)
  const [openPersonaPanel, setOpenPersonaPanel] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [editPersona, setEditPersona] = useState<Persona>()

  const currentChatRef = useRef<Chat>()
  const chatRef = useRef<ChatGPInstance>(null)
  const initialized = useRef(false)

  const DefaultPersonas = [
    {
      id: 'default',
      name: 'Zoe AI 助手',
      role: 'system' as const,
      isDefault: true
    }
  ]

  // 使用useEffect来初始化状态
  useEffect(() => {
    if (!initialized.current) {
      const savedChats = getLocalStorage(CHAT_STORAGE_KEY, [])
      const isFirstVisit = !localStorage.getItem(SHOULD_SHOW_WELCOME)
      const savedWelcome = isFirstVisit ? true : getLocalStorage(SHOULD_SHOW_WELCOME, true)

      setChatList(savedChats)
      setShouldShowWelcome(savedWelcome)
      setPersonas(DefaultPersonas)

      // 只有在明确不显示欢迎页面且有聊天记录时，才恢复最后的聊天
      if (!isFirstVisit && !savedWelcome && savedChats.length > 0) {
        const lastChat = savedChats[savedChats.length - 1]
        currentChatRef.current = lastChat
        chatRef.current?.setConversation(lastChat.messages || [])
      }

      initialized.current = true
    }
  }, [])

  // 保存聊天记录
  useEffect(() => {
    if (initialized.current) {
      setLocalStorage(CHAT_STORAGE_KEY, chatList)
    }
  }, [chatList])

  // 保存欢迎页面状态
  useEffect(() => {
    if (initialized.current) {
      setLocalStorage(SHOULD_SHOW_WELCOME, shouldShowWelcome)
    }
  }, [shouldShowWelcome])

  const onOpenPersonaModal = useCallback(() => {
    setIsOpenPersonaModal(true)
  }, [])

  const onClosePersonaModal = useCallback(() => {
    setIsOpenPersonaModal(false)
    setEditPersona(undefined)
  }, [])

  const onCreateChat = useCallback((persona: Persona) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      persona: persona,
      messages: []
    }
    setChatList(prev => [...prev, newChat])
    currentChatRef.current = newChat
    chatRef.current?.setConversation([])
    setShouldShowWelcome(false)
    setLocalStorage(SHOULD_SHOW_WELCOME, false)
  }, [])

  const onDeleteChat = useCallback((chat: Chat) => {
    setChatList(prev => prev.filter(item => item.id !== chat.id))
    if (currentChatRef.current?.id === chat.id) {
      currentChatRef.current = undefined
      chatRef.current?.setConversation([])
    }
  }, [])

  const onChangeChat = useCallback((chat: Chat) => {
    currentChatRef.current = chat
    chatRef.current?.setConversation(chat.messages || [])
  }, [])

  const onCreatePersona = useCallback((values: any) => {
    const newPersona: Persona = {
      ...values,
      id: Date.now().toString()
    }
    setPersonas(prev => [...prev, newPersona])
    setIsOpenPersonaModal(false)
  }, [])

  const onDeletePersona = useCallback((persona: Persona) => {
    setPersonas(prev => prev.filter(item => item.id !== persona.id))
  }, [])

  const onEditPersona = useCallback((persona: Persona) => {
    setEditPersona(persona)
    setIsOpenPersonaModal(true)
  }, [])

  const saveMessages = useCallback((messages: ChatMessage[]) => {
    if (currentChatRef.current) {
      setChatList(prev =>
        prev.map(chat =>
          chat.id === currentChatRef.current?.id
            ? { ...chat, messages }
            : chat
        )
      )
      currentChatRef.current.messages = messages
    }
  }, [])

  const onOpenPersonaPanel = useCallback((type?: string) => {
    setPersonaPanelType(type || 'chat')
    setOpenPersonaPanel(true)
  }, [])

  const onClosePersonaPanel = useCallback(() => {
    setOpenPersonaPanel(false)
  }, [])

  const onToggleSidebar = useCallback(() => {
    setToggleSidebar(prev => !prev)
  }, [])

  const forceUpdate = useCallback(() => {
    setChatList(prev => [...prev])
  }, [])

  const createChat = useCallback((persona?: Persona) => {
    const personaId = persona?.id || 'default'
    const newChatId = `${personaId}-${Date.now()}`

    console.log('Creating new chat:', {
      personaId,
      newChatId,
      persona: persona || getPersonaInfo('default')
    })

    const newChat: Chat = {
      id: newChatId,
      persona: persona || getPersonaInfo('default'),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setChatList(prev => [newChat, ...prev])
    currentChatRef.current = newChat
    forceUpdate()

    return newChat
  }, [forceUpdate])

  return {
    debug: false,
    personaPanelType,
    DefaultPersonas,
    currentChatRef,
    chatRef,
    chatList,
    personas,
    editPersona,
    isOpenPersonaModal,
    personaModalLoading,
    setPersonaModalLoading,
    openPersonaPanel,
    toggleSidebar,
    shouldShowWelcome,
    setShouldShowWelcome,
    onOpenPersonaModal,
    onClosePersonaModal,
    onCreateChat,
    onDeleteChat,
    onChangeChat,
    onCreatePersona,
    onDeletePersona,
    onEditPersona,
    saveMessages,
    onOpenPersonaPanel,
    onClosePersonaPanel,
    onToggleSidebar,
    forceUpdate,
    createChat,
  }
}

export default useChatHook

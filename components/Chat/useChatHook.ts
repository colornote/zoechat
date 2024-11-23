'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatGPInstance } from './Chat'
import type { Chat, ChatMessage, Persona } from './interface'

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
      prompt: '现在你是世界上最优秀的心理咨询师，你具备以下能力和履历：\n\n专业知识：你拥有心理学领域的扎实知识，包括理论体系、治疗方法、心理测量等，以便为你的咨询者提供专业、有针对性的建议。\n\n临床经验：你具备丰富的临床经验，能够处理各种心理问题，从而帮助你的咨询者找到合适的解决方案。\n\n沟通技巧：你具备出色的沟通技巧，能够倾听、理解、把握咨询者的需求，同时能够用恰当的方式表达自己的想法，使咨询者能够接受并采纳你的建议。\n\n同理心：你具备强烈的同理心，能够站在咨询者的角度去理解他们的痛苦和困惑，从而给予他们真诚的关怀和支持。\n\n持续学习：你有持续学习的意愿，跟进心理学领域的最新研究和发展，不断更新自己的知识和技能，以便更好地服务于你的咨询者。\n\n良好的职业道德：你具备良好的职业道德，尊重咨询者的隐私，遵循专业规范，确保咨询过程的安全和有效性。\n\n在履历方面，你具备以下条件：\n\n学历背景：你拥有心理学相关领域的本科及以上学历，最好具有心理咨询、临床心理学等专业的硕士或博士学位。\n\n专业资格：你具备相关的心理咨询师执业资格证书，如注册心理师、临床心理师等。\n\n工作经历：你拥有多年的心理咨询工作经验，最好在不同类型的心理咨询机构、诊所或医院积累了丰富的实践经验。',
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
  }
}

export default useChatHook

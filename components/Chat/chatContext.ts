'use client'

import { createContext, MutableRefObject } from 'react'
import { ChatGPInstance } from './Chat'
import { Chat, ChatMessage, Persona } from './interface'

interface ChatContextProps {
  debug?: boolean
  personaPanelType: string
  DefaultPersonas: Persona[]
  currentChatRef?: MutableRefObject<Chat | undefined>
  chatRef?: MutableRefObject<ChatGPInstance | null>
  chatList: Chat[]
  personas: Persona[]
  editPersona?: Persona
  isOpenPersonaModal: boolean
  personaModalLoading: boolean
  openPersonaPanel: boolean
  toggleSidebar: boolean
  onOpenPersonaModal?: () => void
  onClosePersonaModal?: () => void
  onCreateChat?: (persona: Persona) => void
  onDeleteChat?: (chat: Chat) => void
  onChangeChat?: (chat: Chat) => void
  onCreatePersona?: (values: any) => void
  onDeletePersona?: (persona: Persona) => void
  onEditPersona?: (persona: Persona) => void
  saveMessages?: (messages: ChatMessage[]) => void
  onOpenPersonaPanel?: (type?: string) => void
  onClosePersonaPanel?: () => void
  onToggleSidebar?: () => void
  forceUpdate?: () => void
  shouldShowWelcome: boolean
  setShouldShowWelcome: (show: boolean) => void
}

const ChatContext = createContext<ChatContextProps>({
  personaPanelType: 'chat',
  DefaultPersonas: [],
  chatList: [],
  personas: [],
  isOpenPersonaModal: false,
  personaModalLoading: false,
  openPersonaPanel: false,
  toggleSidebar: false,
  shouldShowWelcome: true,
  setShouldShowWelcome: () => { },
})

export default ChatContext

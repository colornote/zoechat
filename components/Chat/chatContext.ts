'use client'

import { createContext, MutableRefObject } from 'react'
import { ChatGPInstance } from './Chat'
import { Chat, ChatMessage, Persona, Scale, ScaleResult } from './interface'

interface ChatContextProps {
  debug?: boolean
  personaPanelType: string
  DefaultPersonas: Persona[]
  DefaultSacles: Scale[]
  currentChatRef?: MutableRefObject<Chat | undefined>
  chatRef?: MutableRefObject<ChatGPInstance | null>
  chatList: Chat[]
  sacleList: Scale[]
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
  currentScale: Scale | null
  currentQuestion: number
  answers: Map<string, string>
  showResult: boolean
  testResult: ScaleResult | null
  startTest: (scale: Scale) => void
  handleAnswer: (questionId: string, optionId: string) => void
  retakeTest: () => void
  closeTest: () => void
  selectedAnswers: Map<string, string>
}

const ChatContext = createContext<ChatContextProps>({
  personaPanelType: 'chat',
  DefaultPersonas: [],
  DefaultSacles: [],
  chatList: [],
  sacleList: [],
  personas: [],
  isOpenPersonaModal: false,
  personaModalLoading: false,
  openPersonaPanel: false,
  toggleSidebar: false,
  currentScale: null,
  currentQuestion: 0,
  answers: new Map(),
  showResult: false,
  testResult: null,
  selectedAnswers: new Map(),
  startTest: () => { },
  handleAnswer: () => { },
  retakeTest: () => { },
  closeTest: () => { }
})

export default ChatContext

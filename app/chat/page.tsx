'use client'
import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import {
  ChatComponent,
  ChatContext,
  ChatSideBar,
  useChatHook,
  ScaleProvider,
} from '@/components'
import { DefaultScales } from '@/components/Chat/interface'
import PersonaModal from './PersonaModal'
import PersonaPanel from './PersonaPanel'

const ChatProvider = () => {
  const provider = useChatHook()

  return (
    <ChatContext.Provider value={provider}>
      <ScaleProvider scales={DefaultScales}>
        <Flex style={{ height: 'calc(100% - 56px)' }} className="relative">
          <ChatSideBar />
          <div className="flex-1 relative">
            <ChatComponent ref={provider.chatRef} />
            <PersonaPanel />
          </div>
        </Flex>
        <PersonaModal />
      </ScaleProvider>
    </ChatContext.Provider>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatProvider />
    </Suspense>
  )
}

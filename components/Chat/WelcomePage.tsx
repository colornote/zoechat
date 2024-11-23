'use client'

import React from 'react'
import { Button, Card, Dialog, Flex, Heading, Text } from '@radix-ui/themes'
import { BiMessageDetail, BiTable } from 'react-icons/bi'

interface WelcomePageProps {
    open: boolean
    onStartChat: () => void
    onStartTest: () => void
    _onClose?: () => void
}

export const WelcomePage = ({ open, onStartChat, onStartTest }: WelcomePageProps) => {
    return (
        <Dialog.Root open={open}>
            <Dialog.Content size="4">
                <Dialog.Title>
                    <Heading size="6" mb="4">欢迎使用心理健康平台</Heading>
                </Dialog.Title>
                <Flex gap="6" wrap="wrap" justify="center">
                    <Card size="3" style={{ width: 300 }}>
                        <Flex direction="column" gap="3">
                            <BiTable className="size-8" />
                            <Heading size="4">心理测评</Heading>
                            <Text as="p">
                                提供专业的心理健康评估量表，包括抑郁、焦虑和压力测试，帮助您了解自己的心理状态。
                            </Text>
                            <Button onClick={onStartTest}>
                                开始测评
                            </Button>
                        </Flex>
                    </Card>

                    <Card size="3" style={{ width: 300 }}>
                        <Flex direction="column" gap="3">
                            <BiMessageDetail className="size-8" />
                            <Heading size="4">AI 咨询</Heading>
                            <Text as="p">
                                智能AI助手随时为您提供倾听和建议，帮助您缓解压力，改善心理健康状况。
                            </Text>
                            <Button onClick={onStartChat}>
                                开始对话
                            </Button>
                        </Flex>
                    </Card>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default WelcomePage 
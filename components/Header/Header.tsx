'use client'

// Header.tsx
import { useCallback, useState } from 'react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Avatar, Flex, Heading, IconButton, Select, Tooltip, Text } from '@radix-ui/themes'
import cs from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import { FaAdjust, FaMoon, FaRegSun, FaUser } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { Link } from '../Link'
import { useTheme } from '../Themes'

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const [, setShow] = useState(false)
  const { user, logout } = useAuth()

  const toggleNavBar = useCallback(() => {
    setShow((state) => !state)
  }, [])

  return (
    <header
      className={cs('block shadow-sm sticky top-0 dark:shadow-gray-500 py-3 px-4 z-20')}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Flex align="center" gap="3">
        <NextLink href="/">
          <Flex align="center" gap="2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={38}
              height={10}
              priority
              className="object-contain"
            />
            <Heading as="h2" size="4" style={{ maxWidth: 200 }}>
              Sparks Zone
            </Heading>
          </Flex>
        </NextLink>
        <Flex align="center" gap="3" className="ml-auto">
          {user ? (
            <>
              <NextLink href="/user">
                <Avatar
                  color="gray"
                  size="2"
                  radius="full"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  fallback={
                    user.avatar ? (
                      <img src={user.avatar} alt={user.username} className="size-full object-cover" />
                    ) : (
                      <FaUser className="size-4" />
                    )
                  }
                />
              </NextLink>
              <NextLink href="/me">
                <Heading as="h5" size="2" style={{ maxWidth: 200 }} className="hover:text-tomato-900 transition-colors">
                  {user.username || '未设置用户名'}
                </Heading>
              </NextLink>
              <button 
                onClick={logout}
                className="text-sm text-gray-500 hover:text-tomato-900 transition-colors"
              >
                退出
              </button>
            </>
          ) : (
            <>
              <NextLink href="/register">
                <Heading as="h5" size="2" style={{ maxWidth: 200 }}>
                  注册
                </Heading>
              </NextLink>
              <NextLink href="/login">
                <Heading as="h5" size="2" style={{ maxWidth: 200 }}>
                  登录
                </Heading>
              </NextLink>
            </>
          )}
          {/* Navigation Links */}
          {user && (
            <Flex gap="4" className="ml-8">
              <NextLink href="/home">
                <Text className="hover:text-tomato-900 transition-colors">首页</Text>
              </NextLink>
              <NextLink href="/diary">
                <Text className="hover:text-tomato-900 transition-colors">日记</Text>
              </NextLink>
            </Flex>
          )}
        </Flex>
        <Tooltip content="Navigation">
          <IconButton
            size="3"
            variant="ghost"
            color="gray"
            className="md:hidden"
            onClick={toggleNavBar}
          >
            <HamburgerMenuIcon width="16" height="16" />
          </IconButton>
        </Tooltip>
      </Flex>
    </header>
  )
}

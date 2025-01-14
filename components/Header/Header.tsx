'use client'

// Header.tsx
import { useCallback, useState } from 'react'
import { HamburgerMenuIcon, CaretDownIcon } from '@radix-ui/react-icons'
import { Avatar, Flex, Heading, IconButton, DropdownMenu, Tooltip, Text, Box } from '@radix-ui/themes'
import cs from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import { FaAdjust, FaMoon, FaRegSun, FaUser } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { Link } from '../Link'
import { useTheme } from '../Themes'

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user, logout, isAdmin } = useAuth()

  const toggleNavBar = useCallback(() => {
    setShowMobileMenu((state) => !state)
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

        {/* Desktop Navigation Links - Left Side */}
        {user && (
          <Flex gap="4" className="ml-4 hidden md:flex">
            <NextLink href="/home">
              <Text className="hover:text-tomato-900 transition-colors">首页</Text>
            </NextLink>
            <NextLink href="/diary">
              <Text className="hover:text-tomato-900 transition-colors">日记</Text>
            </NextLink>
          </Flex>
        )}

        {/* Desktop Admin Dropdown - Center */}
        {isAdmin && (
          <div className="hidden md:block">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Text>管理</Text>
                  <CaretDownIcon />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <NextLink href="/user">
                    <Text className="hover:text-tomato-900 transition-colors">用户管理</Text>
                  </NextLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <NextLink href="/logs">
                    <Text className="hover:text-tomato-900 transition-colors">访问日志</Text>
                  </NextLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        )}

        {/* User Section - Right Side */}
        <Flex align="center" gap="3" className="ml-auto">
          {user ? (
            <>
              <button 
                onClick={logout}
                className="text-sm text-gray-500 hover:text-tomato-900 transition-colors hidden md:block"
              >
                退出
              </button>
              <NextLink href="/me">
                <Heading as="h5" size="2" style={{ maxWidth: 200 }} className="hover:text-tomato-900 transition-colors hidden md:block">
                  {user.username || '未设置用户名'}
                </Heading>
              </NextLink>
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
            </>
          ) : (
            <>
              <NextLink href="/register" className="hidden md:block">
                <Heading as="h5" size="2" style={{ maxWidth: 200 }}>
                  注册
                </Heading>
              </NextLink>
              <NextLink href="/login" className="hidden md:block">
                <Heading as="h5" size="2" style={{ maxWidth: 200 }}>
                  登录
                </Heading>
              </NextLink>
            </>
          )}
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          size="3"
          variant="ghost"
          color="gray"
          className="md:hidden"
          onClick={toggleNavBar}
        >
          <HamburgerMenuIcon width="16" height="16" />
        </IconButton>
      </Flex>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <Box className="md:hidden mt-3 py-2 border-t">
          <Flex direction="column" gap="2">
            {user ? (
              <>
                <NextLink href="/home">
                  <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">首页</Text>
                </NextLink>
                <NextLink href="/diary">
                  <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">日记</Text>
                </NextLink>
                {isAdmin && (
                  <>
                    <NextLink href="/user">
                      <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">用户管理</Text>
                    </NextLink>
                    <NextLink href="/logs">
                      <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">访问日志</Text>
                    </NextLink>
                  </>
                )}
                <NextLink href="/me">
                  <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    {user.username || '未设置用户名'}
                  </Text>
                </NextLink>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <NextLink href="/login">
                  <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">登录</Text>
                </NextLink>
                <NextLink href="/register">
                  <Text className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">注册</Text>
                </NextLink>
              </>
            )}
          </Flex>
        </Box>
      )}
    </header>
  )
}

'use client'

import { useState, useRef } from 'react'
import { Avatar, Button, Card, Flex, Heading, TextField, Text } from '@radix-ui/themes'
import { HiUser } from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import { ImageCropper } from '@/components/ImageCropper'

export default function UserProfile() {
  const { user, updateUsername, updateAvatar } = useAuth()
  const [username, setUsername] = useState(user?.username || '')
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cropImage, setCropImage] = useState<string | null>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('文件大小不能超过 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setCropImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = async (croppedImage: string) => {
    try {
      // Convert base64 to blob
      const response = await fetch(croppedImage)
      const blob = await response.blob()

      // Create file from blob
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
      
      // Update avatar
      await updateAvatar(file)
      setCropImage(null)
    } catch (error) {
      console.error('头像上传失败:', error)
      alert('头像上传失败，请重试')
    }
  }

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      alert('用户名不能为空')
      return
    }
    
    try {
      await updateUsername(username)
      setIsEditing(false)
    } catch (error) {
      console.error('更新用户名失败:', error)
      alert('更新用户名失败，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <Flex direction="column" gap="6" p="6">
          <Heading size="6" align="center">个人中心</Heading>
          
          {/* Avatar Section */}
          <Flex direction="column" align="center" gap="2">
            <Avatar
              size="7"
              radius="full"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleAvatarClick}
              fallback={
                user?.avatar ? 
                <img src={user.avatar} alt="User" className="size-full object-cover" /> :
                <HiUser className="size-6" />
              }
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
            />
            <Text size="2" color="gray">点击头像更换（支持 jpg、png、gif、webp 格式，大小不超过 5MB）</Text>
          </Flex>

          {/* Username Section */}
          <form onSubmit={handleUsernameSubmit}>
            <Flex direction="column" gap="2">
              <Text as="label" size="2" weight="medium">
                用户名
              </Text>
              {isEditing ? (
                <Flex gap="2">
                  <TextField.Root className="flex-1">
                    <TextField.Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="输入新的用户名"
                    />
                  </TextField.Root>
                  <Button type="submit" color="tomato">
                    保存
                  </Button>
                  <Button 
                    type="button" 
                    variant="soft" 
                    color="gray"
                    onClick={() => {
                      setUsername(user?.username || '')
                      setIsEditing(false)
                    }}
                  >
                    取消
                  </Button>
                </Flex>
              ) : (
                <Flex justify="between" align="center">
                  <Text>{user?.username || '未设置用户名'}</Text>
                  <Button 
                    type="button"
                    variant="soft"
                    color="tomato"
                    onClick={() => setIsEditing(true)}
                  >
                    编辑
                  </Button>
                </Flex>
              )}
            </Flex>
          </form>

          {/* User Info */}
          <Flex direction="column" gap="2">
            <Text as="div" size="2" color="gray">
              邮箱：{user?.email}
            </Text>
            <Text as="div" size="2" color="gray">
              注册时间：{user?.created_at ? new Date(user.created_at).toLocaleString() : ''}
            </Text>
          </Flex>
        </Flex>
      </Card>

      {/* Image Cropper Dialog */}
      {cropImage && (
        <ImageCropper
          image={cropImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropImage(null)}
        />
      )}
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, User, LogOut, Settings, Trash2, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { ApiTooltip } from "@/components/api-tooltip"

export default function Header() {
  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAdmin, setIsAdmin] = useState(true)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  const user = {
    name: "홍길동",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const userProfileApiInfo = {
    method: "GET" as const,
    endpoint: "/users/{user_id}/info",
    description: "현재 로그인한 사용자의 정보를 조회합니다",
    pathParams: {
      user_id: "현재 사용자의 고유 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "사용자 정보 조회 성공",
      data: {
        user_id: 123,
        username: "johndoe",
        nickname: "존도우",
        email: "johndoe@example.com",
        role: "USER",
        is_banned: false,
        ban_reason: null,
        banned_until: null,
        created_at: "2024-10-01T12:34:56",
      },
    },
  }

  const notificationApiInfo = {
    method: "GET" as const,
    endpoint: "/notifications",
    description: "사용자의 알림 목록을 조회합니다",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 20)",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "알림 목록 조회 성공",
      data: {
        notifications: [
          {
            notification_id: 1,
            type: "COMMENT",
            message: "누군가 내 게시글에 댓글을 남겼습니다.",
            is_read: false,
            created_at: "2024-11-02T13:00:00",
          },
        ],
      },
    },
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            게시판 시스템
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              홈
            </Link>
            <Link href="/posts" className="text-sm font-medium transition-colors hover:text-primary">
              게시판
            </Link>
            {isLoggedIn ? (
              <Link href="/posts/create" className="text-sm font-medium transition-colors hover:text-primary">
                글쓰기
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthDialog(true)}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                글쓰기
              </button>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />

          {isLoggedIn ? (
            <>
              <ApiTooltip apiInfo={notificationApiInfo}>
                <Link href="/notifications" className="relative">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  {unreadNotifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
              </ApiTooltip>

              <ApiTooltip apiInfo={userProfileApiInfo}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/me/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>프로필</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/me/trash">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>휴지통</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>설정</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin/dashboard">
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            <span>관리자</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ApiTooltip>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/register">회원가입</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        action="글쓰기"
        description="게시글을 작성하려면 먼저 로그인해주세요."
      />
    </header>
  )
}

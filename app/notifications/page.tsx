"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Bell, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  const { toast } = useToast()

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "COMMENT",
      message: "홍길동님이 회원님의 게시글에 댓글을 남겼습니다.",
      isRead: false,
      createdAt: "2025-05-20T14:30:00",
    },
    {
      id: "2",
      type: "LIKE",
      message: "이순신님이 회원님의 게시글을 좋아합니다.",
      isRead: false,
      createdAt: "2025-05-19T10:15:00",
    },
    {
      id: "3",
      type: "REPLY",
      message: "김철수님이 회원님의 댓글에 답글을 남겼습니다.",
      isRead: true,
      createdAt: "2025-05-18T16:45:00",
    },
    {
      id: "4",
      type: "SYSTEM",
      message: "시스템 점검 안내: 2025년 5월 25일 02:00-04:00",
      isRead: true,
      createdAt: "2025-05-17T09:00:00",
    },
  ])

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )

    toast({
      description: "알림을 읽음 처리했습니다.",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))

    toast({
      description: "모든 알림을 읽음 처리했습니다.",
    })
  }

  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">알림</h1>
          {unreadCount > 0 && <Badge variant="destructive">{unreadCount}개 읽지 않음</Badge>}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            모두 읽음 처리
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>알림 목록</CardTitle>
          <CardDescription>최근 알림 목록입니다. 읽지 않은 알림은 강조 표시됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p>알림이 없습니다.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg flex justify-between items-start ${!notification.isRead ? "bg-muted" : ""}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        notification.type === "COMMENT"
                          ? "default"
                          : notification.type === "LIKE"
                            ? "secondary"
                            : notification.type === "REPLY"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {notification.type === "COMMENT"
                        ? "댓글"
                        : notification.type === "LIKE"
                          ? "좋아요"
                          : notification.type === "REPLY"
                            ? "답글"
                            : "시스템"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleString("ko-KR")}
                    </span>
                  </div>
                  <p>{notification.message}</p>
                </div>
                {!notification.isRead && (
                  <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

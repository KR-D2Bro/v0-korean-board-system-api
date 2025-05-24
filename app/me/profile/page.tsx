"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ApiTooltip } from "@/components/api-tooltip"
import { User, Mail, Calendar, Shield, AlertTriangle, Edit } from "lucide-react"

interface UserProfile {
  user_id: number
  username: string
  nickname: string
  email: string
  role: "USER" | "ADMIN"
  is_banned: boolean
  ban_reason: string | null
  banned_until: string | null
  created_at: string
}

interface ApiResponse {
  resultCode: string
  resultMessage: string
  data: UserProfile
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      // 실제 API 호출 대신 Mock 데이터 사용
      // 실제 구현에서는 아래 주석을 해제하고 Mock 데이터 부분을 제거하세요
      /*
      const userId = 123 // 실제로는 현재 로그인한 사용자의 ID를 사용
      const response = await fetch(`/users/${userId}/info`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...",
        },
      })

      if (!response.ok) {
        throw new Error("프로필 정보를 불러오는데 실패했습니다")
      }

      const data: ApiResponse = await response.json()

      if (data.resultCode === "200000") {
        setProfile(data.data)
      } else {
        throw new Error(data.resultMessage)
      }
      */

      // Mock 데이터 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // 로딩 시뮬레이션

      const mockData: ApiResponse = {
        resultCode: "200000",
        resultMessage: "사용자 정보 조회 성공",
        data: {
          user_id: 123,
          username: "johndoe",
          nickname: "홍길동",
          email: "johndoe@example.com",
          role: "USER",
          is_banned: false,
          ban_reason: null,
          banned_until: null,
          created_at: "2024-10-01T12:34:56",
        },
      }

      setProfile(mockData.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR")
  }

  const getRoleBadgeVariant = (role: string) => {
    return role === "ADMIN" ? "destructive" : "secondary"
  }

  const apiInfo = {
    method: "GET" as const,
    endpoint: "/users/{user_id}/info",
    description: "특정 사용자의 회원 가입 정보를 조회합니다",
    pathParams: {
      user_id: "조회할 사용자의 고유 ID",
    },
    requestExample: `GET /users/123/info
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...`,
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
    errorCodes: {
      "400001": "유효하지 않은 요청",
      "401000": "인증이 필요합니다",
      "403006": "권한이 없습니다",
      "404003": "사용자를 찾을 수 없습니다",
      "500000": "서버 오류 발생",
    },
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-32" />
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={fetchProfile} className="mt-4">
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <User className="h-8 w-8" />
            <h1 className="text-2xl font-bold">내 프로필</h1>
          </div>
          <ApiTooltip apiInfo={apiInfo}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              편집
            </Button>
          </ApiTooltip>
        </div>

        {profile.is_banned && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-semibold">계정이 정지되었습니다</p>
                {profile.ban_reason && <p>사유: {profile.ban_reason}</p>}
                {profile.banned_until && <p>해제 예정: {formatDateTime(profile.banned_until)}</p>}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>계정 정보</CardTitle>
            <CardDescription>회원가입 정보와 계정 상태를 확인할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  닉네임
                </label>
                <p className="text-lg font-semibold">{profile.nickname}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">계정명</label>
                <p className="text-lg">{profile.username}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  이메일
                </label>
                <p className="text-lg">{profile.email}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  권한
                </label>
                <Badge variant={getRoleBadgeVariant(profile.role)}>
                  {profile.role === "ADMIN" ? "관리자" : "일반 사용자"}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">사용자 ID</label>
                <p className="text-lg font-mono">{profile.user_id}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  가입일
                </label>
                <p className="text-lg">{formatDate(profile.created_at)}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">계정 상태</h3>
                  <p className="text-sm text-muted-foreground">현재 계정의 활성화 상태입니다</p>
                </div>
                <Badge variant={profile.is_banned ? "destructive" : "default"}>
                  {profile.is_banned ? "정지됨" : "활성"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="flex-1">
            비밀번호 변경
          </Button>
          <Button variant="outline" className="flex-1">
            계정 설정
          </Button>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 <strong>개발자 노트:</strong> 현재 Mock 데이터를 사용하고 있습니다. 실제 API 서버 구현 후 코드의 주석
            부분을 해제하여 실제 API를 호출하세요.
          </p>
        </div>
      </div>
    </div>
  )
}

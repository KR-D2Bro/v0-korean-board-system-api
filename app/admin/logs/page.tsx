"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Search, Filter, Download, RefreshCw, AlertTriangle, Info, AlertCircle } from "lucide-react"
import Link from "next/link"
import { ApiTooltip, type ApiInfo } from "@/components/api-tooltip"

export default function AdminLogsPage() {
  const [selectedTab, setSelectedTab] = useState("system")
  const [searchTerm, setSearchTerm] = useState("")
  const [logLevel, setLogLevel] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  // API 정보 정의
  const getSystemLogsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/admin/logs",
    description: "시스템 로그를 조회합니다.",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 50)",
      level: "로그 레벨 (DEBUG, INFO, WARN, ERROR)",
      start_date: "시작 날짜 (YYYY-MM-DD)",
      end_date: "종료 날짜 (YYYY-MM-DD)",
      search: "검색어",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "시스템 로그 조회 성공",
      data: {
        logs: [
          {
            log_id: 1001,
            level: "INFO",
            message: "사용자 로그인 성공",
            timestamp: "2024-11-03T10:30:00",
            source: "auth.service",
            user_id: 123,
          },
        ],
        total_count: 1500,
        current_page: 1,
        total_pages: 30,
      },
    },
  }

  const getUserActionLogsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/admin/logs/user-actions",
    description: "사용자 행동 로그를 조회합니다.",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 50)",
      user_id: "특정 사용자 ID",
      action_type: "행동 유형 (LOGIN, LOGOUT, POST_CREATE, etc.)",
      start_date: "시작 날짜 (YYYY-MM-DD)",
      end_date: "종료 날짜 (YYYY-MM-DD)",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "사용자 행동 로그 조회 성공",
      data: {
        logs: [
          {
            log_id: 2001,
            user_id: 123,
            username: "johndoe",
            action_type: "POST_CREATE",
            description: "새 게시글 작성",
            ip_address: "192.168.1.100",
            user_agent: "Mozilla/5.0...",
            timestamp: "2024-11-03T14:25:00",
          },
        ],
        total_count: 800,
        current_page: 1,
        total_pages: 16,
      },
    },
  }

  const getErrorLogsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/admin/logs/errors",
    description: "에러 로그를 조회합니다.",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 50)",
      severity: "심각도 (LOW, MEDIUM, HIGH, CRITICAL)",
      start_date: "시작 날짜 (YYYY-MM-DD)",
      end_date: "종료 날짜 (YYYY-MM-DD)",
      search: "검색어",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "에러 로그 조회 성공",
      data: {
        logs: [
          {
            log_id: 3001,
            severity: "HIGH",
            error_code: "DB_CONNECTION_FAILED",
            message: "데이터베이스 연결 실패",
            stack_trace: "Error: Connection timeout...",
            timestamp: "2024-11-03T09:15:00",
            resolved: false,
          },
        ],
        total_count: 45,
        current_page: 1,
        total_pages: 1,
      },
    },
  }

  // Mock 데이터
  const systemLogs = [
    {
      id: "1001",
      level: "INFO",
      message: "사용자 로그인 성공",
      timestamp: "2025-05-24T10:30:00",
      source: "auth.service",
      userId: "123",
    },
    {
      id: "1002",
      level: "WARN",
      message: "비정상적인 로그인 시도 감지",
      timestamp: "2025-05-24T10:25:00",
      source: "security.service",
      userId: "456",
    },
    {
      id: "1003",
      level: "ERROR",
      message: "데이터베이스 연결 실패",
      timestamp: "2025-05-24T10:20:00",
      source: "database.service",
      userId: null,
    },
    {
      id: "1004",
      level: "DEBUG",
      message: "API 요청 처리 완료",
      timestamp: "2025-05-24T10:15:00",
      source: "api.controller",
      userId: "789",
    },
  ]

  const userActionLogs = [
    {
      id: "2001",
      userId: "123",
      username: "johndoe",
      actionType: "POST_CREATE",
      description: "새 게시글 작성",
      ipAddress: "192.168.1.100",
      timestamp: "2025-05-24T14:25:00",
    },
    {
      id: "2002",
      userId: "456",
      username: "janedoe",
      actionType: "LOGIN",
      description: "사용자 로그인",
      ipAddress: "192.168.1.101",
      timestamp: "2025-05-24T14:20:00",
    },
    {
      id: "2003",
      userId: "789",
      username: "admin",
      actionType: "USER_BAN",
      description: "사용자 정지 처리",
      ipAddress: "192.168.1.102",
      timestamp: "2025-05-24T14:15:00",
    },
  ]

  const errorLogs = [
    {
      id: "3001",
      severity: "HIGH",
      errorCode: "DB_CONNECTION_FAILED",
      message: "데이터베이스 연결 실패",
      timestamp: "2025-05-24T09:15:00",
      resolved: false,
    },
    {
      id: "3002",
      severity: "MEDIUM",
      errorCode: "FILE_UPLOAD_ERROR",
      message: "파일 업로드 중 오류 발생",
      timestamp: "2025-05-24T09:10:00",
      resolved: true,
    },
    {
      id: "3003",
      severity: "CRITICAL",
      errorCode: "SECURITY_BREACH",
      message: "보안 위반 시도 감지",
      timestamp: "2025-05-24T09:05:00",
      resolved: false,
    },
  ]

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "ERROR":
      case "CRITICAL":
        return "destructive"
      case "WARN":
      case "HIGH":
        return "default"
      case "INFO":
      case "MEDIUM":
        return "secondary"
      case "DEBUG":
      case "LOW":
        return "outline"
      default:
        return "outline"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
      case "CRITICAL":
        return <AlertTriangle className="h-4 w-4" />
      case "WARN":
      case "HIGH":
        return <AlertCircle className="h-4 w-4" />
      case "INFO":
      case "MEDIUM":
      case "DEBUG":
      case "LOW":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">시스템 로그</h1>
          <p className="text-muted-foreground">시스템 로그, 사용자 행동, 에러 로그를 확인할 수 있습니다</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard">대시보드로 돌아가기</Link>
          </Button>
        </div>
      </div>

      {/* 필터 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            필터 및 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="로그 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={logLevel} onValueChange={setLogLevel}>
              <SelectTrigger>
                <SelectValue placeholder="로그 레벨" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 레벨</SelectItem>
                <SelectItem value="DEBUG">DEBUG</SelectItem>
                <SelectItem value="INFO">INFO</SelectItem>
                <SelectItem value="WARN">WARN</SelectItem>
                <SelectItem value="ERROR">ERROR</SelectItem>
                <SelectItem value="CRITICAL">CRITICAL</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="날짜 범위" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">오늘</SelectItem>
                <SelectItem value="yesterday">어제</SelectItem>
                <SelectItem value="week">최근 7일</SelectItem>
                <SelectItem value="month">최근 30일</SelectItem>
                <SelectItem value="custom">사용자 지정</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              검색
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 로그 탭 */}
      <Tabs defaultValue="system" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="system">시스템 로그</TabsTrigger>
          <TabsTrigger value="user-actions">사용자 행동</TabsTrigger>
          <TabsTrigger value="errors">에러 로그</TabsTrigger>
        </TabsList>

        {/* 시스템 로그 */}
        <TabsContent value="system">
          <ApiTooltip apiInfo={getSystemLogsApiInfo} showIndicator={false}>
            <Card>
              <CardHeader>
                <CardTitle>시스템 로그</CardTitle>
                <CardDescription>시스템에서 발생한 모든 로그를 확인할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">레벨</TableHead>
                      <TableHead>메시지</TableHead>
                      <TableHead className="w-[150px]">소스</TableHead>
                      <TableHead className="w-[100px]">사용자 ID</TableHead>
                      <TableHead className="w-[180px]">시간</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Badge variant={getLevelBadgeVariant(log.level)} className="flex items-center gap-1">
                            {getLevelIcon(log.level)}
                            {log.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{log.message}</TableCell>
                        <TableCell className="font-mono text-sm">{log.source}</TableCell>
                        <TableCell>{log.userId || "-"}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString("ko-KR")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ApiTooltip>
        </TabsContent>

        {/* 사용자 행동 로그 */}
        <TabsContent value="user-actions">
          <ApiTooltip apiInfo={getUserActionLogsApiInfo} showIndicator={false}>
            <Card>
              <CardHeader>
                <CardTitle>사용자 행동 로그</CardTitle>
                <CardDescription>사용자의 모든 행동을 추적한 로그입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">사용자 ID</TableHead>
                      <TableHead className="w-[120px]">사용자명</TableHead>
                      <TableHead className="w-[150px]">행동 유형</TableHead>
                      <TableHead>설명</TableHead>
                      <TableHead className="w-[130px]">IP 주소</TableHead>
                      <TableHead className="w-[180px]">시간</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActionLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono">{log.userId}</TableCell>
                        <TableCell className="font-medium">{log.username}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.actionType}</Badge>
                        </TableCell>
                        <TableCell>{log.description}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString("ko-KR")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ApiTooltip>
        </TabsContent>

        {/* 에러 로그 */}
        <TabsContent value="errors">
          <ApiTooltip apiInfo={getErrorLogsApiInfo} showIndicator={false}>
            <Card>
              <CardHeader>
                <CardTitle>에러 로그</CardTitle>
                <CardDescription>시스템에서 발생한 에러와 예외 상황을 확인할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">심각도</TableHead>
                      <TableHead className="w-[180px]">에러 코드</TableHead>
                      <TableHead>메시지</TableHead>
                      <TableHead className="w-[100px]">해결 상태</TableHead>
                      <TableHead className="w-[180px]">시간</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errorLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Badge variant={getLevelBadgeVariant(log.severity)} className="flex items-center gap-1">
                            {getLevelIcon(log.severity)}
                            {log.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{log.errorCode}</TableCell>
                        <TableCell className="font-medium">{log.message}</TableCell>
                        <TableCell>
                          <Badge variant={log.resolved ? "default" : "destructive"}>
                            {log.resolved ? "해결됨" : "미해결"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString("ko-KR")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ApiTooltip>
        </TabsContent>
      </Tabs>

      {/* 페이지네이션 */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            이전
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

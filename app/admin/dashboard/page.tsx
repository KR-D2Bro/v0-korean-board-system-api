"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import {
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Flag,
  Settings,
  FolderTree,
  Search,
  ArrowUpDown,
  ChevronDown,
  Filter,
  FileBarChart,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AdminStats from "@/components/admin/admin-stats"
import AdminUserManagement from "@/components/admin/admin-user-management"
import AdminCategoryManagement from "@/components/admin/admin-category-management"
import AdminSystemSettings from "@/components/admin/admin-system-settings"
import { ApiTooltip } from "@/components/api-tooltip"

// 신고 관리 탭의 API 정보들
const getPostReportsApiInfo = {
  method: "GET",
  endpoint: "/admin/reports/posts",
  description: "게시글 신고 목록을 조회합니다.",
  queryParams: {
    page: "페이지 번호",
    size: "페이지당 신고 수",
    status: "신고 상태 필터 (PENDING, PROCESSED, REJECTED)",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "게시글 신고 목록 조회 성공",
    data: [
      {
        report_id: 1,
        reason: "욕설이 포함되어 있습니다.",
        reporter_id: 101,
        status: "PENDING",
        created_at: "2024-11-01T09:00:00",
      },
    ],
  },
}

const getCommentReportsApiInfo = {
  method: "GET",
  endpoint: "/admin/reports/comments",
  description: "댓글 신고 목록을 조회합니다.",
  queryParams: {
    page: "페이지 번호",
    size: "페이지당 신고 수",
    status: "신고 상태 필터 (PENDING, PROCESSED, REJECTED)",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "댓글 신고 목록 조회 성공",
    data: [
      {
        report_id: 11,
        reason: "비속어가 포함되어 있음",
        reporter_id: 1002,
        status: "PENDING",
        created_at: "2024-11-02T15:30:00",
      },
    ],
  },
}

const updateReportStatusApiInfo = {
  method: "PATCH",
  endpoint: "/admin/reports/{report_id}/status",
  description: "신고 처리 상태를 변경합니다.",
  pathParams: {
    report_id: "신고 ID",
  },
  requestBody: {
    status: "PROCESSED 또는 REJECTED",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "신고 상태 변경 성공",
  },
}

const getBlindedPostsApiInfo = {
  method: "GET",
  endpoint: "/admin/posts/blinded",
  description: "블라인드 처리된 게시글 목록을 조회합니다.",
  queryParams: {
    page: "페이지 번호 (기본: 1)",
    size: "페이지 크기 (기본: 20)",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "블라인드 게시글 목록 조회 성공",
    data: [
      {
        post_id: 123,
        title: "블라인드 처리된 게시글",
        author_id: 101,
        blind_reason: "욕설이 포함되어 있습니다",
        created_at: "2024-10-01T12:00:00",
      },
    ],
  },
}

const getBlindedCommentsApiInfo = {
  method: "GET",
  endpoint: "/admin/comments/blinded",
  description: "블라인드 처리된 댓글 목록을 조회합니다.",
  queryParams: {
    page: "페이지 번호 (기본: 1)",
    size: "페이지 크기 (기본: 20)",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "블라인드 댓글 목록 조회 성공",
    data: [
      {
        comment_id: 555,
        content: "비속어가 포함된 댓글",
        author_id: 1005,
        blind_reason: "욕설 포함",
        created_at: "2024-11-01T08:30:00",
      },
    ],
  },
}

const unblindPostApiInfo = {
  method: "PATCH",
  endpoint: "/admin/posts/{post_id}/unblind",
  description: "게시글 블라인드를 해제합니다.",
  pathParams: {
    post_id: "게시글 ID",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "블라인드 게시글 해제 성공",
  },
}

const unblindCommentApiInfo = {
  method: "PATCH",
  endpoint: "/admin/comments/{comment_id}/unblind",
  description: "댓글 블라인드를 해제합니다.",
  pathParams: {
    comment_id: "댓글 ID",
  },
  responseExample: {
    resultCode: "200000",
    resultMessage: "블라인드 댓글 해제 성공",
  },
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/logs">
              <FileBarChart className="h-4 w-4 mr-2" />
              로그 확인
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">사이트로 돌아가기</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">개요</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">사용자</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span className="hidden sm:inline">신고</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderTree className="h-4 w-4" />
            <span className="hidden sm:inline">카테고리</span>
          </TabsTrigger>
          <TabsTrigger value="blinded" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">블라인드</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">설정</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminStats />
        </TabsContent>

        <TabsContent value="users">
          <AdminUserManagement />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Tabs defaultValue="posts">
            <TabsList>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                게시글 신고
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                댓글 신고
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>게시글 신고 목록</CardTitle>
                      <CardDescription>
                        사용자가 신고한 게시글 목록입니다. 검토 후 적절한 조치를 취하세요.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="검색..." className="pl-8 w-[200px]" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            필터
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>모든 신고</DropdownMenuItem>
                          <DropdownMenuItem>대기중</DropdownMenuItem>
                          <DropdownMenuItem>처리됨</DropdownMenuItem>
                          <DropdownMenuItem>거부됨</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            제목
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>신고자</TableHead>
                        <TableHead>신고 사유</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            신고일
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          title: "부적절한 내용의 게시글",
                          reporter: "user123",
                          reason: "욕설이 포함되어 있습니다",
                          status: "PENDING",
                          createdAt: "2025-05-20T10:30:00",
                        },
                        {
                          id: "2",
                          title: "광고성 게시글",
                          reporter: "user456",
                          reason: "광고성 게시글입니다",
                          status: "PROCESSED",
                          createdAt: "2025-05-19T14:20:00",
                        },
                        {
                          id: "3",
                          title: "스팸 게시글",
                          reporter: "user789",
                          reason: "스팸 게시글입니다",
                          status: "REJECTED",
                          createdAt: "2025-05-18T09:15:00",
                        },
                      ].map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.id}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.reporter}</TableCell>
                          <TableCell>{post.reason}</TableCell>
                          <TableCell>{new Date(post.createdAt).toLocaleString("ko-KR")}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                post.status === "PENDING"
                                  ? "outline"
                                  : post.status === "PROCESSED"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {post.status === "PENDING" ? "대기중" : post.status === "PROCESSED" ? "처리됨" : "거부됨"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/posts/${post.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              {post.status === "PENDING" && (
                                <>
                                  <ApiTooltip apiInfo={updateReportStatusApiInfo}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          description: "게시글 신고가 처리되었습니다.",
                                        })
                                      }}
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </Button>
                                  </ApiTooltip>
                                  <ApiTooltip apiInfo={updateReportStatusApiInfo}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          description: "게시글 신고가 거부되었습니다.",
                                        })
                                      }}
                                    >
                                      <XCircle className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </ApiTooltip>
                                </>
                              )}

                              {post.status !== "PENDING" && (
                                <Select
                                  onValueChange={(value) => {
                                    const statusText =
                                      value === "PENDING" ? "대기중" : value === "PROCESSED" ? "처리됨" : "거부됨"
                                    toast({
                                      description: `게시글 신고 상태가 ${statusText}으로 변경되었습니다.`,
                                    })
                                  }}
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="상태 변경" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">대기중</SelectItem>
                                    <SelectItem value="PROCESSED">처리됨</SelectItem>
                                    <SelectItem value="REJECTED">거부됨</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">총 3개의 신고</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      이전
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      다음
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>댓글 신고 목록</CardTitle>
                      <CardDescription>
                        사용자가 신고한 댓글 목록입니다. 검토 후 적절한 조치를 취하세요.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="검색..." className="pl-8 w-[200px]" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            필터
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>모든 신고</DropdownMenuItem>
                          <DropdownMenuItem>대기중</DropdownMenuItem>
                          <DropdownMenuItem>처리됨</DropdownMenuItem>
                          <DropdownMenuItem>거부됨</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>내용</TableHead>
                        <TableHead>신고자</TableHead>
                        <TableHead>신고 사유</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            신고일
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          content: "부적절한 댓글",
                          reporter: "user123",
                          reason: "욕설이 포함되어 있습니다",
                          status: "PENDING",
                          createdAt: "2025-05-20T11:45:00",
                        },
                        {
                          id: "2",
                          content: "스팸 댓글",
                          reporter: "user456",
                          reason: "스팸 댓글입니다",
                          status: "PROCESSED",
                          createdAt: "2025-05-19T16:30:00",
                        },
                      ].map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell className="font-medium">{comment.id}</TableCell>
                          <TableCell>{comment.content}</TableCell>
                          <TableCell>{comment.reporter}</TableCell>
                          <TableCell>{comment.reason}</TableCell>
                          <TableCell>{new Date(comment.createdAt).toLocaleString("ko-KR")}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                comment.status === "PENDING"
                                  ? "outline"
                                  : comment.status === "PROCESSED"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {comment.status === "PENDING"
                                ? "대기중"
                                : comment.status === "PROCESSED"
                                  ? "처리됨"
                                  : "거부됨"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {comment.status === "PENDING" && (
                                <>
                                  <ApiTooltip apiInfo={updateReportStatusApiInfo}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          description: "댓글 신고가 처리되었습니다.",
                                        })
                                      }}
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </Button>
                                  </ApiTooltip>
                                  <ApiTooltip apiInfo={updateReportStatusApiInfo}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          description: "댓글 신고가 거부되었습니다.",
                                        })
                                      }}
                                    >
                                      <XCircle className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </ApiTooltip>
                                </>
                              )}
                              {comment.status !== "PENDING" && (
                                <Select
                                  onValueChange={(value) => {
                                    const statusText =
                                      value === "PENDING" ? "대기중" : value === "PROCESSED" ? "처리됨" : "거부됨"
                                    toast({
                                      description: `댓글 신고 상태가 ${statusText}으로 변경되었습니다.`,
                                    })
                                  }}
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="상태 변경" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">대기중</SelectItem>
                                    <SelectItem value="PROCESSED">처리됨</SelectItem>
                                    <SelectItem value="REJECTED">거부됨</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">총 2개의 신고</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      이전
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      다음
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="categories">
          <AdminCategoryManagement />
        </TabsContent>

        <TabsContent value="blinded" className="space-y-4">
          <Tabs defaultValue="posts">
            <TabsList>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                블라인드 게시글
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                블라인드 댓글
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>블라인드 게시글 목록</CardTitle>
                      <CardDescription>블라인드 처리된 게시글 목록입니다. 검토 후 해제할 수 있습니다.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="검색..." className="pl-8 w-[200px]" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead>작성자</TableHead>
                        <TableHead>블라인드 사유</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            작성일
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          title: "블라인드 처리된 게시글",
                          author: "user123",
                          reason: "욕설이 포함되어 있습니다",
                          createdAt: "2025-05-18T10:30:00",
                        },
                        {
                          id: "2",
                          title: "블라인드 처리된 광고성 게시글",
                          author: "user456",
                          reason: "광고성 게시글입니다",
                          createdAt: "2025-05-17T14:20:00",
                        },
                      ].map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.id}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.reason}</TableCell>
                          <TableCell>{new Date(post.createdAt).toLocaleString("ko-KR")}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/posts/${post.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <ApiTooltip apiInfo={unblindPostApiInfo}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      description: "게시글 블라인드가 해제되었습니다.",
                                    })
                                  }}
                                >
                                  블라인드 해제
                                </Button>
                              </ApiTooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">총 2개의 블라인드 게시글</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      이전
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      다음
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>블라인드 댓글 목록</CardTitle>
                      <CardDescription>블라인드 처리된 댓글 목록입니다. 검토 후 해제할 수 있습니다.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="검색..." className="pl-8 w-[200px]" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>내용</TableHead>
                        <TableHead>작성자</TableHead>
                        <TableHead>블라인드 사유</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            작성일
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          content: "블라인드 처리된 댓글",
                          author: "user123",
                          reason: "욕설이 포함되어 있습니다",
                          createdAt: "2025-05-16T11:45:00",
                        },
                        {
                          id: "2",
                          content: "블라인드 처리된 스팸 댓글",
                          author: "user456",
                          reason: "스팸 댓글입니다",
                          createdAt: "2025-05-15T16:30:00",
                        },
                      ].map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell className="font-medium">{comment.id}</TableCell>
                          <TableCell>{comment.content}</TableCell>
                          <TableCell>{comment.author}</TableCell>
                          <TableCell>{comment.reason}</TableCell>
                          <TableCell>{new Date(comment.createdAt).toLocaleString("ko-KR")}</TableCell>
                          <TableCell>
                            <ApiTooltip apiInfo={unblindCommentApiInfo}>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    description: "댓글 블라인드가 해제되었습니다.",
                                  })
                                }}
                              >
                                블라인드 해제
                              </Button>
                            </ApiTooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">총 2개의 블라인드 댓글</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      이전
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      다음
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="settings">
          <AdminSystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Undo, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ApiTooltip, type ApiInfo } from "@/components/api-tooltip"

export default function TrashPage() {
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("posts")

  // API 정보 정의
  const getDeletedPostsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/me/trash/posts",
    description: "삭제된 게시글 목록을 조회합니다.",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 20)",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "삭제된 게시글 목록 조회 성공",
      data: [
        {
          post_id: 123,
          title: "삭제된 글입니다",
          author_id: 101,
          created_at: "2024-10-01T12:00:00",
          deleted_at: "2024-11-01T08:00:00",
        },
      ],
    },
  }

  const getDeletedCommentsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/me/trash/comments",
    description: "삭제된 댓글 목록을 조회합니다.",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 20)",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "삭제된 댓글 목록 조회 성공",
      data: [
        {
          comment_id: 456,
          content: "삭제된 댓글입니다.",
          author_id: 202,
          created_at: "2024-10-15T10:00:00",
          deleted_at: "2024-11-01T09:30:00",
        },
      ],
    },
  }

  const restorePostApiInfo: ApiInfo = {
    method: "PATCH",
    endpoint: "/me/trash/posts/{post_id}/restore",
    description: "삭제된 게시글을 복구합니다.",
    pathParams: {
      post_id: "복구할 게시글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 복구 성공",
    },
  }

  const restoreCommentApiInfo: ApiInfo = {
    method: "PATCH",
    endpoint: "/me/trash/comments/{comment_id}/restore",
    description: "삭제된 댓글을 복구합니다.",
    pathParams: {
      comment_id: "복구할 댓글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 복구 성공",
    },
  }

  const permanentDeletePostApiInfo: ApiInfo = {
    method: "DELETE",
    endpoint: "/me/trash/posts/{post_id}",
    description: "게시글을 완전히 삭제합니다.",
    pathParams: {
      post_id: "완전 삭제할 게시글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 완전 삭제 완료",
    },
  }

  const permanentDeleteCommentApiInfo: ApiInfo = {
    method: "DELETE",
    endpoint: "/me/trash/comments/{comment_id}",
    description: "댓글을 완전히 삭제합니다.",
    pathParams: {
      comment_id: "완전 삭제할 댓글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 완전 삭제 완료",
    },
  }

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const deletedPosts = [
    { id: "1", title: "삭제된 게시글 1", createdAt: "2025-05-10T14:23:11", deletedAt: "2025-05-15T09:30:00" },
    { id: "2", title: "삭제된 게시글 2", createdAt: "2025-05-08T10:15:22", deletedAt: "2025-05-14T16:45:00" },
  ]

  const deletedComments = [
    { id: "1", content: "삭제된 댓글 1", createdAt: "2025-05-12T11:30:45", deletedAt: "2025-05-15T10:20:00" },
    { id: "2", content: "삭제된 댓글 2", createdAt: "2025-05-09T09:45:30", deletedAt: "2025-05-14T14:10:00" },
  ]

  const handleRestore = (id: string, type: "post" | "comment") => {
    toast({
      description: `${type === "post" ? "게시글" : "댓글"}이 복구되었습니다.`,
    })
  }

  const handleDelete = (id: string, type: "post" | "comment") => {
    toast({
      description: `${type === "post" ? "게시글" : "댓글"}이 완전히 삭제되었습니다.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">휴지통</h1>
      </div>

      <Tabs defaultValue="posts" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">삭제된 게시글</TabsTrigger>
          <TabsTrigger value="comments">삭제된 댓글</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>삭제된 게시글</CardTitle>
              <CardDescription>최근에 삭제한 게시글 목록입니다. 복구하거나 완전히 삭제할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>제목</TableHead>
                    <TableHead>작성일</TableHead>
                    <TableHead>삭제일</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deletedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{new Date(post.createdAt).toLocaleString("ko-KR")}</TableCell>
                      <TableCell>{new Date(post.deletedAt).toLocaleString("ko-KR")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ApiTooltip apiInfo={restorePostApiInfo}>
                            <Button variant="outline" size="sm" onClick={() => handleRestore(post.id, "post")}>
                              <Undo className="h-4 w-4 mr-1" />
                              복구
                            </Button>
                          </ApiTooltip>
                          <ApiTooltip apiInfo={permanentDeletePostApiInfo}>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  완전 삭제
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>게시글 완전 삭제</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    이 게시글을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>취소</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(post.id, "post")}>
                                    삭제
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </ApiTooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>삭제된 댓글</CardTitle>
              <CardDescription>최근에 삭제한 댓글 목록입니다. 복구하거나 완전히 삭제할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>내용</TableHead>
                    <TableHead>작성일</TableHead>
                    <TableHead>삭제일</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deletedComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="font-medium">{comment.content}</TableCell>
                      <TableCell>{new Date(comment.createdAt).toLocaleString("ko-KR")}</TableCell>
                      <TableCell>{new Date(comment.deletedAt).toLocaleString("ko-KR")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ApiTooltip apiInfo={restoreCommentApiInfo}>
                            <Button variant="outline" size="sm" onClick={() => handleRestore(comment.id, "comment")}>
                              <Undo className="h-4 w-4 mr-1" />
                              복구
                            </Button>
                          </ApiTooltip>
                          <ApiTooltip apiInfo={permanentDeleteCommentApiInfo}>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  완전 삭제
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>댓글 완전 삭제</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    이 댓글을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>취소</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(comment.id, "comment")}>
                                    삭제
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </ApiTooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

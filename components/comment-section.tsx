"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Heart, MoreVertical, Flag, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ApiTooltip, type ApiInfo } from "@/components/api-tooltip"

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { toast } = useToast()
  const [commentText, setCommentText] = useState("")
  const [isSecret, setIsSecret] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const [comments, setComments] = useState([
    {
      id: "1",
      content: "좋은 정보 감사합니다!",
      author: {
        id: "101",
        name: "홍길동",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-20T15:30:00",
      likeCount: 2,
      isLiked: false,
      isSecret: false,
      parentId: null,
    },
    {
      id: "2",
      content: "질문이 있습니다. 이 기능은 언제 구현될 예정인가요?",
      author: {
        id: "102",
        name: "이순신",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-20T16:15:00",
      likeCount: 0,
      isLiked: false,
      isSecret: false,
      parentId: null,
    },
    {
      id: "3",
      content: "다음 업데이트에 구현될 예정입니다.",
      author: {
        id: "101",
        name: "홍길동",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-20T16:45:00",
      likeCount: 1,
      isLiked: false,
      isSecret: false,
      parentId: "2",
    },
  ])

  // API 정보 정의
  const getCommentsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: `/posts/${postId}/comments`,
    description: "게시글의 댓글 목록을 조회합니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 20)",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 목록 조회 성공",
      data: {
        comments: [
          {
            comment_id: 1,
            content: "댓글 내용",
            author_name: "작성자명",
            created_at: "2025-05-20T15:30:00",
            like_count: 2,
            is_secret: false,
            parent_id: null,
          },
        ],
      },
    },
  }

  const createCommentApiInfo: ApiInfo = {
    method: "POST",
    endpoint: `/posts/${postId}/comments`,
    description: "게시글에 새 댓글을 작성합니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    requestBody: {
      content: "댓글 내용",
      is_secret: false,
      parent_id: null, // 대댓글인 경우 부모 댓글 ID
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 작성 성공",
    },
  }

  const likeCommentApiInfo: ApiInfo = {
    method: "POST",
    endpoint: `/comments/{comment_id}/like`,
    description: "댓글 좋아요를 누릅니다.",
    pathParams: {
      comment_id: "댓글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 좋아요 성공",
    },
  }

  const updateCommentApiInfo: ApiInfo = {
    method: "PATCH",
    endpoint: `/comments/{comment_id}`,
    description: "댓글을 수정합니다.",
    pathParams: {
      comment_id: "댓글 ID",
    },
    requestBody: {
      content: "수정된 댓글 내용",
      is_secret: false,
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 수정 성공",
    },
  }

  const deleteCommentApiInfo: ApiInfo = {
    method: "DELETE",
    endpoint: `/comments/{comment_id}`,
    description: "댓글을 삭제합니다.",
    pathParams: {
      comment_id: "댓글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 삭제 성공",
    },
  }

  const reportCommentApiInfo: ApiInfo = {
    method: "POST",
    endpoint: `/reports/comments/{comment_id}`,
    description: "댓글을 신고합니다.",
    pathParams: {
      comment_id: "댓글 ID",
    },
    requestBody: {
      reason: "신고 사유",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 신고가 접수되었습니다.",
    },
  }

  const replyCommentApiInfo: ApiInfo = {
    method: "POST",
    endpoint: `/posts/${postId}/comments`,
    description: "댓글에 답글을 작성합니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    requestBody: {
      content: "답글 내용",
      is_secret: false,
      parent_id: "부모 댓글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "댓글 작성 성공",
    },
  }

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      toast({
        variant: "destructive",
        description: "댓글 내용을 입력해주세요.",
      })
      return
    }

    // 실제 구현에서는 API 호출 필요
    const newComment = {
      id: `${comments.length + 1}`,
      content: commentText,
      author: {
        id: "101",
        name: "홍길동",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
      isSecret,
      parentId: null,
    }

    setComments([...comments, newComment])
    setCommentText("")
    setIsSecret(false)

    toast({
      description: "댓글이 작성되었습니다.",
    })
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )

    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
      toast({
        description: comment.isLiked ? "좋아요가 취소되었습니다." : "좋아요를 눌렀습니다.",
      })
    }
  }

  const handleReportComment = () => {
    if (!reportReason.trim() || !reportingCommentId) {
      toast({
        variant: "destructive",
        description: "신고 사유를 입력해주세요.",
      })
      return
    }

    // 실제 구현에서는 API 호출 필요
    toast({
      description: "댓글 신고가 접수되었습니다.",
    })

    setReportDialogOpen(false)
    setReportReason("")
    setReportingCommentId(null)
  }

  const handleEditComment = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
      setEditingCommentId(commentId)
      setEditText(comment.content)
    }
  }

  const handleSaveEdit = () => {
    if (!editText.trim() || !editingCommentId) {
      toast({
        variant: "destructive",
        description: "댓글 내용을 입력해주세요.",
      })
      return
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === editingCommentId) {
          return {
            ...comment,
            content: editText,
          }
        }
        return comment
      }),
    )

    toast({
      description: "댓글이 수정되었습니다.",
    })

    setEditingCommentId(null)
    setEditText("")
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId))

    toast({
      description: "댓글이 삭제되었습니다.",
    })
  }

  // 댓글 계층 구조 생성
  const rootComments = comments.filter((comment) => comment.parentId === null)
  const getChildComments = (parentId: string) => comments.filter((comment) => comment.parentId === parentId)

  return (
    <ApiTooltip apiInfo={getCommentsApiInfo} showIndicator={false}>
      <div className="space-y-6">
        <h2 className="text-xl font-bold">댓글 {comments.length}개</h2>

        <div className="space-y-4">
          {rootComments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString("ko-KR")}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <ApiTooltip apiInfo={updateCommentApiInfo}>
                        <DropdownMenuItem onClick={() => handleEditComment(comment.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          수정하기
                        </DropdownMenuItem>
                      </ApiTooltip>
                      <ApiTooltip apiInfo={deleteCommentApiInfo}>
                        <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제하기
                        </DropdownMenuItem>
                      </ApiTooltip>
                      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                        <DialogTrigger asChild>
                          <ApiTooltip apiInfo={reportCommentApiInfo}>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setReportingCommentId(comment.id)
                              }}
                            >
                              <Flag className="mr-2 h-4 w-4" />
                              신고하기
                            </DropdownMenuItem>
                          </ApiTooltip>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>댓글 신고</DialogTitle>
                            <DialogDescription>신고 사유를 작성해주세요. 관리자 검토 후 처리됩니다.</DialogDescription>
                          </DialogHeader>
                          <Textarea
                            placeholder="신고 사유를 입력하세요"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                          />
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                              취소
                            </Button>
                            <Button onClick={handleReportComment}>신고하기</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingCommentId(null)}>
                        취소
                      </Button>
                      <Button onClick={handleSaveEdit}>저장</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mt-2">{comment.content}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <ApiTooltip apiInfo={likeCommentApiInfo}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={comment.isLiked ? "text-rose-500" : ""}
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <Heart className={`mr-1 h-4 w-4 ${comment.isLiked ? "fill-rose-500" : ""}`} />
                          좋아요 {comment.likeCount}
                        </Button>
                      </ApiTooltip>
                      <ApiTooltip apiInfo={replyCommentApiInfo}>
                        <Button variant="ghost" size="sm">
                          답글 달기
                        </Button>
                      </ApiTooltip>
                    </div>
                  </>
                )}
              </div>

              {/* 대댓글 표시 */}
              <div className="pl-8 space-y-4">
                {getChildComments(comment.id).map((childComment) => (
                  <div key={childComment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={childComment.author.avatar || "/placeholder.svg"}
                            alt={childComment.author.name}
                          />
                          <AvatarFallback>{childComment.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{childComment.author.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(childComment.createdAt).toLocaleString("ko-KR")}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <ApiTooltip apiInfo={updateCommentApiInfo}>
                            <DropdownMenuItem onClick={() => handleEditComment(childComment.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              수정하기
                            </DropdownMenuItem>
                          </ApiTooltip>
                          <ApiTooltip apiInfo={deleteCommentApiInfo}>
                            <DropdownMenuItem onClick={() => handleDeleteComment(childComment.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              삭제하기
                            </DropdownMenuItem>
                          </ApiTooltip>
                          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                            <DialogTrigger asChild>
                              <ApiTooltip apiInfo={reportCommentApiInfo}>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setReportingCommentId(childComment.id)
                                  }}
                                >
                                  <Flag className="mr-2 h-4 w-4" />
                                  신고하기
                                </DropdownMenuItem>
                              </ApiTooltip>
                            </DialogTrigger>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {editingCommentId === childComment.id ? (
                      <div className="mt-2 space-y-2">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setEditingCommentId(null)}>
                            취소
                          </Button>
                          <Button onClick={handleSaveEdit}>저장</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mt-2">{childComment.content}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <ApiTooltip apiInfo={likeCommentApiInfo}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={childComment.isLiked ? "text-rose-500" : ""}
                              onClick={() => handleLikeComment(childComment.id)}
                            >
                              <Heart className={`mr-1 h-4 w-4 ${childComment.isLiked ? "fill-rose-500" : ""}`} />
                              좋아요 {childComment.likeCount}
                            </Button>
                          </ApiTooltip>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">댓글 작성</h3>
          <Textarea
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="secret" checked={isSecret} onCheckedChange={(checked) => setIsSecret(checked as boolean)} />
              <Label htmlFor="secret">비밀 댓글</Label>
            </div>
            <ApiTooltip apiInfo={createCommentApiInfo}>
              <Button onClick={handleSubmitComment}>댓글 작성</Button>
            </ApiTooltip>
          </div>
        </div>
      </div>
    </ApiTooltip>
  )
}

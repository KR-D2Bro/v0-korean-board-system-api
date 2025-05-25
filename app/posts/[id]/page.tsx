"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Heart, MessageSquare, Flag, Download, MoreVertical, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import CommentSection from "@/components/comment-section"
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
import { Textarea } from "@/components/ui/textarea"
import { ApiTooltip, type ApiInfo } from "@/components/api-tooltip"

export default function PostDetail({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(5)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")

  // "create"인 경우 404 처리하여 create 페이지가 우선되도록 함
  if (params.id === "create") {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h1 className="text-2xl font-bold mb-4">잘못된 접근입니다</h1>
        <Button asChild>
          <Link href="/posts/create">글쓰기 페이지로 이동</Link>
        </Button>
      </div>
    )
  }

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikeCount((prev) => prev - 1)
      toast({
        description: "좋아요가 취소되었습니다.",
      })
    } else {
      setLiked(true)
      setLikeCount((prev) => prev + 1)
      toast({
        description: "좋아요를 눌렀습니다.",
      })
    }
  }

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast({
        variant: "destructive",
        description: "신고 사유를 입력해주세요.",
      })
      return
    }

    toast({
      description: "게시글 신고가 접수되었습니다.",
    })
    setReportDialogOpen(false)
    setReportReason("")
  }

  const handleDelete = () => {
    toast({
      description: "게시글이 삭제되었습니다.",
    })
    // 삭제 후 목록으로 이동하는 로직 추가
  }

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const posts = {
    "1": {
      id: "1",
      title: "게시판 사용 가이드",
      content: `
      # 게시판 사용 가이드

      안녕하세요! 게시판 사용 방법을 안내드립니다.

      ## 주요 기능
      - 게시글 작성 및 수정
      - 댓글 작성
      - 파일 첨부
      - 카테고리별 분류

      궁금한 점이 있으시면 언제든 문의해주세요.
    `,
      author: {
        id: "101",
        name: "관리자",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "공지사항",
      createdAt: "2025-05-19T10:15:22",
      viewCount: 36,
      likeCount: 4,
      commentCount: 2,
      files: [],
    },
    "2": {
      id: "2",
      title: "오늘 날씨가 정말 좋네요!",
      content: `
      # 오늘 날씨가 정말 좋네요!

      오늘 하루 종일 맑은 날씨가 계속되고 있어서 기분이 너무 좋습니다!
      
      이런 날에는 밖에 나가서 산책하거나 운동하기 딱 좋은 것 같아요.
      
      여러분은 오늘 어떻게 보내고 계신가요?
    `,
      author: {
        id: "102",
        name: "이순신",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "자유게시판",
      createdAt: "2025-05-17T16:45:30",
      viewCount: 15,
      likeCount: 2,
      commentCount: 8,
      files: [],
    },
    "3": {
      id: "3",
      title: "주말 계획 공유해요",
      content: `
      # 주말 계획 공유해요

      이번 주말에 뭐 하실 계획이신가요?
      
      저는 친구들과 함께 영화를 보러 갈 예정입니다.
      최근에 개봉한 영화 중에 재미있는 것들이 많더라고요!
      
      여러분의 주말 계획도 댓글로 공유해주세요 😊
    `,
      author: {
        id: "103",
        name: "김철수",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "자유게시판",
      createdAt: "2025-05-16T11:20:15",
      viewCount: 32,
      likeCount: 12,
      commentCount: 4,
      files: [],
    },
    "4": {
      id: "4",
      title: "맛있는 카페 추천드려요",
      content: `
      # 맛있는 카페 추천드려요

      최근에 발견한 정말 맛있는 카페가 있어서 추천드리고 싶어요!
      
      ## 카페 정보
      - 이름: 달콤한 하루
      - 위치: 강남역 근처
      - 추천 메뉴: 아메리카노, 치즈케이크
      
      분위기도 좋고 커피 맛도 정말 좋아요.
      기회가 되시면 한번 가보세요!
    `,
      author: {
        id: "104",
        name: "박영희",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "카테고리1",
      createdAt: "2025-05-15T14:30:20",
      viewCount: 45,
      likeCount: 8,
      commentCount: 12,
      files: [],
    },
    "5": {
      id: "5",
      title: "게시판 시스템 개발 중입니다",
      content: `
      # 게시판 시스템 개발 중

      안녕하세요, 현재 게시판 시스템을 개발 중입니다.
      다양한 기능을 지원할 예정이니 많은 관심 부탁드립니다.

      ## 주요 기능
      - 게시글 작성/수정/삭제
      - 댓글 기능
      - 파일 업로드/다운로드
      - 신고 기능
      - 알림 시스템

      감사합니다!
    `,
      author: {
        id: "101",
        name: "관리자",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "공지사항",
      createdAt: "2025-05-20T14:23:11",
      viewCount: 42,
      likeCount: 5,
      commentCount: 3,
      files: [{ id: "1", name: "개발계획서.pdf", size: "1.2MB" }],
    },
    "6": {
      id: "6",
      title: "자유게시판 첫 게시글입니다",
      content: `
      # 자유게시판 첫 게시글입니다

      안녕하세요! 자유게시판에 첫 게시글을 올립니다.
      
      이곳에서 자유롭게 소통하고 정보를 공유했으면 좋겠어요.
      
      앞으로 많은 분들과 좋은 이야기 나누고 싶습니다.
      잘 부탁드려요! 🙂
    `,
      author: {
        id: "105",
        name: "홍길동",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "카테고리2",
      createdAt: "2025-05-14T09:30:45",
      viewCount: 28,
      likeCount: 7,
      commentCount: 5,
      files: [],
    },
  }

  const post = posts[params.id as keyof typeof posts]

  // post가 없으면 404 페이지 표시
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다</h1>
        <Button asChild>
          <Link href="/posts">목록으로 돌아가기</Link>
        </Button>
      </div>
    )
  }

  // API 정보 정의
  const getPostApiInfo: ApiInfo = {
    method: "GET",
    endpoint: `/posts/${params.id}`,
    description: "게시글 상세 정보를 조회합니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 조회 성공",
      data: {
        post_id: 123,
        title: "게시글 제목",
        content: "게시글 내용",
        author: "작성자명",
        category_id: 1,
        view_count: 42,
        like_count: 5,
        comment_count: 3,
        tags: ["태그1", "태그2"],
        is_notice: false,
        is_pinned: false,
        created_at: "2025-05-20T14:23:11",
        updated_at: "2025-05-20T14:23:11",
      },
    },
  }

  const likePostApiInfo: ApiInfo = {
    method: "POST",
    endpoint: `/posts/${params.id}/like`,
    description: "게시글 좋아요를 누릅니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 좋아요 성공",
    },
  }

  const reportPostApiInfo: ApiInfo = {
    method: "POST",
    endpoint: `/reports/posts/${params.id}`,
    description: "게시글을 신고합니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    requestBody: {
      reason: "신고 사유",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 신고가 접수되었습니다.",
    },
  }

  const deletePostApiInfo: ApiInfo = {
    method: "DELETE",
    endpoint: `/posts/${params.id}`,
    description: "게시글을 삭제합니다.",
    pathParams: {
      post_id: "게시글 ID",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 삭제 성공",
    },
  }

  const downloadFileApiInfo: ApiInfo = {
    method: "GET",
    endpoint: `/files/{file_id}/download`,
    description: "첨부파일을 다운로드합니다.",
    pathParams: {
      file_id: "파일 ID",
    },
    responseExample: {
      // 바이너리 파일 응답
    },
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{post.category}</Badge>
          <span className="text-sm text-muted-foreground">조회 {post.viewCount}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/posts/${post.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                수정하기
              </Link>
            </DropdownMenuItem>
            <ApiTooltip apiInfo={deletePostApiInfo}>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                삭제하기
              </DropdownMenuItem>
            </ApiTooltip>
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <ApiTooltip apiInfo={reportPostApiInfo}>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Flag className="mr-2 h-4 w-4" />
                    신고하기
                  </DropdownMenuItem>
                </ApiTooltip>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>게시글 신고</DialogTitle>
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
                  <Button onClick={handleReport}>신고하기</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ApiTooltip apiInfo={getPostApiInfo} showIndicator={false}>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString("ko-KR")}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} />
            </div>

            {post.files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">첨부파일</h3>
                <div className="space-y-2">
                  {post.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">
                        {file.name} ({file.size})
                      </span>
                      <ApiTooltip apiInfo={downloadFileApiInfo}>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          다운로드
                        </Button>
                      </ApiTooltip>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-4">
              <ApiTooltip apiInfo={likePostApiInfo}>
                <Button variant="ghost" size="sm" className={liked ? "text-rose-500" : ""} onClick={handleLike}>
                  <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-rose-500" : ""}`} />
                  좋아요 {likeCount}
                </Button>
              </ApiTooltip>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-1 h-4 w-4" />
                댓글 {post.commentCount}
              </Button>
            </div>
            <div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/posts">목록으로</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </ApiTooltip>

      <Separator className="my-8" />

      <CommentSection postId={params.id} />
    </div>
  )
}

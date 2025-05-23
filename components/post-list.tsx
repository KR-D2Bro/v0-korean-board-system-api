"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PostListProps {
  type?: "all" | "notice" | "popular"
}

export default function PostList({ type = "all" }: PostListProps) {
  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const posts = [
    {
      id: "1",
      title: "게시판 시스템 개발 중입니다",
      category: "공지사항",
      author: {
        name: "관리자",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-20T14:23:11",
      viewCount: 42,
      likeCount: 5,
      commentCount: 3,
      isNotice: true,
      isPinned: true,
    },
    {
      id: "2",
      title: "게시판 사용 가이드",
      category: "공지사항",
      author: {
        name: "관리자",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-19T10:15:22",
      viewCount: 36,
      likeCount: 4,
      commentCount: 2,
      isNotice: true,
      isPinned: false,
    },
    {
      id: "3",
      title: "자유게시판 첫 게시글입니다",
      category: "자유게시판",
      author: {
        name: "홍길동",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-18T09:30:45",
      viewCount: 28,
      likeCount: 7,
      commentCount: 5,
      isNotice: false,
      isPinned: false,
    },
    {
      id: "4",
      title: "질문있습니다",
      category: "질문/답변",
      author: {
        name: "이순신",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-17T16:45:30",
      viewCount: 15,
      likeCount: 2,
      commentCount: 8,
      isNotice: false,
      isPinned: false,
    },
    {
      id: "5",
      title: "유용한 정보 공유합니다",
      category: "정보공유",
      author: {
        name: "김철수",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "2025-05-16T11:20:15",
      viewCount: 32,
      likeCount: 12,
      commentCount: 4,
      isNotice: false,
      isPinned: false,
    },
  ]

  // 타입에 따라 게시글 필터링
  const filteredPosts = posts.filter((post) => {
    if (type === "notice") return post.isNotice
    if (type === "popular") return post.likeCount > 5
    return true
  })

  // 공지사항 상단 고정
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-4">
      {sortedPosts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">게시글이 없습니다.</div>
      ) : (
        sortedPosts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={post.isNotice ? "destructive" : "outline"}>{post.category}</Badge>
                        {post.isPinned && <Badge variant="secondary">고정</Badge>}
                      </div>
                      <h3 className="font-semibold">{post.title}</h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.viewCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likeCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}

      <div className="flex justify-center mt-6">
        <Button variant="outline">더 보기</Button>
      </div>
    </div>
  )
}

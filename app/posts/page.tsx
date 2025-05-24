"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import PostList from "@/components/post-list"
import CategoryList from "@/components/category-list"
import { ApiTooltip, type ApiInfo } from "@/components/api-tooltip"

export default function PostsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  // 실제 구현에서는 인증 상태를 확인하는 로직 필요
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 테스트를 위해 false로 설정

  // API 정보 정의
  const getPostsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/posts",
    description: "게시글 목록을 조회합니다.",
    queryParams: {
      page: "페이지 번호 (기본: 1)",
      size: "페이지 크기 (기본: 20)",
      category_id: "카테고리 ID",
      sort: "정렬 기준 (latest, popular, comments, views)",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "홈 화면 게시글 목록 조회 성공",
      data: {
        notices: [
          {
            post_id: 1,
            title: "공지사항입니다.",
            author: "admin",
            created_at: "2024-11-01T10:00:00",
          },
        ],
        pinned_posts: [
          {
            post_id: 2,
            title: "인기 게시글입니다.",
            author: "user01",
            created_at: "2024-11-02T11:00:00",
          },
        ],
        posts: [
          {
            post_id: 3,
            title: "일반 게시글입니다.",
            author: "user02",
            created_at: "2024-11-03T12:00:00",
          },
        ],
      },
    },
  }

  const searchPostsApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/search/posts",
    description: "게시글을 검색합니다.",
    queryParams: {
      category_id: "검색 대상 게시판/카테고리 ID",
      title: "게시글 제목 키워드 검색",
      author: "작성자 닉네임 키워드 검색",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 검색 성공",
      data: [
        {
          post_id: 101,
          title: "성능 테스트 결과 공유",
          author: "장재용",
          created_at: "2024-10-20T09:00:00",
          view_count: 130,
          like_count: 8,
          comment_count: 3,
        },
      ],
    },
  }

  const handleWritePost = () => {
    if (!isLoggedIn) {
      setShowAuthDialog(true)
      return
    }
    router.push("/posts/create")
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 사이드바 - 카테고리 목록 */}
        <aside className="lg:w-64">
          <CategoryList />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1">
          <div className="space-y-6">
            {/* 헤더 섹션 */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">게시판</h1>
                <p className="text-muted-foreground">자유롭게 소통하고 정보를 공유하세요</p>
              </div>
              <Button onClick={handleWritePost} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                글쓰기
              </Button>
            </div>

            {/* 검색 및 필터 섹션 */}
            <ApiTooltip apiInfo={searchPostsApiInfo} showIndicator={false}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    검색 및 필터
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="제목, 내용, 작성자로 검색..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="1">공지사항</SelectItem>
                        <SelectItem value="2">자유게시판</SelectItem>
                        <SelectItem value="3">카테고리1</SelectItem>
                        <SelectItem value="4">카테고리2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue placeholder="정렬" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">최신순</SelectItem>
                        <SelectItem value="popular">인기순</SelectItem>
                        <SelectItem value="comments">댓글순</SelectItem>
                        <SelectItem value="views">조회순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </ApiTooltip>

            {/* 통계 정보 */}
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                전체 게시글: 1,234개
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                오늘 작성: 12개
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                온라인 사용자: 45명
              </Badge>
            </div>

            {/* 게시글 목록 */}
            <ApiTooltip apiInfo={getPostsApiInfo} showIndicator={false}>
              <PostList />
            </ApiTooltip>
          </div>
        </main>
      </div>

      {/* 로그인 필요 팝업 */}
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        action="글쓰기"
        description="게시글을 작성하려면 먼저 로그인해주세요."
      />
    </div>
  )
}

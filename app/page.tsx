import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Search, PlusCircle } from "lucide-react"
import PostList from "@/components/post-list"
import CategoryList from "@/components/category-list"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">게시판</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="검색..." className="w-full pl-8" />
          </div>
          <Link href="/posts/write">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              글쓰기
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>카테고리</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryList />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="notice">공지사항</TabsTrigger>
                <TabsTrigger value="popular">인기글</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="space-y-4">
              <PostList />
            </TabsContent>
            <TabsContent value="notice" className="space-y-4">
              <PostList type="notice" />
            </TabsContent>
            <TabsContent value="popular" className="space-y-4">
              <PostList type="popular" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

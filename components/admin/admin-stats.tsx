"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, MessageSquare, Flag, TrendingUp, TrendingDown, Eye, ThumbsUp } from "lucide-react"
import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function AdminStats() {
  const [period, setPeriod] = useState("week")

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const stats = {
    totalUsers: 1250,
    activeUsers: 780,
    totalPosts: 3456,
    totalComments: 12890,
    pendingReports: 15,
    viewsToday: 1245,
    likesToday: 342,
    newUsersToday: 28,
    usersTrend: "+12%",
    postsTrend: "+8%",
    commentsTrend: "+15%",
    reportsTrend: "-5%",
  }

  const activityData = [
    { name: "월", posts: 65, comments: 120, views: 400 },
    { name: "화", posts: 75, comments: 150, views: 450 },
    { name: "수", posts: 90, comments: 180, views: 500 },
    { name: "목", posts: 85, comments: 170, views: 480 },
    { name: "금", posts: 100, comments: 200, views: 550 },
    { name: "토", posts: 120, comments: 220, views: 600 },
    { name: "일", posts: 110, comments: 210, views: 580 },
  ]

  const userActivityData = [
    { name: "00-04", users: 120 },
    { name: "04-08", users: 80 },
    { name: "08-12", users: 250 },
    { name: "12-16", users: 320 },
    { name: "16-20", users: 380 },
    { name: "20-24", users: 280 },
  ]

  const categoryData = [
    { name: "공지사항", value: 10 },
    { name: "자유게시판", value: 45 },
    { name: "카테고리1", value: 25 },
    { name: "카테고리2", value: 20 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">활성 사용자: {stats.activeUsers.toLocaleString()}</p>
            <div className="mt-1 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">{stats.usersTrend}</span>
              <span className="text-muted-foreground ml-1">vs 지난 달</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 게시글</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">오늘 조회수: {stats.viewsToday.toLocaleString()}</p>
            <div className="mt-1 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">{stats.postsTrend}</span>
              <span className="text-muted-foreground ml-1">vs 지난 달</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 댓글</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">오늘 좋아요: {stats.likesToday.toLocaleString()}</p>
            <div className="mt-1 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">{stats.commentsTrend}</span>
              <span className="text-muted-foreground ml-1">vs 지난 달</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기중인 신고</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">신규 가입자: {stats.newUsersToday}명</p>
            <div className="mt-1 flex items-center text-sm">
              <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">{stats.reportsTrend}</span>
              <span className="text-muted-foreground ml-1">vs 지난 달</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>활동 통계</CardTitle>
              <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
                <TabsList className="grid grid-cols-3 h-8">
                  <TabsTrigger value="day" className="text-xs">
                    일간
                  </TabsTrigger>
                  <TabsTrigger value="week" className="text-xs">
                    주간
                  </TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">
                    월간
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>게시글, 댓글, 조회수 통계</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activityData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="posts" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="views" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>사용자 활동 시간대</CardTitle>
            <CardDescription>시간대별 활성 사용자 수</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userActivityData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>카테고리 분포</CardTitle>
            <CardDescription>카테고리별 게시글 비율</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>최근 활동 요약</CardTitle>
            <CardDescription>지난 24시간 동안의 활동</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">28명의 신규 사용자가 가입했습니다</p>
                  <p className="text-sm text-muted-foreground">오늘 12:30</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">65개의 새로운 게시글이 작성되었습니다</p>
                  <p className="text-sm text-muted-foreground">오늘 14:45</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">1,245회의 게시글 조회가 있었습니다</p>
                  <p className="text-sm text-muted-foreground">오늘 16:20</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">342개의 좋아요가 추가되었습니다</p>
                  <p className="text-sm text-muted-foreground">오늘 18:10</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

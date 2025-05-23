"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Search, Filter, ChevronDown, ArrowUpDown, Ban, CheckCircle, Eye } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminUserManagement() {
  const { toast } = useToast()
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [banReason, setBanReason] = useState("")
  const [banDuration, setBanDuration] = useState("7")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const users = [
    {
      id: "1",
      username: "johndoe",
      nickname: "존도우",
      email: "john@example.com",
      role: "USER",
      isBanned: false,
      banReason: null,
      bannedUntil: null,
      createdAt: "2025-01-15T10:30:00",
      postCount: 25,
      commentCount: 120,
    },
    {
      id: "2",
      username: "janedoe",
      nickname: "제인도우",
      email: "jane@example.com",
      role: "USER",
      isBanned: false,
      banReason: null,
      bannedUntil: null,
      createdAt: "2025-02-20T14:45:00",
      postCount: 15,
      commentCount: 85,
    },
    {
      id: "3",
      username: "admin",
      nickname: "관리자",
      email: "admin@example.com",
      role: "ADMIN",
      isBanned: false,
      banReason: null,
      bannedUntil: null,
      createdAt: "2024-12-10T09:15:00",
      postCount: 50,
      commentCount: 200,
    },
    {
      id: "4",
      username: "banneduser",
      nickname: "정지된사용자",
      email: "banned@example.com",
      role: "USER",
      isBanned: true,
      banReason: "커뮤니티 가이드라인 위반",
      bannedUntil: "2025-06-30T00:00:00",
      createdAt: "2025-03-05T16:20:00",
      postCount: 8,
      commentCount: 42,
    },
  ]

  const handleBanUser = () => {
    if (!banReason.trim() || !selectedUserId) {
      toast({
        variant: "destructive",
        description: "정지 사유를 입력해주세요.",
      })
      return
    }

    // 실제 구현에서는 API 호출 필요
    toast({
      description: "사용자가 정지되었습니다.",
    })

    setBanDialogOpen(false)
    setBanReason("")
    setSelectedUserId(null)
  }

  const handleUnbanUser = (userId: string) => {
    // 실제 구현에서는 API 호출 필요
    toast({
      description: "사용자 정지가 해제되었습니다.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>사용자 관리</CardTitle>
            <CardDescription>모든 사용자를 관리하고 권한을 설정합니다.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="사용자 검색..." className="pl-8 w-[200px]" />
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
                <DropdownMenuItem>모든 사용자</DropdownMenuItem>
                <DropdownMenuItem>관리자</DropdownMenuItem>
                <DropdownMenuItem>일반 사용자</DropdownMenuItem>
                <DropdownMenuItem>정지된 사용자</DropdownMenuItem>
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
                  사용자명
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  가입일
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>게시글</TableHead>
              <TableHead>댓글</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                    {user.role === "ADMIN" ? "관리자" : "사용자"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.isBanned ? <Badge variant="destructive">정지됨</Badge> : <Badge variant="outline">활성</Badge>}
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>{user.postCount}</TableCell>
                <TableCell>{user.commentCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {user.isBanned ? (
                      <Button variant="outline" size="sm" onClick={() => handleUnbanUser(user.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        정지 해제
                      </Button>
                    ) : (
                      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUserId(user.id)}
                            disabled={user.role === "ADMIN"}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            정지
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>사용자 정지</DialogTitle>
                            <DialogDescription>
                              사용자를 정지하는 이유와 기간을 설정하세요. 정지된 사용자는 로그인할 수 없습니다.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-2">
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">정지 기간</h4>
                              <Select value={banDuration} onValueChange={setBanDuration}>
                                <SelectTrigger>
                                  <SelectValue placeholder="정지 기간 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1일</SelectItem>
                                  <SelectItem value="3">3일</SelectItem>
                                  <SelectItem value="7">7일</SelectItem>
                                  <SelectItem value="30">30일</SelectItem>
                                  <SelectItem value="permanent">영구 정지</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">정지 사유</h4>
                              <Textarea
                                placeholder="정지 사유를 입력하세요"
                                value={banReason}
                                onChange={(e) => setBanReason(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
                              취소
                            </Button>
                            <Button onClick={handleBanUser}>정지하기</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">총 {users.length}명의 사용자</div>
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
  )
}

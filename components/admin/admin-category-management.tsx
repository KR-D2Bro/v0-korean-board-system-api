"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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

export default function AdminCategoryManagement() {
  const { toast } = useToast()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDescription, setNewCategoryDescription] = useState("")
  const [isNewCategoryVisible, setIsNewCategoryVisible] = useState(true)

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "공지사항",
      description: "관리자가 작성하는 공지사항",
      postCount: 5,
      isVisible: true,
      order: 1,
      createdAt: "2025-01-10T09:00:00",
    },
    {
      id: "2",
      name: "자유게시판",
      description: "자유롭게 대화할 수 있는 게시판",
      postCount: 120,
      isVisible: true,
      order: 2,
      createdAt: "2025-01-10T09:05:00",
    },
    {
      id: "3",
      name: "질문/답변",
      description: "질문과 답변을 주고받는 게시판",
      postCount: 85,
      isVisible: true,
      order: 3,
      createdAt: "2025-01-10T09:10:00",
    },
    {
      id: "4",
      name: "정보공유",
      description: "유용한 정보를 공유하는 게시판",
      postCount: 65,
      isVisible: true,
      order: 4,
      createdAt: "2025-01-10T09:15:00",
    },
    {
      id: "5",
      name: "숨겨진 게시판",
      description: "테스트용 숨겨진 게시판",
      postCount: 0,
      isVisible: false,
      order: 5,
      createdAt: "2025-01-10T09:20:00",
    },
  ])

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        variant: "destructive",
        description: "카테고리 이름을 입력해주세요.",
      })
      return
    }

    // 실제 구현에서는 API 호출 필요
    const newCategory = {
      id: `${categories.length + 1}`,
      name: newCategoryName,
      description: newCategoryDescription,
      postCount: 0,
      isVisible: isNewCategoryVisible,
      order: categories.length + 1,
      createdAt: new Date().toISOString(),
    }

    setCategories([...categories, newCategory])
    setAddDialogOpen(false)
    setNewCategoryName("")
    setNewCategoryDescription("")
    setIsNewCategoryVisible(true)

    toast({
      description: "카테고리가 추가되었습니다.",
    })
  }

  const handleEditCategory = () => {
    if (!newCategoryName.trim() || !selectedCategoryId) {
      toast({
        variant: "destructive",
        description: "카테고리 이름을 입력해주세요.",
      })
      return
    }

    // 실제 구현에서는 API 호출 필요
    setCategories(
      categories.map((category) =>
        category.id === selectedCategoryId
          ? {
              ...category,
              name: newCategoryName,
              description: newCategoryDescription,
              isVisible: isNewCategoryVisible,
            }
          : category,
      ),
    )

    setEditDialogOpen(false)
    setSelectedCategoryId(null)
    setNewCategoryName("")
    setNewCategoryDescription("")
    setIsNewCategoryVisible(true)

    toast({
      description: "카테고리가 수정되었습니다.",
    })
  }

  const handleDeleteCategory = () => {
    if (!selectedCategoryId) return

    // 실제 구현에서는 API 호출 필요
    setCategories(categories.filter((category) => category.id !== selectedCategoryId))
    setDeleteDialogOpen(false)
    setSelectedCategoryId(null)

    toast({
      description: "카테고리가 삭제되었습니다.",
    })
  }

  const handleMoveCategory = (id: string, direction: "up" | "down") => {
    const categoryIndex = categories.findIndex((category) => category.id === id)
    if (
      (direction === "up" && categoryIndex === 0) ||
      (direction === "down" && categoryIndex === categories.length - 1)
    ) {
      return
    }

    const newCategories = [...categories]
    const targetIndex = direction === "up" ? categoryIndex - 1 : categoryIndex + 1
    const temp = newCategories[categoryIndex]
    newCategories[categoryIndex] = newCategories[targetIndex]
    newCategories[targetIndex] = temp

    // 순서 업데이트
    newCategories.forEach((category, index) => {
      category.order = index + 1
    })

    setCategories(newCategories)

    toast({
      description: `카테고리가 ${direction === "up" ? "위로" : "아래로"} 이동되었습니다.`,
    })
  }

  const startEditCategory = (id: string) => {
    const category = categories.find((c) => c.id === id)
    if (category) {
      setSelectedCategoryId(id)
      setNewCategoryName(category.name)
      setNewCategoryDescription(category.description)
      setIsNewCategoryVisible(category.isVisible)
      setEditDialogOpen(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>카테고리 관리</CardTitle>
            <CardDescription>게시판 카테고리를 관리하고 순서를 변경합니다.</CardDescription>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                카테고리 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>카테고리 추가</DialogTitle>
                <DialogDescription>새로운 게시판 카테고리를 추가합니다.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">카테고리 이름</Label>
                  <Input
                    id="name"
                    placeholder="카테고리 이름"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">카테고리 설명</Label>
                  <Input
                    id="description"
                    placeholder="카테고리 설명"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="visible" checked={isNewCategoryVisible} onCheckedChange={setIsNewCategoryVisible} />
                  <Label htmlFor="visible">공개 여부</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleAddCategory}>추가하기</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">순서</TableHead>
              <TableHead className="w-[150px]">이름</TableHead>
              <TableHead>설명</TableHead>
              <TableHead className="w-[100px]">게시글 수</TableHead>
              <TableHead className="w-[100px]">공개 여부</TableHead>
              <TableHead className="w-[100px]">생성일</TableHead>
              <TableHead className="w-[150px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.order}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.postCount}</TableCell>
                <TableCell>
                  <Badge variant={category.isVisible ? "outline" : "secondary"}>
                    {category.isVisible ? "공개" : "비공개"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(category.createdAt).toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveCategory(category.id, "up")}
                      disabled={category.order === 1}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveCategory(category.id, "down")}
                      disabled={category.order === categories.length}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => startEditCategory(category.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCategoryId(category.id)}
                          disabled={category.postCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteCategory}>삭제</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">게시글이 있는 카테고리는 삭제할 수 없습니다.</CardFooter>

      {/* 카테고리 수정 다이얼로그 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>카테고리 수정</DialogTitle>
            <DialogDescription>게시판 카테고리 정보를 수정합니다.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">카테고리 이름</Label>
              <Input
                id="edit-name"
                placeholder="카테고리 이름"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">카테고리 설명</Label>
              <Input
                id="edit-description"
                placeholder="카테고리 설명"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="edit-visible" checked={isNewCategoryVisible} onCheckedChange={setIsNewCategoryVisible} />
              <Label htmlFor="edit-visible">공개 여부</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditCategory}>저장하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

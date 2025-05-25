"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ApiTooltip, type ApiInfo } from "@/components/api-tooltip"

export default function CreatePost() {
  const { toast } = useToast()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isNotice, setIsNotice] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [files, setFiles] = useState<File[]>([])

  // API 정보 정의
  const createPostApiInfo: ApiInfo = {
    method: "POST",
    endpoint: "/posts",
    description: "새 게시글을 작성합니다.",
    requestBody: {
      category_id: 1,
      title: "게시글 제목",
      content: "게시글 내용 (마크다운 형식)",
      is_notice: false,
      is_pinned: false,
      tags: ["태그1", "태그2"],
      metadata: {
        ip: "192.168.0.10",
      },
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "게시글 작성 성공",
      data: {
        post_id: 123,
      },
    },
  }

  const getCategoriesApiInfo: ApiInfo = {
    method: "GET",
    endpoint: "/categories",
    description: "게시판 카테고리 목록을 조회합니다.",
    responseExample: {
      resultCode: "200000",
      resultMessage: "카테고리 목록 조회 성공",
      data: {
        categories: [
          {
            category_id: 1,
            name: "공지사항",
            description: "관리자가 작성하는 공지사항",
          },
          {
            category_id: 2,
            name: "자유게시판",
            description: "자유롭게 대화할 수 있는 게시판",
          },
          {
            category_id: 3,
            name: "카테고리1",
            description: "카테고리1 설명",
          },
          {
            category_id: 4,
            name: "카테고리2",
            description: "카테고리2 설명",
          },
        ],
      },
    },
  }

  const uploadFilesApiInfo: ApiInfo = {
    method: "POST",
    endpoint: "/files",
    description: "파일을 업로드합니다.",
    requestBody: {
      // multipart/form-data
      file: "업로드할 파일",
      target_id: 101,
      target_type: "POST",
    },
    responseExample: {
      resultCode: "200000",
      resultMessage: "파일 업로드 성공",
      data: {
        file_id: 202,
        file_name: "document.pdf",
        file_path: "/uploads/202/document.pdf",
        file_type: "application/pdf",
        size: 1024000,
      },
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        variant: "destructive",
        description: "제목을 입력해주세요.",
      })
      return
    }

    if (!content.trim()) {
      toast({
        variant: "destructive",
        description: "내용을 입력해주세요.",
      })
      return
    }

    if (!category) {
      toast({
        variant: "destructive",
        description: "카테고리를 선택해주세요.",
      })
      return
    }

    // 실제 구현에서는 API 호출 필요
    toast({
      description: "게시글이 작성되었습니다.",
    })

    // 작성 후 목록 페이지로 이동
    router.push("/posts")
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  return (
    <div className="max-w-screen-xl w-full mx-auto px-4">
      <ApiTooltip apiInfo={createPostApiInfo} showIndicator={false}>
        <Card>
          <CardHeader>
            <CardTitle>게시글 작성</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <ApiTooltip apiInfo={getCategoriesApiInfo}>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">공지사항</SelectItem>
                      <SelectItem value="2">자유게시판</SelectItem>
                      <SelectItem value="3">카테고리1</SelectItem>
                      <SelectItem value="4">카테고리2</SelectItem>
                    </SelectContent>
                  </Select>
                </ApiTooltip>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  placeholder="내용을 입력하세요"
                  className="min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">태그</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Input
                  id="tags"
                  placeholder="태그를 입력하고 Enter를 누르세요"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">첨부파일</Label>
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" className="hidden" onChange={handleFileChange} multiple />
                  <ApiTooltip apiInfo={uploadFilesApiInfo}>
                    <Label htmlFor="file" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary">
                        <Upload className="h-4 w-4" />
                        <span>파일 선택</span>
                      </div>
                    </Label>
                  </ApiTooltip>
                </div>
                {files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm truncate">
                          {file.name} ({(file.size / 1024).toFixed(1)}KB)
                        </span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFile(file)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notice"
                    checked={isNotice}
                    onCheckedChange={(checked) => setIsNotice(checked as boolean)}
                  />
                  <Label htmlFor="notice">공지사항</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pinned"
                    checked={isPinned}
                    onCheckedChange={(checked) => setIsPinned(checked as boolean)}
                  />
                  <Label htmlFor="pinned">상단 고정</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                취소
              </Button>
              <Button type="submit">작성하기</Button>
            </CardFooter>
          </form>
        </Card>
      </ApiTooltip>
    </div>
  )
}

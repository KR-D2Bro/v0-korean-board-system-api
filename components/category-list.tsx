"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CategoryList() {
  const pathname = usePathname()

  // 실제 구현에서는 API에서 데이터를 가져와야 함
  const categories = [
    { id: "all", name: "전체", count: 42 },
    { id: "1", name: "공지사항", count: 5 },
    { id: "2", name: "자유게시판", count: 15 },
    { id: "3", name: "질문/답변", count: 12 },
    { id: "4", name: "정보공유", count: 10 },
  ]

  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={cn("w-full justify-start", pathname === `/categories/${category.id}` && "bg-muted")}
          asChild
        >
          <Link href={category.id === "all" ? "/" : `/categories/${category.id}`}>
            <span className="flex-1 text-left">{category.name}</span>
            <span className="text-xs text-muted-foreground">{category.count}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}

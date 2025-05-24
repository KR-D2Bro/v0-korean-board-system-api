"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CategoryList() {
  const pathname = usePathname()

  // 카테고리 목록 수정
  const categories = [
    { id: "all", name: "전체", count: 42 },
    { id: "1", name: "공지사항", count: 5 },
    { id: "2", name: "자유게시판", count: 25 },
    { id: "3", name: "카테고리1", count: 8 },
    { id: "4", name: "카테고리2", count: 4 },
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

"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface AuthRequiredDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  action?: string
}

export function AuthRequiredDialog({
  open,
  onOpenChange,
  title = "로그인이 필요합니다",
  description = "이 기능을 사용하려면 먼저 로그인해주세요.",
  action = "글쓰기",
}: AuthRequiredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-4">
          <p className="text-sm text-muted-foreground">
            <strong>{action}</strong> 기능은 회원만 사용할 수 있습니다.
          </p>
          <p className="text-sm text-muted-foreground">로그인 후 다시 시도해주세요.</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button asChild>
            <Link href="/login">로그인하기</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

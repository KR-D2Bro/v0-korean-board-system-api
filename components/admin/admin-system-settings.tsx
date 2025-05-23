"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

export default function AdminSystemSettings() {
  const { toast } = useToast()
  const [siteTitle, setSiteTitle] = useState("게시판 시스템")
  const [siteDescription, setSiteDescription] = useState("모던한 게시판 시스템")
  const [allowRegistration, setAllowRegistration] = useState(true)
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)
  const [allowFileUpload, setAllowFileUpload] = useState(true)
  const [maxFileSize, setMaxFileSize] = useState("10")
  const [allowedFileTypes, setAllowedFileTypes] = useState("jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,zip")
  const [postsPerPage, setPostsPerPage] = useState("20")
  const [commentsPerPage, setCommentsPerPage] = useState("20")
  const [enableReporting, setEnableReporting] = useState(true)
  const [autoBlindThreshold, setAutoBlindThreshold] = useState("5")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState("현재 시스템 점검 중입니다. 잠시 후 다시 시도해주세요.")
  const [footerText, setFooterText] = useState("© 2025 게시판 시스템. All rights reserved.")
  const [termsOfService, setTermsOfService] = useState("서비스 이용약관 내용...")
  const [privacyPolicy, setPrivacyPolicy] = useState("개인정보 처리방침 내용...")

  const handleSaveGeneralSettings = () => {
    // 실제 구현에서는 API 호출 필요
    toast({
      description: "일반 설정이 저장되었습니다.",
    })
  }

  const handleSaveContentSettings = () => {
    // 실제 구현에서는 API 호출 필요
    toast({
      description: "콘텐츠 설정이 저장되었습니다.",
    })
  }

  const handleSaveSecuritySettings = () => {
    // 실제 구현에서는 API 호출 필요
    toast({
      description: "보안 설정이 저장되었습니다.",
    })
  }

  const handleSaveLegalSettings = () => {
    // 실제 구현에서는 API 호출 필요
    toast({
      description: "법적 문서가 저장되었습니다.",
    })
  }

  return (
    <Tabs defaultValue="general">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="general">일반</TabsTrigger>
        <TabsTrigger value="content">콘텐츠</TabsTrigger>
        <TabsTrigger value="security">보안</TabsTrigger>
        <TabsTrigger value="legal">법적 문서</TabsTrigger>
      </TabsList>

      {/* 일반 설정 */}
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>일반 설정</CardTitle>
            <CardDescription>사이트의 기본 설정을 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-title">사이트 제목</Label>
              <Input id="site-title" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">사이트 설명</Label>
              <Input
                id="site-description"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="footer-text">푸터 텍스트</Label>
              <Input id="footer-text" value={footerText} onChange={(e) => setFooterText(e.target.value)} />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">유지보수 모드</Label>
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
              <p className="text-sm text-muted-foreground">
                유지보수 모드를 활성화하면 관리자를 제외한 모든 사용자가 사이트에 접근할 수 없습니다.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">유지보수 메시지</Label>
              <Textarea
                id="maintenance-message"
                value={maintenanceMessage}
                onChange={(e) => setMaintenanceMessage(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGeneralSettings}>설정 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* 콘텐츠 설정 */}
      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle>콘텐츠 설정</CardTitle>
            <CardDescription>게시글 및 댓글 관련 설정을 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="posts-per-page">페이지당 게시글 수</Label>
              <Select value={postsPerPage} onValueChange={setPostsPerPage}>
                <SelectTrigger id="posts-per-page">
                  <SelectValue placeholder="페이지당 게시글 수" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10개</SelectItem>
                  <SelectItem value="20">20개</SelectItem>
                  <SelectItem value="30">30개</SelectItem>
                  <SelectItem value="50">50개</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments-per-page">페이지당 댓글 수</Label>
              <Select value={commentsPerPage} onValueChange={setCommentsPerPage}>
                <SelectTrigger id="comments-per-page">
                  <SelectValue placeholder="페이지당 댓글 수" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10개</SelectItem>
                  <SelectItem value="20">20개</SelectItem>
                  <SelectItem value="30">30개</SelectItem>
                  <SelectItem value="50">50개</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-file-upload">파일 업로드 허용</Label>
                <Switch id="allow-file-upload" checked={allowFileUpload} onCheckedChange={setAllowFileUpload} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-file-size">최대 파일 크기 (MB)</Label>
              <Select value={maxFileSize} onValueChange={setMaxFileSize}>
                <SelectTrigger id="max-file-size">
                  <SelectValue placeholder="최대 파일 크기" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2MB</SelectItem>
                  <SelectItem value="5">5MB</SelectItem>
                  <SelectItem value="10">10MB</SelectItem>
                  <SelectItem value="20">20MB</SelectItem>
                  <SelectItem value="50">50MB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowed-file-types">허용된 파일 형식</Label>
              <Input
                id="allowed-file-types"
                value={allowedFileTypes}
                onChange={(e) => setAllowedFileTypes(e.target.value)}
                placeholder="쉼표로 구분된 파일 확장자 (예: jpg,png,pdf)"
              />
              <p className="text-xs text-muted-foreground">쉼표로 구분된 파일 확장자를 입력하세요.</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-reporting">신고 기능 활성화</Label>
                <Switch id="enable-reporting" checked={enableReporting} onCheckedChange={setEnableReporting} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auto-blind-threshold">자동 블라인드 임계값</Label>
              <Select value={autoBlindThreshold} onValueChange={setAutoBlindThreshold}>
                <SelectTrigger id="auto-blind-threshold">
                  <SelectValue placeholder="자동 블라인드 임계값" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3회</SelectItem>
                  <SelectItem value="5">5회</SelectItem>
                  <SelectItem value="10">10회</SelectItem>
                  <SelectItem value="0">사용 안함</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                지정된 횟수 이상 신고되면 자동으로 블라인드 처리됩니다. '사용 안함'을 선택하면 수동으로만 블라인드
                처리됩니다.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveContentSettings}>설정 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* 보안 설정 */}
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>보안 설정</CardTitle>
            <CardDescription>사용자 계정 및 보안 관련 설정을 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-registration">회원가입 허용</Label>
                <Switch id="allow-registration" checked={allowRegistration} onCheckedChange={setAllowRegistration} />
              </div>
              <p className="text-sm text-muted-foreground">비활성화하면 새로운 사용자가 가입할 수 없습니다.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="require-email-verification">이메일 인증 필요</Label>
                <Switch
                  id="require-email-verification"
                  checked={requireEmailVerification}
                  onCheckedChange={setRequireEmailVerification}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                활성화하면 사용자는 이메일 인증 후에만 로그인할 수 있습니다.
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="password-policy">비밀번호 정책</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="password-policy">
                  <SelectValue placeholder="비밀번호 정책" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">낮음 (최소 6자)</SelectItem>
                  <SelectItem value="medium">중간 (최소 8자, 숫자 포함)</SelectItem>
                  <SelectItem value="high">높음 (최소 10자, 숫자, 특수문자 포함)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">세션 타임아웃 (분)</Label>
              <Select defaultValue="60">
                <SelectTrigger id="session-timeout">
                  <SelectValue placeholder="세션 타임아웃" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30분</SelectItem>
                  <SelectItem value="60">1시간</SelectItem>
                  <SelectItem value="120">2시간</SelectItem>
                  <SelectItem value="240">4시간</SelectItem>
                  <SelectItem value="480">8시간</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSecuritySettings}>설정 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* 법적 문서 */}
      <TabsContent value="legal">
        <Card>
          <CardHeader>
            <CardTitle>법적 문서</CardTitle>
            <CardDescription>서비스 이용약관 및 개인정보 처리방침을 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="terms-of-service">서비스 이용약관</Label>
              <Textarea
                id="terms-of-service"
                value={termsOfService}
                onChange={(e) => setTermsOfService(e.target.value)}
                rows={10}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="privacy-policy">개인정보 처리방침</Label>
              <Textarea
                id="privacy-policy"
                value={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.value)}
                rows={10}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveLegalSettings}>설정 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

"use client"

import type { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface ApiInfo {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  endpoint: string
  description: string
  requestBody?: Record<string, any>
  queryParams?: Record<string, string>
  pathParams?: Record<string, string>
  responseExample?: Record<string, any>
}

interface ApiTooltipProps {
  apiInfo: ApiInfo
  children: ReactNode
  showIndicator?: boolean
}

export function ApiTooltip({ apiInfo, children, showIndicator = true }: ApiTooltipProps) {
  // 개발 모드에서만 표시 (실제 환경에서는 환경 변수로 제어할 수 있음)
  const isDevelopment = process.env.NODE_ENV === "development" || true

  if (!isDevelopment) {
    return <>{children}</>
  }

  const methodColors = {
    GET: "bg-blue-500",
    POST: "bg-green-500",
    PUT: "bg-yellow-500",
    PATCH: "bg-orange-500",
    DELETE: "bg-red-500",
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="relative inline-flex">
            {children}
            {showIndicator && (
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-md p-0 bg-zinc-950 text-white border-zinc-800">
          <div className="p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <Badge className={`${methodColors[apiInfo.method]} text-white`}>{apiInfo.method}</Badge>
              <Code className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="font-mono bg-zinc-900 p-2 rounded">{apiInfo.endpoint}</div>
            <div className="text-zinc-300">{apiInfo.description}</div>

            {apiInfo.pathParams && Object.keys(apiInfo.pathParams).length > 0 && (
              <div>
                <div className="font-semibold text-zinc-300 mb-1">Path Parameters:</div>
                <pre className="bg-zinc-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(apiInfo.pathParams, null, 2)}
                </pre>
              </div>
            )}

            {apiInfo.queryParams && Object.keys(apiInfo.queryParams).length > 0 && (
              <div>
                <div className="font-semibold text-zinc-300 mb-1">Query Parameters:</div>
                <pre className="bg-zinc-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(apiInfo.queryParams, null, 2)}
                </pre>
              </div>
            )}

            {apiInfo.requestBody && Object.keys(apiInfo.requestBody).length > 0 && (
              <div>
                <div className="font-semibold text-zinc-300 mb-1">Request Body:</div>
                <pre className="bg-zinc-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(apiInfo.requestBody, null, 2)}
                </pre>
              </div>
            )}

            {apiInfo.responseExample && Object.keys(apiInfo.responseExample).length > 0 && (
              <div>
                <div className="font-semibold text-zinc-300 mb-1">Response Example:</div>
                <pre className="bg-zinc-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(apiInfo.responseExample, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

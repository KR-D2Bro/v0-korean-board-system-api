import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // 실제 구현에서는 데이터베이스에서 사용자 정보를 조회
    // 현재는 Mock 데이터 반환

    const userId = Number.parseInt(params.userId)

    if (isNaN(userId)) {
      return NextResponse.json(
        {
          resultCode: "400001",
          resultMessage: "유효하지 않은 요청",
        },
        { status: 400 },
      )
    }

    // Mock 사용자 데이터
    const mockUserData = {
      resultCode: "200000",
      resultMessage: "사용자 정보 조회 성공",
      data: {
        user_id: userId,
        username: "johndoe",
        nickname: "홍길동",
        email: "johndoe@example.com",
        role: "USER",
        is_banned: false,
        ban_reason: null,
        banned_until: null,
        created_at: "2024-10-01T12:34:56",
      },
    }

    return NextResponse.json(mockUserData)
  } catch (error) {
    return NextResponse.json(
      {
        resultCode: "500000",
        resultMessage: "서버 오류 발생",
      },
      { status: 500 },
    )
  }
}

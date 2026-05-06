import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">상상우리 매칭</h1>
      <p className="text-2xl text-gray-600 mb-12 text-center">시니어 일자리 자동 매칭 시스템</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="border-2 border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">프로필 등록</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 mb-6">이름, 지역, 희망 직종, 경력을 입력하세요.</p>
            <Link href="/register">
              <Button className="w-full text-xl py-6 bg-blue-600 hover:bg-blue-700">
                등록하러 가기
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">추천 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 mb-6">나에게 맞는 일자리 추천을 확인하세요.</p>
            <Link href="/recommendations">
              <Button className="w-full text-xl py-6 bg-green-600 hover:bg-green-700">
                추천 보기
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700">담당자 대시보드</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 mb-6">매칭 현황을 관리하고 배정하세요.</p>
            <Link href="/admin">
              <Button className="w-full text-xl py-6 bg-purple-600 hover:bg-purple-700">
                대시보드 열기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

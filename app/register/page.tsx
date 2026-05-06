import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-xl shadow-lg border-2 border-blue-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-4xl font-bold text-blue-700 text-center">
            시니어 프로필 등록
          </CardTitle>
          <p className="text-xl text-gray-500 text-center mt-2">
            정보를 입력하면 자동으로 일자리를 추천해 드립니다.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-2xl font-semibold text-gray-800">
              이름
            </Label>
            <Input
              id="name"
              placeholder="예: 홍길동"
              className="text-xl h-14 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* 지역 */}
          <div className="space-y-2">
            <Label htmlFor="region" className="text-2xl font-semibold text-gray-800">
              지역
            </Label>
            <Input
              id="region"
              placeholder="예: 서울 강남구"
              className="text-xl h-14 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* 희망 직종 */}
          <div className="space-y-2">
            <Label htmlFor="desired_job" className="text-2xl font-semibold text-gray-800">
              희망 직종
            </Label>
            <Input
              id="desired_job"
              placeholder="예: 경비원, 청소원, 요양보호사"
              className="text-xl h-14 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* 경력 */}
          <div className="space-y-2">
            <Label htmlFor="career_years" className="text-2xl font-semibold text-gray-800">
              경력 (년)
            </Label>
            <Input
              id="career_years"
              type="number"
              min={0}
              placeholder="예: 5"
              className="text-xl h-14 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <Button
            className="w-full text-2xl py-8 bg-blue-600 hover:bg-blue-700 font-bold mt-4"
            disabled
          >
            등록하기 (기능 준비 중)
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

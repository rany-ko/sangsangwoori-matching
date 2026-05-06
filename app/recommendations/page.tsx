import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// 점수 구간별 색상
function ScoreBadge({ score }: { score: number }) {
  if (score >= 80) return <Badge className="text-lg px-3 py-1 bg-green-500">높음 {score}점</Badge>
  if (score >= 50) return <Badge className="text-lg px-3 py-1 bg-yellow-500">보통 {score}점</Badge>
  return <Badge className="text-lg px-3 py-1 bg-gray-400">낮음 {score}점</Badge>
}

// 빈 껍데기용 샘플 데이터
const SAMPLE = [
  { id: '1', job: '아파트 경비원', region: '서울 강남구', score: 90 },
  { id: '2', job: '청소 도우미', region: '서울 송파구', score: 60 },
  { id: '3', job: '배달 보조원', region: '경기 성남시', score: 40 },
]

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">추천 일자리 목록</h1>
      <p className="text-xl text-gray-500 mb-10 text-center">
        매칭 점수가 높은 순서로 표시됩니다.
      </p>

      {/* 실제 데이터는 다음 블록에서 연결 */}
      <div className="max-w-2xl mx-auto space-y-4">
        {SAMPLE.map((item) => (
          <Card key={item.id} className="border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800">{item.job}</CardTitle>
                <ScoreBadge score={item.score} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-600">📍 {item.region}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-gray-400 mt-12 text-lg">
        * 위 목록은 UI 확인용 샘플입니다. 실제 데이터는 다음 단계에서 연결됩니다.
      </p>
    </main>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// 빈 껍데기용 샘플 데이터
const SAMPLE = {
  unmatched: [
    { id: 'u1', name: '김철수', region: '서울 강남구', desired_job: '경비원' },
  ],
  pending: [
    { id: 'p1', name: '이영희', region: '경기 성남시', desired_job: '요양보호사', job: '요양원 보조', score: 80 },
    { id: 'p2', name: '박민준', region: '서울 송파구', desired_job: '청소원', job: '빌딩 청소', score: 60 },
  ],
  assigned: [
    { id: 'a1', name: '최순자', region: '인천 남동구', desired_job: '조리보조', job: '급식 보조원', score: 90 },
  ],
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">담당자 대시보드</h1>
      <p className="text-xl text-gray-500 mb-10 text-center">매칭 현황을 한눈에 확인하고 배정하세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* 미매칭 */}
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
            미매칭 ({SAMPLE.unmatched.length})
          </h2>
          <div className="space-y-3">
            {SAMPLE.unmatched.map((s) => (
              <Card key={s.id} className="border-2 border-red-100">
                <CardHeader className="pb-1">
                  <CardTitle className="text-xl">{s.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-lg text-gray-600 space-y-1">
                  <p>📍 {s.region}</p>
                  <p>💼 {s.desired_job}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 매칭 대기 */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400" />
            매칭 대기 ({SAMPLE.pending.length})
          </h2>
          <div className="space-y-3">
            {SAMPLE.pending.map((s) => (
              <Card key={s.id} className="border-2 border-yellow-100">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{s.name}</CardTitle>
                    <Badge className="text-base bg-yellow-500">{s.score}점</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-lg text-gray-600 space-y-1">
                  <p>📍 {s.region}</p>
                  <p>💼 {s.job}</p>
                  <Button
                    className="w-full text-lg mt-2 bg-yellow-500 hover:bg-yellow-600"
                    disabled
                  >
                    배정 완료 처리 (준비 중)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 배정 완료 */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
            배정 완료 ({SAMPLE.assigned.length})
          </h2>
          <div className="space-y-3">
            {SAMPLE.assigned.map((s) => (
              <Card key={s.id} className="border-2 border-green-100">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{s.name}</CardTitle>
                    <Badge className="text-base bg-green-500">{s.score}점</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-lg text-gray-600 space-y-1">
                  <p>📍 {s.region}</p>
                  <p>💼 {s.job}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-12 text-lg">
        * 위 목록은 UI 확인용 샘플입니다. 실제 데이터는 다음 단계에서 연결됩니다.
      </p>
    </main>
  )
}

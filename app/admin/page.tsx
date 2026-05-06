'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const REGIONS = ['서울', '경기', '인천', '기타']
const JOB_TYPES = ['경비', '청소', '조리', '돌봄', '기타']

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

type Job = {
  id: string
  title: string
  region: string
  job_type: string
  required_career: number | null
  created_at: string
}

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [title, setTitle] = useState('')
  const [region, setRegion] = useState('')
  const [jobType, setJobType] = useState('')
  const [requiredCareer, setRequiredCareer] = useState('')
  const [addError, setAddError] = useState('')
  const [adding, setAdding] = useState(false)

  const loadJobs = useCallback(async () => {
    setLoadingJobs(true)
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
    setJobs(data ?? [])
    setLoadingJobs(false)
  }, [])

  useEffect(() => {
    loadJobs()
  }, [loadJobs])

  async function handleAddJob() {
    if (!title.trim() || !region || !jobType) {
      setAddError('공고명, 지역, 직종은 필수입니다.')
      return
    }
    setAddError('')
    setAdding(true)
    const { error } = await supabase.from('jobs').insert({
      title: title.trim(),
      region,
      job_type: jobType,
      required_career: requiredCareer ? parseInt(requiredCareer) : null,
    })
    setAdding(false)
    if (!error) {
      setTitle('')
      setRegion('')
      setJobType('')
      setRequiredCareer('')
      loadJobs()
    }
  }

  async function handleDeleteJob(id: string) {
    await supabase.from('jobs').delete().eq('id', id)
    setJobs((prev) => prev.filter((j) => j.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">담당자 대시보드</h1>
      <p className="text-xl text-gray-500 mb-10 text-center">매칭 현황을 한눈에 확인하고 배정하세요.</p>

      {/* 매칭 현황 (샘플) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <Button className="w-full text-lg mt-2 bg-yellow-500 hover:bg-yellow-600" disabled>
                    배정 완료 처리 (준비 중)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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

      <p className="text-center text-gray-400 mt-8 text-lg">
        * 위 목록은 UI 확인용 샘플입니다. 실제 데이터는 다음 단계에서 연결됩니다.
      </p>

      {/* 일자리 관리 */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-t-2 border-gray-200 pt-10">
          일자리 관리
        </h2>

        {/* 일자리 추가 폼 */}
        <Card className="border-2 border-blue-100 mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">일자리 추가</CardTitle>
          </CardHeader>
          <CardContent>
            {addError && (
              <div className="bg-red-100 border-2 border-red-400 rounded-xl p-3 mb-5 text-lg text-red-700 font-semibold">
                {addError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-800">
                  공고명 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 아파트 경비원"
                  className="text-xl h-12 border-2 border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-800">
                  지역 <span className="text-red-500">*</span>
                </Label>
                <Select value={region} onValueChange={(v) => setRegion(v ?? '')}>
                  <SelectTrigger className="w-full !h-12 text-xl border-2 border-gray-300">
                    <SelectValue placeholder="지역 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => (
                      <SelectItem key={r} value={r} className="text-xl py-2">
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-800">
                  직종 <span className="text-red-500">*</span>
                </Label>
                <Select value={jobType} onValueChange={(v) => setJobType(v ?? '')}>
                  <SelectTrigger className="w-full !h-12 text-xl border-2 border-gray-300">
                    <SelectValue placeholder="직종 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map((j) => (
                      <SelectItem key={j} value={j} className="text-xl py-2">
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-800">요구 경력 (년)</Label>
                <Input
                  type="number"
                  min={0}
                  value={requiredCareer}
                  onChange={(e) => setRequiredCareer(e.target.value)}
                  placeholder="예: 2"
                  className="text-xl h-12 border-2 border-gray-300"
                />
              </div>
            </div>
            <Button
              onClick={handleAddJob}
              disabled={adding}
              className="mt-6 h-12 text-xl bg-blue-600 hover:bg-blue-700 font-bold px-10"
            >
              {adding ? '등록 중...' : '일자리 등록'}
            </Button>
          </CardContent>
        </Card>

        {/* 일자리 목록 테이블 */}
        <Card className="border-2 border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              등록된 일자리 목록
              {!loadingJobs && (
                <span className="ml-3 text-xl font-normal text-gray-500">({jobs.length}건)</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingJobs ? (
              <p className="text-xl text-gray-500 py-4">불러오는 중...</p>
            ) : jobs.length === 0 ? (
              <p className="text-xl text-gray-500 py-4">등록된 일자리가 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xl">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="text-left py-4 px-3 font-bold text-gray-700">공고명</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">지역</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">직종</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">요구 경력</th>
                      <th className="py-4 px-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                        <td className="py-4 px-3 font-medium">{job.title}</td>
                        <td className="py-4 px-3 text-gray-600">{job.region}</td>
                        <td className="py-4 px-3 text-gray-600">{job.job_type}</td>
                        <td className="py-4 px-3 text-gray-600">
                          {job.required_career != null ? `${job.required_career}년` : '-'}
                        </td>
                        <td className="py-4 px-3 text-right">
                          <Button
                            onClick={() => handleDeleteJob(job.id)}
                            className="bg-red-500 hover:bg-red-600 text-white h-10 px-5 text-lg font-semibold"
                          >
                            삭제
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

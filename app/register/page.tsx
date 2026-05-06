'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [desiredJob, setDesiredJob] = useState('')
  const [careerYears, setCareerYears] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = '이름을 입력해 주세요.'
    if (!region) newErrors.region = '지역을 선택해 주세요.'
    if (!desiredJob) newErrors.desiredJob = '희망 직종을 선택해 주세요.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)

    const { error } = await supabase.from('seniors').insert({
      name: name.trim(),
      region,
      desired_job: desiredJob,
      career_years: careerYears ? parseInt(careerYears) : null,
    })

    setLoading(false)

    if (error) {
      setErrors({ submit: error.message })
    } else {
      setSuccess(true)
      setName('')
      setRegion('')
      setDesiredJob('')
      setCareerYears('')
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl bg-green-100 border-2 border-green-500 rounded-2xl p-10 text-center">
          <p className="text-4xl font-bold text-green-700">등록이 완료되었습니다</p>
          <p className="text-2xl text-green-600 mt-4">담당자가 연락드릴 예정입니다.</p>
          <Button
            className="mt-8 text-2xl h-16 px-10 bg-blue-600 hover:bg-blue-700 font-bold"
            onClick={() => setSuccess(false)}
          >
            다시 등록하기
          </Button>
        </div>
      </main>
    )
  }

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
          {errors.submit && (
            <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4 text-xl text-red-700 font-semibold">
              {errors.submit}
            </div>
          )}

          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-2xl font-semibold text-gray-800">
              이름 <span className="text-red-500">*</span>
            </Label>
            {errors.name && (
              <div className="bg-red-100 border border-red-400 rounded-lg p-3 text-lg text-red-700 font-medium">
                {errors.name}
              </div>
            )}
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 홍길동"
              className="text-xl h-14 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* 지역 */}
          <div className="space-y-2">
            <Label className="text-2xl font-semibold text-gray-800">
              지역 <span className="text-red-500">*</span>
            </Label>
            {errors.region && (
              <div className="bg-red-100 border border-red-400 rounded-lg p-3 text-lg text-red-700 font-medium">
                {errors.region}
              </div>
            )}
            <Select value={region} onValueChange={(v) => setRegion(v ?? '')}>
              <SelectTrigger className="w-full !h-14 text-xl border-2 border-gray-300">
                <SelectValue placeholder="지역을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r} className="text-xl py-3">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 희망 직종 */}
          <div className="space-y-2">
            <Label className="text-2xl font-semibold text-gray-800">
              희망 직종 <span className="text-red-500">*</span>
            </Label>
            {errors.desiredJob && (
              <div className="bg-red-100 border border-red-400 rounded-lg p-3 text-lg text-red-700 font-medium">
                {errors.desiredJob}
              </div>
            )}
            <Select value={desiredJob} onValueChange={(v) => setDesiredJob(v ?? '')}>
              <SelectTrigger className="w-full !h-14 text-xl border-2 border-gray-300">
                <SelectValue placeholder="직종을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((j) => (
                  <SelectItem key={j} value={j} className="text-xl py-3">
                    {j}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              value={careerYears}
              onChange={(e) => setCareerYears(e.target.value)}
              placeholder="예: 5"
              className="text-xl h-14 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-2xl h-16 bg-blue-600 hover:bg-blue-700 font-bold mt-4"
          >
            {loading ? '저장 중...' : '등록하기'}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

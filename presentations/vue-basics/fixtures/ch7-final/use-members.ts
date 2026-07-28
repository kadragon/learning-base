import { onMounted, ref } from 'vue'
import { http } from '@/api/http'
import type { Member } from '@/types/member'

export function useMembers() {
  const members = ref<Member[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  onMounted(async () => {
    isLoading.value = true
    try {
      const response = await http.get<Member[]>('/members.json')
      members.value = response.data
    } catch {
      error.value = '구성원 목록을 불러오지 못했습니다.'
    } finally {
      isLoading.value = false
    }
  })

  return { members, isLoading, error }
}

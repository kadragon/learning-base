<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MemberCard from '@/components/MemberCard.vue'
import type { Member } from '@/types/member'

const members = ref<Member[]>([])
const keyword = ref('')
const bookmarked = ref<number[]>([])

const visibleMembers = computed(() =>
  members.value.filter((member) => {
    const query = keyword.value
    return member.name.includes(query) || member.team.includes(query)
  }),
)

function toggleBookmark(id: number) {
  bookmarked.value = bookmarked.value.includes(id)
    ? bookmarked.value.filter((bookmarkedId) => bookmarkedId !== id)
    : [...bookmarked.value, id]
}

onMounted(async () => {
  const response = await fetch('/members.json')
  members.value = await response.json()
})
</script>

<template>
  <main>
    <h1>구성원 디렉터리</h1>

    <input v-model="keyword" type="search" placeholder="이름 · 팀으로 검색" />
    <p>{{ visibleMembers.length }}명</p>

    <ul>
      <li v-for="member in visibleMembers" :key="member.id">
        <MemberCard
          :member="member"
          :is-bookmarked="bookmarked.includes(member.id)"
          @toggle-bookmark="toggleBookmark"
        />
      </li>
    </ul>

    <p v-if="visibleMembers.length === 0">검색 결과가 없습니다.</p>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useMembers } from '@/composables/use-members'
import { useBookmarkStore } from '@/stores/bookmark'

const route = useRoute()
const { members, isLoading, error } = useMembers()
const bookmarks = useBookmarkStore()

const member = computed(() => {
  const id = Number(route.params.id)
  return members.value.find((candidate) => candidate.id === id)
})
</script>

<template>
  <main>
    <RouterLink to="/">← 목록으로</RouterLink>

    <p v-if="isLoading">불러오는 중…</p>
    <p v-else-if="error">{{ error }}</p>
    <template v-else-if="member">
      <h1>{{ member.name }}</h1>
      <p>{{ member.role }} · {{ member.team }}</p>
      <p>{{ member.email ?? '이메일 미등록' }}</p>
      <button type="button" @click="bookmarks.toggle(member.id)">
        {{ bookmarks.isBookmarked(member.id) ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기' }}
      </button>
    </template>
    <p v-else>{{ route.params.id }}번 구성원을 찾을 수 없습니다.</p>
  </main>
</template>

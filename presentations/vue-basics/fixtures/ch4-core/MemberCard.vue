<script setup lang="ts">
import type { Member } from '@/types/member'

const props = defineProps<{
  member: Member
  isBookmarked: boolean
}>()

const emit = defineEmits<{
  toggleBookmark: [id: number]
}>()
</script>

<template>
  <article class="card" :class="{ 'card--bookmarked': props.isBookmarked }">
    <h3>{{ member.name }}</h3>
    <p>{{ member.role }} · {{ member.team }}</p>
    <p v-if="member.email">{{ member.email }}</p>
    <p v-else class="card__muted">이메일 미등록</p>
    <button type="button" @click="emit('toggleBookmark', member.id)">
      {{ props.isBookmarked ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기' }}
    </button>
  </article>
</template>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid #d0d7de;
  border-radius: 8px;
}
.card--bookmarked {
  border-color: #42d392;
}
.card__muted {
  color: #7a8b99;
}
</style>

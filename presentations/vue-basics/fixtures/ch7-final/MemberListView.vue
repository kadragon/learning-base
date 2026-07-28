<script setup lang="ts">
import { computed, ref } from 'vue'
import MemberCard from '@/components/MemberCard.vue'
import { useMembers } from '@/composables/use-members'
import { useBookmarkStore } from '@/stores/bookmark'

const { members, isLoading, error } = useMembers()
const bookmarks = useBookmarkStore()
const keyword = ref('')

const visibleMembers = computed(() =>
  members.value.filter((member) => {
    const query = keyword.value
    return member.name.includes(query) || member.team.includes(query)
  }),
)
</script>

<template>
  <main>
    <h1>구성원 디렉터리</h1>
    <p>즐겨찾기 {{ bookmarks.count }}명</p>

    <input v-model="keyword" type="search" placeholder="이름 · 팀으로 검색" />

    <p v-if="isLoading">불러오는 중…</p>
    <p v-else-if="error">{{ error }}</p>
    <template v-else>
      <p>{{ visibleMembers.length }}명</p>

      <ul>
        <li v-for="member in visibleMembers" :key="member.id">
          <MemberCard
            :member="member"
            :is-bookmarked="bookmarks.isBookmarked(member.id)"
            @toggle-bookmark="bookmarks.toggle"
          />
        </li>
      </ul>

      <p v-if="visibleMembers.length === 0">검색 결과가 없습니다.</p>
    </template>
  </main>
</template>

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useBookmarkStore = defineStore(
  'bookmark',
  () => {
    const ids = ref<number[]>([])

    const count = computed(() => ids.value.length)

    function isBookmarked(id: number) {
      return ids.value.includes(id)
    }

    function toggle(id: number) {
      ids.value = ids.value.includes(id)
        ? ids.value.filter((bookmarkedId) => bookmarkedId !== id)
        : [...ids.value, id]
    }

    return { ids, count, isBookmarked, toggle }
  },
)

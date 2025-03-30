import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export function useBreakpoints() {
  const isDesktop = useMediaQuery('(min-width: 700px)')
  const isMobile = computed(() => !isDesktop.value)
  const breakpoint = computed(() => {
    return isDesktop.value ? 'desktop' : 'mobile'
  })

  const breakpointClass = computed(() => `bp-${breakpoint.value}`)

  return { isDesktop, isMobile, breakpoint, breakpointClass }
}

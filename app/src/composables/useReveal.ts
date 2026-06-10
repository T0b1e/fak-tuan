import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type RevealPreset = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleUp'

interface RevealOptions {
  preset?: RevealPreset
  delay?: number
  duration?: number
  stagger?: number
  start?: string
}

const presets: Record<RevealPreset, gsap.TweenVars> = {
  fadeUp: { opacity: 0, y: 48 },
  fadeLeft: { opacity: 0, x: -48 },
  fadeRight: { opacity: 0, x: 48 },
  fadeIn: { opacity: 0 },
  scaleUp: { opacity: 0, scale: 0.88 },
}

export function useReveal(
  target: Ref<HTMLElement | null>,
  opts: RevealOptions = {},
) {
  const { preset = 'fadeUp', delay = 0, duration = 0.7, stagger = 0, start = 'top 88%' } = opts
  let ctx: gsap.Context

  onMounted(() => {
    if (!target.value) return
    const from = presets[preset]
    ctx = gsap.context(() => {
      gsap.from(target.value!, {
        ...from,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target.value!,
          start,
          toggleActions: 'play none none none',
        },
      })
    })
  })

  onUnmounted(() => ctx?.revert())
}

export function useStaggerReveal(
  container: Ref<HTMLElement | null>,
  selector: string,
  opts: RevealOptions = {},
) {
  const { preset = 'fadeUp', delay = 0, duration = 0.6, stagger = 0.1, start = 'top 88%' } = opts
  let ctx: gsap.Context

  onMounted(() => {
    if (!container.value) return
    const from = presets[preset]
    ctx = gsap.context(() => {
      gsap.from(container.value!.querySelectorAll(selector), {
        ...from,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.value!,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, container.value)
  })

  onUnmounted(() => ctx?.revert())
}

export * from './cookie'
export * from './storage'
export * from './date'
export * from './env'
export * from './common'

export function isSuccessCode(code: string) {
    return code === '200'
}

interface ObserverOptions {
    root?: Element | null // 视口元素（默认为视窗）
    rootMargin?: string // 触发边距，类似 CSS margin
    threshold?: number | number[] // 触发的阈值（0=完全不可见，1=完全可见）
    className?: string // 进入可视区域时添加的 class
    onVisible?: (element: Element) => void // 可见时触发的回调
    once?: boolean // 是否仅触发一次
}

export function observeElements(
    selectors: string | string[],
    options: ObserverOptions
) {
    // 确保是数组
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors]

    selectorArray.forEach((selector) => {
        const elements = document.querySelectorAll(selector)

        if (elements.length === 0) {
            console.warn(`未找到元素: ${selector}`)
            return
        }

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement

                        // 添加 className
                        if (options.className) {
                            target.classList.add(options.className)
                        }

                        // 触发回调
                        if (options.onVisible) {
                            options.onVisible(target)
                        }

                        // 如果只触发一次，停止监听
                        if (options.once) {
                            observerInstance.unobserve(target)
                        }
                    }
                })
            },
            {
                root: options.root || null,
                rootMargin: options.rootMargin || '0px',
                threshold: options.threshold || 0.1,
            }
        )

        // 监听所有匹配的元素
        elements.forEach((element) => observer.observe(element))
    })
}

class Log {
    log(...arg) {
        console.log(...arg)
    }
    warn(...arg) {
        console.warn(...arg)
    }
    error(...arg) {
        console.error(...arg)
    }
}

export const imageOptimizerLog = new Log()

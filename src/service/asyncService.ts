export const setIntervalWithPromise = (target: any) => {
    return async function (...args: any[]) {
        if (target.isRunning) return
        target.isRunning = true
        await target(...args)
        target.isRunning = false
    }
}

export const asyncSetInterval = (asyncFunction: any, intervalMs: number) => {
    return setInterval(setIntervalWithPromise(asyncFunction), intervalMs);
}
interface CallbackRecord {
    isRunning: boolean
    callback: (...args: any) => Promise<void>
}

const setIntervalWithPromise = (callback: (...args: any[]) => Promise<void>) => {
    let callbackRecord: CallbackRecord = {
        isRunning: false,
        callback: callback
    }

    return async function (...args: any[]) {
        if (callbackRecord.isRunning) return
        callbackRecord.isRunning = true
        await callbackRecord.callback(...args)
        callbackRecord.isRunning = false
    }
}

export const asyncSetInterval = (asyncFunction: any, intervalMs: number): NodeJS.Timeout => {
    return setInterval(setIntervalWithPromise(asyncFunction), intervalMs);
}
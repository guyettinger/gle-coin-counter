export const FACING_MODE_USER = "user"
export const FACING_MODE_ENVIRONMENT = "environment"
export const VIDEO_INPUT = "videoinput"

export interface VideoInput {
    inputDeviceInfo: InputDeviceInfo
    mediaTrackCapabilities: MediaTrackCapabilities
}

export interface VideoInputMode {
    deviceId: string
    label: string
    facingMode: string
    aspectRatio?: DoubleRange
    width?: ULongRange
    height?: ULongRange
}
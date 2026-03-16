import type { UploadCustomRequestOptions, UploadProps } from 'naive-ui'

export const customRequest = (
  {
    file,
    headers,
    withCredentials,
    action,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions,
  props?: UploadProps
) => {
  const parseResponseUrl = (responseText: string): string | undefined => {
    if (props?.responseType !== undefined && props.responseType !== 'json') {
      return undefined
    }
    try {
      const response = JSON.parse(responseText)
      return response.url
    } catch {
      return undefined
    }
  }

  return new Promise<any>((resolve, reject) => {
    const formData = new FormData()
    formData.append(props?.name ?? 'file', file.file as File)
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', event => {
      if (!event.lengthComputable || event.total === 0) {
        return
      }
      onProgress({
        percent: Math.ceil((event.loaded / event.total) * 100),
      })
    })

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        onError()
        reject(new Error(`Request failed with status ${xhr.status}`))
        return
      }
      const responseUrl = parseResponseUrl(xhr.response)
      if (responseUrl) {
        file.url = responseUrl
      }
      onProgress({ percent: 100 })
      onFinish()
      resolve(xhr.response)
    })

    xhr.addEventListener('error', () => {
      onError()
      reject(new Error('Network error'))
    })

    xhr.addEventListener('abort', () => {
      onError()
      reject(new Error('Upload aborted'))
    })

    xhr.open('POST', action as string)
    xhr.withCredentials = withCredentials ?? false

    Object.entries(headers ?? {}).forEach(([key, value]) => {
      if (value !== undefined) {
        xhr.setRequestHeader(key, String(value))
      }
    })

    xhr.send(formData)
  })
}

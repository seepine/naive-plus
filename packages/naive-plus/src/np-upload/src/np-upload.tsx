import { computed, defineComponent, inject, onUnmounted, ref, watch } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npUploadProps } from './props'
import { NButton, NUpload } from 'naive-ui'
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { customRequest } from './custom-request'
import type { FormItemToolInjection } from '../..'

const { name, bemClass } = useCreate('np-upload')

const isImageCard = (props: { props?: { listType?: string } }) =>
  props.props?.listType === 'image-card'

const fileListToModelValue = (
  fileList: UploadFileInfo[],
  urlOnly: boolean,
  imageCard: boolean
): string[] => {
  if (urlOnly && imageCard) {
    return fileList.map(f => f.url ?? '')
  }
  return fileList.map(f =>
    JSON.stringify({
      name: f.name,
      url: f.url,
      status: f.status,
      type: f.type,
    })
  )
}

const modelValueToFileList = (
  value: string[],
  urlOnly: boolean,
  imageCard: boolean
): UploadFileInfo[] => {
  return value.map((item, index) => {
    if (urlOnly && imageCard) {
      return {
        id: String(index),
        name: item,
        url: item,
        status: 'finished',
      }
    }
    try {
      const parsed = JSON.parse(item)
      return {
        id: String(index),
        name: parsed.name ?? '',
        url: parsed.url ?? '',
        type: parsed.type,
        status: parsed.status ?? 'finished',
      }
    } catch {
      return { id: String(index), name: item, status: 'finished' as const }
    }
  })
}

export default defineComponent({
  name,
  props: npUploadProps,
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const imageCard = isImageCard(props)
    const blobUrls = new Set<string>()
    const fileList = ref<UploadFileInfo[]>(
      modelValueToFileList(props.modelValue || [], props.urlOnly, imageCard)
    )

    let isInternalChange = false
    watch(
      () => props.modelValue,
      val => {
        if (isInternalChange) {
          isInternalChange = false
          return
        }
        fileList.value = modelValueToFileList(
          val || [],
          props.urlOnly,
          imageCard
        )
      },
      { deep: true }
    )

    onUnmounted(() => {
      blobUrls.forEach(url => URL.revokeObjectURL(url))
      blobUrls.clear()
    })

    const handleUpdateFileList = (value: UploadFileInfo[]) => {
      const processedFiles = value.map(f => {
        if (!f.url && f.file) {
          const blobUrl = URL.createObjectURL(f.file)
          blobUrls.add(blobUrl)
          return { ...f, url: blobUrl }
        }
        return f
      })
      fileList.value = processedFiles
      isInternalChange = true
      const modelValue = fileListToModelValue(
        processedFiles,
        props.urlOnly,
        imageCard
      )
      emit('update:modelValue', modelValue)
      props.onChange?.(modelValue, processedFiles)
    }

    const formItemTool = inject<FormItemToolInjection>('np-form-item-tool', {
      setFeedback: () => {},
    })

    const handleCustomRequest = (options: UploadCustomRequestOptions): void => {
      if (props.props?.action === undefined) {
        return
      }
      if (props.props?.customRequest !== undefined) {
        props.props.customRequest(options)
        return
      }
      customRequest(options, props.props)
        .then(() => {
          formItemTool?.setFeedback?.()
        })
        .catch(err => {
          formItemTool?.setFeedback?.(
            '上传失败: ' + (err.message || '未知错误'),
            'error'
          )
        })
    }

    const acceptCompute = computed(() => {
      return (
        props.props?.accept ||
        (imageCard ? 'image/png, image/jpeg, image/jpg, image/webp' : undefined)
      )
    })

    return () => (
      <div class={bemClass.value}>
        <NUpload
          {...props.props}
          responseType={props.props?.responseType ?? 'json'}
          fileList={fileList.value}
          listType={props.props?.listType ?? 'image'}
          onUpdateFileList={handleUpdateFileList}
          customRequest={handleCustomRequest}
          accept={acceptCompute.value}
        >
          {slots.default?.() ?? <NButton>上传文件</NButton>}
        </NUpload>
      </div>
    )
  },
})

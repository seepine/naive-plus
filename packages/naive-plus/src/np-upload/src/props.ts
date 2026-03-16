import type { ExtractPropTypes, PropType } from 'vue'
import type { UploadFileInfo, UploadProps } from 'naive-ui'

export const npUploadProps = {
  modelValue: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => {
      return []
    },
  },
  urlOnly: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Object as PropType<
      Omit<
        UploadProps,
        | 'fileList'
        | 'defaultFileList'
        | 'onUpdate:fileList'
        | 'onUpdateFileList'
        | 'onChange'
        | 'listType'
      > & {
        listType?: 'image-card'
      }
    >,
  },
  onChange: {
    type: Function as PropType<
      (value: string[], fileList: UploadFileInfo[]) => void
    >,
  },
}

export type NpUploadProps = ExtractPropTypes<typeof npUploadProps>

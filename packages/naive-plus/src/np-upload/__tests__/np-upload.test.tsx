import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { NUpload } from 'naive-ui'
import { NpUpload } from '../index'

describe('NpUpload', () => {
  test('render', async () => {
    const wrapper = mount(NpUpload)
    await nextTick()
    expect(wrapper.html()).include('np-upload')
  })

  test('render default button', async () => {
    const wrapper = mount(NpUpload)
    await nextTick()
    expect(wrapper.text()).include('上传文件')
  })

  test('render custom slot', async () => {
    const wrapper = mount(NpUpload, {
      slots: {
        default: '<span class="custom-trigger">自定义上传</span>',
      },
    })
    await nextTick()
    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
    expect(wrapper.text()).include('自定义上传')
  })

  test('pass props to NUpload', async () => {
    const wrapper = mount(NpUpload, {
      props: {
        props: {
          action: 'https://example.com/upload',
          multiple: true,
        },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    expect(upload.exists()).toBe(true)
    expect(upload.props('action')).toBe('https://example.com/upload')
    expect(upload.props('multiple')).toBe(true)
  })

  test('onChange callback with two params', async () => {
    const onChange = vi.fn()
    const wrapper = mount(NpUpload, {
      props: {
        onChange,
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const onUpdateFileList = upload.props('onUpdateFileList') as
      | ((value: any[]) => void)
      | undefined
    expect(typeof onUpdateFileList).toBe('function')

    const mockFiles = [
      {
        id: '1',
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        type: 'text/plain',
        status: 'finished',
      },
    ]
    onUpdateFileList?.(mockFiles as any)
    await nextTick()

    expect(onChange).toHaveBeenCalledTimes(1)
    const [modelValue, fileList] = onChange.mock.calls[0]
    expect(modelValue).toEqual([
      JSON.stringify({
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        status: 'finished',
        type: 'text/plain',
      }),
    ])
    expect(fileList).toEqual(mockFiles)
  })

  test('v-model emits string[] value', async () => {
    let modelValue: string[] = []
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (e: any) => {
          modelValue = e
        },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const onUpdateFileList = upload.props('onUpdateFileList') as
      | ((value: any[]) => void)
      | undefined

    const mockFiles = [
      {
        id: '1',
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        type: 'text/plain',
        status: 'finished',
      },
    ]
    onUpdateFileList?.(mockFiles as any)
    await nextTick()

    expect(modelValue).toEqual([
      JSON.stringify({
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        status: 'finished',
        type: 'text/plain',
      }),
    ])
  })

  test('urlOnly mode returns url strings when listType is image-card', async () => {
    let modelValue: string[] = []
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: [],
        urlOnly: true,
        props: { listType: 'image-card' },
        'onUpdate:modelValue': (e: any) => {
          modelValue = e
        },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const onUpdateFileList = upload.props('onUpdateFileList') as
      | ((value: any[]) => void)
      | undefined

    const mockFiles = [
      {
        id: '1',
        name: 'photo.png',
        url: 'http://example.com/photo.png',
        type: 'image/png',
        status: 'finished',
      },
    ]
    onUpdateFileList?.(mockFiles as any)
    await nextTick()

    expect(modelValue).toEqual(['http://example.com/photo.png'])
  })

  test('urlOnly has no effect when listType is not image-card', async () => {
    let modelValue: string[] = []
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: [],
        urlOnly: true,
        'onUpdate:modelValue': (e: any) => {
          modelValue = e
        },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const onUpdateFileList = upload.props('onUpdateFileList') as
      | ((value: any[]) => void)
      | undefined

    const mockFiles = [
      {
        id: '1',
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        type: 'text/plain',
        status: 'finished',
      },
    ]
    onUpdateFileList?.(mockFiles as any)
    await nextTick()

    expect(modelValue).toEqual([
      JSON.stringify({
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        status: 'finished',
        type: 'text/plain',
      }),
    ])
  })

  test('creates blob URL when file has no url', async () => {
    const mockBlobUrl = 'blob:http://localhost/fake-blob'
    vi.stubGlobal('URL', {
      ...globalThis.URL,
      createObjectURL: vi.fn(() => mockBlobUrl),
      revokeObjectURL: vi.fn(),
    })

    let modelValue: string[] = []
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (e: any) => {
          modelValue = e
        },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const onUpdateFileList = upload.props('onUpdateFileList') as
      | ((value: any[]) => void)
      | undefined

    const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' })
    const mockFiles = [
      {
        id: '1',
        name: 'test.txt',
        url: null,
        file: mockFile,
        type: 'text/plain',
        status: 'uploading',
      },
    ]
    onUpdateFileList?.(mockFiles as any)
    await nextTick()

    const parsed = JSON.parse(modelValue[0])
    expect(parsed.url).toBe(mockBlobUrl)
    expect(parsed.status).toBe('uploading')

    vi.unstubAllGlobals()
  })

  test('modelValue includes status field', async () => {
    let modelValue: string[] = []
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (e: any) => {
          modelValue = e
        },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const onUpdateFileList = upload.props('onUpdateFileList') as
      | ((value: any[]) => void)
      | undefined

    const mockFiles = [
      {
        id: '1',
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        type: 'text/plain',
        status: 'finished',
      },
    ]
    onUpdateFileList?.(mockFiles as any)
    await nextTick()

    const parsed = JSON.parse(modelValue[0])
    expect(parsed.status).toBe('finished')
  })

  test('restores fileList from string[] modelValue', async () => {
    const initialValue = [
      JSON.stringify({
        name: 'test.txt',
        url: 'http://example.com/test.txt',
        status: 'finished',
        type: 'text/plain',
      }),
    ]
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: initialValue,
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const fileList = upload.props('fileList') as any[]
    expect(fileList).toHaveLength(1)
    expect(fileList[0].name).toBe('test.txt')
    expect(fileList[0].url).toBe('http://example.com/test.txt')
    expect(fileList[0].type).toBe('text/plain')
  })

  test('restores fileList from url strings in urlOnly mode', async () => {
    const initialValue = ['http://example.com/photo.png']
    const wrapper = mount(NpUpload, {
      props: {
        modelValue: initialValue,
        urlOnly: true,
        props: { listType: 'image-card' },
      },
    })
    await nextTick()
    const upload = wrapper.findComponent(NUpload)
    const fileList = upload.props('fileList') as any[]
    expect(fileList).toHaveLength(1)
    expect(fileList[0].url).toBe('http://example.com/photo.png')
  })
})

export const useFetch = async (callback: () => Promise<any>) => {
  const data = ref<any>()
  const loading = ref<boolean>(true)
  const error = ref<any>()

  data.value = await callback().catch((result) => {
    error.value = result
  })
  loading.value = false

  const reload = async () => {
    loading.value = true
    data.value = await callback().catch((result) => {
      error.value = result
    })
    loading.value = false
  }

  return {
    data,
    loading,
    reload,
    error,
  }
}

// 任意のタイミングで非同期関数を走らせられる関数
export const useFetchCallBack = (callback: () => Promise<any>) => {
  const data = ref<any>()
  const loading = ref(false)
  const execute = async () => {
    loading.value = true
    data.value = await callback()
    loading.value = false
  }
  return {
    data,
    loading,
    execute,
  }
}

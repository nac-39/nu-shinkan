export const useFetch = async <T>(callback: () => Promise<T>) => {
  const data = ref<T>()
  const loading = ref<boolean>(true)
  const error = ref<any>()

  await callback()
    .then((result) => {
      data.value = result
    })
    .catch((result) => {
      error.value = result
    })
  loading.value = false

  const reload = async () => {
    loading.value = true
    await callback()
      .then((result) => {
        data.value = result
      })
      .catch((result) => {
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
  const error = ref('')
  const execute = async () => {
    loading.value = true
    data.value = await callback().catch((err) => (error.value = err))
    loading.value = false
  }
  return {
    data,
    loading,
    error,
    execute,
  }
}

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { collection, addDoc, Firestore } from 'firebase/firestore'
import { isAfter } from 'date-fns'
import { EventCreate } from '~/entities/Event'
import { ITheme } from '~/utils/theme'

const { t } = useLang()
const theme = useState<ITheme>('theme.current')
const router = useRouter()

const useCreateEvent = (callback: Function) => {
  const inputValues = reactive<EventCreate>({
    name: '',
    clubName: '',
    clubImagePath: '',
    startDate: new Date(),
    endDate: new Date(),
    place: '',
    description: '',
    webSiteUrl: '',
  })
  const errorMsg = ref('')

  const db = useState<Firestore>('firebase.db')
  const createEvent = async (event: EventCreate, clubId: string) => {
    const docRef = collection(db.value, 'events', clubId, 'events')
    await addDoc(docRef, event)
  }

  const validate = () => {
    errorMsg.value = ''
    const user = fGetUser()
    if (!user) {
      errorMsg.value =
        'Firebase Error: 入力内容をコピーしてリロードしてください'
      return
    }
    inputValues.clubName = user.displayName
    inputValues.clubImagePath = user.photoURL
    errorMsg.value = useValidate(inputValues, {
      name: multipleValidators([
        validators.requiredForDate(t('pages.events.edit.event_name.title')),
        validators.maxTextLength(t('pages.events.edit.event_name.title'), 25),
      ]),
      place: validators.maxTextLength(t('pages.events.edit.place.title'), 50),
      webSiteUrl: validators.isUrl(t('pages.events.edit.web_site_url.title')),
      endDate: validators.requiredForDate(t('pages.events.edit.date.end_date')),
      startDate: multipleValidators([
        validators.requiredForDate(t('pages.events.edit.date.start_date')),
        (startDate: Date) => {
          if (!(startDate instanceof Date)) return
          if (!(inputValues.endDate instanceof Date)) return
          return isAfter(inputValues.endDate, startDate)
            ? true
            : t('pages.events.edit.errors.start_date_must_be_before_end_date')
        },
      ]),
    })
  }

  const { loading: submitLoading, execute } = useFetchCallBack(async () => {
    const user = fGetUser()
    if (!user) {
      errorMsg.value =
        'Firebase Error: 入力内容をコピーしてリロードしてください'
      return
    }
    await createEvent(inputValues, user.uid)
  })

  const { loading: callbackLoading, execute: callBackExecute } =
    useFetchCallBack(async () => {
      await callback()
    })
  const done = ref(false)

  const loading = computed(
    () => submitLoading.value || callbackLoading.value || done.value
  )

  const onSubmit = async () => {
    if (loading.value) return
    validate()
    if (errorMsg.value) return
    await execute()
    await callBackExecute()
    done.value = true
  }

  return {
    inputValues,
    loading,
    onSubmit,
    errorMsg,
  } as const
}

const { inputValues, onSubmit, errorMsg, loading } = useCreateEvent(
  async () => {
    await router.push('/manage-club')
  }
)

const onClickSubmit = async () => {
  await onSubmit()
}
</script>

<template>
  <div class="text-xl font-bold mt-8˝">
    {{ t('pages.events.edit.title') }}
  </div>

  <div>
    <div class="font-bold text-lg">
      {{ t('pages.events.edit.event_name.title') }}
    </div>
    <FormTextInput
      v-model.trim="inputValues.name"
      :placeholder="t('pages.events.edit.event_name.placeholder')"
    />
  </div>
  <div>
    <div class="font-bold text-lg">
      {{ t('pages.events.edit.date.title') }}
    </div>
    <div class="flex space-x-2">
      <div>
        <p>{{ t('pages.events.edit.date.start_date') }}</p>
        <VueDatePicker
          v-model="inputValues.startDate"
          :dark="theme == 'dark'"
        />
      </div>
      <div>
        <p>{{ t('pages.events.edit.date.end_date') }}</p>
        <VueDatePicker v-model="inputValues.endDate" :dark="theme == 'dark'" />
      </div>
    </div>
  </div>
  <div>
    <div class="font-bold text-lg">
      {{ t('pages.events.edit.place.title') }}
    </div>
    <FormTextInput
      v-model="inputValues.place"
      :placeholder="t('pages.events.edit.place.placeholder')"
    />
  </div>
  <div>
    <div class="font-bold text-lg">
      {{ t('pages.events.edit.description.title') }}
    </div>
    <FormTextArea
      v-model="inputValues.description"
      :placeholder="t('pages.events.edit.description.placeholder')"
    />
  </div>
  <div>
    <div class="font-bold text-lg">
      {{ t('pages.events.edit.web_site_url.title') }}
    </div>
    <div>
      {{ t('pages.events.edit.web_site_url.description') }}
    </div>
    <FormTextInput
      v-model="inputValues.webSiteUrl"
      :placeholder="t('pages.events.edit.web_site_url.placeholder')"
    />
  </div>
  <ErrorMessage :error-message="errorMsg" />
  <Button :loading="loading" @click="onClickSubmit">保存する</Button>
</template>

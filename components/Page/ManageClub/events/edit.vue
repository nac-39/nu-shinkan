<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { collection, addDoc, Firestore } from 'firebase/firestore'
import { isAfter } from 'date-fns'
import { EventCreate } from '~/entities/Event'
import { ITheme } from '~/utils/theme'

const { t } = useLang()
const theme = useState<ITheme>('theme.current')
const router = useRouter()
const errorMsg = ref('')

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

const db = useState<Firestore>('firebase.db')
const createEvent = async (event: EventCreate, clubId: string) => {
  const docRef = collection(db.value, 'events', clubId, 'events')
  await addDoc(docRef, event)
}

const onSubmit = async () => {
  errorMsg.value = ''
  const user = fGetUser()
  if (!user) return
  inputValues.clubName = user.displayName
  inputValues.clubImagePath = user.photoURL
  errorMsg.value = useValidate(inputValues, {
    name: validators.requiredForText(t('pages.events.edit.event_name.title')),
    webSiteUrl: validators.isUrl('関連URL'),
    startDate: (startDate) => {
      if (!startDate || !inputValues.endDate) return true
      if (!(startDate instanceof Date))
        return t('pages.events.edit.errors.input_start_day')
      if (!(inputValues.endDate instanceof Date))
        return t('pages.events.edit.errors.input_end_day')
      return isAfter(inputValues.endDate, startDate)
        ? true
        : t('pages.events.edit.errors.start_date_must_be_before_end_date')
    },
  })
  if (errorMsg.value) return

  await createEvent(inputValues, user.uid)
  router.push('/manage-club')
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
      v-model="inputValues.name"
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
  <Button @click="onSubmit">保存する</Button>
</template>

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
  isAllDay: false,
  startDate: new Date(),
  endDate: new Date(),
  place: '',
  description: '',
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
  if (inputValues.isAllDay) {
    inputValues.startDate = null
    inputValues.endDate = null
  }
  errorMsg.value = useValidate(inputValues, {
    name: validators.requiredForText(t('pages.events.edit.event_name.title')),
    startDate: (startDate) => {
      if ((!startDate || !inputValues.endDate) && inputValues.isAllDay)
        return true
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
    <FormCheckBox
      v-model:isChecked="inputValues.isAllDay"
      :label="t('pages.events.edit.date.all_day_or_undefined')"
    >
    </FormCheckBox>
    <div v-show="!inputValues.isAllDay" class="flex space-x-2">
      <div>
        <p>開始日時</p>
        <VueDatePicker
          v-model="inputValues.startDate"
          :dark="theme == 'dark'"
        />
      </div>
      <div>
        <p>終了日時</p>
        <VueDatePicker v-model="inputValues.endDate" :dark="theme == 'dark'" />
      </div>
    </div>
  </div>
  <div>
    <div class="font-bold text-lg">
      {{ t('pages.events.edit.place.title') }}
    </div>
    <FormTextInput v-model="inputValues.place" />
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
  <ErrorMessage :error-message="errorMsg" />
  <Button @click="onSubmit">保存する</Button>
</template>

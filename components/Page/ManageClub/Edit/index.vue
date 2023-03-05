<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { User as FirebaseUser } from 'firebase/auth'
import { doc, setDoc, Firestore } from 'firebase/firestore'
import { ITheme } from '~/utils/theme'
import { EventCreate } from '~/entities/Event'

const db = useState<Firestore>('firebase.db')

const createEvent = async (event: EventCreate, clubId: string) => {
  const docRef = doc(db.value, clubId)
  await setDoc(docRef, event)
}

const { t } = useLang()
const theme = useState<ITheme>('theme.current')
const user = useState<FirebaseUser>('user')
const inputValues = reactive<EventCreate>({
  name: '',
  isAllDay: false,
  startDate: new Date(),
  endDate: new Date(),
  place: '',
  description: '',
})

const onSubmit = async () => {
  if (process.server) return
  await createEvent(inputValues, user.value.uid)
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
  <Button @click="onSubmit">保存する</Button>
</template>

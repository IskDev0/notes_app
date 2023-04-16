<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <!--        <img width="150" src="../../logo.svg"/>-->
      </IonToolbar>
    </IonHeader>
    <IonContent class="">
      <IonItem class="ion-margin">

        <IonSearchbar/>

        <IonList>
          <IonItem>
            <IonSelect @ionChange="sortNotes" aria-label="Sort" interface="action-sheet" placeholder="Sort By">
              <IonSelectOption v-for="type in notesStore.types" :value="type">{{ type }}</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonItem>
      <NoteCard :note="note" v-for="note in sortedList" :key="note.id"/>
      <PositionedButton/>
    </IonContent>
  </IonPage>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonToolbar
} from "@ionic/vue"
import {useNotesStore} from "@/stores/notes.js";
import {supabase} from "@/lib/supabaseClient.js";
import {onBeforeUpdate, onUpdated, ref} from "vue";
import NoteCard from "@/components/NoteCard.vue";
import PositionedButton from "@/components/PositionedButton.vue";


let notesStore = useNotesStore()

let sortType = ref("")

let notesList = ref([])

let sortedList = ref([])

const loadNotes = async () => {

  let {data: notes, error} = await supabase
      .from('notes')
      .select('*')

  notesList.value = notes.reverse()
}

let sortNotes = ($event) => {
  sortType.value = $event.detail.value
  sortedList.value = notesList.value.filter(sortedItem => sortedItem.note_type === sortType.value)
}

onBeforeUpdate(async () => {
  await loadNotes()
  sortedList.value = notesList.value
})

</script>

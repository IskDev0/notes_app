<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle class="ion-text-center ion-align-items-center">
            Notes
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonItem class="ion-margin">

        <IonSearchbar @ionInput="searchByName" v-model="search" />

        <IonList>
          <IonItem>
            <IonSelect @ionChange="sortNotes" aria-label="Sort" interface="action-sheet" placeholder="Sort By">
              <IonSelectOption v-for="type in notesStore.types" :value="type">{{ type }}</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonItem>
      <NoteCard :note="note" v-for="note in notesStore.sortedList" :key="note.id"/>
      <PositionedButton/>
      <IonItem class="ion-margin-horizontal" v-if="notesStore.sortedList.length <= 0">
        <IonLabel class="ion-text-center">No Notes</IonLabel>
      </IonItem>
    </IonContent>
  </IonPage>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/vue"
import {useNotesStore} from "@/stores/notes.js";
import {supabase} from "@/lib/supabaseClient.js";
import {onBeforeUpdate, ref} from "vue";
import NoteCard from "@/components/NoteCard.vue";
import PositionedButton from "@/components/PositionedButton.vue";


let search = ref("")

let notesStore = useNotesStore()


const loadNotes = async () => {

  let {data: notes, error} = await supabase
      .from('notes')
      .select('*')

  notesStore.notesList = notes.reverse()
}

let sortNotes = ($event) => {
  notesStore.sortType = $event.detail.value
  notesStore.sortedList = notesStore.notesList.filter(sortedItem => sortedItem.note_type === notesStore.sortType)

  if (notesStore.sortType === "all") {
    notesStore.sortedList = notesStore.notesList
  }
}

onBeforeUpdate(async () => {
  await loadNotes()
  notesStore.sortedList = notesStore.notesList
})

let searchByName = () => {
  notesStore.sortedList = notesStore.notesList.filter(name => name.note_desc.toLowerCase().includes(search.value.toLowerCase()))
}

</script>

<template>
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton default-href="#"></IonBackButton>
      </IonButtons>
      <IonTitle>Add Note</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonItem>
      <IonInput
          color="tertiary"
          :clear-input="true"
          label="Link"
          v-model="link"
          labelPlacement="floating"/>
    </IonItem>
    <IonItem>
      <IonInput
          color="tertiary"
          :clear-input="true"
          label="Description"
          v-model="description"
          labelPlacement="floating"/>
    </IonItem>
    <IonList>
      <IonItem>
        <IonSelect @ionChange="handleEvent" color="tertiary" justify="space-between" aria-label="Fruit" interface="action-sheet" placeholder="Type">
          <IonSelectOption v-for="type in notesStore.types" :value="type">{{type}}</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  </IonContent>
  <IonButton @click="addNote" color="tertiary" class="ion-margin">Button</IonButton>
</IonPage>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  alertController
} from "@ionic/vue"
import {supabase} from "@/lib/supabaseClient.js";
import { v4 as uuidv4 } from 'uuid';
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useNotesStore} from "@/stores/notes.js";

let notesStore = useNotesStore()

const router = useRouter()

let link = ref("")

let description = ref("")


const wrongInput = async () => {
  const alert = await alertController.create({
    header: 'Alert',
    message: 'Value cant be empty!',
    buttons: ['OK'],
  });

  await alert.present();
}

const wrongWebsite = async () => {
  const alert = await alertController.create({
    header: 'Alert',
    message: 'Wrong website domain!',
    buttons: ['OK'],
  });

  await alert.present();
}

const addNote = async () => {

 try {
  if (link.value.length > 0 && description.value.length > 0 && notesStore.type.length > 0) {

      const {data, error} = await supabase
          .from('notes')
          .insert([
            {
              id: uuidv4(),
              note_link: link.value,
              note_desc: description.value,
              note_type: notesStore.type
            },
          ])

      await router.replace("/")
  }else {
    await wrongInput()
  }
 }catch (error){
   console.log(error.message)
 }

  link.value = ""
  description.value = ""

}

let handleEvent = ($event) => {
  notesStore.type = $event.detail.value
}

</script>
<template>
  <IonItemSliding class="ion-padding-horizontal ion-margin-vertical">
    <IonItemOptions side="start">
      <IonItemOption @click="deleteNote(props.note)" color="danger">
        <IonIcon slot="icon-only" :icon="trashOutline"></IonIcon>
      </IonItemOption>
    </IonItemOptions>
    <IonItem class="rounded ion-no-padding">
      <IonCard class="full no-shadow ion-no-padding">
        <IonItem class="ion-no-padding">
          <IonThumbnail v-if="note.note_type === 'website'" slot="start">
            <img alt="Silhouette of mountains"
                 :src="noteFavicon ? noteFavicon : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'"/>
          </IonThumbnail>
          <h4 class="white">{{ note.note_link }}</h4>
          <IonBadge slot="end" color="primary">{{note.note_type}}</IonBadge>
        </IonItem>
        <div>
          <p>{{note.note_desc}}</p>
          <IonButton
              :href="`https://${note.note_link}`"
              v-if="note.note_type === 'website'"
              size="default"
              color="tertiary"
              expand="block">
            Visit
            <IonIcon
                slot="end"
                :icon="arrowForwardOutline"/></IonButton>
        </div>
      </IonCard>
    </IonItem>
  </IonItemSliding>
</template>

<script setup>
import {
  IonButton,
  IonCard,
  IonChip,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonBadge,
  IonThumbnail
} from "@ionic/vue"
import {arrowForwardOutline, trashOutline} from "ionicons/icons"
import {computed, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";

import {useNotesStore} from "@/stores/notes.js";

let notesStore = useNotesStore()

let props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

let deleteNote = async (index) => {

  const {data, error} = await supabase
      .from('notes')
      .delete()
      .eq('id', index.id)


  if (notesStore.notesList.indexOf(index) !== -1) {
    notesStore.notesList.splice(notesStore.notesList.indexOf(index), 1);
  }

}

let noteFavicon = computed(() => {
  return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${props.note.note_link}&size=128`
})
</script>

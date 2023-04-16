<template>
  <IonItemSliding class="ion-padding-horizontal ion-margin-vertical">
    <IonItemOptions side="start">
      <IonItemOption @click="deleteNote(props.note)" color="danger">
        <IonIcon slot="icon-only" :icon="trashOutline"></IonIcon>
      </IonItemOption>
    </IonItemOptions>
    <IonItem>
  <IonCard class="ion-margin full no-shadow">
            <IonItem>
              <IonThumbnail slot="start">
                <img alt="Silhouette of mountains" :src="noteFavicon ? noteFavicon : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'" />
              </IonThumbnail>
              <IonLabel>{{note.note_link}}</IonLabel>
            </IonItem>

            <IonCardContent class="full">
              <IonLabel>{{ note.note_desc }}</IonLabel>
              <IonButton :href="`https://${note.note_link}`" expand="full" color="tertiary" size="default">Visit
                <IonIcon slot="end" :icon="arrowForwardOutline"></IonIcon>
              </IonButton>
            </IonCardContent>
          </IonCard>
    </IonItem>
    </IonItemSliding>
</template>

<script setup>
import {IonCard, IonItem, IonThumbnail, IonLabel, IonCardContent, IonButton, IonItemSliding, IonItemOptions, IonItemOption, IonIcon} from "@ionic/vue"
import {arrowForwardOutline, trashOutline} from "ionicons/icons"
import {computed} from "vue";
import {supabase} from "@/lib/supabaseClient.js";

let props = defineProps({
  note: {
    type: Object,
    required: true
  }
})


let deleteNote = async(index) => {

  const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', index.id)


}

let noteFavicon = computed(() => {
  return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${props.note.note_link}&size=128`
})
</script>

<style>
.full {
  width: 100%;
}
.no-shadow {
  box-shadow: none;
}
</style>
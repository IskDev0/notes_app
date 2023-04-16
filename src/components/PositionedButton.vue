<template>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton color="tertiary" @click="router.push('/add')">
      <IonIcon :icon="add"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<script setup>
import {add} from "ionicons/icons"
import {IonFab, IonFabButton, IonIcon} from "@ionic/vue"

import {useRouter} from "vue-router"
const router = useRouter()
</script>
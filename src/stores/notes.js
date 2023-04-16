import {defineStore} from "pinia"
import {ref} from "vue"

export const useNotesStore = defineStore("notes", () => {

    let link = ref("")

    let description = ref("")

    let types = ref(["website", "apps", "other"])

    return {
        link, description, types
    }
})
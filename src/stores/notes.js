import {defineStore} from "pinia"
import {ref} from "vue"

export const useNotesStore = defineStore("notes", () => {

    let link = ref("")

    let description = ref("")

    let types = ref(["website", "app", "other", "all"])

    let sortType = ref("")

    let notesList = ref([])

    let sortedList = ref([])

    let type = ref("")

    return {
        link, description, types, sortType, notesList, sortedList, type
    }
})
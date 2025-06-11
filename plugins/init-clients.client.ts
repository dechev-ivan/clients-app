export default defineNuxtPlugin(() => {
    const clientsStore = useClientsStore()
    clientsStore.initLocalData()
})

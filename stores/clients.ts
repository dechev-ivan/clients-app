import {defineStore} from 'pinia'
import {useClientLocalData} from '~/composables/useClientLocalData';
import type {Client, ClientLocalData, ClientWithLocalData} from '~/types/client';
import { DEFAULT_CLIENT_LOCAL_DATA } from "assets/constants/client";

const {getAllClientData, updateClientData} = useClientLocalData();

export const useClientsStore = defineStore('clients', () => {
    const isLoaded = ref(false)
    const apiClients = ref<Client[]>([])
    const localData = ref<Record<string, ClientLocalData>>(getAllClientData());

    const clients = computed<ClientWithLocalData[]>(() =>
        apiClients.value.map(c => ({
            ...c,
            ...(localData.value[c.id.toString()] ?? DEFAULT_CLIENT_LOCAL_DATA)
        }))
    )

    const selectedClientId = ref<ClientWithLocalData['id'] | null>(null)
    const selectedClient = computed<ClientWithLocalData | null>(() =>
        clients.value.find(c => c.id === selectedClientId.value) || null
    )

    function initLocalData() {
        if (import.meta.client) {
            try {
                localData.value = getAllClientData()
            } catch {
                localData.value = {}
            }
        }
    }

    function selectClient(id: ClientWithLocalData['id'] | null) {
        selectedClientId.value = id
    }

    async function fetchClients(force = false): Promise<Client[]> {
        if (isLoaded.value && !force) {
            return apiClients.value;
        }

        const data = await $fetch<Client[]>('/api/clients')
        apiClients.value = data
        isLoaded.value = true

        return data
    }

    function saveClientData(id: number, data: Partial<ClientLocalData>) {
        const key = id.toString()
        localData.value[key] = {
            rating: localData.value[key]?.rating ?? 0,
            comment: localData.value[key]?.comment ?? '',
            ...data
        }
        updateClientData(id, data)
    }

    const updateClients = async () => {
        await fetchClients(true);

        if (selectedClientId.value && (!apiClients.value?.length || !apiClients.value.some(c => c.id === selectedClientId.value))) {
            selectClient(null);
        }
    };

    const sortedByLastName = computed(() =>
        [...clients.value].sort((a, b) => a.last_name.localeCompare(b.last_name))
    )

    const sortedByRating = computed(() =>
        [...clients.value].sort((a, b) => b.rating - a.rating)
    )

    return {
        // state
        apiClients,
        localData,
        isLoaded,
        selectedClient,
        selectedClientId,

        // computed
        clients,
        sortedByLastName,
        sortedByRating,

        // actions
        initLocalData,
        fetchClients,
        updateClients,
        saveClientData,
        selectClient,
    }
})


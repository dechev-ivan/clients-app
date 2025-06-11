<script lang="ts" setup>
import {useClientsStore} from '~/stores/clients'
import type { NuxtError } from "#app";
import ClientsList from "~/components/client/list/ClientsList.vue";

const clientsStore = useClientsStore()

const {
    fetchClients,
    updateClients,
    selectClient,
} = clientsStore;

const {
    sortedByLastName,
    selectedClientId,
} = storeToRefs(clientsStore)

const { error } = await useAsyncData('clients', async () => {
    try {
        await fetchClients();
        return {};
    } catch (error: unknown) {
        console.error(error);
        throw createError(error as NuxtError);
    }
});

if (error.value) {
    showError(error.value);
}

const searchQuery = ref('');

const clients = computed(() => {
    const searchValue = searchQuery.value.toLowerCase()
    if (!searchValue) {
        return sortedByLastName.value;
    }

    return sortedByLastName.value.filter(c => c.first_name.toLowerCase().includes(searchValue) || c.last_name.toLowerCase().includes(searchValue));
});

watch(clients, () => {
    if (selectedClientId.value && (!clients.value?.length || !clients.value.some(c => c.id === selectedClientId.value))) {
        selectClient(null);
    }
});

const loading = ref(false)

async function handleUpdate() {
    loading.value = true

    try {
        await updateClients()
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false
    }
}

definePageMeta({
    layout: false,
});
</script>

<template>
    <NuxtLayout name="default">
        <template #sidebar>
            <div :class="$style.sidebar">
                <div :class="$style.searchWrapper">
                    <UiSearchInput v-model.trim="searchQuery"/>
                </div>

                <div :class="$style.listWrap">
                    <ClientsList
                        v-if="clients?.length"
                        :class="$style.list"
                        :clients="clients"
                        :selected-client-id
                        @select="selectClient"
                    />
                </div>

                <div :class="$style.sidebarFooter">
                    <UiButton
                        :class="$style.updateBtn"
                        :loading
                        @click="handleUpdate"
                    >
                        Update
                    </UiButton>
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>

<style lang="scss" module>
.sidebar {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.searchWrapper {
    padding: 4px 16px 16px;
    background-color: var(--primary-100);
}

.listWrap {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.list {
    flex-grow: 1;
}

.sidebarFooter {
    padding: 16px;
}

.updateBtn {
    width: 100%;
}
</style>

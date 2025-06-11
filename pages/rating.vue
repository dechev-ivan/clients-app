<script lang="ts" setup>
import {useClientsStore} from '~/stores/clients'
import type { NuxtError } from "#app";

import ClientsList from "~/components/client/list/ClientsList.vue";

const clientsStore = useClientsStore()
const {fetchClients, selectClient} = clientsStore;
const {sortedByRating: clients, selectedClientId} = storeToRefs(clientsStore)

const { error } = await useAsyncData('rating', async () => {
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

definePageMeta({
    layout: false,
});
</script>

<template>
    <NuxtLayout name="default">
        <template #sidebar>
            <div :class="$style.sidebar">
                <client-only>
                    <ClientsList
                        v-if="clients?.length"
                        :class="$style.list"
                        :clients="clients"
                        :selected-client-id
                        show-rating
                        @select="selectClient"
                    />
                </client-only>
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

.list {
    flex-grow: 1;
}
</style>

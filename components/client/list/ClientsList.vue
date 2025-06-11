<script lang="ts" setup>
import type {ClientWithLocalData} from "~/types/client";

import ClientListItem from "~/components/client/list/ClientListItem.vue";

withDefaults(defineProps<{
    clients: ClientWithLocalData[];
    selectedClientId?: ClientWithLocalData["id"] | null;
    showRating?: boolean;
}>(), {
    selectedClientId: null,
    showRating: false,
});

defineEmits<{
    select: [value: ClientWithLocalData['id'] | null];
}>();
</script>

<template>
    <div :class="$style.ClientsList">
        <ul :class="$style.wrapper">
            <transition-group name="list">
                <li
                    v-for="client in clients"
                    :key="client.id"
                    :class="$style.item"
                >
                    <ClientListItem
                        :client
                        :is-selected="selectedClientId === client.id"
                        :show-rating
                        @click="$emit('select', client.id === selectedClientId ? null : client.id)"
                    />
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<style lang="scss" module>
.ClientsList {
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.item {
    &:not(:last-child) {
        border-bottom: 1px solid var(--base-300);
    }
}
</style>

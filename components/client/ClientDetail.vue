<script lang="ts" setup>
import type {ClientWithLocalData} from "~/types/client";

withDefaults(defineProps<{
    client?: ClientWithLocalData | null;
}>(), {
    client: null,
});
</script>

<template>
    <div :class="$style.ClientDetail">
        <div :class="$style.wrapper">
            <transition mode="out-in" name="fade-fast">
                <ClientCard
                    v-if="client"
                    :key="`client_${client.id}`"
                    :class="$style.card"
                    :client
                />

                <div
                    v-else
                    key="emptyText"
                    :class="$style.emptyText"
                >
                    <p>Select a client</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" module>
.ClientDetail {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: var(--base-100);
}

.card {
    &:global(.fade-fast-enter-from),
    &:global(.fade-fast-leave-active) {
        @include respond-to(mobile) {
            opacity: 1;
        }
    }
}

.emptyText {
    font-size: 24px;
    font-weight: 500;
}
</style>

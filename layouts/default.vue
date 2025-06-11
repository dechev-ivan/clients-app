<script setup lang="ts">
import {useClientsStore} from '~/stores/clients'

const clientsStore = useClientsStore()
const {selectedClient} = storeToRefs(clientsStore)

const isSidebarOpen = ref(true);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
    <div :class="$style.layout">
        <TheSidebar
            :is-open="isSidebarOpen"
            @toggle="toggleSidebar"
        >
            <template v-if="$slots.sidebar">
                <slot name="sidebar"/>
            </template>
        </TheSidebar>

        <main :class="[$style.content, {[$style._offset]: !isSidebarOpen}]">
            <ClientDetail :client="selectedClient"/>
        </main>
    </div>
</template>

<style lang="scss" module>
.layout {
    display: flex;
    min-height: 100vh;
}

.content {
    display: flex;
    flex: 1;
    margin-left: var(--sidebar-width);
    transition: margin-left 0.3s ease;

    &._offset {
        margin-left: 0;
    }
}
</style>

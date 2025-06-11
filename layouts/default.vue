<script lang="ts" setup>
import {useClientsStore} from '~/stores/clients';
import { useMediaQuery } from '~/composables/useMediaQuery'
import {DEVICE_OPTIONS} from "~/assets/constants/device";

const clientsStore = useClientsStore();
const isMobile = useMediaQuery(`(max-width: ${DEVICE_OPTIONS.TABLET}px)`);
const {selectedClient} = storeToRefs(clientsStore);

const isSidebarOpen = ref(true);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
}

const handleClickContent = () => {
    if (isSidebarOpen.value && isMobile.value) {
        isSidebarOpen.value = false;
    }
}

watch(selectedClient, (value, oldValue) => {
    if (isSidebarOpen.value && isMobile.value && oldValue?.id !== value?.id) {
        isSidebarOpen.value = false;
    }
});
</script>

<template>
    <div :class="$style.layout">
        <TheSidebar
            :is-open="isSidebarOpen"
            @toggle="toggleSidebar"
        >
            <slot v-if="$slots.sidebar" name="sidebar"/>
        </TheSidebar>

        <main
            :class="[
                $style.content,
                { [$style._offset]: !isSidebarOpen }
            ]"
            @click="handleClickContent"
        >
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
    max-width: 100%;
    margin-left: var(--sidebar-width);
    transition: margin-left 0.3s ease;

    @include respond-to(tablet) {
        margin-left: 0;
    }

    &._offset {
        margin-left: 0;
    }
}
</style>

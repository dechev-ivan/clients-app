<script lang="ts" setup>
import {useClientsStore} from '~/stores/clients';
import {DEVICE_OPTIONS} from "~/assets/constants/device";

const clientsStore = useClientsStore();
const {selectedClient} = storeToRefs(clientsStore);

const isSidebarOpen = ref(true);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
}

watch(selectedClient, (value, oldValue) => {
    if (isSidebarOpen.value && isMobile.value && oldValue !== value) {
        isSidebarOpen.value = false;
    }
});

const isMobile = ref(false);

onMounted(() => {
    const mediaQuery = window?.matchMedia(`(max-width: ${DEVICE_OPTIONS.TABLET}px)`)
    isMobile.value = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
        isMobile.value = e.matches;
    }

    mediaQuery.addEventListener('change', handler)

    onBeforeUnmount(() => {
        mediaQuery.removeEventListener('change', handler)
    })
})
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

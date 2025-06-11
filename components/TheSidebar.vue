<script setup lang="ts">
defineProps<{
    isOpen: boolean;
}>();

defineEmits(['toggle'])
</script>

<template>
    <aside :class="[$style.TheSidebar, {[$style._closed]: !isOpen }]">
        <div :class="$style.header">
            <SidebarTabs/>

            <button
                :class="$style.toggleBtn"
                @click="$emit('toggle')"
            >
                <span :class="$style.arrow">&lt;</span>
            </button>
        </div>

        <div :class="$style.content">
            <slot/>
        </div>
    </aside>
</template>

<style lang="scss" module>
.TheSidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    width: var(--sidebar-width);
    height: 100vh;
    border-right: 1px solid var(--base-300);
    background: var(--base-white);
    transition: transform 0.3s ease;
    box-shadow: 0 0 6px rgb(174 174 174);
    flex-direction: column;

    &._closed {
        transform: translateX(calc(-1 * var(--sidebar-width)));

        .arrow {
            transform: rotateZ(180deg);
        }
    }
}

.header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 16px;
    background-color: var(--primary-100);

    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 6px;
        height: 100%;
        background: var(--primary-100);
    }
}

.toggleBtn {
    position: absolute;
    top: 8px;
    left: calc(100% - 1px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 64px;
    border-radius: 0 6px 6px 0;
    border: none;
    background: var(--primary-100);
    color: var(--primary-300);
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: 0 0 6px rgb(174 174 174);
}

.content {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>

<script lang="ts" setup>
const tabs = [
    {path: '/clients', name: 'Clients'},
    {path: '/rating', name: 'Rating'}
]
</script>

<template>
    <nav :class="$style.NavigationLinks">
        <ul :class="$style.wrapper">
            <li
                v-for="tab in tabs"
                :key="tab.path"
                :class="$style.tab"
            >
                <router-link
                    :class="$style.link"
                    :to="tab.path"
                >
                    {{ tab.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
.NavigationLinks {
    width: 100%;
}

.wrapper {
    display: flex;
    width: 100%;
    padding: 2px;
    border-radius: 8px;
    background: var(--primary-200);
}

.tab {
    flex: 1;
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 6px;
    border-radius: 6px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:global(.router-link-exact-active) {
        background-color: var(--base-white);
    }
}
</style>

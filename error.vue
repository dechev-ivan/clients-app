<script lang="ts" setup>
import type {NuxtError} from '#app'
import {UiTags} from "#layers/ui-kit/types/enum";

defineProps({
    error: Object as () => NuxtError,
})
</script>

<template>
    <div :class="$style.ErrorPage">
        <h1 v-if="error?.statusCode" :class="$style.title">{{ error.statusCode }}</h1>

        <h2 v-if="error?.statusMessage" :class="$style.text">{{ error.statusMessage }}</h2>

        <UiButton
            :tag="UiTags.RLink"
            to="/"
        >
            Go back home
        </UiButton>
    </div>
</template>

<style lang="scss" module>
.ErrorPage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
}

.title {
    margin-bottom: 24px;
    font-size: 48px;
}

.text {
    margin-bottom: 40px;
    font-size: 32px;
}
</style>

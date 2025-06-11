<script setup lang="ts">
import type {NuxtError} from '#app'
import {UiTags} from "#layers/ui-kit/types/enum";

defineProps({
    error: Object as () => NuxtError
})
</script>

<template>
    <div :class="$style.ErrorPage">
        <h1 :class="$style.title">{{ error?.statusCode }}</h1>
        <UiButton
            :tag="UiTags.RLink"
            to="/"
        >
            Go back home
        </UiButton>
    </div>
</template>

<style module lang="scss">
.ErrorPage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
}

.title {
    margin-bottom: 40px;
    font-size: 48px;
}
</style>

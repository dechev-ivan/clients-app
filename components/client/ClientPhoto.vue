<script setup lang="ts">
import type {ClientWithLocalData} from "~/types/client";
import {UiSize} from "#layers/ui-kit/types/enum";

const props = withDefaults(defineProps<{
    src: ClientWithLocalData['avatar'];
    size?: UiSize.S | UiSize.M;
    alt?: string;
}>(), {
    size: UiSize.M,
    alt: 'client photo',
})

const style = useCssModule();

const classList = computed(() => ({
    [style[`--${props.size}-size`]]: props.size,
}));
</script>

<template>
    <div :class="[$style.ClientPhoto, classList]">
        <img
            :src="src"
            :alt="alt"
            :class="$style.image"
        />
    </div>
</template>

<style lang="scss" module>
.ClientPhoto {
    overflow: hidden;

    /* Sizes */
    &.--m-size {
        width: 180px;
        height: 180px;
        border-radius: 16px;
    }

    &.--s-size {
        width: 48px;
        height: 48px;
        border-radius: 20px;
    }
}

.image {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>

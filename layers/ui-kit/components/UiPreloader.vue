<script lang="ts" setup>
import {UiColor, UiSize} from '../types/enum';

const props = withDefaults(defineProps<{
    color?: UiColor.Primary | UiColor.BaseWhite;
    size?: UiSize.M;
}>(), {
    color: UiColor.BaseWhite,
    size: UiSize.M,
});

const sizeMap = {
    [UiSize.M]: '16px',
};

const classList = computed(() => ({
    [`--${props.color}-color`]: props.color,
    [`--${props.size}-size`]: props.size,
}));

const loaderSize = computed(() => sizeMap[props.size]);
</script>

<template>
    <span
        :class="classList"
        class="UiPreloader"
    >
        <span class="UiPreloader__loader"/>
    </span>
</template>

<style lang="scss">
.UiPreloader {
    $preloader: &;

    --loader-size: v-bind(loaderSize);

    &__loader {
        position: absolute;
        top: calc(50% - (var(--loader-size) / 2));
        left: calc(50% - (var(--loader-size) / 2));
        width: var(--loader-size);
        height: var(--loader-size);
        border-radius: 50%;
        border: 2px solid transparent;
        animation: loader-rotate 1s linear infinite;
    }

    &.--primary-color {
        #{$preloader} {
            &__loader {
                border-color: transparent;
                border-top-color: var(--primary-300);
            }
        }
    }

    &.--base-color {
        #{$preloader} {
            &__loader {
                border-color: transparent;
                border-top-color: var(--base-black);
            }
        }
    }

    &.--base-white-color {
        #{$preloader} {
            &__loader {
                border-color: transparent;
                border-top-color: var(--base-white);
            }
        }
    }
}

@keyframes loader-rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

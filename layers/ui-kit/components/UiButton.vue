<script lang="ts" setup>
import {UiColor, UiSize, UiTags} from '../types/enum';

const props = withDefaults(defineProps<{
    tag?: UiTags.RLink | UiTags.Button;
    size?: UiSize.S | UiSize.M;
    color?: UiColor.Primary | UiColor.BaseWhite;
    disabled?: boolean;
    loading?: boolean;
}>(), {
    tag: UiTags.Button,
    size: UiSize.M,
    color: UiColor.Primary,
    disabled: false,
    loading: false,
});

const emit = defineEmits<{
    'click': [value: Event];
}>();

const attrs = useAttrs();

const componentTag = computed(() => {
    if (props.tag === UiTags.RLink && attrs?.to) {
        return UiTags.RLink;
    }

    return UiTags.Button;
});

const classList = computed(() => [
    {
        [`--${props.color}-color`]: props.color,
        [`--${props.size}-size`]: props.size,
        '--is-disabled': props.disabled,
        '--is-loading': props.loading,
    },
]);

const onClick = (event: MouseEvent): void => {
    if (props.disabled) {
        return;
    }

    emit('click', event);
};
</script>

<template>
    <component
        :is="componentTag"
        :class="classList"
        :disabled="disabled"
        class="UiButton"
        v-bind="$attrs"
        @click="onClick"
    >
        <slot/>

        <UiPreloader
            v-if="loading"
            class="UiButton__preloader"
        />
    </component>
</template>

<style lang="scss">
.UiButton {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid transparent;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    user-select: none;

    $button: &;

    &.--is-disabled,
    &.--is-loading {
        pointer-events: none;
    }

    &__preloader {
        position: absolute;
        inset: 0 0 0 0;
        background-color: transparent;
        transition: background-color .3s ease;
    }

    /* Colors */
    &.--primary-color {
        background-color: var(--primary-300);
        color: var(--base-white);

        &:hover {
            background-color: var(--primary-400);
        }

        &:active {
            background-color: var(--primary-500);
        }

        &.--is-loading {
            #{$button} {
                &__preloader {
                    background-color: var(--primary-300);

                    .UiPreloader__loader {
                        border-color: transparent;
                        border-top-color: var(--base-white);
                    }
                }
            }

            &.--is-disabled {
                #{$button} {
                    &__preloader {
                        background-color: var(--base-300, var(--premium-400));

                        .UiPreloader__loader {
                            border-color: transparent;
                            border-top-color: var(--base-800, var(--premium-500));
                        }
                    }
                }
            }
        }

        &.--is-disabled {
            background-color: var(--base-300);
            color: var(--base-500);
        }
    }

    &.--base-white-color {
        background-color: var(--base-white);
        color: var(--base-black);

        &:hover {
            background-color: var(--base-100);
        }

        &:active {
            color: var(--primary-100);
        }

        &.--is-loading {
            #{$button} {
                &__preloader {
                    background-color: var(--base-white);

                    .UiPreloader__loader {
                        border-color: transparent;
                        border-top-color: var(--base-black);
                    }
                }
            }

            &.--is-disabled {
                #{$button} {
                    &__preloader {
                        background-color: var(--base-white);

                        .UiPreloader__loader {
                            border-color: transparent;
                            border-top-color: var(--base-black);
                        }
                    }
                }
            }
        }

        &.--is-disabled {
            background-color: var(--base-white);
            color: var(--base-black);
        }
    }

    /* Sizes */
    &.--m-size {
        height: 40px;
        padding: 12px 20px;
    }

    &.--s-size {
        height: 32px;
        padding: 8px;
    }
}
</style>

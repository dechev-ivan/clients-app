<script lang="ts" setup>
import type {ClientWithLocalData} from "~/types/client";
import {UiSize} from "#layers/ui-kit/types/enum";

const props = defineProps<{
    client: ClientWithLocalData;
    isSelected: boolean;
    showRating: boolean;
}>();

defineEmits(['click'])

const fullName = computed(() => `${props.client.first_name} ${props.client.last_name}`);
</script>

<template>
    <div
        :class="[$style.ClientListItem, {[$style._selected]: isSelected}]"
        @click="$emit('click')"
    >
    <span
        v-if="showRating"
        :class="$style.rating"
    >
      {{ client.rating }}
    </span>

        <ClientPhoto
            v-else
            :class="$style.photo"
            :size="UiSize.S"
            :src="client.avatar"
        />

        <span :class="$style.name">{{ fullName }}</span>

        <span :class="$style.arrow">
      >
    </span>
    </div>
</template>

<style lang="scss" module>
.ClientListItem {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 16px;
    background: transparent;
    text-align: left;
    transition: all 0.2s ease;
    cursor: pointer;
    gap: 12px;

    @include hover {
        background: var(--primary-50);
    }

    &._selected {
        background: var(--base-300);
    }
}

.rating {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 32px;
    font-weight: 500;
}

.name {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--base-black);
}

.arrow {
    flex-shrink: 0;
    color: var(--primary-300);
}
</style>

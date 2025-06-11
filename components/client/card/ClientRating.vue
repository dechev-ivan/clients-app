<script setup lang="ts">
import {UiColor, UiSize} from "#layers/ui-kit/types/enum";

const rating = defineModel();

const updateRating = (increment: boolean): void => {
    if (typeof rating.value !== "number") {
        return;
    }

    if (increment) {
        rating.value++;
    } else {
        rating.value--;
    }
}
</script>

<template>
    <div :class="$style.ClientRating">
        <UiButton
            :size="UiSize.S"
            :color="UiColor.BaseWhite"
            :class="$style.btn"
            @click="updateRating(false)"
        >
            -
        </UiButton>

        <span :class="$style.text">{{ rating }} points</span>

        <UiButton
            :size="UiSize.S"
            :color="UiColor.BaseWhite"
            :class="$style.btn"
            @click="updateRating(true)"
        >
            +
        </UiButton>
    </div>
</template>

<style lang="scss" module>
.ClientRating {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px;
    border-radius: 10px;
    background-color: var(--base-200);
}

.text {
    font-size: 24px;
    font-weight: 500;
}

.btn {
    width: 32px;
}
</style>

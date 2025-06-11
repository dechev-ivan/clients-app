<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
    <div class="'UiTextarea'">
     <textarea
         v-model="model"
         class="UiTextarea__input"
     />
    </div>
</template>

<style lang="scss">
.UiTextarea__input {
    width: 100%;
    min-height: 80px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--base-400);
    font-size: 14px;
    line-height: 1.4;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: var(--primary-300);
    }
}
</style>

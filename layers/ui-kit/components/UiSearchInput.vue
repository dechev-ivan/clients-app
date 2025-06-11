<script setup lang="ts">
defineProps<{
    modelValue: number | string | null;
}>();

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="UiSearchInput">
        <span class="UiSearchInput__icon">🔍︎</span>

        <input
            type="text"
            :value="modelValue"
            placeholder="Enter username to search"
            class="UiSearchInput__input"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>

<style lang="scss">
.UiSearchInput {
    position: relative;
}

.UiSearchInput__icon {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 20px;
    height: 20px;
    color: #9ca3af;
    transform: translateY(-50%);
    pointer-events: none;
}

.UiSearchInput__input {
    width: 100%;
    padding: 12px 40px 12px 16px;
    border-radius: 8px;
    border: 1px solid var(--base-300);
    background: #f9fafb;
    font-size: 14px;
    transition: all 0.2s ease;
    box-shadow: 0 0 3px rgb(174 174 174);

    &:focus {
        border-color: var(--primary-300);
        background: white;
        outline: none;
        box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
    }

    &::placeholder {
        color: var(--primary-200);
    }
}
</style>

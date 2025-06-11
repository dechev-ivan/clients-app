<script lang="ts" setup>
import type {ClientWithLocalData} from "~/types/client";

defineProps<{
    name: string;
    email: ClientWithLocalData['email'];
}>();
</script>

<template>
    <div :class="$style.ClientInfo">
        <p :class="$style.name">{{ name }}</p>

        <a
            :class="$style.email"
            :href="`mailto:${email}`"
        >
            {{ email }}
        </a>
    </div>
</template>

<style lang="scss" module>
.name {
    font-size: 42px;
    font-weight: 500;
    line-height: 1;

    @include respond-to(tablet) {
        font-size: 32px;
    }
}

.email {
    @include text-ellipsis(1);

    font-size: 30px;
    line-height: 1;

    @include respond-to(tablet) {
        font-size: 24px;
    }
}
</style>

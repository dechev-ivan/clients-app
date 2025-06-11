<script lang="ts" setup>
import type {ClientWithLocalData} from "~/types/client";
import {useClientsStore} from '~/stores/clients'

const props = withDefaults(defineProps<{
    userId: ClientWithLocalData['id'];
    rating: ClientWithLocalData['rating'];
    comment: ClientWithLocalData['comment'];
    disabled?: boolean;
}>(), {
    disabled: false,
});

const {saveClientData} = useClientsStore();

const handleSave = () => {
    saveClientData(props.userId, {
        rating: props.rating,
        comment: props.comment,
    });
}
</script>

<template>
    <UiButton
        :disabled
        @click="handleSave"
    >
        Save
    </UiButton>
</template>

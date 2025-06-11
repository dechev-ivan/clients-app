<script lang="ts" setup>
import type {ClientWithLocalData} from '~/types/client';

import ClientInfo from "~/components/client/card/ClientInfo.vue";
import ClientRating from "~/components/client/card/ClientRating.vue";
import ClientSaveButton from "~/components/client/card/ClientSaveButton.vue";

const props = defineProps<{
    client: ClientWithLocalData;
}>();

const rating = ref(props.client.rating);
const comment = ref(props.client.comment);

const fullName = computed(() => `${props.client.first_name} ${props.client.last_name}`);

// TODO: сюда бы добавить проверку длины коммента и возможность ограничить рейтинг сверху / снизу
const isSaveDisabled = computed(() => Boolean(props.client.rating === rating.value && props.client.comment === comment.value));
</script>

<template>
    <article :class="$style.ClientCard">
        <div :class="$style.main">
            <ClientPhoto
                :class="$style.photo"
                :src="client.avatar"
            />

            <div :class="$style.info">
                <ClientInfo
                    :email="client.email"
                    :name="fullName"
                />

                <ClientRating v-model="rating"/>

                <UiTextArea v-model.trim="comment"/>
            </div>
        </div>

        <div :class="$style.footer">
            <ClientSaveButton
                :class="$style.saveBtn"
                :comment="comment"
                :disabled="isSaveDisabled"
                :rating="rating"
                :user-id="client.id"
            />
        </div>
    </article>
</template>

<style lang="scss" module>
.ClientCard {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 640px;
    padding: 40px 32px 32px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%);
    border-radius: 16px;
    background-color: var(--base-white);

    @include respond-to(tablet) {
        width: 480px;
    }

    @include respond-to(mobile) {
        gap: 14px;
        width: calc(100% - 32px);
        padding: 24px;
    }
}

.main {
    display: flex;
    gap: 24px;

    @include respond-to(tablet) {
        flex-direction: column;
    }
}

.photo {
    align-self: center;
    flex-shrink: 0;
}

.info {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 24px;

    @include respond-to(tablet) {
        gap: 16px;
    }
}

.footer {
    display: flex;
    justify-content: center;
}

.saveBtn {
    width: 50%;

    @include respond-to(tablet) {
        width: 100%;
    }
}
</style>

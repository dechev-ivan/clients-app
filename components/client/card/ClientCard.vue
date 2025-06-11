<script setup lang="ts">
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
const isSaveDisabled = computed(() => Boolean(props.client.rating === rating.value && props.client.comment === comment.value));
</script>

<template>
  <article :class="$style.ClientCard">
    <div :class="$style.main">
      <ClientPhoto
          :src="client.avatar"
          :class="$style.photo"
      />

      <div :class="$style.info">
        <ClientInfo
            :name="fullName"
            :email="client.email"
        />

        <ClientRating v-model="rating"/>

        <UiTextArea v-model.trim="comment"/>
      </div>
    </div>

    <div :class="$style.footer">
      <ClientSaveButton
          :user-id="client.id"
          :comment="comment"
          :rating="rating"
          :disabled="isSaveDisabled"
          :class="$style.saveBtn"
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
}

.main {
  display: flex;
  gap: 24px;
}

.photo {
  align-self: center;
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
}

.footer {
  display: flex;
  justify-content: center;
}

.saveBtn {
  width: 50%;
}
</style>

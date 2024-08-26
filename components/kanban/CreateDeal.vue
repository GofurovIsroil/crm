<script lang="ts" setup>
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { defineProps } from "vue";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { IDeal } from "~/types/deals.types";

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  companyEmail: string;
  companyName: string;
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const isFormOpen = ref<boolean>(false);

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
  },
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
});

const router = useRouter();

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending, error } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), {
      name: data.name,
      price: data.price,
      companyEmail: data.companyEmail,
      companyName: data.companyName,
      status: data.status,
    }),
  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  },
  onError(err) {
    console.error("Error creating document:", err);
  },
});

const onSubmit = handleSubmit((values) => {
  console.log("Submitting values:", values);
  mutate({
    ...values,
    price: parseInt(values.price as unknown as string, 10),
  });
});
</script>

<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-40 hover:opacity-100 hover:text-[#a252c8]"
      @click="isFormOpen = !isFormOpen"
    >
      <Icon
        v-if="isFormOpen"
        size="25"
        class="fade-in-100 fade-out-0"
        name="radix-icons:arrow-up"
      />
      <Icon
        v-else
        size="25"
        class="fade-in-100 fade-out-0"
        name="mdi:plus-circle-outline"
      />
    </button>
  </div>
  <form v-if="isFormOpen" class="form">
    <UiInput
      placeholder="Name"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Price"
      v-model="price"
      v-bind="priceAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Company Name"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />
    <button class="btn" :disabled="isPending" @click="onSubmit">
      {{ isPending ? "Loading..." : "Add" }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-purple-700 transition-all;
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-all text-[#aebed5] hover:text-lg;
}

.form {
  @apply mb-3 block transition-all;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    border-color: rgba(162, 82, 200, 0.24);
    transform: translateY(-35px);
    opacity: 0.4;
  }
  90% {
    border-color: rgba(162, 82, 200, 0.24);
  }
  to {
    border-color: transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

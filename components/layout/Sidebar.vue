<script setup lang="ts">
import { UseAuthStore, useIsLoadingStore } from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore();
const store = UseAuthStore();
const router = useRouter();

const logoutClickHandler = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.replace("/login");
  isLoadingStore.set(false);
};
</script>

<template>
  <aside class="px-5 py-8 bg-[#0e172a] h-full relative w-full">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.webp" alt="" width="140px" class="mx-auto" />
    </NuxtLink>

    <button
      class="absolute top-2 right-3 transition-colors text-white hover:text-purple-400"
      @click="logoutClickHandler"
    >
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<style scoped></style>

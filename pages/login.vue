<script lang="ts" setup>
import { AppwriteException } from "appwrite";
import { v4 as uuid } from "uuid";
import { UseAuthStore, useIsLoadingStore } from "~/store/auth.store";

useHead({
  title: "Login | CRM SYSTEM",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const store = UseAuthStore();
const router = useRouter();

const login = async () => {
  try {
    isLoadingStore.set(true);

    // Check if there's an active session
    let currentSession;
    try {
      currentSession = await account.getSession("current");
    } catch (error) {
      if (error instanceof AppwriteException && error.code === 401) {
        // User is not authenticated, proceed with login
        await account.createEmailPasswordSession(
          emailRef.value,
          passwordRef.value
        );
      } else {
        throw error; // Re-throw if it's not an authentication issue
      }
    }

    // Fetch additional user data if needed
    const response = await account.get(); // Adjust this line according to the correct method signature

    if (response) {
      store.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }

    // Navigate to home after successful login
    await router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    // Clear input fields and loading state
    emailRef.value = "";
    passwordRef.value = "";
    nameRef.value = "";
    isLoadingStore.set(false);
  }
};

const registration = async () => {
  try {
    const userId = uuid(); // Generate a UUID for the new user

    // Create a new user account
    await account.create(
      userId,
      emailRef.value,
      passwordRef.value,
      nameRef.value
    );

    // Automatically log in the user after registration
    await login();
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-[#0e172a] w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5 text-white">Login</h1>

      <form>
        <UiInput
          placeholder="email"
          type="email"
          class="mb-3 text-white"
          v-model="emailRef"
        />
        <UiInput
          placeholder="password"
          type="password"
          class="mb-3 text-white"
          v-model="passwordRef"
        />
        <UiInput
          placeholder="name"
          type="name"
          class="mb-3 text-white"
          v-model="nameRef"
        />
        <div class="flex items-center justify-center gap-5">
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="registration">Registration</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

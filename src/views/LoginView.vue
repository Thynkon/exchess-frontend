<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { computed, onMounted, reactive, ref, toRef } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';
import { useLoginStore } from '@/stores/login';

const route = useRoute();
const auth = useAuthStore();
const isLoggedIn = computed(() => auth.isLoggedIn);
const loginStore = useLoginStore();

const onSubmit = async (e) => {
  const auth = useAuthStore();
  const result = await v$.value.$validate();

  if (result) {
    await auth.login({ username: formData.username, password: formData.password });
  }
}

const formData = reactive({
  username: '',
  password: '',
})
const rules = {
  username: { required },
  password: { required },
}

const v$ = useVuelidate(rules, formData);

onMounted(() => {
  if (isLoggedIn.value) {
    const to =
      route.query.redirectTo && typeof route.query.redirectTo === 'string'
        ? route.query.redirectTo
        : '/';
    router.push(to);
  }
});

</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Login</h2>
        <form @submit.prevent="onSubmit" class="w-full flex flex-col space-y-6 form-field">
          <div v-for="error in loginStore.errors" class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
              {{ error }}
            </div>
          </div>
          <div>
            <label class="block">Username</label>
            <input name="username" v-model="formData.username"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <div v-for="error in v$.username.$errors" :key="error.$uid"
            class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
              {{ error.$message }}
            </div>
          </div>

          <div>
            <label class="block">Password</label>
            <input v-model="formData.password" type="password"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <div v-for="error in v$.password.$errors" :key="error.$uid"
            class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
              {{ error.$message }}
            </div>
          </div>

          <button type="submit" class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg ">
            Login
          </button>
        </form>

        <router-link to="/register" class="block text-gray-600 hover:text-gray-800 text-center">
          Don't have an account? Create one
        </router-link>
      </div>
    </div>
  </main>
</template>

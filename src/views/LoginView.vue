<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const auth = useAuthStore();
const isLoggedIn = computed(() => auth.isLoggedIn);

const username = ref('');
const password = ref('');

const handleSubmit = async (e) => {
  e.preventDefault()
  const auth = useAuthStore();

  await auth.login({ username: username.value, password: password.value });
}

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
        <form @submit="handleSubmit" class="w-full flex flex-col space-y-6 form-field">
          <div>
            <label class="block">Username</label>
            <input name="username" v-model="username"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <div>
            <label class="block">Password</label>
            <input v-model="password" type="password"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <button type="submit" @click="handleSubmit"
            class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg ">
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

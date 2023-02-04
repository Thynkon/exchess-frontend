<script setup lang="ts">
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>
        <form class="w-full flex flex-col space-y-6 form-field">
          <div>
            <label class="block">Username</label>
            <input name="username" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>
          <div>
            <label class="block">Password</label>
            <input type="password" name="password"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <div>
            <label class="block">Password confirmation</label>
            <input type="password" name="password_confirmation"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <button type="submit" class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg">
            Register
          </button>
        </form>

        <router-link to="/login" class="block text-gray-600 hover:text-gray-800 text-center">
          Already have an account? Login
        </router-link>
      </div>
    </div>
  </main>
</template>

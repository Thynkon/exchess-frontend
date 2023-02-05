import { ref } from "vue";
import { defineStore } from "pinia";

export const useRegisterStore = defineStore('register', () => {
  const success = ref([]);
  const errors = ref([]);

  return {
    success,
    errors
  }
});
import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore('login', () => {
  const success = ref([]);
  const errors = ref([]);

  return {
    success,
    errors
  }
});
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Api from "@/api/requests";
import { useLoginStore } from "./login";

const api = new Api();

interface FormFields {
  username: string | null,
  password: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const user = ref(null);
  const loginStore = useLoginStore();

  async function login(credentials: FormFields) {
    api.getAuthToken(credentials).then((response) => {
      let body = response.data;

      localStorage.setItem('token', body.token);
      localStorage.setItem('user', JSON.stringify(body.user));

      token.value = body.token;
      user.value = body.user;
    }).catch((error) => {
      console.log("Error from promise: ", error.response.data.error.message);
      loginStore.errors.push(error.response.data.error.message);
    });
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  }

  const isLoggedIn = computed(() => {
    return localStorage.getItem('token') ? true : false;
  });

  return {
    token,
    user,
    login,
    logout,
    isLoggedIn
  }
});
import { useUserStore } from "../stores/users/user";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  const userStore = useUserStore();

  userStore.$subscribe((cb) => console.log(cb));
  const isLoggedIn = computed(() => userStore.getIsLoggedIn);

  if (!isLoggedIn.value) {
    return navigateTo("/");
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLogged } = useCurrentUserStore();
  if (!isLogged()) {
    return navigateTo('/')
  }
});

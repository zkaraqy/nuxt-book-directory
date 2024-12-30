import { jwtDecode } from "jwt-decode";
import _ from "lodash";
export interface Credential {
  username: string;
  password: string;
}
export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export const useCurrentUserStore = defineStore("useCurrentUserStore", () => {
  const runtimeConfig = useRuntimeConfig();
  const profileFull: Ref<any> = ref({});
  // const access: Ref<ModuleResponse[]> = ref([]);

  const accessToken = useCookie("accessToken", {
    expires: new Date(Date.now() + Number(runtimeConfig.public.cookieLifeTime) * 1000),
  });

  const profile = computed(() => {
    return accessToken.value
      ? jwtDecode<Profile>(accessToken.value)
      : ({} as Profile);
  });

  const isLogged = () => {
    const token = process.client
      ? localStorage.getItem("refreshToken")
      : accessToken.value;
    if (token) {
      const decodedToken = jwtDecode(token);
      return (
        decodedToken &&
        (process.server || Math.round(Date.now() / 1000) < decodedToken.exp!)
      );
    }
    return false;
  };

  const authenticate = async (credential: Credential) => {
    const response: any = await $fetch("/api/auth", {
      method: "post",
      body: credential,
    });
    accessToken.value = response.accessToken!;
    if (process.client) {
      localStorage.setItem("refreshToken", response.refreshToken);
    }
    return response;
  };

  async function fetchProfile() {
    const profile = await $fetch("/api/users/me");
    profileFull.value = profile;
    return profile;
  }

  const refreshAccessToken = async () => {
    try {
      const response: any = await $fetch("/api/auth/refresh", {
        method: "POST",
        body: { token: localStorage.getItem("refreshToken") },
      });
      accessToken.value = response.accessToken;
      return response;
    } catch (err: any) {
      if (err.status === 400) {
        accessToken.value = null;
        localStorage.removeItem("refreshToken");
        throw err;
      }
    }
  };

  const logout = async () => {
    await $fetch("/api/auth/revoke", {
      method: "post",
      body: { token: localStorage.getItem("refreshToken") },
    });
    accessToken.value = null;
    localStorage.removeItem("refreshToken");
    return navigateTo("/login", { replace: true });
  };

  return {
    profileFull,
    profile,
    accessToken,
    authenticate,
    logout,
    refreshAccessToken,
    isLogged,
    fetchProfile,
  };
});

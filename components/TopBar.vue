<template>
  <header
    class="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" v-if="$route.path.includes('/user')" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb v-if="!$route.path.includes('/user')">
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#" class="text-2xl">
              Book Directory
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="px-4 flex gap-2">
      <SelectTheme />
      <Button v-if="isLogged()" class="p-2 aspect-square"
        :title="$route.path.includes('/user') ? 'Home' : 'User'"
        @click="navigateTo($route.path.includes('/user') ? '/' : '/user')" variant="outline">
        <Home v-if="$route.path.includes('/user')" />
        <UserRound v-if="$route.path === '/'" />
      </Button>
      <Button v-if="!isLogged()" variant="outline" @click="navigateTo('/register')">Register</Button>
      <Button v-if="!isLogged()" @click="navigateTo('/login')">
        <LogIn /> Login
      </Button>
      <Button v-if="isLogged()" variant="destructive" @click="logoutAkun" v-bind:disabled="isLoading">
        <Loader2 class="animate-spin" v-if="isLoading" />
        <LogOut v-else /> Logout
      </Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Loader2, UserRound, Home, LogOut, LogIn } from 'lucide-vue-next';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Swal from 'sweetalert2';
const route = useRoute();
const isLoading = ref(false);
const { isLogged, logout } = useCurrentUserStore();

function logoutAkun() {
  isLoading.value = true
  Swal.fire({
    title: "Logout",
    text: "Apakah anda yakin ingin keluar?",
    showCancelButton: true,
    confirmButtonText: "Ya",
    icon: "question"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await logout().then(() => {
        Swal.fire("Logout Berhasil", "", "success");
        isLoading.value = false;
        navigateTo('/')
      })
    } else {
      isLoading.value = false
    }
  });
}
</script>

<style></style>
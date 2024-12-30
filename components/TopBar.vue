<template>
  <header
    class="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" v-if="$route.path.includes('/user')" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#">
              Building Your Application
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="px-4 flex gap-2">
      <SelectTheme />
      <Button v-if="!isLogged()" variant="outline" @click="navigateTo('/register')">Register</Button>
      <Button v-if="!isLogged()" @click="navigateTo('/login')">Login</Button>
      <Button v-if="isLogged()" variant="destructive" @click="logoutAkun">Logout</Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Swal from 'sweetalert2';
const route = useRoute()
const { isLogged, logout } = useCurrentUserStore();

function logoutAkun() {
  Swal.fire({
    title: "Logout",
    text: "Apakah anda yakin ingin keluar?",
    showCancelButton: true,
    confirmButtonText: "Ya",
    icon: "question"
  }).then((result) => {
    if (result.isConfirmed) {
      logout().then(() => {
        Swal.fire("Logout Berhasil", "", "success");
        navigateTo('/')
      })
    }
  });
}
</script>

<style></style>
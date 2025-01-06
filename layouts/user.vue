<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarContent class="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel>Book Directory</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <NuxtLink href="/user">
                <SidebarMenuButton>
                  <LayoutDashboard />Dashboard
                </SidebarMenuButton>
              </NuxtLink>
            </SidebarMenuItem>
            <Collapsible v-for="item in data.navMain" :key="item.title" as-child :default-open="item.isActive"
              class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuSubButton as-child>
                        <NuxtLink :href="subItem.url">
                          <component :is="subItem.icon" />
                          <span>{{ subItem.title }}</span>
                        </NuxtLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                    <AvatarFallback class="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ data.user.name }}</span>
                    <span class="truncate text-xs">{{ data.user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom"
                align="end" :side-offset="4">
                <DropdownMenuGroup>
                  <DropdownMenuItem @click="navigateTo('/user/profile')">
                    <BadgeCheck />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="logoutAkun">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <TopBar />
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot></slot>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang=ts>
import {
  BadgeCheck,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  LibraryBig,
  Heart,
  Album,
  LayoutDashboard
} from 'lucide-vue-next'
import Swal from 'sweetalert2';

const useStore = useCurrentUserStore();
const { profile, logout } = useStore
const { name, email } = profile

const data = {
  user: {
    name: name,
    email: email,
    avatar: 'shadcn.jpg',
  },
  navMain: [
    {
      title: 'Collections',
      url: '#',
      icon: LibraryBig,
      isActive: true,
      items: [
        {
          title: 'Favorites',
          icon: Heart,
          url: '/user/favorites',
        },
        {
          title: 'Readlist',
          icon: Album,
          url: '/user/readlist',
        },
      ],
    },
  ],
}

function logoutAkun() {
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
        navigateTo('/')
      })
    }
  });
}
</script>

<style></style>
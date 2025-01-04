<script setup lang="ts">
definePageMeta({
  layout: "login"
});

useHead({
  title: "Login | Book Directory"
})

import Swal from 'sweetalert2';
import { Loader2, Eye, EyeOff, Send } from 'lucide-vue-next'

const credential = ref({ username: "", password: "" });
const isLoading: Ref<boolean> = ref(false);
const errorMessage: Ref<string | undefined> = ref();
const showPassword = ref(false)

const { authenticate } = useCurrentUserStore();

const login = async () => {
  isLoading.value = true;
  errorMessage.value = undefined;

  authenticate(credential.value)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Anda Berhasil Login",
      }).then(() => {
        navigateTo("/");
      });
    })
    .catch((error) => {
      errorMessage.value = error.data.message;
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: errorMessage.value,
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <Card class="sm:w-full md:w-[50dvw]">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Login with you account to have access to you collection and profile.</CardDescription>
    </CardHeader>
    <CardContent>
      <div>
        <FormField name="form">
          <FormItem class="mb-2">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input class="h-full" type="text" placeholder="Username" autocomplete="off" v-model="credential.username"
                @keydown.enter="login" />
            </FormControl>
            <FormDescription>
              Enter your username.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Password</FormLabel>
            <div class="flex flex-row gap-2">
              <Input class="h-full" :type="showPassword ? 'text' : 'password'" placeholder="Password" autocomplete="off"
                v-model="credential.password" @keydown.enter="login" />
              <Button @click="() => { showPassword = !showPassword }" variant="outline" class="aspect-square flex"
                :title="!showPassword ? 'unhide password' : 'hide password'">
                <Eye v-if="!showPassword" />
                <EyeOff v-else />
              </Button>
            </div>
            <FormDescription class="flex justify-between">
              <p>Enter your password.</p>
              <Button variant="link" class="px-0" @click="navigateTo('#')">Forgot password?</Button>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end">
          <Button type="button" @click="login" v-bind:disabled="isLoading">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
            <Send v-else />
            Submit
          </Button>
        </div>
      </div>
    </CardContent>
    <CardFooter class="mx-0 px-2 flex justify-between">
      <Button variant="link" @click="navigateTo('/')">Back to home</Button>
      <Button variant="link" @click="navigateTo('/register')">Didn't have any account?</Button>
    </CardFooter>
  </Card>

</template>
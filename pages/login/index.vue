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

interface ValidationMessages {
  username?: string;
  password?: string;
}

const validation = ref<ValidationMessages>({});

const model: Ref<{
  username: string;
  password: string;
}> = ref({
  username: "",
  password: "",
});

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
      validation.value = {}
      errorMessage.value = error.data.message;
      Swal.fire({
        icon: "error",
        title: "Failed to Login",
        text: errorMessage.value,
      });
      const errorData = error.data;
      if (errorData.statusCode === 422) {
        for (let i = 0; i < errorData.data.length; i++) {
          const keyPath: 'username' | 'password' = errorData.data[i].path[0]
          const errMessage: string = errorData.data[i].message;
          validation.value[keyPath] = errMessage;
        }
      }
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
              <Input :class="validation.username ? 'border-destructive' : 'border-input'" class="h-full" type="text" placeholder="Username" autocomplete="off" v-model="credential.username"
                @keydown.enter="login" />
            </FormControl>
            <FormDescription class="flex sm:justify-start sm:items-center flex-col sm:flex-row">
              <span class="text-destructive">{{ validation.username }}</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem class="pt-2">
            <FormLabel>Password</FormLabel>
            <div class="flex flex-row gap-2">
              <Input :class="validation.password ? 'border-destructive' : 'border-input'" class="h-full" :type="showPassword ? 'text' : 'password'" placeholder="Password" autocomplete="off"
                v-model="credential.password" @keydown.enter="login" />
              <Button @click="() => { showPassword = !showPassword }" variant="outline" class="aspect-square flex"
                :title="!showPassword ? 'unhide password' : 'hide password'">
                <Eye v-if="!showPassword" />
                <EyeOff v-else />
              </Button>
            </div>
            <FormDescription class="flex sm:justify-between sm:items-center flex-col sm:flex-row p-0 m-0"
              style="margin: 0;">
              <span class="text-destructive m-0 p-0">{{ validation.password }}</span>
              <Button variant="link" class="p-0" @click="navigateTo('#')">Forgot password?</Button>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end pt-2">
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
<script setup lang="ts">
import Swal from 'sweetalert2';
import { Loader2, Eye, EyeOff, Send } from 'lucide-vue-next';

definePageMeta({
  layout: "login"
})

useHead({
  title: "Register | Book Directory"
})

const { authenticate } = useCurrentUserStore()
const isLoading: Ref<boolean> = ref(false);
const showPassword = ref(false)
const showConfirmationPassword = ref(false)

interface ValidationMessages {
  username?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

const validation = ref<ValidationMessages>({});

const model: Ref<{
  id?: number;
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}> = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const regist = async () => {
  model.value.password = model.value.password;
  validation.value = {}
  isLoading.value = true;
  try {
    await $fetch('/api/auth/registrasi', { method: 'post', body: model.value })
    await authenticate({ username: model.value.username, password: model.value.password })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have successfully logged in",
        }).then(() => {
          navigateTo("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.data.message,
        });
      })
  } catch (err: any) {
    Swal.fire("Informasi", err.data.message ?? err.message, "error");
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <Card class="sm:w-full md:w-[50dvw]">
    <CardHeader>
      <CardTitle>Register</CardTitle>
      <CardDescription>Regist a new account.</CardDescription>
    </CardHeader>
    <CardContent>
      <div>
        <FormField name="form">
          <FormItem class="mb-2">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Name" autocomplete="off" v-model="model.name" @keydown.enter="regist" />
            </FormControl>
            <FormDescription>
              Enter your name.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem class="mb-2">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Username" autocomplete="off" v-model="model.username" @keydown.enter="regist" />
            </FormControl>
            <FormDescription>
              Enter your username.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem class="mb-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Email" autocomplete="off" v-model="model.email" @keydown.enter="regist" />
            </FormControl>
            <FormDescription>
              Enter your email.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <div class="flex gap-4">
            <FormItem class="flex-1">
              <FormLabel>Password</FormLabel>
              <div class="flex flex-row gap-2">
                <Input :type="showPassword ? 'text' : 'password'" placeholder="Password" autocomplete="off" v-model="model.password"
                  @keydown.enter="regist" />
                <Button :title="!showPassword ? 'unhide password' : 'hide password'" @click="() => { showPassword = !showPassword }" variant="outline">
                  <Eye v-if="!showPassword" />
                  <EyeOff v-else />
                </Button>
              </div>
              <FormDescription class="flex justify-between">
                <p>Enter your password.</p>
              </FormDescription>
              <FormMessage />
            </FormItem>
            <FormItem class="flex-1">
              <FormLabel>Confirm Password</FormLabel>
              <div class="flex flex-row gap-2">
                <Input :type="showConfirmationPassword ? 'text' : 'password'" placeholder="Repeat pbassword"
                  v-model="model.confirmPassword" @keydown.enter="regist" />
                <Button :title="!showConfirmationPassword ? 'unhide confirmation password' : 'hide confirmation password'" @click="() => { showConfirmationPassword = !showConfirmationPassword }" variant="outline">
                  <Eye v-if="!showConfirmationPassword" />
                  <EyeOff v-else />
                </Button>
              </div>
              <FormDescription class="flex justify-between">
                <p>Enter confirmation password.</p>
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>
        </FormField>
        <div class="flex justify-end mt-4">
          <Button type="button" @click="regist" v-bind:disabled="isLoading">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
            <Send v-else />
            Submit
          </Button>
        </div>
      </div>
    </CardContent>
    <CardFooter class="mx-0 px-2 flex justify-between">
      <Button variant="link" @click="navigateTo('/')">Back to home</Button>
      <Button variant="link" @click="navigateTo('/login')">Have an account?</Button>
    </CardFooter>
  </Card>

</template>
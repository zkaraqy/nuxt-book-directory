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
  email?: string;
  password?: string;
  confirmPassword?: string;
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
    validation.value = {}
    const errorData = err.data;
    if (errorData.statusCode === 422) {
      for (let i = 0; i < errorData.data.length; i++) {
        const keyPath: 'username' | 'name' | 'password' | 'confirmPassword' = errorData.data[i].path[0]
        const errMessage: string = errorData.data[i].message;
        validation.value[keyPath] = errMessage;
      }
    }
    console.log(validation.value)
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
              <Input :class="validation.username ? 'border-destructive' : 'border-input'" type="text" placeholder="Enter your name." autocomplete="off" v-model="model.name" @keydown.enter="regist" />
            </FormControl>
            <FormDescription class="flex sm:justify-start sm:items-center flex-col sm:flex-row">
              <span class="text-destructive">{{ validation.name }}</span>
            </FormDescription>
          </FormItem>
          <FormItem class="mb-2">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input :class="validation.username ? 'border-destructive' : 'border-input'" type="text" placeholder="Enter your username." autocomplete="off" v-model="model.username"
                @keydown.enter="regist" />
            </FormControl>
            <FormDescription class="flex sm:justify-start sm:items-center flex-col sm:flex-row">
              <span class="text-destructive">{{ validation.username }}</span>
            </FormDescription>
          </FormItem>
          <FormItem class="mb-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input :class="validation.username ? 'border-destructive' : 'border-input'" type="text" placeholder="Enter your email." autocomplete="off" v-model="model.email" @keydown.enter="regist" />
            </FormControl>
            <FormDescription class="flex sm:justify-start sm:items-center flex-col sm:flex-row">
              <span class="text-destructive">{{ validation.email }}</span>
            </FormDescription>
          </FormItem>
          <div class="flex gap-4">
            <FormItem class="flex-1">
              <FormLabel>Password</FormLabel>
              <div class="flex flex-row gap-2">
                <Input :class="validation.username ? 'border-destructive' : 'border-input'" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password." autocomplete="off"
                  v-model="model.password" @keydown.enter="regist" />
                <Button :title="!showPassword ? 'unhide password' : 'hide password'"
                  @click="() => { showPassword = !showPassword }" variant="outline">
                  <Eye v-if="!showPassword" />
                  <EyeOff v-else />
                </Button>
              </div>
              <FormDescription class="flex flex-col">
                <span class="text-destructive">{{ validation.password }}</span>
              </FormDescription>
            </FormItem>
            <FormItem class="flex-1">
              <FormLabel>Confirm Password</FormLabel>
              <div class="flex flex-row gap-2">
                <Input :class="validation.username ? 'border-destructive' : 'border-input'" :type="showConfirmationPassword ? 'text' : 'password'" placeholder="Enter your confirmation password."
                  v-model="model.confirmPassword" @keydown.enter="regist" />
                <Button
                  :title="!showConfirmationPassword ? 'unhide confirmation password' : 'hide confirmation password'"
                  @click="() => { showConfirmationPassword = !showConfirmationPassword }" variant="outline">
                  <Eye v-if="!showConfirmationPassword" />
                  <EyeOff v-else />
                </Button>
              </div>
              <FormDescription class="flex flex-col">
              <span class="text-destructive">{{ validation.confirmPassword }}</span>
            </FormDescription>
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
      <Button variant="link" @click="navigateTo('/login')">Already have an account?</Button>
    </CardFooter>
  </Card>

</template>
<script setup lang="ts">
import Swal from 'sweetalert2';

definePageMeta({
  layout: "login"
})

const { authenticate } = useCurrentUserStore()
const isLoading: Ref<boolean> = ref(false);

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
  try {
    await $fetch('/api/auth/registrasi', { method: 'post', body: model.value })
    await authenticate({ username: model.value.username, password: model.value.password })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have successfully logged in",
        }).then(() => {
          navigateTo("/user");
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
      <form @submit="">
        <FormField name="form">
          <FormItem class="mb-2">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Name" v-model="model.name" />
            </FormControl>
            <FormDescription>
              Enter your name.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem class="mb-2">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Username" v-model="model.username" />
            </FormControl>
            <FormDescription>
              Enter your username.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem class="mb-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Email" v-model="model.email" />
            </FormControl>
            <FormDescription>
              Enter your email.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <div class="flex gap-4">
            <FormItem class="flex-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" v-model="model.password" />
              </FormControl>
              <FormDescription>
                Enter your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
            <FormItem class="flex-1">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" v-model="model.confirmPassword" />
              </FormControl>
              <FormDescription>
                Enter a confirmation password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>
        </FormField>
        <div class="flex justify-end">
          <Button type="button" @click="regist" v-bind:disabled="isLoading">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
            Submit
          </Button>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button variant="link" @click="navigateTo('/')">Back to home</Button>
      <Button variant="link" @click="navigateTo('/login')">Have an account?</Button>
    </CardFooter>
  </Card>

</template>
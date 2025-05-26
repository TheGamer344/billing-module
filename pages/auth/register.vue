<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="bg-secondary-light p-8 rounded-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full px-4 py-2 rounded-lg bg-secondary border border-gray-700 focus:border-primary outline-none"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full px-4 py-2 rounded-lg bg-secondary border border-gray-700 focus:border-primary outline-none"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            required
            class="w-full px-4 py-2 rounded-lg bg-secondary border border-gray-700 focus:border-primary outline-none"
          />
        </div>
        
        <button
          type="submit"
          class="w-full bg-primary hover:bg-primary-dark py-2 rounded-lg font-semibold transition-colors"
        >
          Register
        </button>
      </form>
      
      <p class="mt-4 text-center text-gray-400">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary hover:text-primary-dark">
          Login here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    // Show error toast
    return
  }

  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    })
    
    if (error) throw error
    
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration error:', error.message)
    // Show error toast
  }
}
</script>
<template>
  <nav class="bg-secondary-light py-4">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-primary">
          FlameHost
        </NuxtLink>
        
        <div class="flex items-center space-x-6">
          <NuxtLink to="/services" class="hover:text-primary transition-colors">
            Services
          </NuxtLink>
          <NuxtLink to="/tickets" class="hover:text-primary transition-colors">
            Support
          </NuxtLink>
          
          <template v-if="user">
            <NuxtLink to="/dashboard" class="hover:text-primary transition-colors">
              Dashboard
            </NuxtLink>
            <button @click="handleLogout" class="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors">
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="hover:text-primary transition-colors">
              Login
            </NuxtLink>
            <NuxtLink to="/auth/register" class="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors">
              Register
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const handleLogout = async () => {
  await auth.signOut()
  router.push('/auth/login')
}
</script>
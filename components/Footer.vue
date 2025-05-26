<template>
  <footer class="bg-secondary-light py-8 mt-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold text-primary mb-4">FlameHost</h3>
          <p class="text-gray-400">Premium hosting solutions for your business needs.</p>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/services" class="text-gray-400 hover:text-primary">Services</NuxtLink></li>
            <li><NuxtLink to="/tickets" class="text-gray-400 hover:text-primary">Support</NuxtLink></li>
            <li><NuxtLink to="/api-docs" class="text-gray-400 hover:text-primary">API Documentation</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Legal</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/terms" class="text-gray-400 hover:text-primary">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="text-gray-400 hover:text-primary">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Connect</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-primary">Discord</a></li>
            <li><a href="#" class="text-gray-400 hover:text-primary">Twitter</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} FlameHost. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
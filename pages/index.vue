<template>
  <main>
    <section class="py-20 text-center bg-gradient-to-b from-secondary to-secondary-light">
      <div class="container mx-auto px-4">
        <h1 class="text-5xl font-bold mb-6">
          Premium <span class="text-primary">Hosting Solutions</span>
        </h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Experience lightning-fast servers, unmatched support, and complete control over your hosting environment.
        </p>
        <NuxtLink to="/services" class="bg-primary hover:bg-primary-dark px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
          View Our Services
        </NuxtLink>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose FlameHost?</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-secondary-light p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4 text-primary">High Performance</h3>
            <p class="text-gray-400">State-of-the-art infrastructure ensuring maximum uptime and speed for your applications.</p>
          </div>
          
          <div class="bg-secondary-light p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4 text-primary">24/7 Support</h3>
            <p class="text-gray-400">Expert support team available round the clock to assist you with any issues.</p>
          </div>
          
          <div class="bg-secondary-light p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4 text-primary">Flexible Solutions</h3>
            <p class="text-gray-400">Customizable hosting plans that grow with your business needs.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
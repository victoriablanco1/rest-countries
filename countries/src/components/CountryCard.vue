<template>
  <div class="rounded-md bg-white dark:bg-[#2B3743]">
    <router-link :to="{ name: 'Details', params: { name: country } }">
      <img :src="flag" :alt="alt">
      <div class="p-5">
        <h2 class="font-bold py-2 dark:text-white">{{ country }}</h2>
        <p class="font-semibold dark:text-white">Population: <span class="text-gray-500">{{ formatPopulation(population) }}</span></p>
        <p class="font-semibold dark:text-white">Region: <span class="text-gray-500">{{ region }}</span></p>
        <p class="font-semibold dark:text-white">Capital: <span class="text-gray-500">{{ formatCapital(capital) }}</span></p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CountryCard",
  props: {
    alt: {
      type: String,
      required: false,
    },
    flag: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    population: {
      type: [String, Number], 
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    capital: {
      type: [String, Array],
      default: null,
      required: false,
    },
  },
  methods: {
    formatPopulation(population) {
      
      return population.toString();
    },
    formatCapital(capital) {
      if (capital === undefined || capital === null) {
        return 'N/A';
      }
      return Array.isArray(capital) ? capital.join(', ') : capital.toString();
    },
  },
};
</script>


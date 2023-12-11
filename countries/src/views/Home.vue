<template>
  <div class="">
    <Navbar />

    <div class="px-6 pt-4">
      <div class="flex flex-col md:flex-row md:justify-between items-center">
        <div class="relative mb-4 md:mb-0 rounded-full">
          <input
            type="text"
            v-model="search"
            class="dark:bg-[#2B3743] dark:border-[#2b3743] focus:ring-gray-600 dark:focus:ring-[#2b3743] dark:text-white border w-full md:w-96 rounded-full border-gray-300 pl-12 py-2 focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Search for a country..."
            @keyup.enter="searchCountry"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 absolute top-2.5 left-4 cursor-pointer dark:text-white"
            @click="searchCountry"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <div class="md:ml-4">
          <select
            v-model="filter"
            class="dark:bg-[#2B3743] dark:border-[#2b3743] focus:ring-gray-600 dark:focus:ring-[#2b3743] dark:text-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
        <CountryCard
          v-for="country in countries"
          :key="country.name.common"
          :flag="country.flags.svg"
          :alt="country.flags.alt"
          :country="country.name.common"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import CountryCard from '../components/CountryCard.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'

const store = useStore()

const countries = computed(() => store.getters.getCountries)

const formatData = ref(() => {
  return countries.value.map(country => ({
    ...country,
    population: country.population.toLocaleString('en-US'),
    capital: country.capital ? country.capital[0] : '', 
  }))
})

onMounted(() => {
  store.dispatch('fetchCountries').then(() => {
    formatData.value()
  })
})

const filter = ref('')
watch(() => filter.value, () => {
  if (filter.value === '') {
    store.dispatch('fetchCountries').then(() => {
      formatData.value()
    })
  } else {
    search.value = ''
    store.dispatch('filterCountriesByRegion', filter.value).then(() => {
      formatData.value()
    })
  }
})

const search = ref('')
const searchCountry = ref(async () => {
  if (search.value === '') {
    await store.dispatch('fetchCountries')
  } else {
    await store.dispatch('searchCountries', search.value)
  }
  formatData.value()
})
watch(() => search.value, () => {
  if (search.value === '') {
    store.dispatch('fetchCountries').then(() => {
      formatData.value()
    })
  }
})
</script>

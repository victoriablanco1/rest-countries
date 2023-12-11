<template>
  <div>
    <Navbar />

    <div class="px-6 pt-4">
      <router-link :to="previousRoute || '/'">
        <div class="bg-white dark:text-white dark:bg-[#2B3743] dark:border-none border-2 px-6 py-1 flex space-x-2 items-center w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 dark:text-white"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span class="dark:text-white">Back</span>
        </div>
      </router-link>

      <div class="flex flex-col md:flex-row md:items-start mt-8 md:space-x-6">
        <div class="mb-4 md:mb-0">
          <img :src="country.flags?.png" alt="Flag">
        </div>

        <div class="flex flex-col md:ml-8">
          <h1 class="font-bold text-2xl mb-2 md:mb-4 ml-4 dark:text-white">{{ country.name?.common || 'Loading...' }}</h1>

          <div class="grid grid-cols-2 gap-4 ml-4">
            <div v-for="(value, label) in getDetails" :key="label" class="w-full">
              <p class="font-semibold dark:text-white">{{ label }}: <span class="text-gray-500">{{ label === 'Population' ? String(value) : value }}</span></p>
            </div>
          </div>

          <div class="py-4 mt-4 ml-4">
            <h2 class="font-bold text-xl dark:text-white">Border Countries:</h2>
            <div class="grid grid-cols-2 gap-4 pt-4">
              <div v-for="borderCountry in country.borders" :key="borderCountry" class="w-full border p-2 dark:bg-[#2B3743] border-bg-[#2B3743] dark:border-none">
                <span :class="{ 'text-white': isDarkMode }">{{ borderCountry }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, ref, computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Details',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    Navbar,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const country = ref({});
    let previousRoute = null;
    const pending = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const route = router.currentRoute.value;
        if (route.matched.length > 0) {
          previousRoute = route.matched[0].path;
        }

        await store.dispatch('fetchCountry', props.name);
        country.value = store.getters.getCountry[0];

        console.log('Country Data:', country.value);
        console.log('Top Level Domain:', country.value.topLevelDomain);

        pending.value = false;
      } catch (err) {
        console.error('Error loading country details:', err);
        error.value = err;
        pending.value = false;
      }
    });

    
    const isDarkMode = computed(() => store.getters.isDarkMode);

    const getDetails = computed(() => {
      return {
        Population: country.value.population,
        Region: country.value.region,
        Capital: Array.isArray(country.value.capital) ? country.value.capital.join(', ') : (country.value.capital || 'N/A'),
        'Sub Region': country.value.subregion,
        'Top Level Domain': getTopLevelDomain(country.value.topLevelDomain),
        Currencies: getCurrencies(country.value.currencies),
        Languages: getLanguages(country.value.languages),
      };
    });

    const getTopLevelDomain = topLevelDomain => {
      if (Array.isArray(topLevelDomain) && topLevelDomain.length > 0) {
        return topLevelDomain.join(', ');
      } else {
        return 'N/A';
      }
    };

    const getCurrencies = currencies => {
      if (Array.isArray(currencies)) {
        return currencies.map(currency => `${currency.name} (${currency.symbol})`).join(', ');
      } else if (typeof currencies === 'object' && currencies !== null) {
        const currency = currencies[Object.keys(currencies)[0]];
        return `${currency.name} (${currency.symbol})`;
      } else {
        return 'N/A';
      }
    };

    const getLanguages = languages => {
      return languages ? Object.values(languages).join(', ') : 'N/A';
    };

    return {
      country,
      previousRoute,
      pending,
      error,
      getDetails,
      isDarkMode,
    };
  },
};
</script>

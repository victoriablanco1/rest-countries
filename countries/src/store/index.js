import { createStore } from "vuex";

export default createStore({
    state: {
        countries: [],
        country: {},
    },
    getters: {
        getCountries: (state) => state.countries,
        getCountry: (state) => state.country,
    },
    mutations: {
        SET_COUNTRIES: (state, countries) => (state.countries = countries),
        SET_COUNTRY: (state, country) => (state.country = country),
    },
    actions: {
        async fetchCountries({ commit }) {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
            commit("SET_COUNTRIES", data);
        },

        async filterCountriesByRegion({ commit }, region) {
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
            const data = await response.json();
            commit("SET_COUNTRIES", data);
        },

        async searchCountries({ commit }, name) {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            const data = await response.json();
            commit("SET_COUNTRIES", data);
        },
       
        async fetchCountry({ commit }, name) {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            const data = await response.json();
            commit("SET_COUNTRY", data);
        },
        
    },
});
<template>
  <div class="flex justify-between bg-white dark:bg-[#2B3743] px-6 py-4 shadow-md">
    <a href="" class="font-bold dark:text-white">¿Where in the world?</a>
    <div class="flex space-x-2 items-center">
      <svg
        v-if="darkMode"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleDarkMode"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-4 h-4 cursor-pointer dark:text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleDarkMode"
        fill="currentColor"
        viewBox="0 -960 960 960"
        height="24"
        width="24"
      >
        <path
          d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"
          fill="black" 
        />
      </svg>
      <div class="cursor-pointer dark:text-white" @click="toggleDarkMode">
        {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const darkMode = ref(false);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  const html = document.querySelector('html');
  html.classList.toggle('dark', darkMode.value);
};
</script>

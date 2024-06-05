<script setup>
const { data: buildings } = await useFetch('/api/buildings');
console.log(buildings.value);
</script>

<template>
    <div class="page-searchList">
        <h1>Search List</h1>
        <NuxtLink to="/">トップページへ</NuxtLink>
    </div>
</template>

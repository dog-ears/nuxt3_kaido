<script setup lang="ts">

// route取得
const route = useRoute()

// formの入れ物作成
const formdata = useState('formdata', () => {
    console.log('formdataが初期化されました。');
    return {
        q: route.query.q || ''
    }
})

// buildingsの入れ物作成
const { data: buildings, error, refresh } = await useAsyncData('buildings', () => $fetch('/api/buildings', {
    params: formdata.value
}))

// パラメータ更新時の処理
onBeforeRouteUpdate((to, from) => {
    console.log('onBeforeRouteUpdate() is called!!');
    refresh();
})

// 他ページに遷移したとき、フォームデータをクリアする
onBeforeRouteLeave(() => {
    console.log('onBeforeRouteLeave() is called!!');
    formdata.value = {
        q: ''
    }
})

// 検索ボタン押したときの処理
const submit = async () => {
    console.log(`submit() is called!!${process.server ? '(server)' : '(client)'}`);

    // フォームから空のパラメータを削除したクエリを取得する
    const query_from_formdata = {};
    Object.keys(formdata.value).forEach((key: string) => {
        if ((formdata.value as any)[key] !== '') {
            (query_from_formdata as any)[key] = (formdata.value as any)[key];
        }
    });

    // ページ遷移
    await navigateTo({
        path: '/search_list/',
        query: query_from_formdata
    })
}
</script>

<template>
    <div class="page-searchList">
        <h1>Search List</h1>
        <section class="section-search">
            <form @submit.prevent="submit">
                <input type="text" name="q" v-model="formdata.q">
                <button type="submit">検索する</button>
            </form>
        </section>
        <section class="section-buildingList">
            <ul v-if="buildings && buildings.length">
                <li v-for="building in buildings" :key="building.id">
                    {{ building.name }}
                </li>
            </ul>
        </section>
        <NuxtLink to="/">トップページへ</NuxtLink>
    </div>
</template>

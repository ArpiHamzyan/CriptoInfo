<template>
    <div class="body">
        <main>
                <div class="cards">
                    <div v-for="(item,index) in data" :key="index" class="cards-container">
                        <div class="card">
                            <div class="card-image">
                                <img :src="left_images + item.image" class="image"  alt="">
                                <div class="post-info-panel">
                                    <div class="column">
                                        <div class="subtitle">{{formatDate(item.created_at)}}</div>
                                    </div>
                                    <div class="column">
                                        <div class="views-container">
                                            <img src="/assets/images/eye-icon.png" alt="">
                                            <div class="subtitle">{{item.post_view}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-texts">
                                <div class="card-text-headline">{{locale ==='en' ? item.caption_en : item.caption_ru}}</div>
                                <div class="card-text-content">{{locale ==='en' ? item.anons_en : item.anons_ru}}</div>
                                <div class="card-text-footer"> 
                                    <div>
                                        <img src="/assets/images/visit-icon.png" alt="">
                                    </div>
                                    <div v-for="(tag,tagIndex) in (locale === 'en' ? item.tags_en : item.tags_ru).split(',')" :key="tagIndex"
                                     class="links-container">
                                     <div class="link">{{ tag.trim() }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="button" @click="changeOffset">
                            <span>More posts</span>
                        </button>
                    </div>
                </div>
                <MainRight/>
        </main>
    </div>
</template>

<script setup>
import MainRight from "./MainRight.vue";
import { useMyApi } from "~/stores/FetchApi";
import { useI18n } from 'vue-i18n';

//left images
const left_images = `${useRuntimeConfig().public.cripto_api}/uploads/posts/`;


//fetch data
const myStore = useMyApi();

const data = ref([]);
const state = ref(10);
await myStore.fetchData1(state);
data.value = myStore.myData.posts;

const changeOffset = async () => {
  try {
    state.value += 10;
    await myStore.fetchData1(state.value);
    data.value = [...data.value, ...myStore.myData.posts];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



//format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

//change language
const { t, locale } = useI18n();



</script>

<style scoped>
*{
    box-sizing: border-box;
    padding: 0;
    transition: all .2s;
}
.main-light .body{
    background: #fff;
}
.main-light .card{
    background: #fff;
    border: 1px solid #ededed;
    box-shadow: 0 0 15px #0000000a;
}
.main-light .post-info-panel {
    background: #f7f7f7;
}
.main-light .subtitle{
    color: #232323;
}
.main-light .link{
    color: #232323;
}
.main-light .card-text-headline{
    color: #232323;
}
.main-light .card-text-content{
    color: #232323;
}

.body{
    background-color: #14121c;
}
main{
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 80px 20px;
    margin: 0 auto;
    max-width: 1306px;
    padding-left: 20px;
    padding-right: 20px;
}
.cards {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 865px;
    width: 100%;
}
.card {
    align-items: flex-start;
    background: #171520;
    border-radius: 16px;
    box-shadow: 0 4px 6px #0000001a;
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 300px;
    justify-content: flex-start;
    margin-bottom: 30px;
    max-width: 865px;
    overflow: hidden;
    padding: 20px;
    width: 100%;
}
.card-image{
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
}
.post-info-panel{
    align-items: center;
    display: flex;
    flex-direction: row;
    background: #ffffff05;
    border-radius: 10px;
    height: 48px;
    justify-content: space-between;
    padding: 5px 6px;
    width: 100%;
}
.column{
    gap: 5px;
    justify-content: flex-start;
    padding: 8px;
    align-items: center;
    display: flex;
    flex-direction: row;
    font-family: Golos Text, sans-serif;
}
.subtitle{
    font-weight: 500;
    font-family: Golos Text, sans-serif;
    color: #d0d0d0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.views-container{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 6px;
    justify-content: flex-start;
}
.card-text-headline{
    color: #fff;
    font-family: Golos, sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    padding: 5px 16px 0 6px;
    text-wrap: wrap;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.card-text-content{
    color: #d0d0d0;
    display: -webkit-box;
    font-family: Golos, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 0 16px 0 6px;
    text-overflow: ellipsis;
    text-wrap: wrap;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 15px;
}
.card-text-footer{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-start;
    margin-top: 140px;
    padding: 0 6px;
}
.links-container{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
}
.link{
    border: 1px dashed #a3a2a2;
    padding: 5px;
    color: #d0d0d0;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.image{
    width: 300px;
    height: 200px;
    border-radius: 11px;
    -o-object-fit: cover;
    object-fit: cover;
}
.button {
    align-items: center;
    background: linear-gradient(96deg, #fb1560cc, #4a1690 87%);
    border: none;
    border-radius: 12px;
    box-shadow: 0 0 35px #0003;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: 30px auto;
    padding: 16px 90px;
    font-size: 19px; 
    width: auto;
}
.button span {
    color: #fff;
    font-family: Golos, sans-serif;
    font-size: var(--font-size);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
}

@media  (max-width: 1023px) {
    main {
        align-items: center;
        flex-direction: column;
        padding: 60px 50px;
    }
    .footer-container .footer-content{
        flex-direction: column;
        gap: 50px;
    }

}
@media (max-width:740px){
    .card{
        align-items: center;
        flex-direction: column !important;
        height: 661px;
        height: auto;
        max-width: 743px;
        width: 100%;
    }
    .post-info-panel{
        display: none;
    }
    
    
}


</style>
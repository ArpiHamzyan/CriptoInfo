<template>
    <div>
        <div class="side_bar">
            <div class="side_bar_title_container">
                <img src="/assets/images/tg-icon.png" alt="">
                <h2 class="title">News from thematic telegram channels</h2>
            </div>
            <div>
                <div v-for="(item,index) in data" :key="index">
                    <div class="card">
                        <div class="company">
                            <div class="company-logo">
                                <a href="">
                                    <img class="image"  :src="right_images +item.image" alt="">
                                </a>
                            </div>
                            <div class="company-name">
                                <a class="name-a" href="">{{item.caption}}</a>
                            </div>
                        </div>
                        <div class="card-text-content">
                            {{item.anons}} ...
                        </div>
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
                </div>
                <div >
                    <a href="" class="button-a">
                        <button class="button" @click="changeOffset">
                            <span>More Posts</span>
                        </button>
                    </a>
                </div>
            </div>    
        </div>
    </div>
</template>

<script setup>
import { useMyApi } from "~/stores/FetchApi";


//right images

const right_images = `${useRuntimeConfig().public.cripto_api}/`;

//fetch data
const myStore = useMyApi();
const data = ref([]);
const state1 = ref(10);
await myStore.fetchData2(state1);
data.value = myStore.myData.posts;

const changeOffset = async () => {
  try {
    state1.value += 10;
    await myStore.fetchData2(state1.value);
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

</script>

<style scoped>
*{
    box-sizing: border-box;
    padding: 0;
    transition: all .2s;
}
.main-light .side_bar{
    background: #fff;
    border: 1px solid #ededed;
    box-shadow: 0 0 15px #0000000a;
}
.main-light h2{
    color: #170332;
}
.main-light .company-name>a{
    color: #170332;
}
.main-light .subtitle{
    color: #232323;
}
.main-light .post-info-panel{
    background: #f7f7f7;
}

.side_bar{
    background: #171520;
    border-radius: 14px;
    box-shadow: 0 0 35px #00000026;
    gap: 20px;
    padding: 20px;
    width: 360px;
    display: flex;
    flex-direction: column;
}
.side_bar_title_container{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: flex-start;
}
.title{
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: Golos Text, sans-serif;
}
.card{
    display: flex;
    gap: 10px;
    cursor: pointer;
    flex-direction: column;
    width: 320px;
}
.company{
    align-items: center;
    max-height: 60px;
    display: flex;
    gap: 10px;
}
.company-logo{
    border-radius: 10px;
}
.image{
    border-radius: 12px;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
    max-width: 100%;
    width: 60px;
    aspect-ratio: auto 60 / 60;
    height: 60px;
}
.company-name{
    color: #d0d0d0;
    font-family: Golos, sans-serif;
    font-style: normal;
    line-height: 20px;
}
.name-a{
    color: -webkit-link;
    cursor: pointer;
    text-decoration: none;
    color: #d0d0d0;
}
.card-text-content{
    color:#d0d0d0;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: Golos Text, sans-serif;
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
.button-a{
    color: #d0d0d0;
    text-decoration: none;
}
.button{
    align-items: center;
    background: linear-gradient(96deg, #fb1560cc, #4a1690 87%);
    border: none;
    border-radius: 12px;
    box-shadow: 0 0 35px #0003;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 20px 10px;
    width: auto;
    width: 100% !important;
    margin: 30px auto;
    font-size: 16px;
}
.button>span{
    font-size: 16px;
    color: #fff;
    font-family: Golos, sans-serif;
    font-size: var(--font-size);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
}

@media (max-width:740px){
    .side_bar{
        width: 94%;
    }
}

</style>
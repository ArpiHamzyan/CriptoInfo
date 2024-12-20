<template>
    <div>
        <header>
            <div class="first">
                <div class="first_section">
                    <button class="menu">
                        <img src="/assets/images/arrow.svg" alt="">
                    </button>
                    <a  href="">
                        <NuxtImg :src="dataLogo" alt="logo" width="140px" height="37px" :style="{ marginLeft: '0px', marginTop: '8px' }"  />
                    </a>
                </div>
                <div class="second_section">
                    <nav class="nav">
                        <ul>
                            <li><NuxtLink to="/">{{ t('home') }}</NuxtLink></li>
                            <li><NuxtLink to="/">{{locale ==='en' ? data.type1_title_en : data.type1_title_ru}}</NuxtLink></li>
                            <li><NuxtLink to="/">{{locale ==='en' ? data.type2_title_en : data.type2_title_ru}}</NuxtLink></li>
                            <li><NuxtLink to="/">{{locale ==='en' ? data.type3_title_en : data.type3_title_ru}}</NuxtLink></li>
                            <li><NuxtLink to="/">{{locale === 'en' ?data.type4_title_en : data.type4_title_ru}}</NuxtLink></li>
                            <li><NuxtLink to="/">FAQ</NuxtLink></li>
                            <li><NuxtLink to="/">{{ t('about') }}</NuxtLink></li>
                            <li><NuxtLink to="/">{{ t('contacts') }}</NuxtLink></li>
                        </ul>
                    </nav>
                </div>
                <div class="third_section">
                    <div>
                        <div class="header__controls__desktop">
                            <div>
                                <div>
                                    <button type="button" @click="showModal = true">{{ t('login') }}</button>
                                </div>
                            </div>
                            <button @click="toggleTheme">
                                <img 
                                    :src="isDarkTheme ? '/_nuxt/assets/images/theme-light.svg' :'/_nuxt/assets/images/theme-dark.svg' " 
                                    
                                    alt="Theme Toggle Icon" />
                            </button>
                            <div class="language">
                                <div class="flag_drop" @click="showOption = !showOption">
                                    <img :src="selectedLanguage.flag" :alt="selectedLanguage.name + ' Flag'">
                                    <img src="/assets/images/arrow.svg" alt="">
                                </div>
                                <div class="option_list" v-if="showOption">
                                    <div class="option_item" 
                                        v-for="language in languages" 
                                        :key="language.code" 
                                        @click.stop="selectLanguage(language)">
                                        <img :src="language.flag" :alt="language.name + ' Flag'" />
                                        {{ language.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="login-block">
                        <a href="https://t.me/cryptoinfo_me">
                            <span>{{ t('join') }}</span>
                            <img src="/assets/images/tg_logo.webp" alt="" class="joinTg">
                        </a>
                    </div>
                </div>
                <div v-if="showModal" class="modal">
                    <div>
                        <form  action="" class="modal_form">
                            <div class="modal_content">
                                <button class="modal_close">
                                    <img :src="
                                        isDarkTheme 
                                        ? '/_nuxt/assets/images/5415679509870536152.jpg'
                                        : '/_nuxt/assets/images/close.DslCkta_.png'" alt="">
                                </button>
                                <h2 class="modal_header">
                                    {{ isRegistering ? t('register') : t('signin')}}
                                </h2>
                                <div class="form_group">
                                    <p class="login_label">
                                        {{ isRegistering ? t('username') : t('mnemonics')}}
                                    </p>
                                    <input type="text">
                                </div>
                                <button type="button" class="button">
                                    {{ isRegistering ? t('signup') : t('signin')}}
                                </button>
                                <div class="modal_footer">
                                    <p>{{ t('donthave') }}</p>
                                    <button @click.prevent="isRegistering = ! isRegistering">
                                        {{ isRegistering ? t('signin') : t('register')}}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="second">
                <div class="left">
                    <div class="change-coins-values">

                        <div class="custom-input-container" @change="calculate1">
                            <input type="number" v-model="input1Text">
                            <div class="icon-select-container">
                                <div class="selected-icon" @click="showCoins = ! showCoins">
                                    <img :src="selectedCurrency.img" alt="">
                                    <img src="/assets/images/arrow.svg" alt="">
                                </div>
                                <div v-if="showCoins" class="option-list">
                                    <div v-for="currency in currencies" :key="currency.symbol" class="option_item" @click="selectCurrency(currency)">
                                        <img :src="currency.img" alt="">
                                        <span class="name">{{currency.name}}</span>
                                        <span class="symbol">{{currency.symbol}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="custom-input-container" @change="calculate2">
                            <input type="number" v-model="input2Text">
                            <div class="icon-select-container">
                                <div class="selected-icon" @click="showMoney = ! showMoney">
                                    {{ selectedCurrency1 }}
                                    <img src="/assets/images/arrow.svg" alt="">
                                </div>
                                <div v-if="showMoney" class="option-list">
                                    <div v-for="symbol in currencies1" :key="symbol" class="option_item" @click="selectCurrency1(symbol)">
                                        <span class="name">{{ symbol }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div  class="currency-list-container">
                        <div v-for="currency in currencies" :key="currency.symbol" class="currency-list-item">
                            <div class="currency-info">
                                <img :src="currency.img" :alt="currency.name" >
                                <div class="currency-name-container">
                                    <span class="currency-name">{{ currency.name }}</span>
                                    <span class="currency-symbol">{{ currency.symbol }}</span>
                                </div>
                            </div>
                            <div class="currency-price">{{ currency.num || 'N/A' }}</div>
                        </div>
                    </div>
                    
                </div>
                <div></div>
            </div>
        </header>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from "vue";
import { useMyApi } from "~/stores/MyApi";

const { t, locale } = useI18n();

//registering
const isRegistering = ref(false);

//cookies

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`; 
}

function getCookie(name) {
  const nameEq = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') {  
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEq) === 0) {  
      return c.substring(nameEq.length, c.length); 
    }
  }
  return null;
}

//fetch data
const myStore = useMyApi();
await myStore.fetchData();
const data = myStore.myData.setting;
console.log(data);
const dataLogo = myStore.myData.setting.logo;

//open modal
const showModal = ref(false);

//open option
const showOption = ref(false);

//change language
const languages = ref([
    { code: 'ru', name: 'Russia', flag: '/_nuxt/assets/images/ru.svg' },
    { code: 'en', name: 'English', flag: '/_nuxt/assets/images/us.svg' }
]);
const selectedLanguage = ref(languages.value[1]); 

const selectLanguage = (language) => {
    selectedLanguage.value = language; 
    showOption.value = false; 
    locale.value = language.code;
    setCookie('locale', language.code,30);
    console.log(`Selected language: ${language.name}`);
};

const loadLocale = () => {
  const savedLocale = getCookie('locale') || 'en'; 
  const language = languages.value.find((lang) => lang.code === savedLocale);
  if (language) {
    selectedLanguage.value = language;
    locale.value = savedLocale;
  }
};

//drak light mode
const isDarkTheme = ref(false);

function applyTheme() {
    const header = document.querySelector('header');
    const body = document.querySelector('body');
    if(isDarkTheme.value)
    {
        header.classList.add('header-light');
        body.classList.add('main-light');
    }
    else
    {
        header.classList.remove('header-light');
        body.classList.remove('main-light');
    }
}

const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    applyTheme();

    setCookie('theme',isDarkTheme.value ? 'dark' : 'light' , 30);
}

//open coins
const showCoins = ref(false);

//open Money
const showMoney = ref(false);


//coins api

const loading = ref(false);
const error = ref(null);
const currencies = ref([]);
const data1 = ref(null);



onMounted(async () => {

    const savedTheme = getCookie('theme');
    if (savedTheme) {
        isDarkTheme.value = savedTheme === 'dark';
    } else {
        isDarkTheme.value = false; // Default to light mode if no cookie
    }
    applyTheme();
    loadLocale();

  loading.value = true;
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,monero,ethereum,tron,lightcoin,tether&vs_currencies=usd,rub",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }

    data1.value = await response.json();
    console.log("API Response Data:", data1.value);

    if (!data1 || Object.keys(data1).length === 0) {
      throw new Error("Empty or invalid API response");
    }

    currencies.value = [
      { name: "Bitcoin", symbol: "BTC", img: "/_nuxt/assets/images/bitcoinLogo.webp", num: data1.value.bitcoin?.usd },
      { name: "Monero", symbol: "XMR", img: "/_nuxt/assets/images/monero.webp", num: data1.value.monero?.usd },
      { name: "Litecoin", symbol: "LTC", img: "/_nuxt/assets/images/litecoin.webp", num: data1.value.lightcoin?.usd || "N/A" },
      { name: "Ethereum", symbol: "ETH", img: "/_nuxt/assets/images/ethereum.webp", num: data1.value.ethereum?.usd },
      { name: "Tron", symbol: "TRX", img: "/_nuxt/assets/images/tron.webp", num: data1.value.tron?.usd },
    ];
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = { message: err.message || "Failed to fetch settings" };
  } finally {
    loading.value = false;
  }
});

//choose coin

const selectedCurrency = ref({ 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    img: '/_nuxt/assets/images/bitcoinLogo.webp' 
});
const selectedCurrency1 = ref('$');
const currencies1 = ref(['$','₽']);
const input1Text = ref();
const input2Text = ref();


const calculate1 = () => {
  const currencyName = selectedCurrency.value?.name?.toLowerCase();
  if (!currencyName) {
    console.error("Selected currency name is undefined");
    return;
  }
  const rate =
    selectedCurrency1.value === '$'
      ? data1.value[currencyName]?.usd || 0
      : data1.value[currencyName]?.rub || 0;
  input2Text.value = input1Text.value * rate;
};

const calculate2 = () => {
  const currencyName = selectedCurrency.value?.name?.toLowerCase();
  if (!currencyName) {
    console.error("Selected currency name is undefined");
    return;
  }
  const rate =
    selectedCurrency1.value === '$'
      ? data1.value[currencyName]?.usd || 0
      : data1.value[currencyName]?.rub || 0;
  input1Text.value = input2Text.value / rate;
};



const selectCurrency = (currency) => {
    selectedCurrency.value = currency;
    showCoins.value = false;
    calculate1();
}

const selectCurrency1 = (symbol) => {
    selectedCurrency1.value = symbol;
    showMoney.value = false;
    calculate2();
}



</script>

<style scoped>
*{
    box-sizing: border-box;
}
.header-light {
    background: no-repeat 130% 100% / 80% 112% url(/assets/images/bg_arrow.webp), no-repeat 50% / cover url(/assets/images/home-light-1.webp);
}
.header-light nav ul{
    background: #f7f7f7;
}
.header-light nav a{
    color: #232323;
}
.header-light button{
    color: #232323;
}
.header-light span{
    color: #232323;
}
.header-light .option_list{
    background: #fff;
    box-shadow: 0 0 15px #0000000a;
    color: #170332;
}
.header-light .custom-input-container{
    background: #0000000d;
}
.header-light .currency-name{
    color: #170332;
}
.header-light .currency-symbol{
    color: #232323;
}
.header-light .currency-price{
    color: #232323;
}
.header-light .modal_content{
    background: #fff;
}
.header-light .modal_header{
    color: #170332;
}
.header-light .login_label{
    color: #170332;
}
.header-light .form_group>input{
    background: #0000000d;
    color: #232323;
}
.header-light .button{
    color: #fff;
}
.header-light .modal_footer>p{
    color: #232323;
}
.header-light .modal_footer>button{
    color: #232323;
}
.header-light .option-list{
    background: #fff;
    border: 1px solid #ededed;
    box-shadow: 0 0 15px #0000000a;
    color: #170332;
}
.header-light .option_item .name{
    color: #000;
}

header
{
    padding: 40px 0 47px;
    width: 100%;
    height: auto;
    background: no-repeat 100% 100% / 65% url(/assets/images/wave-20.png), no-repeat 50% / cover url(/assets/images/download.jpg);
}
.first{
    display: flex;
    justify-content: space-between;
    gap: clamp(50px, 4vw, 80px);
    margin-left:80px;
    margin-right: 80px;
}
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
nav a {
    text-decoration: none;
    color: #d0d0d0;
    font-family: Golos Text, sans-serif;
    font-size: .875rem;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
}
ul {
    display: flex;
    list-style: none;

}
  
  li {
    margin: 0 10px;
  }
  .header__controls__desktop{
        align-items: center;
        display: flex;
        gap: 15px;
        color: #d0d0d0;
        font-family: Golos Text, sans-serif;
    }
    button{
        background: none;
        border: none;
        outline: none;
        color: #d0d0d0;
    }
    .language{
        background: #ffffff1a;
        border-radius: 11px;
        padding: 12px;
    }
    .flag_drop{
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-start;
    }
    .login-block a{
    display: flex;
    justify-content: flex-end;
    line-height: 40px;
    vertical-align: middle;
    width: 100%;
    text-decoration: none;
    color: #d0d0d0;
    font-family: Golos Text, sans-serif;
}
.joinTg{
    height: 40px;
    -o-object-fit: contain;
    object-fit: contain;
    width: auto;
}
.modal{
    align-items: center;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    background-color: #000;
    background-color: #0006;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 50%;
    overflow: auto;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    z-index: 9999;
}
.modal_form{
    display: flex;
    flex-direction: column;
    gap: 19px;
}
.modal_close>img{
    background: transparent;
    border: none;
    box-shadow: none;
    cursor: pointer;
    height: 30px;
    margin-left: auto;
    position: absolute;
    right: 2%;
    top: 2%;
    width: 30px;
}
.modal_content{
    position: relative;
    background: #1a1825;
    border-radius: 30px;
    box-shadow: 0 0 35px #00000026;
    padding: 130px 152px;
}
.modal_header{
    color: #fefefe;
    font-size: 40px;
    font-weight: 900;
    line-height: normal;
    margin-bottom: 2rem;
    text-align: center;
    font-family: Golos Text, sans-serif;
}
.login_label{
    color: #d0d0d0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.25;
    font-family: Golos Text, sans-serif;
}
.form_group input{
    background: #ffffff1a;
    border: none;
    border-radius: 16px;
    color: #d0d0d0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.25;
    padding: 15px 0px;
    width: 100%;
}
.button{
    align-items: center;
    background: linear-gradient(96deg, #fb1560cc, #4a1690 87%);
    border: none;
    border-radius: 12px;
    box-shadow: 0 0 35px #0003;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-family: Golos, sans-serif;
    font-size: 19px;
    font-style: normal;
    font-weight: 500;
    justify-content: center;
    line-height: normal;
    padding: 15px 90px;
    text-align: center;
    width: 100%;
    margin-top: 50px;
}
.modal_footer{
    align-items: center;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    gap: 5px;
    justify-content: center;
    line-height: normal;
    margin-top: 24px;
    text-align: center;
    font-family: Golos Text, sans-serif;
}
.modal_footer > p{
    color:#d0d0d0;
}
.modal_footer > button {
    all: unset;
    color: #fefefe;
    cursor: pointer;
    font-weight: 600;
    font-family: Golos Text, sans-serif;
}
.option_list{
    align-items: flex-start;
    background: #301c44;
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    padding: 20px;
    position: absolute;
    right: 0;
    top: calc(14% + 0px);
    width: -moz-max-content;
    width: max-content;
    z-index: 1111;
    margin-right:88px;
}
.option_item{
    display: inline-flex;
    gap: inherit;
}
.option_item>img{
    display: block;
    max-width: 100%;
    width: 20px;
    aspect-ratio: auto 20 / 15;
    height: 15px;
}
.title{
    margin-top: -3px;
}
.second{
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    position: relative;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0 auto;
    max-width: 1306px;
}
.left{
    flex-direction: column;
    gap: 40px;
    padding-top: 7%;
    width: 45.5%;
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
}
.change-coins-values{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    z-index: 100;
    z-index: 0;
}
.custom-input-container{
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background: #ffffff1a;
    border-radius: 16px;
    gap: 10px;
    height: 63px;
    padding: 7px 23px;
    width: 200px !important;
}
.custom-input-container input{
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background: transparent;
    border: none;
    color: #d0d0d0;
    flex-grow: 1;
    font-size: 18px;
    font-weight: 500;
    max-width: 56.5%;
    padding: 8px 0;
    font: inherit;
    border: none;
    outline: none; 
    font-family: Golos Text, sans-serif;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.icon-select-container{
    position: relative;
}
.selected-icon{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    font-family: Golos Text, sans-serif;
    color: #d2d2d2;
}
.selected-icon img {
    display: block;
    width: 33px;
    height: 33px;
}
.option-list{
    align-items: flex-start;
    background: #301c44;
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    padding: 20px;
    position: absolute;
    right: 0;
    top: calc(100% + 12px);
    width: -moz-max-content;
    width: max-content;
    z-index: 1111;
    margin-top:10px
}
.option_item{
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 30px;
    justify-content: flex-start;
    padding: 0;
    width: 100%;
    font-family: Golos Text, sans-serif;
}
.option_item img {
    height: 30px;
    width: 30px;
}
.option_item .name{
    color: #fff;
    font-size: 15px;
    padding-left: 5px;
    font-family: Golos Text, sans-serif;
}
.option_item .symbol{
    color: #959595;
    font-size: 12px;
    font-weight: 500;
}
.currency-list-container{
    display: grid;
    gap: 20px 60px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}
.currency-list-item{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-start;
    min-height: 35px;
    overflow: hidden;
}
.currency-info{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
}
.currency-name-container{
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: flex-start;
}
.currency-name{
    color: #d0d0d0;
    font-size: 15px;
    font-weight: 600;
    font-family: Golos Text, sans-serif;
}
.currency-symbol{
    color: #959595;
    font-size: 12px;
    font-weight: 500;
    font-family: Golos Text, sans-serif;
}
.currency-price{
    font-size: 18px;
    font-weight: 700;
    font-family: Golos Text, sans-serif;
    color: #d2d2d2;
}
.menu{
    all: unset;
    align-items: center;
    background: #ffffff1a;
    border-radius: 11px;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    width: 48px;
    display: none;
}

@media (max-width: 1319px) {
    .second {
        padding-left: 70px;
        padding-right: 70px;
    }
}

@media  (max-width: 1023px) {
  .menu{
    display: block;
  }
  .nav{
    display: none;
  }
  .first{
        align-items: center;
        display: flex;
        gap: clamp(50px, 4vw, 80px);
        justify-content: space-between;
   }
   .firs_section{
     display: contents;
   }
   .second_section{
    background: #16141f;
    border-radius: 0 16px 16px 0;
    box-shadow: 0 0 35px #00000026;
    left: 0;
    min-height: 100dvh;
    padding: 40px 35px 40px 50px;
    position: fixed;
    top: 0;
    transform: translate(-100%);
    transition: transform .5s ease;
    width: 100%;
    z-index: 10;
   }
}

@media (max-width:740px){
    header .first{
        align-items: center;
        display: block;
        justify-content: center;
        width: 100%;
    }
    .first_section{
        display: flex;
        margin-bottom: 25px;
        margin-top: -25px;
    }
    .header__controls__desktop{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: auto;
        width: 100%;
    }
    .login-block a{
        justify-content: center;
    }
    .second{
        padding: 50px 20px 28px;
    }
    .change-coins-values{
        display: flex;
        flex-direction: column;
        padding-bottom: 0;
        padding-top: 0;
        align-items: center;
    }
    .currency-list-container{
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 0 auto;
        align-items: center;
    }
    .left{
        padding-top: 0;
        width: 100%;
    }
}

</style>
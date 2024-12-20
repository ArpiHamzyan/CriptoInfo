<template>
    <div>
        <div class="footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="content-1">
                        <div class="contentSmall">
                            <div class="logo">
                                <div class="logo-container">
                                    <a href="">
                                        <NuxtImg :src="dataLogo" alt="logo" width="174px" height="48px" :style="{ marginLeft: '0px', marginTop: '8px' }"  />
                                    </a>
                                </div>
                                <div class="text-container">
                                    <span class="subtitle">{{locale ==='en' ? data.info_footer_en : data.info_footer_ru }}</span>
                                </div>
                            </div>
                            <div class="content-2">
                                <div class="content-box">
                                    <div class="menu-headline">{{ t('connect') }}</div>
                                    <div class="email-line">
                                        <div class="email">
                                            <img src="/assets/images/message-icon.svg" alt="">
                                            <span class="subtitle">
                                                <a href="">{{data.contact_email}}</a>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="email-line">
                                        <div class="email">
                                            <img src="/assets/images/tg-icon.png" alt="">
                                            <span class="subtitle">
                                                <span>cryptoinfo_me</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-2">
                        <div class="contact-box">
                            <div class="input-container">
                                <div class="input">
                                    <input type="text" :placeholder="t('subscribe')">
                                </div>
                                <button class="button">
                                    <span>{{ t('btn') }}</span>
                                </button>
                            </div>
                            <div class="caption"> ©{{ new Date(data.updated_at).getFullYear() }} {{ t('rights') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMyApi } from "~/stores/MyApi";


//fetch data
const myStore = useMyApi();
await myStore.fetchData();
const data = myStore.myData.setting;
const dataLogo = myStore.myData.setting.logo;
console.log(data);

//change language
const { t, locale } = useI18n();

</script>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    transition: all .2s;
}
.main-light .footer{
    background: #e6e6e6;
}
.main-light .subtitle{
    color: #232323;
}
.main-light .subtitle>a{
    color: #232323;
}
.main-light .menu-headline{
    color: #232323;
}
.main-light .caption{
    color: #0000004d;
}

.footer{
    background: #16141f;
    min-height: 250px;
}
.footer-container{
    min-height: 300px;
    padding: 57px 20px 72px;
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1306px;
}
.footer-content{
    width: 100%;
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.content-1{
    display: flex;
    flex-direction: column;
    max-width: 609px;
    width: 100%;
}
.contentSmall{
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    gap: 170px;
    height: -moz-max-content;
    height: max-content;
    justify-content: flex-start;
    width: -moz-max-content;
    width: max-content;
}
.logo-container{
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.text-container{
    line-height: 22px;
    margin-top: auto;
    width: 320px;
}
.subtitle{
    color: #d0d0d0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: Golos Text, sans-serif;
}
.subtitle>a{
    text-decoration: none;
    color: #d0d0d0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: Golos Text, sans-serif;
}
.content-2{
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 190px;
    justify-content: flex-start;
    max-width: 468px;
}
.content-box{
    display: flex;
    flex-direction: column;
    gap: 18px;
    height: -moz-max-content;
    height: max-content;
    width: 100%;
}
.menu-headline{
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    width: 100%;
    font-family: Golos Text, sans-serif;
}
.email-line{
    display: flex;
    gap: 40px;
}
.email {
    align-items: center;
    display: flex;
    gap: 10px;
}
.contact-box {
    display: flex;
    flex-direction: column;
    gap: 18px;
    height: -moz-max-content;
    height: max-content;
    width: 100%;
}
.input-container{
    align-items: center;
    align-items: stretch;
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: flex-start;
    min-height: 48px;
    overflow: hidden;
}
.input{
    align-items: center;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 16px;
    width: 335px;
}
.input>input{
    background: transparent;
    border: none;
    font-size: 12px;
    height: 100%;
    padding: 8px 0;
    width: 100%;
    font-family: Golos Text, sans-serif;
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
    padding: 13px 26px; 
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
.caption{
    font-family: Golos Text, sans-serif;
    color: #ffffff4d;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

@media  (max-width: 1023px) {
    .footer-container .footer-content{
        flex-direction: column;
        gap: 50px;
        padding: 60px 20px 40px;
        margin-left: 80px;
    }

}
@media (max-width: 740px){
    .contentSmall{
        flex-direction: column;
        gap: 40px;
        padding-bottom: 15px;
        width: 100%;
        align-items: center;
    }
    .footer-container{
        min-width: 100%;
    }
    .content-2 .contact-box .input-container .input-wrapper {
        width: 100%;
    }
}
</style>
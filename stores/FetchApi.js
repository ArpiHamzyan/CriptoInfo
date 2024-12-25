import {defineStore} from 'pinia'

export const useMyApi = defineStore('FetchApi',{
    state:() => ({
        myData: null,
    }),
    actions: {
        async fetchData() {
          try {
            const response = await fetch(useRuntimeConfig().public.cripto_api+'/api/get-settings', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({api_key: useRuntimeConfig().public.apiKey})
            });
            const data = await response.json();
            this.myData = data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
        async fetchData1(state) {
          try {
            const response = await fetch(`${useRuntimeConfig().public.cripto_api}/api/get-crypto-posts?offset=${state}&limit=10`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({api_key: useRuntimeConfig().public.apiKey})
            });
            const data = await response.json();
            this.myData = data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
        async fetchData2(state) {
          try {
            const response = await fetch(`${useRuntimeConfig().public.cripto_api+'/api/get-posts?offset='}${state}&limit=10`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({api_key: useRuntimeConfig().public.apiKey})
            });
            const data = await response.json();
            this.myData = data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
      },

})
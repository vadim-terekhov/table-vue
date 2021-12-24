<template>
  <div id="page-with-infinity">
    <my-table
      :data="filtered"
      :sort="sort"
      :filterFields="filterFields"
      :configFieldsInputs="configFieldsInputs"
      @sortHandlerClick="sortHandlerClick"
      @clearField="clearField"
    >Таблица</my-table>
  </div>
</template>

<script>
import axios from 'axios';
import MyTable from '@/components/MyTable.vue';
import { configFieldsInputs } from '@/components/ConfigForMyInput.js';
import { Compare } from '@/helpers'


export default {
  name: 'PageWithInfinityScroll',
  components: {
    MyTable,
  },
  data(){
    return {
      data: [],
      start: 0,
      step: 20,
      sortField: 'flagId',
      sort:{
        flagId: true,//default ID по возрастанию
        flagBody: true,//default Body по возрастанию
        flagEmail: true,//default Email по возрастанию
        flagName: true,//default Name по возрастанию
      },
      configFieldsInputs,
      filterFields:{
        body:'',
        email:'',
        name:'',
      }
    }
  },
  computed:{
    filtered(){
      return this.data
        .filter(i => i.body.includes(this.filterFields.body))
        .filter(i => i.email.includes(this.filterFields.email))
        .filter(i => i.name.includes(this.filterFields.name))
    }
  },
  methods:{
    scroll(){
      window.onscroll = () => {
      let bottomWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomWindow) {
        this.start += this.step;
        this.getDataAPI(true)
      }
    };
    },
    async getDataAPI(sortSucces = false){
      try {
        let end = this.start + this.step;
        const response = await axios(`https://jsonplaceholder.typicode.com/comments?_start=${this.start}&_end=${end}`);
        const data = response.data.map(i => {
          return {
            id: i.id,
            body: i.body.slice(0,5),
            email: i.email,
            name: i.name.slice(0,5),
          }
        });
        this.data = [...this.data,...data];
        if (sortSucces){
          if (this.sortField === 'flagId'){
            this.sort.flagId 
            ? this.data.sort( (a,b) => a.id - b.id) 
            : this.data.sort( (a,b) => b.id - a.id);
          }else if (this.sortField === 'flagBody'){
            this.sort.flagBody 
            ? this.data.sort( (a,b) => Compare(a,b,'body')) 
            : this.data.sort( (a,b) => Compare(b,a,'body'));
          }else if (this.sortField === 'flagEmail'){
            this.sort.flagEmail
            ? this.data.sort( (a,b) => Compare(a,b,'email')) 
            : this.data.sort( (a,b) => Compare(b,a,'email'));
          }else if (this.sortField === 'flagName'){
            this.sort.flagName
            ? this.data.sort( (a,b) => Compare(a,b,'name')) 
            : this.data.sort( (a,b) => Compare(b,a,'name'));
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    sortHandlerClick(target){
      Object.keys(this.sort).forEach( i => {
        if(target !== i){
          this.sort[i] = true;
        }
      });
      switch (target) {
        case 'flagId':
          this.sortField = 'flagId';
          this.sort.flagId = !this.sort.flagId;  
          break;
        case 'flagBody':
          this.sortField = 'flagBody';
          this.sort.flagBody = !this.sort.flagBody;
          break;
        case 'flagEmail':
          this.sortField = 'flagEmail';
          this.sort.flagEmail = !this.sort.flagEmail;
          break;
        case 'flagName':
          this.sortField = 'flagName';
          this.sort.flagName = !this.sort.flagName;
          break;
      }
      this.getDataAPI(true);
    },
    clearField(val){
      if (val === 'body'){this.filterFields.body = ''}
      else if (val === 'email'){this.filterFields.email = ''}
      else if (val === 'name'){this.filterFields.name = ''}
    }
  },
  created(){
    this.getDataAPI();
  },
  mounted(){
    this.scroll();
  }
}
</script>

<style scoped>

</style>

<template>
  <div id="page-with-pagination">
    <my-table
      :data="filtered"
      :sort="sort"
      :filterFields="filterFields"
      :configFieldsInputs="configFieldsInputs"
      @sortHandlerClick="sortHandlerClick"
      @clearField="clearField"
    >Таблица</my-table>
    <my-pagination 
      :page="page"
      :totalPage="totalPage"
      @nextPage="nextPage"
      @gotoPage="gotoPage"
    />
  </div>
</template>

<script>
import axios from 'axios';
import MyTable from '@/components/MyTable.vue';
import MyPagination from '@/components/MyPagination.vue';
import { configFieldsInputs } from '@/components/ConfigForMyInput.js';
import { Compare } from '@/helpers'
export default {
  name: 'PageWithPagination',
  components: {
    MyTable, MyPagination,
  },
  data(){
    return {
      data: [],
      perPage: 15,
      page: 1,
      total: 150,
      sortField: 'fladId',
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
    totalPage(){
      return Math.ceil(this.total / this.perPage);
    },
    filtered(){
      return this.data
        .filter(i => i.body.includes(this.filterFields.body))
        .filter(i => i.email.includes(this.filterFields.email))
        .filter(i => i.name.includes(this.filterFields.name))
    }
  },
  methods:{
    async getDataAPI(sortSucces = false){
      try {
        const start = (this.page - 1) * this.perPage;
        const end = this.page * this.perPage;
        const response = await axios(`https://jsonplaceholder.typicode.com/comments?_start=${start}&_end=${end}`);
        this.data = response.data.map(i => {
          return {
            id: i.id,
            body: i.body.slice(0,5),
            email: i.email,
            name: i.name.slice(0,5),
          }
        });
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
    nextPage(page){
      this.page = this.page + page;
      this.getDataAPI(true);
    },
    gotoPage(page){
      this.page = page;
      this.getDataAPI(true);
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
}
</script>

<style scoped>

</style>

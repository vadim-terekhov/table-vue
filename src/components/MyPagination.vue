<template>
  <div class="pagination">
    <button
      class="pagination-btn"
      :disabled="isFirst"
      @click="gotoPage(1)"
    >&lt;&lt</button>
    <button
      class="pagination-btn"
      :disabled="isFirst"
      @click="nextPage(-1)"
    >&lt</button>
    {{page}} / {{totalPage}}
    <button
      class="pagination-btn"
      :disabled="isLast"
      @click="nextPage(+1)"
    >&gt</button>
    <button
      class="pagination-btn"
      :disabled="isLast"
      @click="gotoPage(totalPage)"
    >&gt;&gt</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:{
    page: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1,
    }
  },
  computed:{
    isFirst(){
      return this.page === 1;
    },
    isLast(){
      return this.page === this.totalPage;
    }
  },
  methods:{
    nextPage(page){
      this.$emit('nextPage',page);
    },
    gotoPage(page){
      this.$emit('gotoPage',page);
    }

  }
}
</script>

<style scoped>
.pagination{
  margin-top: 30px;
  font-weight: bold;
}
.pagination-btn{
  margin: 0px 5px;
  background-color: burlywood;
  border: 0;
  padding: 5px 10px;
  font-weight: bold;
  transition: all .5s;
  color: #777;
}
.pagination-btn:hover{
  cursor: pointer;
  background-color: coral;
  color: white;
}
.pagination-btn:disabled{
  background-color: #ccc;
}
.pagination-btn:disabled:hover{
  color: #777;
}
</style>
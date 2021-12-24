<template>
  <div class="main">
    <button 
      class="main-btn"
      @click="handlerPagination">with pagination</button>
    <button 
      class="main-btn"
      @click="handlerInfinity">infinity scroll</button>
    <!-- <button 
      class="main-btn"
      @click="handlerVirtual">virtual scroll</button> -->
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods:{
    handlerPagination(){
      this.$router.push({ name: 'pagination'});
    },
    handlerInfinity(){  
      this.$router.push({name: 'infinity'});
    },
    handlerVirtual(){
      this.$router.push({name: 'virtual'});
    }
  }
}
</script>

<style scoped>
.main{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid orangered;
  padding: 100px;
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.main-btn{
  margin-right: 10px;
  flex: 1 0 32%;
  height: 50px;
}
.main-btn:last-child{
  margin-right: 0;
}
.main-btn:hover{
  cursor: pointer;
}
</style>
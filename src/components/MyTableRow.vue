<template>
  <div class="table-row">
    <p class="table-row-item table-row-id">{{ itemData.id }}</p>
    <p class="table-row-item">{{ itemData.body.slice(0,10) }}</p>
    <p class="table-row-item">{{ itemData.email }}</p>
    <p class="table-row-item">{{ itemData.name.slice(0,10) }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyTableRow',
  props: {
    itemData:{
      type: Object,
      default: () => {},
    }
  }
}
</script>

<style scoped>
.table-row{
  display: flex;
}
.table-row-item{
  flex: 1 0 25%;
  padding: 0px 7px;
}
.table-row:nth-child(even){
  background-color: #ccc;
}
.table-row-id{
  flex: 1 0 7%;
}
</style>
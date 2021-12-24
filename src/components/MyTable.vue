<template>
  <div class="table">
    <div class="table-title">
      <slot>Заголовок</slot>
    </div>
    <div class="table-header-wrapper">
      <div class="table-header">
        <p class="table-header-item table-header-id"
          @click="sortHandlerClick('flagId')"
        >id
          <font-awesome-icon class="sort" icon="sort-numeric-up" v-if="sort.flagId"/>
          <font-awesome-icon class="sort" icon="sort-numeric-down" v-else/>
        </p>
        <p class="table-header-item"
          @click="sortHandlerClick('flagBody')"
        >body
          <font-awesome-icon class="sort" icon="sort-alpha-up" v-if="sort.flagBody"/>
          <font-awesome-icon class="sort" icon="sort-alpha-down" v-else/>
        </p>
        <p class="table-header-item"
          @click="sortHandlerClick('flagEmail')"
        >email
          <font-awesome-icon class="sort" icon="sort-alpha-up" v-if="sort.flagEmail"/>
          <font-awesome-icon class="sort" icon="sort-alpha-down" v-else/>
        </p>
        <p class="table-header-item"
          @click="sortHandlerClick('flagName')"
        >name
          <font-awesome-icon class="sort" icon="sort-alpha-up" v-if="sort.flagName"/>
          <font-awesome-icon class="sort" icon="sort-alpha-down" v-else/>
        </p>
      </div>
      <div class="table-header">
        <p class="table-header-item table-header-id">
          -
        </p>
        <p class="table-header-item ">
          <my-input 
            :config="configFieldsInputs.body"
            v-model="filterFields.body"
            @clearField="$emit('clearField','body')"
          />
        </p>
        <p class="table-header-item ">
          <my-input 
            :config="configFieldsInputs.email"
            v-model="filterFields.email"
            @clearField="$emit('clearField','email')"
          />
        </p>
        <p class="table-header-item ">
          <my-input 
            :config="configFieldsInputs.name"
            v-model="filterFields.name"
            @clearField="$emit('clearField','name')"
          />
        </p>
      </div>
    </div>
    
    <div class="table-body">
      <div v-if="data.length > 0">
        <my-table-row
          v-for="item in data"
          :key="item.id"
          :itemData="item"
        />
      </div>
      <div class="table-body-empty" v-else>
        Записей нет...
      </div>
    </div>
  </div>
</template>

<script>
import MyTableRow from '@/components/MyTableRow.vue';
import MyInput from '@/components/MyInput.vue';

export default {
  name: 'MyTable',
  components:{ MyTableRow, MyInput },
  props:{
    data:{
      type: Array,
      default: () => [],
    },
    sort:{
      type: Object,
      default: () => {},
    },
    filterFields:{
      type: Object,
      default: () => {},
    },
    configFieldsInputs:{
      type: Object,
      default: () => {},
    }
  },
  methods:{
    sortHandlerClick(target){
      this.$emit('sortHandlerClick',target);
    }
  }
}
</script>

<style scoped>
.table{
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
}
.table-title{
  background-color: bisque;
  padding: 20px;
  font-size: 20px;
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 10px;
}
.table-header-wrapper{
  position: sticky;
  top: 0;
}
.table-header{
  display: flex;
  background-color: burlywood;
  text-transform: uppercase;
  line-height: 40px;
}
.table-header-item{
  margin: 0;
  flex: 1 0 25%;
  border-right: 1px solid black;
}
.table-header-item:hover{
  cursor: pointer;
}
.table-header-item:last-child{
  border-right: 0;
}
.table-header-id{
  flex: 1 0 7%;
}
.sort{
  margin-left: 5px;
}
.table-body-empty{
  margin-top: 20px;
}
</style>
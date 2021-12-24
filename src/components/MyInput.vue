<template>
  <div class="my-input">
    <div class="my-input-wrapper">
      <input 
        class="my-input-item"
        :type="config.type"
        :value="value"
        :placeholder="config.placeholder ? config.placeholder : '' "
        @input="$emit('input',$event.target.value)"
      >
      <font-awesome-icon 
        class="my-input-close"
        icon="times" 
        @click="clearField"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    config: Object,
    value: String,
  },
  methods:{
    clearField(){
      this.$emit('clearField');
    }
  }
}
</script>

<style scoped>
.my-input-item{
  width: 90%;
  line-height: 25px;
  margin-right: 5px;
  margin-bottom: 5px;
  outline: none;
}
.my-input-wrapper{
  position: relative;
}
.my-input-close{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 24px;
}
</style>
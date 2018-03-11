<template>
  <div>
    <h3>我是子组件一</h3>
  </div>
</template>
<script>
  export default{
    mounted() {
      this.$emit('childEvent', { name: 'zhangsan', age:  10 });
    },
  };
</script>


<template>
  <div>test</div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  created() {
    this.$emit("ready");
  }
};
</script>

<style>
</style>
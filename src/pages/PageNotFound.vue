<template>
    <div class="not__found"> 
        <img src="../assets/404.png"  alt="error-404" />
        <h1 class="page-not-found">Page not found</h1>
    </div>
</template>
<script>
export default {
    created(){
		this.$emit('ready')
	}
}
</script>
<style scoped>
.not__found{
    margin-top: 100px;
}
.page-not-found{
    font-size: 50px;
    font-family: cursive;
}
</style>
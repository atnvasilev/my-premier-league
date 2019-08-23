<template>
    <div class="not_started">
        <table class="match__not-started-contaier">
            <tbody>
                <tr>
                    <td class="match__not-started">Maчът все още не е започнал</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.not_started{
    width: 500px;
    margin:0 auto;
}
.match__not-started-contaier{
    height: 250px;
    width: 500px;
    border: 1px solid #CECECE;
    background-color: #f5f5f5;
}
.match__not-started{
    color: rgb(114, 114, 114);
    font-size: 18px;
    text-transform: uppercase;
}
</style>
<template>
    <div class="main_statistics_container">
        <div class="data-statistics__container" v-for="(value, index) in data" :key="index">
            <div class="data-statistics__home">{{value["home"]}}</div>
            <div class="data-statistics__type">{{value["type"]}}</div>
            <div class="data-statistics__away">{{value["away"]}}</div>
            <div>
                <div class="team__stats">
                    <div class="home-team__stats" >
                    </div>
                </div>
                <div class="team__stats">
                    <div class="away-team__stats">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data: []
        };
    },

    methods: {
        groupBy(array, key) {
        const result = {};
        array.forEach(item => {
            if (!result[item[key]]) {
            result[item[key]] = [];
            }
            result[item[key]].push(item);
        });
        return result;
        }
    },

    created() {
        this.$emit("ready");
    },

    beforeCreate() {
        fetch(
        "https://apiv2.apifootball.com/?action=get_statistics&match_id="+this.$route.params.id+"&APIkey=31a7e0331b21c7503f36bda060a2bbb7ba0ab942be56c276eb6015119b4c9229" 
        )
        .then(response => response.json())
        .then(data => {
            /* eslint-disable */
            this.data = data[this.$route.params.id]["statistics"];  
        })
    }
}
</script>
<style scoped>
.team__stats{
    display: inline-block;
    width: 210px;
    background-color: #ddd;
    overflow: hidden;
    border-radius: 10px;
    height: 9px;
}
.home-team__stats {
    background-color: #CA0000;
    height: 9px;
    float:right;
}
.away-team__stats{
    background-color: #CA0000;
    height: 9px;
    float:left;
}
.main_statistics_container{
    margin-top:20px;
}
.data-statistics__home{
    display: inline-block;
    float: left;
}
.data-statistics__away{
    display: inline-block;
    float: right;
}
.data-statistics__type{
    display: inline-block;
}
.data-statistics__container{
    width: 500px;
    margin:0 auto;
    padding: 5px;
}
</style>
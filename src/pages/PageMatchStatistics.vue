<template>
    <div class="main_statistics_container">
        <div class="radio-list_back__button">
            <router-link :to="{name: 'Schedule'}">
                <ul class="radio-list__back">
                    <li class="radio-list__item active" >
                        <a  class="radio-list__link_back">Назад</a>
                    </li>
                </ul>
            </router-link>
        </div>
        <div class="data-statistics__container" v-for="(value, index) in data" :key="index">
            <div class="data-statistics__home">{{value["home"]}}</div>
            <div class="data-statistics__type">{{value["type"]}}</div>
            <div class="data-statistics__away">{{value["away"]}}</div>

            <TeamStats :HomeStatistics="value['home']" :AwayStatistics="value['away']" />
        </div>
    </div>
</template>
<script>
import TeamStats from "@/components/TeamStats";
export default {
    components: {
        TeamStats
    },
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

    beforeCreate() {
        fetch(
        "https://apiv2.apifootball.com/?action=get_statistics&match_id="+this.$route.params.id+"&APIkey=31a7e0331b21c7503f36bda060a2bbb7ba0ab942be56c276eb6015119b4c9229" 
        )
        .then(response => response.json())
        .then(data => {
            /* eslint-disable */
            this.data = data[this.$route.params.id]["statistics"];  
        })
        .then(this.$emit("ready"));
    }
}
</script>

<style scoped>
.radio-list__back{
    padding: 0;
    list-style: none;
    text-align: center;
    display: -webkit-inline-box;
    margin: auto;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 30px;
    overflow: hidden;
    background: #fff;
}
.radio-list__link_back{
    text-transform: uppercase;
    text-decoration: none;
    display: block;
    padding: 12px 50px;
    color: #ffffff;
    cursor: pointer;
}
.radio-list_back__button{
    margin-top: 10px;
    margin-bottom: 10px;
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
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
        <div class="data-statistics__matchTime">
            <span>{{getTeams.match_date}}</span>
            <div class="data-statistics__teams_result">
                <div class="data-statistics__team__name">{{getTeams.match_hometeam_name}}</div>
                <span class="data-statistics_team_score homeScore">{{getTeams.match_hometeam_score !== '' ? getTeams.match_hometeam_score : "-"}}</span>- 
                <span class="data-statistics_team_score awayScore">{{getTeams.match_awayteam_score !== '' ? getTeams.match_awayteam_score : "-"}}</span>
                <div class="data-statistics__team__name">{{getTeams.match_awayteam_name}}</div>
            </div>
        </div>
        <div class="filters data-statistics-filters">
            <ul class="radio-list data-statistics-radio-list">
                <li @click="activate(1)" class="radio-list__item data-statistics-lineup"  :class="{active:active_el == 1}">
                    <a @click="showStatistics = true" class="radio-list__link data-statistics-menu" style="">Статистика</a>
                </li>
                <li @click="activate(2)" class="radio-list__item data-statistics-lineup" :class="{active:active_el == 2}">
                    <a  @click="showStatistics = false" class="radio-list__link data-statistics-menu">Състави</a>
                </li>
            </ul>
        </div>

        <MatchStats :Statistics="data" v-if="showStatistics && data.length > 0" />
        <MatchLineup :MatchInfo="getTeams" :currentMatch="this.matchId" v-else-if="data.length > 0" />
        <MatchNotStarted v-else />
    </div>
</template>
<script>
import MatchLineup from "@/components/MatchLineup";
import MatchStats from "@/components/MatchStats";
import MatchNotStarted from "@/components/MatchNotStarted";
export default {
    components: {
        MatchLineup,
        MatchStats,
        MatchNotStarted
    },
    data(){
        return {
            data: [],
            allEvents: [],
            matchId: null,
            active_el: 1,
            showStatistics: true
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
        },
        activate:function(el){
            this.active_el = el;
        }
    },

    computed:{
        getTeams(){
            let allEvents = this.allEvents;
            let currentMatchID = this.matchId;
            let currentData = [];
            for(var i = 0; i < allEvents.length; i++){
                if(allEvents[i]["match_id"] == currentMatchID){
                    currentData = allEvents[i];
                    return currentData;
                }
            }
            return "";
        }
    },

    beforeCreate() {
        fetch(
            "https://apiv2.apifootball.com/?action=get_events&from=2019-08-09&to=2019-12-31&league_id=148&APIkey=4249dfa7aa1cc4e4487d0f72f1c6f4fdd0315403834e0bfacf8078599a2a20ff" 
        )
        .then(response => response.json())
        .then(data => {
            /* eslint-disable */
            this.allEvents = data
        })
        .then(
            fetch(
                "https://apiv2.apifootball.com/?action=get_statistics&match_id="+this.$route.params.id+"&APIkey=4249dfa7aa1cc4e4487d0f72f1c6f4fdd0315403834e0bfacf8078599a2a20ff" 
            )
            .then(response => response.json())
            .then(data => {
                /* eslint-disable */
                this.data = data[this.$route.params.id]["statistics"];
                this.matchId = this.$route.params.id  
            })
        ).then(this.$emit("ready"))
    }
}
</script>

<style>
.data-statistics__matchTime{
    display: inline-block;
    width: 100%;
    text-align: left;
    font-size: 18px;
    border-bottom: 2px solid rgba(0,0,0,.12);
    opacity: .75;
    padding: 10px 0px 10px 0px;
}
.data-statistics-radio-list{
    border-radius: 0;
    width: 100%;
}
.data-statistics__teams_result{
    width: 500px;
    margin: 0 auto;
    text-align: center;
}
.data-statistics-filters{
    width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
    margin-top: 15px;
}
.data-statistics-lineup{
    width:250px;
}
.data-statistics-menu{
    padding: 5px;
}
.data-statistics_team_score{
    font-weight: 700;
    display: inline-block;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 100%;
    background: #3498db;
    color: #fff;
}
.homeScore{
    margin-right: 5px;
    margin-left: 5px;
}
.awayScore{
    margin-right: 5px;
}
.data-statistics__team__name{
    color: #2c3e50;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    display: inline;
    position: relative; 
}
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
    float: left;
}
.data-statistics__away{
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
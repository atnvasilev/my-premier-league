<template>
    <div class="data-statistics-lineup-container">
        <StartingLineups 
            :homeTeam="MatchInfo['lineup']['home']['starting_lineups']" 
            :awayTeam="MatchInfo['lineup']['away']['starting_lineups']" 
            :homeSubstitutions="homeSubs"
            :awaySubstitutions="awaySubs"
         />
        <Substitutes 
            :homeSubstitutes="MatchInfo['lineup']['home']['substitutes']" 
            :awaySubstitutes="MatchInfo['lineup']['away']['substitutes']"
        />
        <TeamCoach 
            :homeCoachName="MatchInfo['lineup']['home']['coach']" 
            :awayCoachName="MatchInfo['lineup']['away']['coach']"
        />
    </div>
</template>

<script>
import TeamCoach from "@/components/TeamCoach";
import StartingLineups from "@/components/StartingLineups";
import Substitutes from "@/components/MatchSubstitutes";
export default {
    components: {
        TeamCoach,
        StartingLineups,
        Substitutes
    },
    props: {
        MatchInfo: {
            required: true
        },
        currentMatch: {
            required: true
        },
    },
    computed:{
        homeSubs(){
            let subsPlayers = this.MatchInfo['substitutions']["home"];
            let subs = [];
            for(var key in subsPlayers){
                subs.push({
                    'out': subsPlayers[key]['substitution'].split(' | ')[0],
                    'in': subsPlayers[key]['substitution'].split(' | ')[1]
                })
            }
            return subs
        },
        awaySubs(){
            let subsPlayers = this.MatchInfo['substitutions']["away"];
            let subs = [];
            for(var key in subsPlayers){
                subs.push({
                    'out': subsPlayers[key]['substitution'].split(' | ')[0],
                    'in': subsPlayers[key]['substitution'].split(' | ')[1]
                })
            }
            return subs
        }
    }
}
</script>

<style>
.data-statistics-lineup-container{
    width:520px;
    margin:0 auto
}
.data-statistics-lineup__home-team{
    width:250px;
    border-right: 2px solid rgba(0,0,0,.12);
    display: inline-block;
}
.data-statistics-lineup-text{
    padding: 5px;
    color: #656565;
    background-color: #e7e7e7;
}
.data-statistics-lineup__away_players{
    padding: 10px;
    text-align: right;
}
.data-statistics-lineup__home_players{
    padding: 10px;
    text-align: left;
}
.data-statistics-lineup__away-team{
    width: 250px;
    display: inline-block;
    border-left: 0px;
}
</style>
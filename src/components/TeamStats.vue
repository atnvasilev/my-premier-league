<template>
<div>
    <div class="team__stats">
        <div class="home-team__stats" :style="{width:setHomeWidth+'%'}">
        </div>
    </div>
    <div class="team__stats">
        <div class="away-team__stats" :style="{width:setAwayWidth+'%'}">
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    HomeStatistics: {
      type: String,
      required: true
    },
    AwayStatistics: {
        type: String,
        required: true
    }
  },
    computed: {
        setHomeWidth(){
            let home = this.HomeStatistics;
            let away = this.AwayStatistics
            let homeValue = 0;
            let maxValue = 0;
            let newHomeValue = 0;
            let awayValue = 0;
            if(home.length > 0){
                homeValue = parseInt(home)
                awayValue = parseInt(away)
                maxValue = parseInt(homeValue + awayValue)
                newHomeValue = parseInt((homeValue/maxValue)* 100)
             
                return newHomeValue
            }
            return 0;
        },
        
        setAwayWidth(){
            let home = this.HomeStatistics;
            let away = this.AwayStatistics
            let homeValue = 0;
            let maxValue = 0;
            let newAwayValue = 0;
            let awayValue = 0;
            if(away.length > 0){
                homeValue = parseInt(home)
                awayValue = parseInt(away)
                maxValue = parseInt(homeValue + awayValue)
                newAwayValue = parseInt((awayValue/maxValue)* 100)
                return newAwayValue
            }
            return 0;
        }
    }
  
};
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
</style>


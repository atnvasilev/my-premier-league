<template>
<div class="container container--tall container--max-width">
    <div class="table-scroll">
      <div>
        <div class="data-team__teamLogo" v-bind:style="{ backgroundImage: 'url(' + teamImage + ')' }"></div>
        <div class="data-team__teamName">
          <div class="data-team__teamText">{{teams.team_name}}</div>
        </div>
      </div>
      <div class="data-team__container">
        <div class="data-team__headings">#</div>
        <div class="data-team__headings_name">Име</div>
        <div class="data-team__headings">Години</div>
        <div class="data-team__headings">Мачове</div>
        <div class="data-team__headings football-ball"><img src="../assets/football_ball.png"></div>
        <div class="data-team__headings yellow"><div class="yellow-cards"></div></div>
        <div class="data-team__headings red"><div class="red-cards"></div></div>
      </div>
      <div id="v-for-object" class="demo">
        <div v-for="(value, position) in players" :key="position" class="data-team__info">
          <div class="data-player__position" v-if="position == 'Goalkeepers'">Вратар</div>
          <div class="data-player__position" v-else-if="position == 'Defenders'">Защитниц</div>
          <div class="data-player__position" v-else-if="position == 'Midfielders'">Халф</div>
          <div class="data-player__position" v-else>Нападател</div>
          <div v-for="(key, index) in value" :key="index" class="data-player__conteiner">
            <div class="data-player__info" > {{ key.player_number !== '' ? key.player_number : "-"}}</div>
            <div class="data-player__info_name">{{key.player_name}}</div>
            <div class="data-player__info">{{key.player_age}}</div>
            <div class="data-player__info">{{key.player_match_played}}</div>
            <div class="data-player__info">{{key.player_goals}}</div>
            <div class="data-player__info">{{key.player_yellow_cards}}</div>
            <div class="data-player__info">{{key.player_red_cards}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teamImage: [],
      teams: [],
      headings: ['#', 'Име', 'Години', 'Мачове', 'Голове', 'Ж.К.', 'Ч.К.'],
      players: [],
      searchPlayer: '',
      id: this.$route.params.id
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
      "https://apiv2.apifootball.com/?action=get_teams&league_id=148&team_id="+this.$route.params.id+"&APIkey=31a7e0331b21c7503f36bda060a2bbb7ba0ab942be56c276eb6015119b4c9229"
    )
    .then(response => response.json())
    .then(data => {
      /* eslint-disable */
      var grouped = this.groupBy(data[0]["players"], "player_type");
      this.players = grouped;
      this.teams = data[0];
      this.teamImage = data[0].team_badge
    })
      
  },
  created() {
    this.$emit("ready");
  }
};
</script>

<style scoped>
.data-team__teamName{
  width: auto;
  height: 100px;
  float: left;
  justify-content: center;
  margin-left:25px
}
.data-team__teamLogo{
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  float:left; 
}
.data-player__position{
  padding: 5px;
  color: #656565;
  background-color: #E7E7E7;
}
.data-player__conteiner{
  padding: 10px;
  border-bottom: 2px solid #E7E7E7;
}
.red {
  position: relative;
  bottom: 6px;
}
.red-cards{
  background-color: red;
  height: 24px;
  width: 16px;
  border-radius: 20%;
  text-align: center;
  margin: 0 auto;
  bottom: 5px;
  position: relative;
  right: 5px;
}
.yellow {
  position: relative;
  bottom: 6px;
}
.yellow-cards{
  background-color: #ffeb3b;
  height: 24px;
  width: 16px;
  border-radius: 20%;
  text-align: center;
  margin: 0 auto;
  bottom: 5px;
  position: relative;
  right: 5px;
}
.data-team__teamText{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: #656565;
  font: normal bold 18px Arial, Helvetica, sans-serif;
}
.data-team__info{
  text-align: left;
  border-bottom: 2px solid #ddd;
  position: relative;
  display: grid;
  height: 100%;
}
.data-player__conteiner:hover {
    background: rgba(0, 0, 0, 0.03);
}
.football-ball{
  position: relative;
  bottom: 10px;
}
.data-team__headings{
  text-align: left;
  width: 10%;
  float: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  text-align: center;
}
.data-team__headings_name{
  text-align: left;
  width: 40%;
  font-weight: bold;
  float: left;
  border-bottom: 2px solid #ddd;
}
.data-player__info{
    text-align: left;
    width: 10%;
    float: left;
    text-align: center;
}
.data-player__info_name{
    text-align: left;
    width: 40%;
    float: left;
}
.data-team__container{
  width: 100%;
  display: inline-block;
  margin-top:20px;
  position: relative;
  top: 5px;
}
</style>
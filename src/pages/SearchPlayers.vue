<template>
<div>
    <div class="data-team__container">
        <div class="data-team__headings">
          <div class="team_info_number">#</div>
        </div>
        <div class="data-team__headings_name">
          <div class="team_info_name">Име</div>
        </div>
        <div class="data-team__headings">
          <div class="team_info_age">Години</div>
        </div>
        <div class="data-team__headings tshirt">
          <img src="../assets/tshirt.png" />
        </div>
        <div class="data-team__headings football-ball">
          <img src="../assets/football_ball.png" />
        </div>
        <div class="data-team__headings yellow">
          <div class="yellow-cards"></div>
        </div>
        <div class="data-team__headings red">
          <div class="red-cards"></div>
        </div>
    </div>
     <div v-for="(value, position) in playersResult" :key="position" class="data-team__info">
          <div class="data-player__position" v-if="position == 'Goalkeepers'">Вратар</div>
          <div class="data-player__position" v-else-if="position == 'Defenders'">Защитник</div>
          <div class="data-player__position" v-else-if="position == 'Midfielders'">Халф</div>
          <div class="data-player__position" v-else>Нападател</div>
          <div v-for="(key, index) in value" :key="index" class="data-player__conteiner">
            <div class="data-player__info">{{ key.player_number !== '' ? key.player_number : "-"}}</div>
            <div class="data-player__info_name">{{key.player_name}}</div>
            <div class="data-player__info">{{key.player_age}}</div>
            <div class="data-player__info">{{key.player_match_played}}</div>
            <div class="data-player__info">{{key.player_goals}}</div>
            <div class="data-player__info">{{key.player_yellow_cards}}</div>
            <div class="data-player__info">{{key.player_red_cards}}</div>
          </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    Players: {
      required: true
    }
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
    computed: {
        playersResult(){
            let data = this.Players
            let grouped = this.groupBy(data, "player_type");
            return grouped;
        }
    }
  
};
</script>
<style scoped>


</style>


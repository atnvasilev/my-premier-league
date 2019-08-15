<template>
<div class="container container--tall container--max-width">
    <div class="table-scroll">
      <div>
        <div>{{teams.team_badge}}</div>
        <div>{{teams.team_name}}</div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="(key, index) in headings" :key="index">{{key}}</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(team, index) in teams.players"
            :key="index">
            <td>{{team.player_type}}</td> 
            <td>{{team.player_number}}</td>
            <td>{{team.player_name}}</td>
            <td>{{team.player_match_played}}</td>
            <td>{{team.player_yellow_cards}}</td>
            <td>{{team.player_red_cards}}</td>
            <td>{{team.player_goals}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [],
      headings: ["Позиция", "# Номер", "Име", "Мачове", "Жълти картони", "Червени картони", "Голове"],
      id: this.$route.params.id
    };
  },
  beforeCreate() {
    fetch(
      "https://apiv2.apifootball.com/?action=get_teams&league_id=148&team_id="+this.$route.params.id+"&APIkey=31a7e0331b21c7503f36bda060a2bbb7ba0ab942be56c276eb6015119b4c9229"
    )
    .then(response => response.json())
    .then(data => {
      /* eslint-disable */
      this.teams = data[0]
    })
      
  },
  created() {
    this.$emit("ready");
  }
};
</script>

<style>
</style>
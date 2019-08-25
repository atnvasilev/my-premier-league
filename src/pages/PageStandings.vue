<template>
  <div class="container container--tall container--max-width">
    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th class="ranking-head" v-for="(value,index) in headings" :key="index">{{value}}</th>
          </tr>
        </thead>
        <tbody>
          <router-link
            :to="{name: 'Team', params: {id: teams.team_id }}"
            tag="tr"
            v-for="(teams, index) in data"
            :key="teams.team_id"
            class="ranking-team"
          >
            <td
              v-if="index==0 || index==1 || index==2 || index==3"
              class="data-table-cl"
              title="Promotion - Champions League (Group Stage)"
            >{{teams.overall_league_position}}</td>
            <td
              v-else-if="index==4"
              class="data-table-el"
              title="Promotion - Europa League (Group Stage)"
            >{{teams.overall_league_position}}</td>
            <td
              v-else-if="index==17 || index==18 || index==19"
              class="data-table-relegation"
              title="Relegation - Championship"
            >{{teams.overall_league_position}}</td>
            <td v-else>{{teams.overall_league_position}}</td>
            <td>
              <span></span>
              <span>{{teams.team_name}}</span>
            </td>
            <td>{{teams.overall_league_payed}}</td>
            <td>{{teams.overall_league_W}}</td>
            <td>{{teams.overall_league_D}}</td>
            <td>{{teams.overall_league_L}}</td>
            <td>{{teams.overall_league_GF}}</td>
            <td>{{teams.overall_league_GA}}</td>
            <td>{{teams.overall_league_PTS}}</td>
          </router-link>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "standing",
  data() {
    return {
      data: [],
      headings: ["#", "Отбор", "М", "П", "Р", "З", "В/Г", "Д/Г", "Точки"]
    };
  },
  beforeCreate() {
    fetch(
      "https://apiv2.apifootball.com/?action=get_standings&league_id=148&APIkey=af9f7e9633a5413ce6274758e12fb898d3a754e3ce715521418518d99febecf9"
    )
      .then(response => response.json())
      .then(data => {
        this.data = data;
      })
      .then(() => this.$emit("ready"));
  }
};
</script>

<style>
.data-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.data-table th {
  text-align: center;
  border-bottom: 2px solid #ddd;
}

.data-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.03);
}

.data-table td,
.data-table th {
  padding: 12px;
}
.ranking-team{
  cursor:pointer
}
.data-table tr + tr {
  border-top: 1px solid #ddd;
}

.data-table a {
  color: #3498db;
  text-decoration: none;
}

.data-table a:hover {
  color: #2980b9;
}

.table-scroll {
  overflow: hidden;
}

.current-user {
  font-weight: bold;
}

.container--tall {
  padding-top: 48px;
  padding-bottom: 48px;
}

.container {
  margin: 0 auto;
  padding: 24px;
}

.data-table-el {
  background-color: #7f0029;
  color: #ffffff;
}

.data-table-cl {
  background-color: #004682;
  color: #ffffff;
}

.data-table-relegation {
  background-color: #bd0000;
  color: #ffffff;
}
</style>

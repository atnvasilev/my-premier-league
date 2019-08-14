<template>
  <div class="container container--tall container--max-width">
    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th class="ranking-head">#</th>

            <th class="ranking-head">Отбор</th>

            <th class="ranking-head">М</th>

            <th class="ranking-head">П</th>

            <th class="ranking-head">Р</th>

            <th class="ranking-head">З</th>

            <th class="ranking-head">В/Г</th>
            <th class="ranking-head">Д/Г</th>
            <th class="ranking-head">Точки</th>
          </tr>
        </thead>
        <tbody>
          <router-link
            :to="{name: 'Team', params: {id: teams.team_id }}"
            tag="tr"
            v-for="(teams, index) in data"
            :key="teams.team_id"
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
      data: []
    };
  },
  beforeCreate() {
    fetch(
      "https://apiv2.apifootball.com/?action=get_standings&league_id=148&APIkey=31a7e0331b21c7503f36bda060a2bbb7ba0ab942be56c276eb6015119b4c9229"
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
  overflow-x: auto;
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

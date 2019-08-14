<template>
  <div class="schedule container container--tall container--max-width">
    <div class="filters">
      <ul class="radio-list">
        <li class="radio-list__item--active">
          <a @click="showFinishedMatches = false" class="radio-list__link">Предстоящи</a>
        </li>

        <li class="radio-list__item">
          <a @click="showFinishedMatches = true" class="radio-list__link">Изминали</a>
        </li>
      </ul>
    </div>

    <ScheduleList :schedules="forthcomingMatches" v-if="!showFinishedMatches" />
    <ScheduleList :schedules="finishedMatches" v-else />
  </div>
</template>

<script>
import ScheduleList from "@/components/ScheduleList";
export default {
  components: {
    ScheduleList
  },
  data() {
    return {
      matches: [],
      teams: [],
      showFinishedMatches: false
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
  computed: {
    finishedMatches() {
      let finished = this.matches.filter(item => {
        return item.match_status === "Finished";
      });
      return this.groupBy(finished, "match_date");
    },
    forthcomingMatches() {
      let forthcoming = this.matches.filter(item => {
        return item.match_status !== "Finished";
      });
      
      return this.groupBy(forthcoming, "match_date");
    }
  },
  beforeCreate() {
    fetch(
      "https://apiv2.apifootball.com/?action=get_events&from=2019-08-09&to=2019-12-31&league_id=148&APIkey=31a7e0331b21c7503f36bda060a2bbb7ba0ab942be56c276eb6015119b4c9229"
    )
      .then(response => response.json())
      .then(data => {
        this.matches = data;
      })
  }
};
</script>

<style>
.filters {
  text-align: center;
  margin-bottom: 24px;
}

.radio-list {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flex;
  display: -o-inline-flex;
  display: inline-flex;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 30px;
  overflow: hidden;
  background: #fff;
}

.radio-list__link {
  text-transform: uppercase;
  text-decoration: none;
  display: block;
  padding: 12px 24px;
  color: #3498db;
}

.radio-list__item + .radio-list__item {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}

.radio-list__item--active {
  background: #3498db;
}

.radio-list__item--active a {
  color: #fff;
}

.schedule_day {
  font-weight: 700;
  padding-bottom: 12px;
  font-size: 16px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  text-transform: uppercase;
}

.schedule__day-title {
  font-weight: 700;
  padding-bottom: 12px;
  font-size: 16px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  text-transform: uppercase;
}

.schedule__result-score {
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

.match__time {
  display: inline-block;
  width: 100%;
  float: left;
  text-align: left;
}

.match__date {
  display: inline-block;
  width: 100%;
  float: left;
  text-align: left;
  opacity: 0.64;
}

.schedule__day-match {
  display: inline-block;
  text-align: center;
}

.schedule__day-matches {
  width: 500px;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
}
</style>

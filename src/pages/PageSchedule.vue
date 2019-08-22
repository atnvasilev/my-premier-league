<template>
  <div class="schedule container container--tall container--max-width">
    <div class="filters">
      <ul class="radio-list">
        <li @click="activate(1)" class="radio-list__item" :class="{active:active_el == 1}">
          <a @click="showFinishedMatches = false" class="radio-list__link">Предстоящи</a>
        </li>

        <li @click="activate(2)" class="radio-list__item" :class="{active:active_el == 2}">
          <a @click="showFinishedMatches = true" class="radio-list__link">Изминали</a>
        </li>
      </ul>
    </div>
    <ScheduleList :schedules="forthcomingMatches" v-if="!showFinishedMatches" />
    <ScheduleList class="schedule-finished" :schedules="finishedMatches" v-else />
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
      showFinishedMatches: false,
      active_el: 1,
      searchItem: "",
      result: []
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
  computed: {

    finishedMatches() {
      let finished = this.matches.filter(item => {
        return item.match_status === "Finished";
      });
      finished = [...finished.reverse()]
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
      "https://apiv2.apifootball.com/?action=get_events&from=2019-08-09&to=2019-12-31&league_id=148&APIkey=4249dfa7aa1cc4e4487d0f72f1c6f4fdd0315403834e0bfacf8078599a2a20ff"
    )
      .then(response => response.json())
      .then(data => {
        this.matches = data;
      })
      .then(() => this.$emit("ready"));
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
  cursor: pointer;
}
.schedule-finished{
  cursor: pointer;
}
.radio-list__item + .radio-list__item {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
.active a{
   color: #fff;
}
.active{
 background: #3498db;
}
.schedule_day {
  font-weight: 700;
  padding-bottom: 12px;
  font-size: 16px;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.12); */
  text-transform: uppercase;
}

.schedule__day-title {
  font-weight: 700;
  padding-bottom: 12px;
  font-size: 16px;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.12); */
  text-transform: uppercase;
}
.schedule__day-title:hover {
    background-color: rgba(0,0,0,.03);
}
.match__time {
    display: inline-block;
    width: 100%;
    text-align: left;
    position: relative;
    top: 23px;
    opacity: .64;
    font-weight: 100;
}

.match__date {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 18px;
  border-bottom: 2px solid rgba(0,0,0,.12);
  opacity: .75;
  padding:10px 0px 10px 0px;
}

.schedule__day-matches {
  width: 500px;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
}
</style>

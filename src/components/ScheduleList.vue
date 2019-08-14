<template>
  <div>
    <div v-for="(schedule, index) in schedules" :key="index" class="schedule_day">
      <span class="match__date">{{index}}</span>
      <div v-for="(el, elKey) in schedule" :key="elKey" class="schedule__day-title">
        <span class="match__time">{{el.match_time}}</span>
        <div class="schedule__day-matches">
          <span>{{el.match_hometeam_name}}</span>
          <span class="schedule__result-score">
            {{ el.match_hometeam_score !== '' ? el.match_hometeam_score : 0}} 
            </span> : 
          <div class="schedule__day-match">
            <span class="schedule__result-score"> 
              {{ el.match_awayteam_score !== '' ? el.match_awayteam_score : 0}}
            </span>
            {{el.match_awayteam_name}}
            <div class="schedule__day-match-row"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schedules: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>


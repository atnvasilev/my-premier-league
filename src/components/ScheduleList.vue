<template>
  <div>
    <div v-for="(schedule, index) in schedules" :key="index" class="schedule_day">
      <span class="match__date">{{index}}</span>
      <div v-for="(el, elKey) in schedule" :key="elKey" class="schedule__day-title">
        <span class="match__time">{{el.match_time}}</span>
        <router-link
            :to="{name: 'Statistics', params: {id: el.match_id }}"
            tag="div"
            class="schedule__day-matches"
        >
        <!-- <div class="schedule__day-matches"> -->
          <div class="schedule__day-match">
            <span>{{el.match_hometeam_name}}</span>
            <span class="schedule__result-score home__team-score">
              {{ el.match_hometeam_score !== '' ? el.match_hometeam_score : 0}} 
              </span>
          </div>
          <div class="schedule__day-match-away">
            <span class="schedule__result-score"> 
              {{ el.match_awayteam_score !== '' ? el.match_awayteam_score : 0}}
            </span>
            <span class="schedyle__result-away">{{el.match_awayteam_name}}</span>
          </div>
        <!-- </div> -->
        </router-link>
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
.home__team-score{
  margin-left: 5px;
}

.schedule__day-match {
  display: inline-block;
  text-align: right;
  width: 250px;
}
.schedule__day-match-away{
  display: inline-block;
  text-align: left;
  width: 250px;
  position: relative;
  left: 10px;
}
.schedyle__result-away{
  padding-left:5px;
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
</style>


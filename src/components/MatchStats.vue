<template>
    <div>
        <div class="data-statistics__container" v-for="(value, index) in Statistics" :key="index">
            <div class="data-statistics__home">{{value["home"]}}</div>
            <div class="data-statistics__type">{{value["type"]}}</div>
            <div class="data-statistics__away">{{value["away"]}}</div>

            <TeamStats :HomeStatistics="value['home']" :AwayStatistics="value['away']" />
        </div>
    </div>
</template>

<script>
import TeamStats from "@/components/TeamStats";
export default {
    components: {
        TeamStats
    },
    props: {
        Statistics: {
            required: true
        },
    }
}
</script>

<style>

</style>
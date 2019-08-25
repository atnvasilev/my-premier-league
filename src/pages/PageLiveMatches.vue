<template>
    <div>
        <ScheduleList :schedules="liveMatches" v-if="Object.keys(liveMatches).length > 0"/>
        <div v-else class="no__data-live_matches">
            <table class="no__live-matches">
                <tbody>
                    <tr>
                        <td class="no_matches-text">В момента няма мачове на живо</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            matches: []
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
    computed:{
        liveMatches(){
            let lives = this.matches.filter(item => {
                return item.match_status !== "Finished" && item.match_live == 1;
            });
            return this.groupBy(lives, "match_date");
        }
    },
    beforeCreate() {
        fetch(
            "https://apiv2.apifootball.com/?action=get_events&from=2019-08-09&to=2019-12-31&league_id=148&APIkey=af9f7e9633a5413ce6274758e12fb898d3a754e3ce715521418518d99febecf9"
        )
        .then(response => response.json())
        .then(data => {
            this.matches = data;
        })
        .then(() => this.$emit("ready"));
    },
    // created() {
    //     this.$emit('ready');
    // }
}
</script>

<style scoped>
.no__data-live_matches{
    width: 500px;
    margin:0 auto;
    margin-top: 100px;
}
.no-matches-text{
    color: rgb(114, 114, 114);
    font-size: 18px;
    text-transform: uppercase;
}

.no__live-matches{
    height: 250px;
    width: 500px;
    border: 1px solid #CECECE;
    background-color: #f5f5f5;
}

</style>
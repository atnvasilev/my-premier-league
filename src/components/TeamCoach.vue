<template>
    <div>
        <div class="data-statistics-lineup-text">Треньор</div>
        <table class="data-statistics-lineup__home-team" style="border:0px">
            <tbody>
                <tr v-for="(el, index) in homeCoachName" :key="index">
                    <td class="data-statistics-lineup__home_players">
                        <span>{{el.lineup_player}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="data-statistics-lineup__away-team" style="border:0px">
            <tbody style="float:right">
                <tr v-for="(el, index) in awayCoachName" :key="index">
                    <td class="data-statistics-lineup__away_players">
                        <span>{{el.lineup_player}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        homeCoachName: {
            required: true
        },
        awayCoachName: {
            required: true
        }
    }
}
</script>

<style>

</style>
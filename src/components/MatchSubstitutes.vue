<template>
    <div>
        <div class="data-statistics-lineup-text">Резерви</div>
        <table class="data-statistics-lineup__home-team">
            <tbody>
                <tr v-for="(el, index) in homeSubstitutes" :key="index">
                    <td class="data-statistics-lineup__home_players">
                        <span>{{el.lineup_number}}</span>
                        <span>{{el.lineup_player}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="data-statistics-lineup__away-team" >
            <tbody style="float:right">
                <tr v-for="(el, index) in awaySubstitutes" :key="index">
                    <td class="data-statistics-lineup__away_players">
                        <span style="float:right;">{{el.lineup_number}}</span>
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
        homeSubstitutes: {
            required: true
        },
        awaySubstitutes: {
            required: true
        }
    }
}
</script>

<style>

</style>
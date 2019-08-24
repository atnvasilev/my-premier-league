<template>
    <div>
        <!-- <div>{{homeSubstitutions}}</div> -->
        <div class="data-statistics-lineup-text">Стартови състави</div>
        <table class="data-statistics-lineup__home-team">
            <tbody>
                <tr v-for="(el, index) in homeTeam" :key="index">
                    <td class="data-statistics-lineup__home_players">
                        <span>{{el.lineup_number}}</span>
                        <span>.{{el.lineup_player}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="data-statistics-lineup__away-team">
            <tbody style="float:right">
                <tr v-for="(el, index) in awayTeam" :key="index">
                    <td class="data-statistics-lineup__away_players">
                        <span style="float:right;">{{el.lineup_number}}</span>
                        <span>{{el.lineup_player}}</span>
                        <!-- <div v-for="(key, index) in cards" :key="index">
                            <span v-if="el.lineup_player == key.away_fault">card</span>
                        </div> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        homeTeam: {
            required: true
        },
        awayTeam: {
            required: true
        },
        homeSubstitutions: {
            type: Array,
            required: true
        },
        awaySubstitutions: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>
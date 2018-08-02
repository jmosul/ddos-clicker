<template>
  <div class="clicker">
    <v-btn outline large fab color="white" @click="fireClick">
      <v-icon>fas fa-broadcast-tower</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
    import ClickRateCounter from '../services/ClickRateCounter';

    @Component({})
    export default class Clicker extends Vue {
        @Prop() private strength!: number;

        private clickCounter!: ClickRateCounter;

        mounted() {
            this.clickCounter = new ClickRateCounter();
            window.setInterval(() => this.fireUpdate(), 100);
        }

        get clickStrength(): number {
            return this.strength || 1;
        }

        fireClick() {
            this.clickCounter.registerClick(this.clickStrength);


            this.fireUpdate();
        }

        fireUpdate() {
            this.emitClickFired(this.clickCounter.countClicks());
        }

        @Emit('clickFired')
        emitClickFired(clicksPerSecond: number) {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="dc">
    Clicks per second {{clicksPerSecond}}

    <clicker
      @clickFired="handleClick"
    ></clicker>

    <div class="cd__resources">
      Resources: {{resources.toDecimal()}}
      Research: {{research.toDecimal()}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Clicker from '@/components/Clicker.vue';
import {Money} from 'ts-money';
import GameComponent from './GameComponent';

@Component({
    components: {
        Clicker,
    },
})
export default class DataCenter extends GameComponent {
  private clicksPerSecond: number = 0;
  private researchRate: number = 10;
  private resources: Money;
  private research: Money;

  constructor() {
      super();

      this.resources = this.gameOptions.startingResources;
      this.research = this.gameOptions.startingResearch;

      //window.setInterval(() => this.incrementResources(), this.gameOptions.updateRate);
  }

  public handleClick(clicksPerSecond: number) {
      this.totalClicks = clicksPerSecond;
  }

  public set totalClicks(clicks: number) {
      this.clicksPerSecond = clicks + this.computedClicks;
  }

  public get totalClicks() {
    return this.clicksPerSecond;
  }

  public get computedClicks(): number {
      return 10;
  }

  private incrementResources() {
      const amount = this.gameOptions.resourceRate.multiply(this.clicksPerSecond);

      const resourceSplit = amount.allocate([
          100 - this.researchRate,
          this.researchRate
      ]);

      this.resources = this.resources.add(resourceSplit[0]);
      this.research = this.research.add(resourceSplit[1]);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

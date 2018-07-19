<template>
  <v-container class="px-0 py-0 gre lighten-4">
    <v-layout row>

      <v-jumbotron color="primary" height="200px">
        <v-container fill-height class="py-3 px-3">
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3 mb-0">{{clicksPerSecond}}</h3>
              <p class="mb-0">Requests Per Second</p>
              <clicker
                @clickFired="handleClick"
              ></clicker>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-layout>


    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="cyan darken-2" class="white--text">
          <v-container class="py-3 px-3">
            <v-layout row>
              <v-flex xs9>
                <div>
                  <div class="headline">Resources</div>
                  <div>{{resources.amount}}</div>
                </div>
              </v-flex>
              <v-flex xs3 align-end class="text-xs-right">
                <v-icon x-large>money</v-icon>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 class="grey--text text--darken-3 py-5">
          SHOP
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>

        <v-card color="cyan darken-2" class="white--text">
          <v-container class="pt-3 px-3 pb-0">
            <v-layout row>
              <v-flex xs9>
                <div>
                  <div class="headline">Research</div>
                  <div>{{research.amount}}</div>
                </div>
              </v-flex>
              <v-flex xs3 align-end class="text-xs-right">
                <v-icon x-large>memory</v-icon>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-slider
                  v-model="researchRate"
                  max="100"
                  min="0"
                  step="10"
                ></v-slider>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import Clicker from '@/components/Clicker.vue';
    import {Money} from 'ts-money';
    import GameComponent from './GameComponent';

    @Component({
        components: {
            Clicker,
        },
    })
    export default class DataCenter extends GameComponent {
        // @Prop() private name: string;
        private clicksPerSecond: number = 0;
        private researchRate: number = 10;
        private resources: Money;
        private research: Money;

        constructor() {
            super();

            this.resources = this.gameOptions.startingResources;
            this.research = this.gameOptions.startingResearch;

            window.setInterval(() => this.incrementResources(), this.gameOptions.updateRate);
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

</style>

<template>
  <v-container class="px-0 py-0 gre lighten-4">
    <v-layout row>

      <v-jumbotron color="primary" height="200px">
        <v-container fill-height class="py-3">
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3 mb-0">{{requestsPerSecond}}</h3>
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
        <v-card color="warning darken-2" class="white--text">
          <v-container class="py-3">
            <v-layout row>
              <v-flex xs9>
                <div>
                  <div class="headline">Resources</div>
                  <div>{{resources.amount}}</div>
                </div>
              </v-flex>
              <v-flex xs3 align-end class="text-xs-right">
                <v-icon x-large>fas fa-pound-sign</v-icon>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 class="grey--text text--darken-3">

        <v-toolbar
          color="cyan"
          dark
          tabs
        >
          <v-toolbar-title>Server Racks</v-toolbar-title>

          <v-tabs
            v-model="serverTab"
            slot="extension"
            color="transparent"
            fixed-tabs
            slider-color="yellow"
          >
            <v-tab
              v-for="(serverRack, index) in serverRacks"
              :key="index"
              ripple
            >
              {{serverRack.name}}
            </v-tab>
          </v-tabs>
        </v-toolbar>

        <v-tabs-items>
          <v-tab-item
            v-for="(serverRack, index) in serverRacks"
            :key="index"
          >
            <server-rack
              :id="serverRack.id"
              @updatedServerRack="handleUpdatedServer"
            ></server-rack>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>

        <v-card color="accent darken-2" class="white--text">
          <v-container class="pt-3 pb-0">
            <v-layout row>
              <v-flex xs9>
                <div>
                  <div class="headline">Research</div>
                  <div>{{research.amount}}</div>
                </div>
              </v-flex>
              <v-flex xs3 align-end class="text-xs-right">
                <v-icon x-large>fas fa-memory</v-icon>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex>
                <v-slider
                  v-model="researchRate"
                  label="Dev Ops Budget"
                  max="100"
                  min="0"
                  step="10"
                ></v-slider>
              </v-flex>
              <v-flex shrink>
                <p class="title mb-0 pt-1 pl-2">{{researchRate}}%</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Clicker from '@/components/Clicker.vue';
    import ServerRack from '@/components/ServerRack.vue';
    import ServerRackDetails from '@/types/ServerRackDetails';
    import {Money} from 'ts-money';
    import GameComponent from './GameComponent';

    @Component({
        components: {
            ServerRack,
            Clicker,
        },
    })
    export default class DataCenter extends GameComponent {
        // @Prop() private name: string;
        private requestsPerSecond: number = 0;
        private researchRate: number = 10;
        private resources: Money;
        private research: Money;
        private serverTab: number = 0;

        private serverRacks: Array<ServerRackDetails> = [
            {
                id: 1,
                name: 'Alpha',
                strength: 0,
                requestsPerSecond: 0,
                capacity: 0
            }
        ];

        constructor() {
            super();

            this.resources = this.gameOptions.startingResources;
            this.research = this.gameOptions.startingResearch;
        }

        mounted() {
            window.setInterval(() => this.incrementResources(), this.gameOptions.updateRate);
        }

        public handleClick(clicksPerSecond: number) {
            this.totalClicks = clicksPerSecond;
        }

        handleUpdatedServer(details: ServerRackDetails) {
            this.serverRacks = this.serverRacks.map(serverRack => {
                if (details.id === serverRack.id) {
                    serverRack.strength = details.strength;
                    serverRack.requestsPerSecond = details.requestsPerSecond;
                    serverRack.capacity = details.capacity;
                }

                return serverRack;
            })
        }

        public set totalClicks(clicks: number) {
            this.requestsPerSecond = clicks + this.computedClicks;
        }

        public get totalClicks() {
            return this.requestsPerSecond;
        }

        public get computedClicks(): number {
            return this.serverRacks.reduce((acc: number, serverRack) => {
                return acc + serverRack.requestsPerSecond;
            }, 0)
        }

        private incrementResources() {
            const amount = this.gameOptions.resourceRate.multiply(this.requestsPerSecond);

            const resourceSplit = amount.allocate([
                100 - this.researchRate,
                this.researchRate
            ]);

            this.resources = this.resources.add(resourceSplit[0]);
            this.research = this.research.add(resourceSplit[1].multiply(this.gameOptions.researchRate));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

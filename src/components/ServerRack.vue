<template>
  <div class="server-rack">
    <v-container
      fluid
      grid-list-md
      class="px-2 py-2"
    >
      <v-layout row wrap>
        <v-flex
          v-for="(server, index) in servers"
          :key="server.id"
          sm6
        >
          <v-card>
            <v-card-actions class="py-0 accent">
              <h2>{{server.name}}</h2>
              <v-spacer></v-spacer>
              <v-btn flat title="Replace">
                <v-icon>fas fa-retweet</v-icon>
              </v-btn>
              <v-btn flat title="Upgrade">
                <v-icon>fas fa-wrench</v-icon>
              </v-btn>
              <v-btn-toggle v-model="server.mode" mandatory>
                <v-btn flat title="Defend" value="RECIEVE" color="accent">
                  <v-icon>fas fa-shield-alt</v-icon>
                </v-btn>
                <v-btn flat title="Attack" value="SEND" color="accent">
                  <v-icon>fas fa-broadcast-tower</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-card-actions>
            <v-card-text class="px-2">
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-center">
                  <span class="title">{{server.requestsPerSecond}}</span>
                  <br><span class="subtitle text-uppercase">Requests</span>
                </v-flex>
                <v-flex class="text-xs-center">
                  <span class="title">{{server.strength}}</span>
                  <br><span class="subtitle text-uppercase">Power</span>
                </v-flex>
                <v-flex class="text-xs-center">
                  <span class="title">{{server.capacity}}</span>
                  <br><span class="subtitle text-uppercase">Capacity</span>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator';
    import ServerModel from '../models/ServerModel';
    import ServerRackDetails from '@/types/ServerRackDetails';
    import ServersResource from '../services/Servers';
    import GameComponent from '@/components/GameComponent';
    import ServerMode from '../types/ServerMode';

    @Component
    export default class ServerRack extends GameComponent {
        @Prop() private id!: number;

        private servers: Array<ServerModel> = [];

        mounted() {
            this.servers = this.gameOptions.startingServers.map(serverId => ServersResource.serverFactory(serverId));
        }

        @Watch('servers', {immediate: true, deep: true})
        onUpdatedServerRack() {
            const eventData = {
                id: this.id,
                strength : this.servers.reduce((total, server) => total + server.strength, 0),
                requestsPerSecond : this.servers.reduce((total, server) => {
                    return server.mode === ServerMode.Send ? total + server.requestsPerSecond : total;
                }, 0),
                capacity : this.servers.reduce((total, server) => server.mode === ServerMode.Receive ? total + server.capacity : total, 0)
            };

            console.log('watch, serers', eventData);

            this.emitServerUpdate(eventData);
        }

        @Emit('updatedServerRack')
        emitServerUpdate(details: ServerRackDetails) {}
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

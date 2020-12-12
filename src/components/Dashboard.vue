<template>
   <div class="p-grid">
      <!--<div class="p-col-6 p-offset-3" align="center"><h1>Dashboard Component</h1></div><div class="p-col-3" />-->
      <div class="p-col-12 p-mt-2">
         <div class="p-d-flex  p-jc-center">
            <div class="p-mr-2" style="max-width:400px;height:800px;">
               <div class="p-d-flex p-flex-column">
                  <div class="p-mb-2">
                     <Card style="width:400px;height:380px;">
                        <template v-slot:title>
                           My Games
                        </template>
                        <template v-slot:content>
                           <CurrentGame :playerUid="playerUid" :playerName="playerName"/>
                        </template>   
                     </Card>
                  </div>
                  <div class="p-mb-2">
                     <Card style="width:400px;height:380px;">
                        <template v-slot:title>
                           Game List
                        </template>
                        <template v-slot:content>
                              <Gamelist  :playerUid="playerUid" :playerName="playerName"/>
                        </template>   
                     </Card>
                  </div>
               </div>
            </div>
            <div class="p-mr-2" style="max-width:800px;height:800px;">
               <Card style="width:800px;height:800px;">
                  <template v-slot:title>
                     Current Game
                  </template>
                  <template v-slot:content>
                     <Playground  :playerUid="playerUid" :playerName="playerName"/>
                  </template>   
               </Card>
            </div>
            <div class="p-mr-2" style="max-width:200px;height:800px;">
               <Card style="width:400px;height:800px;">
                  <template v-slot:title>
                     Chat
                  </template>
                  <template v-slot:content>
                        <div class="p-grid">
                          <div class="p-col-12">
                              <!--<Gamelist  :playerUid="playerUid" :playerName="playerName"/>-->
                           </div>
                        </div>          
                  </template>   
               </Card>
            </div>                        
         </div>
      </div>
   </div>
</template>

<script>
import firebase from 'firebase';
import '../plugins/firebase'
import Card from 'primevue/card';
import Playground from './Playground'
import Gamelist from './Gamelist'
import CurrentGame from './CurrentGame'


   export default {
      name: 'Dashboard',
      data() {
            return {
               playerUid: -1,
               playerName: ""
            }
      },            
      components: {
         Card,
         Playground,
         Gamelist,
         CurrentGame
      },
      created() {
         var currentUser = firebase.auth().currentUser;
         this.playerUid = currentUser.uid;
         this.playerName = currentUser.displayName;
      },
      methods: {
      }      
   }       
</script>
<template>
   <div class="p-grid">
      <!--<div class="p-col-6 p-offset-3" align="center"><h1>Dashboard Component</h1></div><div class="p-col-3" />-->
      <div class="p-col-12 p-mt-2">
         <div class="p-d-flex  p-jc-center">
            <div class="p-mr-2" style="max-width:400px;height:800px;">
               <Card style="width:400px;height:800px;">
                  <template v-slot:title>
                     My Games
                  </template>
                  <template v-slot:content>
                     <MyGamelist />
                  </template>   
               </Card>
            </div>
            <div class="p-mr-2" style="max-width:800px;height:800px;">
               <Card style="width:800px;height:800px;">
                  <template v-slot:title>
                     Current Game
                  </template>
                  <template v-slot:content>
                     <Playground />
                  </template>   
               </Card>
            </div>
            <div class="p-mr-2" style="max-width:200px;height:800px;">
               <Card style="width:400px;height:800px;">
                  <template v-slot:title>
                     Game List
                  </template>
                  <template v-slot:content>
                        <div class="p-grid">
                          <div class="p-col-12">
                              <Gamelist />
                           </div>                             <div class="p-col-12">
                              <Button label="Start" @click="startGame" />
                           </div>
                           <div class="p-col-12">
                              <Button label="Draw" @click="drawCards" />
                           </div>                  
                           <div class="p-col-12">
                              <Button label="Add" @click="addCard" />
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
import Card from 'primevue/card';
import Playground from './Playground'
import Button from 'primevue/button';
import Gamelist from './Gamelist'
import MyGamelist from './MyGamelist'


   export default {
      name: 'Dashboard',
      components: {
         Card,
         Playground,
         Gamelist,
         MyGamelist,
         Button
      },
      methods: {
         startGame() {
            this.emitter.emit("start-game");
         },
         drawCards() {
            this.emitter.emit("draw-cards");
         },
         addCard() {
            this.emitter.emit("add-cards", 3);
         }
      }      
   }       
</script>
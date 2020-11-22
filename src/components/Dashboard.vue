<template>
   <div class="p-grid">
      <div class="p-col-6 p-offset-3" align="center"><h1>Dashboard Component</h1></div><div class="p-col-3" />
      <div class=p-col-12 >
         <div class="p-d-flex  p-jc-center">
            <div class="p-mr-2" style="max-width:200px;height:800px;">
               <Card style="max-width:400px;height:800px;">
                  <template v-slot:title>
                     Left
                  </template>
                  <template v-slot:content>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                     quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                  </template>   
               </Card>
            </div>
            <div class="p-mr-2" style="max-width:800px;height:800px;">
               <Card style="width:800px;height:800px;">
                  <template v-slot:title>
                     Center
                  </template>
                  <template v-slot:content>
                     <Playground />
                  </template>   
               </Card>
            </div>
            <div class="p-mr-2" style="max-width:200px;height:800px;">
               <Card style="width:400px;height:800px;">
                  <template v-slot:title>
                     Right
                  </template>
                  <template v-slot:content>
                        <div class="p-grid">
                           <div class="p-col-12">
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


   export default {
      name: 'Dashboard',
      components: {
         Card,
         Playground,
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
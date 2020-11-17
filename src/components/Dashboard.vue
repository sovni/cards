<template>
   <div class="p-grid">
      <div class="p-col-6 p-offset-3" align="center"><h1>Dashboard Component</h1></div><div class="p-col-3" />
      <div class=p-col-12 >
         <div class="p-d-flex  p-jc-center">
            <div class="p-mr-2" style="max-width:200px;height:800px;">
               <Card style="max-width:200px;height:800px;">
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
               <Card style="max-width:800px;height:800px;">
                  <template v-slot:title>
                     Center
                  </template>
                  <template v-slot:content>
                     <Playground />
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                     quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                  </template>   
               </Card>
            </div>
            <div class="p-mr-2" style="max-width:200px;height:800px;">
               <Card style="max-width:200px;height:800px;">
                  <template v-slot:title>
                     Right
                  </template>
                  <template v-slot:content>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                     quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                  </template>   
               </Card>
            </div>                        
         </div>
      </div>
      <div class="p-col-3">
         <Card>
            <template v-slot:title>
               Left
            </template>
            <template v-slot:content>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
               quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </template>   
         </Card>
      </div>
      <div class="p-col-6">
         <div class="p-d-inline-flex"  p-jc-center>
         <Card style="width:600px;height=800px;">
            <template v-slot:title>
               Center
            </template>

            <template v-slot:content>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
               quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </template>   
         </Card>
      </div>
      </div>
      <div class="p-col-3">
         <Card>
            <template v-slot:title>
               Right
            </template>

            <template v-slot:content>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
               quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </template>   
         </Card>
      </div>
   </div>
</template>

<script>
import Card from 'primevue/card';
import Playground from './Playground'



   export default {
      name: 'Dashboard',
      components: {
         Card,
         Playground
      }
   }       
</script>
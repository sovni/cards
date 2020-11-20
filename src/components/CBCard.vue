<template>
    <img class='card' v-bind:src="getImg(card)" v-bind:style="getStyle()"/>

</template>

<script>
    export default {
        name: 'CBCard',
        components: {
        },
        props: ['suit', 'rank', 'radius', 'spacing', 'width'],      

        methods: {
        }        
    }
</script>
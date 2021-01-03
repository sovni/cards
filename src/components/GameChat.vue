<template>
    <Card v-if="playId != -1" style="width:400px;height:800px;">
        <template v-slot:title>
            Chat
        </template>
        <template v-slot:content>
            <div class="p-d-flex p-flex-column" style="width:100%;height:100%">
                <div class="p-mb-2" style="width: 100%">          
                    <div class="p-mb-2">          
                        <ScrollPanel style="width: 100%; height: 100%;height: 450px;">
                            <!--<div
                                class="border pl-2 pt-1 ml-1 message-text mb-1"
                                v-for="message in messages"
                                :key="message"
                            >
                                <span class="mg-text">{{ message.username }}</span>
                                <p class="pt-0">{{ message.text }}</p>
                            </div>-->
                            <div  v-for="message in messages" :key="message">
                                <Divider align="center">
                                    <span class="p-tag">{{ message.username }}</span>
                                </Divider>
                                <div>{{ message.text }}</div>
                            </div>

                        </ScrollPanel >
                    </div> 
                    <div class="p-mb-2">          
                        <form @submit.prevent="sendMessage">
                            <InputText v-model="showMessage" type="text" class="p-mt-4 p-inputtext-sm" style="width: 70%;"/>
                            <Button label="Envoyer" class="p-button-sm p-ml-4"  @click="sendMessage()"/>
                        </form>
                    </div> 
                </div> 
                <div class="p-mt-2">          
                    <Button label="😄" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('😄')"/>
                    <Button label="🤣" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('🤣')"/>
                    <Button label="😉" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('😉')"/>
                    <Button label="😒" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('😒')"/>
                    <Button label="😕" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('😕')"/>
                    <Button label="😭" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('😭')"/>
                    <Button label="😠" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('😠')"/>
                    <Button label="👏" class="p-button-sm p-button-raised p-button-text p-mb-1 p-button-rounded"  @click="addMessage('👏')"/>
                    <Button label="Bien joué !" class="p-button-sm p-button-success p-m-1 p-button-rounded"  @click="addMessage('Bien joué !')"/>
                    <Button label="Bonne partie !" class="p-button-sm p-button-success p-m-1 p-button-rounded"  @click="addMessage('Bonne partie !')"/>
                    <Button label="C'te chance !" class="p-button-sm p-button-warning p-m-1 p-button-rounded"  @click="addMessage('C\'te chance !')"/>
                    <Button label="Tu es sûr de toi là ?" class="p-button-sm p-button-warning p-m-1 p-button-rounded"  @click="addMessage('Tu es sûr de toi là ?')"/>
                    <Button label="Tu me fends le coeur" class="p-button-sm p-button-danger p-m-1 p-button-rounded"  @click="addMessage('!!! ATTENTION !!!! TENTATIVE DE TRICHE DE CE JOUEUR !!!')"/>
                    <Button label="Oulaaa, ça pique" class="p-button-sm p-button-danger p-m-1 p-button-rounded"  @click="addMessage('!!! ATTENTION !!!! TENTATIVE DE TRICHE DE CE JOUEUR !!!')"/>
                    <Button label="Me laisse pas sur le carreau" class="p-button-sm p-button-danger p-m-1 p-button-rounded"  @click="addMessage('!!! ATTENTION !!!! TENTATIVE DE TRICHE DE CE JOUEUR !!!')"/>
                </div> 
            </div>
        </template>   
    </Card>  
</template>
<style>
.mg-text {
    color: rgb(0, 195, 255);
    font-weight: bolder;
}
</style>
<script>
import firebase from 'firebase';
import ScrollPanel from 'primevue/scrollpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

    export default {
    name: "GameChat",
    data() {
        return {
            userName: "",
            name: null,
            showMessage: "",
            playId: -1,
            messages: []
        };
    },
    props: ['playerId'],      
    components: {
        ScrollPanel,
        InputText,
        Button,
        Card,
        Divider
    },
    methods: {
        getUserName(){
            this.currentUser = firebase.auth().currentUser;
            if (!this.currentUser)
               return "";
            return this.currentUser.displayName.split(" ")[0];
        },      
        updateUsername() {
            this.name = this.userName;
            console.log(this.userName);
            this.userName = "";
        },
        sendMessage() {
            if (this.playId != -1) {
                const message = {text: this.showMessage, username: this.name};
                firebase.database().ref('chat/' + this.playId + '/messages').push(message);
                this.showMessage = "";
            }
        },
        addMessage(txt) {
            if (this.playId != -1) {
                const message = {text: txt, username: this.name};
                firebase.database().ref('chat/' + this.playId + '/messages').push(message);
                this.showMessage = "";
            }
        }},
    mounted() {
        this.emitter.on("select-play", (uid) => {
            let viewMessage = this;
            this.playId = uid;
            viewMessage.messages = [];
            this.name = this.getUserName();

            const itemsRef = firebase.database().ref('chat/' + this.playId + '/messages');
            itemsRef.on("value", snapshot => {
                let data = snapshot.val();
                let messages = [];
                if (data != null) {
                    Object.keys(data).forEach(key => {
                        messages.unshift({
                        id: key,
                        username: data[key].username,
                        text: data[key].text
                        });
                    });
                    viewMessage.messages = messages;
                }
            });
        });    
    }
};
</script>
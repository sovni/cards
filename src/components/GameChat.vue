<template>
    <Card style="width:400px;height:800px;">
        <template v-slot:title>
            Chat
        </template>
        <template v-slot:content>
            <div class="p-grid">
                <div class="p-col-12">          
                    <div id="chat" style="width:100%;height:650px">
                        <ScrollPanel style="width: 100%; height: 100%">
                            <div
                                class="border pl-2 pt-1 ml-2 message-text mb-2"
                                v-for="message in messages"
                                :key="message"
                            >
                                <span class="mg-text">{{ message.username }}</span>
                                <p class="message pt-0">{{ message.text }}</p>
                            </div>
                        </ScrollPanel >
                        <form @submit.prevent="sendMessage">
                            <InputText v-model="showMessage" type="text" class="p-mt-4 p-inputtext-sm" style="width: 70%;"/>
                            <Button label="Envoyer" class="p-button-sm p-ml-4"  @click="sendMessage()"/>
                        </form>
                    </div>
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
        Card
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
    }
  },
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
              Object.keys(data).forEach(key => {
                messages.unshift({
                  id: key,
                  username: data[key].username,
                  text: data[key].text
                });
              });
              viewMessage.messages = messages;
            });
        });    
    }
};
</script>
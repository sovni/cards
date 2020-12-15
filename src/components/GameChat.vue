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
                  <InputText v-model="showMessage" type="text" class="p-mt-4 p-inputtext-sm" style="width: 70%;"/>
                  <Button label="Send" class="p-button-sm p-ml-4"  @click="sendMessage()"/>
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
/*@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons");
#chat {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
}

h3 {
  font-size: 30px;
  text-align: center;
}
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  padding-left: 2px;
  padding-right: 2px;
}
.message-body {
  width: 90%;
  height: 5vh;
  margin: auto;
}
.message-text {
  min-width: 10%;
  border-radius: 4px;
  overflow:auto;
}
.message {
  font-size: 14px;
}
.mg-text {
  color: rgb(0, 195, 255);
  font-weight: bolder;
}
.message-body input {
  width: 80%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  height: 3vh;
  padding-left: 2px;
  padding-right: 2px;
}
.card {
  width: 100%;
  margin: auto;
  overflow:auto;
}
.card-body {
  min-height: 60vh;
  overflow-x: scroll;
  overflow:auto;
}*/
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
      const message = {
        text: this.showMessage,
        username: this.name
      };
      firebase
        .database()
        .ref("messages")
        .push(message);
      this.showMessage = "";
    }
  },
  mounted() {
    let viewMessage = this;
    this.name = this.getUserName();

    const itemsRef = firebase.database().ref("messages");
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
  }
};
</script>
<template>
  <div id="chat" style="width:100%;height:400px">
    <!-- Login section -->

    <!-- Chat section -->
    <div class="message-body mt-3">
      <h5>Welcome {{ name }}!</h5>
      <div class="card" style="width:100%;height:600px">
        <div class="card-body" style="width:100%;height:600px">
          <div
            class="border pl-2 pt-1 ml-2 message-text mb-2"
            v-for="message in messages"
            :key="message"
          >
            <span class="mg-text">{{ message.username }}</span>
            <p class="message pt-1">{{ message.text }}</p>
          </div>
        </div>
      </div>
      <input v-model="showMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
      <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons");
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
}
.card-body {
  min-height: 60vh;
  overflow-x: scroll;
  overflow:auto;
}
</style>
<script>
import firebase from 'firebase';
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
    methods: {
        getUserName(){
            this.currentUser = firebase.auth().currentUser;
            if (!this.currentUser)
               return "";
            return this.currentUser.displayName;
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
        messages.push({
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
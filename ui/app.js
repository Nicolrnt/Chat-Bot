Vue.component("message-in-el", {
  props: ['msg'],
  template: `
    <div class="incoming_msg">
      <div class="incoming_msg_img"> <img src="https://avatars2.githubusercontent.com/u/25687296?s=460&v=4" alt="sunil"> </div>
      <div class="received_msg">
        <div class="received_withd_msg">
          <p>{{ msg }}</p>
          <span class="time_date"> 11:01 AM    |    June 9</span>
        </div>
      </div>
    </div>
  `
});

Vue.component('message-out-el', {
  props: ['msg'],
  template: `
  <div class="outgoing_msg">
    <div class="sent_msg">
      <p>{{ msg }}</p>
      <span class="time_date"> 11:01 AM    |    June 9</span>
    </div>
  </div>
  `
});

Vue.component("message-el", {
  props: ['msg', 'src'],
  template: `
    <div v-if="src === 'in'">
      <message-in-el :msg="msg"></message-in-el>
    </div>
    <div v-else-if="src === 'out'">
      <message-out-el :msg="msg"></message-out-el>
    </div>
  `
});

new Vue({
  el: '#messages',
  data: function () {
    return ({
      items: []
      /*
      items: [
        { id: 1, message: 'Hello', source: 'in'},
        { id: 1, message: 'Hello', source: 'out'},
        { id: 1, message: 'Hello', source: 'in'},
        { id: 1, message: 'Hello', source: 'out'},
      ],
      msgToSend: "yolo"
      */
    });
  },
  methods: {
    sendMsg: function(val) {
      alert('> Send :', val);
    }
  },
  created: function() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const endPoint = 'https://chat-bot.area-project.ovh';
    const route = '/getHistory';
    const sessionId = '12345';

    // fetch(proxy + endPoint + route + "?sessionId=" + sessionId)
    fetch(endPoint + route + "?sessionId=" + sessionId)
      .then(response => response.json())
      .then(json => {
        const tmp = [];

        json.forEach(item => {
          tmp.push({
            id: 1,
            message: item.msg,
            source: item.source
          });
        });
        this.items = tmp;
      });
  }
})

var vm = new Vue({
  el: '#form',
  data: function () {
    return ({
      message: ''
    });
  },
  methods: {
    sendMessage: function() {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const endPoint = 'https://chat-bot.area-project.ovh';
      const route = '/sendMessage';
      const sessionId = '12345';
      const msg = this.$data.message;

      fetch(endPoint + route + '?sessionId=' + sessionId + '&msg=' + msg);
    }
  }
});

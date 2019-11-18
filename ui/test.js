// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

new Vue({ el: '#components-demo' })

new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

var store = {vital:''};
vm = new Vue({
  el : "#vueRoot",
  data : {
    store: store,
    message: ''
  },
  methods : {
    submit : function(){
      alert('Ok');
      this.$refs.form.submit();
    }
  }
});

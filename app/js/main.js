// Vue.component('fm-input-el', {
//   props: ['input', 'index', 'value'],
//   template: '#fm-input-el',
//   methods: {
//     upcount: function(index) {
//       this.$dispatch('count', index);
//     },
//     getValue: function() {
//       console.log(this.value);
//     }
//   }
// });

// new Vue({
//   el: '#form1',

//   data: {
//     inputs: [
//         { value: "", id: "first-name", name: "first-name", label: "First Name", placeholder: "a", msg: 0},
//         { value: "", id: "last-name",  name: "last-name",  label: "Surname",    placeholder: "b", msg: 0}
//       ]
//   },
//   methods: {
//     submit: function() {
//       var data = {
//         "firstName": this.inputs[0].value,
//         "lastName" : this.inputs[1].value
//       }

//       this.$http.post('http://localhost:8080/services/customers', JSON.stringify(data))
//       .then(function(response) {
//         this.$http.get('http://localhost:8080/services/customers', function(customers) {
//           console.log(customers);

//           this.inputs[0].value = "";
//           this.inputs[1].value = "";
//         });
//       });

//     }
//   },
//   events: {
//     count: function(index) {
//       this.inputs[index].msg++;
//     }
//   }

// });

var app = new Vue({
  el:'#app',
  data:{
    message:'Todo List',
    imgfb:'',
    items:[]
  },
  methods:{
    addtodo:function(payload){
      console.log(payload);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/additems/',
        headers:{
          token:localStorage.token,
          title:payload.judul,
          descripsi:payload.deskripsi
        },
        success: function(resp) {
          window.location.reload()
        },
        error: function(error) {
          console.error('Failed send to server');
          console.log(error);
        }
      })
    },
    deletetodo:function(id){
      $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/${id}`,
        success: function(resp) {
        },
        error: function(error) {
          console.error('Failed send to server');
          console.log(error);
        }
      })
    },
    finish:function (id) {
      for (var i = 0; i < this.items.length; i++) {
        if(this.items[i]._id === id){
          if(this.items[i].done){
            this.items[i].done=false
            $.ajax({
              type: 'PUT',
              url: `http://localhost:3000/${id}`,
              data:{
                done:false
              },
              success: function(resp) {
              },
              error: function(error) {
                console.error('Failed send to server');
                console.log(error);
              }
            })
          }else{
            this.items[i].done=true
            $.ajax({
              type: 'PUT',
              url: `http://localhost:3000/${id}`,
              data:{
                done:true
              },
              success: function(resp) {
              },
              error: function(error) {
                console.error('Failed send to server');
                console.log(error);
              }
            })
          }
        }
      }
     }
  },
  created:function () {
    axios.get(`http://localhost:3000/showitem/`,
      {
        headers: {
          token: localStorage.token,
          tokenfb: localStorage.tokenfb
       }
     })
      .then(response =>{
          this.items=response.data
          this.imgfb=response.data[0].itemsuserid.picture
          console.log(this.items);
      })
      .catch(err => {
        console.log(err)
      })
   },
   updated:function () {
     axios.get(`http://localhost:3000/showitem/`,
       {
         headers: {
           token: localStorage.token,
           tokenfb: localStorage.tokenfb
        }
      })
       .then(response =>{
           this.items=response.data
           this.imgfb=response.data[0].itemsuserid.picture
           console.log(this.items);
       })
       .catch(err => {
         console.log(err)
       })
    },
});

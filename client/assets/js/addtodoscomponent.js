Vue.component('todos',{
  template:`<div id="firstModal" class="reveal-modal" data-reveal aria-labelledby="firstModalTitle" aria-hidden="true" role="dialog">
    <form class="" action="index.html" method="POST">
      <input type="text" v-model='title' value="" placeholder='masukan title'>
      <input type="text" v-model='descripsi' placeholder="masukan description">
      <a v-on:click="addtodos()" class="radius button close-reveal-modal">Insert todos</a>
    </form>
  </div>`,
  data:function(){
    return{
      title:'',
      descripsi:'',
    }
  },
  methods :{
    addtodos:function(){
      this.$emit('tambahtodo',{
        judul:this.title,
        deskripsi:this.descripsi
      })
    }
  }
})

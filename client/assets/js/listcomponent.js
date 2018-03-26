Vue.component('items',{
  template:`
  <div class='radius small-12 large-12 columns' style='margin:10px; border:1px solid #aaa;' align="center">
    <div class="bungkus" v-if="item.done">
      <div class="disabled">
        <img :src='item.picture' alt='image' style='width:100%;'>
        <center> <strike><h3><i>{{item.title}}</i></h3></strike></center>
        <strike><p>{{item.descripsi}}</p></strike>
      </div>
        <button class='button alert small-6 large-6 columns' v-on:click="deleteitem(item._id)">Delete</button>
        <div class="switch small-4 large-small-2 large-4 large-offset-2 columns">
        <input :id="item._id" v-on:click="finish(item._id)" type="checkbox" checked>
        <label :for="item._id"></label>
      </div>
    </div>
    <div class="bungkus" v-else>
      <img :src='item.picture' alt='image' style='width:100%;'>
      <h3 id="judul" class='small-12 large-12 columns'>{{item.title}}</h3>
      <p class='small-12 large-12 columns'>{{item.descripsi}}</p>
      <button class='button alert small-6 large-6 columns' v-on:click="deleteitem(item._id)">Delete</button>
      <div class="switch small-4 large-small-2 large-4 large-offset-2 columns">
        <input :id="item._id" v-on:click="finish(item._id)" type="checkbox">
        <label :for="item._id"></label>
      </div>
    </div>
  </div>
  `,
  props:['item'],
  methods :{
    deleteitem:function(item){
      this.$emit('deletetodo',item)
    },
    finish:function(item){
      this.$emit('finishtodo',item)
    },
  }
})

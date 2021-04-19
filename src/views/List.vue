<template>
  <div class="about">
    <show-novel :novelList="novelList" @remove-fromlist="removeFromList"></show-novel>
  </div>
</template>

<script>

import ShowNovel from "../components/ShowNovel.vue";
export default {
  components: {
    ShowNovel
  },
  data() {
    return {
      dataLink: "http://localhost:5000/novel",
      novelList:[],
      have: false
    };
  },
  methods:{
    async fetchNovel(){
      const res = await fetch("http://localhost:5000/novel")
      const data = await res.json();
      return data
    },
    async removeFromList(deleteId) {
      console.log(deleteId);
      const res = await fetch(`${this.dataLink}/${deleteId}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.novelList = this.novelList.filter((n) => n.id !== deleteId))
        : alert("Error to Delete");
      if (this.novelList[0] == null) {
        this.changeHave(false)
      }
    },
    changeHave(boolean){
      this.have = boolean
    }
  },
  async created(){
      this.novelList =  await this.fetchNovel();
    }
};
</script>
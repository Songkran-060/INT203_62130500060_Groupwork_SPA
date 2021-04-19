<template>
  <div class="about">
    <show-novel :novelList="novelList"></show-novel>
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
      novelList:[]
    };
  },
  methods:{
    async fetchNovel(){
      const res = await fetch("http://localhost:5000/novel")
      const data = await res.json();
      return data
    },
  },
  async created(){
      this.novelList =  await this.fetchNovel();
    }
};
</script>
<template>
  <div class="grid grid-cols-2 auto-rows-auto gap-10 p-10">
    <div v-for="n in novelList" :key="n.id">
      <p>
        <span>{{ n.id }}. {{ n.name }}</span> By <span>{{ n.writer }}</span>
        <span>( ISBN: {{ n.isbn }} )</span>&nbsp;
        <span class="far fa-edit text-green-400"></span>&nbsp;
        <span class="far fa-trash-alt text-red-400"></span>
      </p>
      <div class="flex flex-row gap-8">
        <img v-bind:src="n.imgSrc" class="" style="height:180px;" />
        <p class="text-justify">{{ n.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    novelList: {
      type: Array,
      require: true,
    },
  },
};
</script>

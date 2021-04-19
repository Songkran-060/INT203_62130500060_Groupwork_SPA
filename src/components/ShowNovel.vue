<template>
  <div class="mx-auto max-w-2xl">
    <form @submit.prevent="submitForm">
      <base-card>
        <label class="label" for="name">Novel name: </label>
        <input
          class="input border-2 rounded-md w-full"
          :class="{ 'bg-red-50': invalidNameInput }"
          id="name"
          type="text"
          v-model.trim="name"
          @blur="validateName"
        />
        <p v-if="invalidNameInput" class="text-red-500">
          Please enter novel name!
        </p>
      </base-card>
      <br />
      <base-card>
        <label class="label" for="description">Novel description: </label>
        <textarea
          class="input border-2 rounded-md w-full h-64"
          :class="{ 'bg-red-50': invalidDescriptionInput }"
          id="description"
          type="text"
          v-model.trim="description"
          @blur="validateDescription"
        />
        <p v-if="invalidDescriptionInput" class="text-red-500">
          Please enter novel description!
        </p>
      </base-card>
      <br />
      <base-card>
        <label class="label" for="writer">Novel writer: </label>
        <input
          class="input border-2 rounded-md w-full"
          :class="{ 'bg-red-50': invalidWriterInput }"
          id="writer"
          type="text"
          v-model.trim="writer"
          @blur="validateWriter"
        />
        <p v-if="invalidWriterInput" class="text-red-500">
          Please enter novel writer!
        </p>
      </base-card>
      <br />
      <base-card>
        <label class="label" for="isbn">Novel ISBN: </label>
        <input
          class="input border-2 rounded-md w-full"
          :class="{ 'bg-red-50': invalidIsbnInput }"
          id="isbn"
          type="text"
          v-model.trim="isbn"
          @blur="validateIsbn"
        />
        <p v-if="invalidIsbnInput" class="text-red-500">
          Please enter novel isbn!
        </p>
      </base-card>
      <br />
      <button class="btn">Submit</button>
    </form>
  </div>
  <div class="grid grid-cols-2 auto-rows-auto gap-10 p-10">
    <div v-for="n in novelList" :key="n.id">
      <p>
        <span>{{ n.id }}. {{ n.name }}</span> By <span>{{ n.writer }}</span>
        <span> ( ISBN: {{ n.isbn }} )</span>&nbsp;
        <span class="far fa-edit text-green-400" @click="showData(n)"></span
        >&nbsp;
        <span
          class="far fa-trash-alt text-red-400"
          @click="removeList(n.id)"
        ></span>
      </p>
      <div class="flex flex-row gap-8">
        <!-- <img v-bind:src="n.imgSrc" class="" style="height:180px;" /> -->
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
  data() {
    return {
      isEdit: false,
      id: "",
      dataLink: "http://localhost:5000/novel",
      editName: "",
      name: "",
      description: "",
      writer: "",
      isbn: "",
      result: [],
      show: false,
      invalidNameInput: false,
      invalidDescriptionInput: false,
      invalidWriterInput: false,
      invalidIsbnInput: false,
    };
  },
  methods: {
    submitForm() {
      this.invalidNameInput = this.name === "" ? true : false;
      this.invalidDescriptionInput = this.description === "" ? true : false;
      this.invalidWriterInput = this.writer === "" ? true : false;
      this.invalidIsbnInput = this.isbn === "" ? true : false;

      console.log(`name value: ${this.name}`);
      console.log(`description value: ${this.description}`);
      console.log(`writer value: ${this.writer}`);
      console.log(`isbn value: ${this.isbn}`);
      console.log(`invalid name: ${this.invalidNameInput}`);
      console.log(`invalid description: ${this.invalidDescriptionInput}`);
      console.log(`invalid writer: ${this.invalidWriterInput}`);
      console.log(`invalid isbn: ${this.invalidIsbnInput}`);

      if (
        this.name !== "" &&
        this.description !== "" &&
        this.writer !== "" &&
        this.isbn !== ""
      ) {
        // this.surveyResults.push({
        //   name: this.enteredName,
        //   rating: this.rating
        // })

        if (this.isEdit) {
          this.editContent({
            id: this.id,
            name: this.name,
            description: this.description,
            writer: this.writer,
            isbn: this.isbn,
          });
        } else {
          this.addNewNovel({
            name: this.name,
            description: this.description,
            writer: this.writer,
            isbn: this.isbn,
          });
        }
      }
      this.name = "";
      this.description = "";
      this.writer = "";
      this.isbn = "";
      // console.log(
      //   `name: ${this.surveyResults[0].name} rating ${this.surveyResults[0].rating}`
      // )
    },
    validateName() {
      this.invalidNameInput = this.name === "" ? true : false;
      console.log(`name: ${this.invalidNameInput}`);
    },
    validateDescription() {
      this.invalidDescriptionInput = this.description === "" ? true : false;
      console.log(`description: ${this.invalidDescriptionInput}`);
    },
    validateWriter() {
      this.invalidWriterInput = this.writer === "" ? true : false;
      console.log(`writer: ${this.invalidWriterInput}`);
    },
    validateIsbn() {
      this.invalidIsbnInput = this.isbn === "" ? true : false;
      console.log(`isbn: ${this.invalidIsbnInput}`);
    },
    async removeList(deleteId) {
      console.log(deleteId);
      this.$emit("remove-fromlist", deleteId);
    },
    async showData(oldData) {
      this.isEdit = true;
      this.id = oldData.id;
      this.name = oldData.name;
      this.description = oldData.description;
      this.writer = oldData.writer;
      this.isbn = oldData.isbn;
    },
    async editContent(editingNovel) {
      console.log(editingNovel);
      try {
        const res = await fetch(`${this.dataLink}/${editingNovel.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: editingNovel.name,
            description: editingNovel.description,
            writer: editingNovel.writer,
            isbn: editingNovel.isbn,
            id: editingNovel.id,
          }),
        });
        const data = await res.json();
        this.result = this.result.map((n) =>
          n.id === editingNovel.id
            ? {
                ...n,
                name: data.name,
                description: data.description,
                writer: data.writer,
                isbn: data.isbn,
                id: data.id,
              }
            : n
        );
        this.isEdit = false;
        this.id = "";
        this.name = "";
        this.description = "";
        this.writer = "";
        this.isbn = "";
        location.reload();
      } catch (error) {
        console.log(`Could not edit! ${error}`);
      }
    },
    async addNewNovel(newNovel) {
      try {
        const res = await fetch(this.dataLink, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: newNovel.name,
            description: newNovel.description,
            writer: newNovel.writer,
            isbn: newNovel.isbn,
          }),
        });
        const data = await res.json();
        this.result = [...this.result, data];
        location.reload();
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },
};
</script>

<template>
  <div class="comment-section">
    <h3>Comments</h3>
    <textarea
      v-model="newComment"
      placeholder="Add a comment"
      class="comment-area"
    />
    <button class="submit-btn" @click="addComment">Submit</button>
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        {{ comment }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommentCom",
  data() {
    return {
      comments: [],
      newComment: "",
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim() !== "") {
        this.comments.push(this.newComment);
        this.newComment = "";
      }
    },
  },
};
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
}

.comment-area {
  border-radius: 0.25em;
  border-color: grey;
  border-width: 0.15em;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.comment-area::placeholder {
  font-family: "SUITE";
  color: grey;
  padding: 0.25em;
}

.submit-btn {
  border-radius: 0.25rem;
  background-color: rgb(195, 195, 195);
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  border-color: transparent;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f0f0f0;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
}
</style>

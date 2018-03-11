<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <Child-one :parentMessage="parentMessages"></Child-one>
    <button @click="fetchData">点击获取测试数据</button>

    <br>
     <Child-two @childEvent="parentMethod"></Child-two>
  </div>
</template>

<script>
import ChildOne from "./child";
import ChildTwo from "./childtwo";
export default {
  name: "HelloWorld",
  components: {
    ChildOne,
    ChildTwo
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      parentMessages: "我是来自父组件的消息"
    };
  },
  methods: {
    fetchData: async function() {
      let params = {};
      const res = await this.$ajax.get("/v2/movie/subject/1764796 ", params);
      if (res.data.success) {
        alert("请求成功");
      }
      const resd = await this.$ajax.post("/v2/movie/subject/1764796 ", params);
      if (resd.data.success) {
        alert("请求成功");
      }
    },
    parentMethod({ name, age }) {
      
      console.log(this.parentMessage, name, age);
    }
    // console.log(Vue.prototype.$http)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

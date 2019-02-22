<template>
  <div>
    <!-- <div class="return-top">
      <a href="#table-filter">
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
          <i class="material-icons">arrow_upward</i>
        </button>
      </a>
    </div>-->
    <table v-show="!isLoading" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <!-- <th
            class="mdl-data-table__header--sorted-ascending"
            v-bind:class="{red: sort==='id'}"
            @click="changeSort('id')"
          >ID</th>-->
          <th
            class="mdl-data-table__cell--non-numeric mdl-data-table__header--sorted-ascending"
            v-bind:class="{red: sort==='id'}"
            @click="changeSort('id')"
          >时间</th>
          <!-- <th class="mdl-data-table__cell--non-numeric text-column">类型</th> -->
          <th class="mdl-data-table__cell--non-numeric text-column">预览</th>
          <th class="mdl-data-table__cell--non-numeric text-column">微博内容</th>
          <th class="mdl-data-table__cell--non-numeric">作者</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: sort==='hot_val'}"
            @click="changeSort('hot_val')"
          >热度
            <div id="header-hot_value" class="icon material-icons">
              <i class="material-icons">help</i>
            </div>
            <div class="mdl-tooltip" data-mdl-for="header-hot_value">约定：热度 = 转发 / 平均转发</div>
          </th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: sort==='reposts_count'}"
            @click="changeSort('reposts_count')"
          >转发</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: sort==='comments_count'}"
            @click="changeSort('comments_count')"
          >评论</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: sort==='attitudes_count'}"
            @click="changeSort('attitudes_count')"
          >赞</th>
          <th class="mdl-data-table__cell--non-numeric">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weibo in tableData" :key="weibo.id">
          <!-- <td>{{weibo.id}}</td> -->
          <td
            class="mdl-data-table__cell--non-numeric"
          >{{weibo.abs_time ? $dayjs(weibo.abs_time * 1000).fromNow() : weibo.created_at}}</td>
          <!-- <td
            class="mdl-data-table__cell--non-numeric"
          >{{weibo.page_info_type ? {video: '视频', article: '文章', topic: '话题', webpage: '视频网页', live: '直播'}[weibo.page_info_type] : '普通微博'}}</td>-->
          <td class="mdl-data-table__cell--non-numeric td-weibo-page-pic">
            <img
              v-if="weibo.page_pic"
              class="weibo-page-pic"
              :src="weibo.page_pic"
              :id="'page-pic-' + weibo.id"
              alt
            >
            <img
              v-else
              :src="weibo.pics[0]"
              class="weibo-page-pic"
              :id="'page-pic-' + weibo.id"
              alt
            >
          </td>
          <td class="mdl-data-table__cell--non-numeric text-column">
            <span v-html="weiboTextProcess(weibo.text)" :id="'weibo-text-' + String(weibo.id)"></span>
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{weibo.user}}</td>
          <td>{{parseInt(weibo.hot_val * 100) + '%'}}</td>
          <td>{{weibo.reposts_count}}</td>
          <td>{{weibo.comments_count}}</td>
          <td>{{weibo.attitudes_count}}</td>
          <td class="mdl-data-table__cell--non-numeric">
            <a :href="weibo.scheme" target="_blank" rel="noopener noreferrer">
              <button class="mdl-button mdl-js-button mdl-js-ripple-effect">原文</button>
            </a>
            <button
              class="mdl-button mdl-js-button mdl-js-ripple-effect"
              @click="$emit('recommend', weibo)"
            >推荐</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: Array,
    isLoading: Boolean,
    sort: String
  },
  data() {
    return {};
  },
  methods: {
    weiboTextProcess(text) {
      const pattern = '...<a href="/status/';
      if (text.indexOf(pattern) > 0) {
        text = text.replace(
          pattern,
          '...<a target="_blank" href="https://m.weibo.cn/status/'
        );
      }
      return text;
    },
    changeSort(val) {
      // this.sort = val;
      this.$emit("change-sort", val);
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  white-space: normal !important;
}
#header-hot_value i {
  font-size: 1rem;
  color: gray;
}
.text-column {
  max-width: 480px;
}
.text-column span {
  line-height: 1.5rem;
}
.weibo-page-pic {
  width: 120px;
  transition: all 0.5s;
  /* cursor: zoom-in; */
  /* height: 120px; */
}
/* .weibo-page-pic:hover {
  width: 480px;
} */
.red {
  color: #f44235 !important;
}
</style>

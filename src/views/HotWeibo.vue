<template>
  <div>
    <div class="mdl-card mdl-shadow--2dp table-filter-container">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
          <div class="filter-label">筛选：</div>
          <select class="user-filter" v-model="reqParams.user" v-on:change="fetchData(reqParams)">
            <option v-for="(value, key) in userFilter" :key="key" :value="value">{{value}}</option>
          </select>
          <button
            class="export-xlsx mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            :disabled="isLoading"
            @click="generateCSV"
          >导出 .xlsx</button>
          <div
            class="requested-at"
          >数据更新于 {{requested_at ? $dayjs(requested_at * 1000).fromNow() : ''}}</div>
        </div>
        <div class="mdl-cell mdl-cell--4-col"></div>
      </div>
    </div>
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th class="mdl-data-table__header--sorted-ascending" @click="changeSort('id')">ID</th>
          <th class="mdl-data-table__cell--non-numeric text-column">微博内容</th>
          <th class="mdl-data-table__cell--non-numeric">作者</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            @click="changeSort('reposts_count')"
          >转发</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            @click="changeSort('comments_count')"
          >评论</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            @click="changeSort('attitudes_count')"
          >赞</th>
          <th class="mdl-data-table__cell--non-numeric">参考发表时间</th>
          <th class="mdl-data-table__cell--non-numeric">原文链接</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weibo in weibo_list" :key="weibo.id">
          <td>{{weibo.id}}</td>
          <td class="mdl-data-table__cell--non-numeric text-column">
            <span v-html="weibo.text"></span>
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{weibo.user}}</td>
          <td>{{weibo.reposts_count}}</td>
          <td>{{weibo.comments_count}}</td>
          <td>{{weibo.attitudes_count}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{weibo.created_at}}</td>
          <td class="mdl-data-table__cell--non-numeric">
            <a :href="weibo.scheme" target="_blank" rel="noopener noreferrer">查看原文</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Json2csvParser from "json2csv";
import saveAs from "file-saver";
import bus from '../bus'

export default {
  name: "HotWeibo",
  data() {
    return {
      isLoading: false,
      userFilter: {
        all: "全部",
        li: "梨视频",
        yishou: "一手Video",
        shijian: "时间视频",
        pengpai: "澎湃新闻",
        women: "新京报我们视频",
        yangshi: "央视新闻",
        xinhua: "新华视点",
        ziniu: "紫牛新闻",
        renren: "人人视频",
        huojian: "火箭视频",
        youtube: "YouTube精彩视频"
      },
      reqParams: {
        sort: "id",
        user: "全部"
      },
      requested_at: 0,
      weibo_list: []
    };
  },
  created() {
    this.fetchData(this.reqParams);
  },
  methods: {
    async fetchData(params) {
      this.isLoading = true;
      const response = await this.$request("/weibo", { params });
      // console.log(response.data);
      this.requested_at = response.data.data.requested_at;
      this.weibo_list = response.data.data.weibo_list;
      this.isLoading = false;
      console.log(this.weibo_list.length)
      bus.$emit('change-badge', this.weibo_list.length)
    },
    changeSort(val) {
      console.log(val);
      this.reqParams.sort = val;
      this.fetchData(this.reqParams);
    },
    generateCSV() {
      const fields = [];
      for (const key in this.weibo_list[0]) {
        fields.push(key);
      }
      // const opts = { fields };
      try {
        const parser = new Json2csvParser.Parser({
          fields,
          withBOM: true
        });
        const csv = parser.parse(this.weibo_list);
        // console.log(csv);
        const filename = `热门微博数据-${this.reqParams.user}-${this.$dayjs(
          this.requested_at * 1000
        ).format("YYYYMMDDHHmmss")}.csv`;
        const blob = new Blob([csv], { type: "text/csv" });
        saveAs(blob, filename);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.table-filter-container {
  /* padding: 16px; */
  min-height: 0;
  height: 52px;
  margin-bottom: 16px;
  width: 100%;
  padding: 8px 8px 8px 24px;
  /* margin: 0; */
}
.table-filter-container > .mdl-grid {
  /* width: 90%; */
  padding: 0;
  margin: 0;
}
.table-filter-container .filter-label,
.user-filter {
  /* width: 50px; */
  line-height: 36px;
  float: left;
}
.requested-at {
  font-size: 0.875rem;
  color: gray;
  line-height: 36px;
  float: right;
  margin-right: 20px;
}
.table-filter-container .mdl-cell.mdl-cell--12-col {
  margin: 0;
}
.export-xlsx {
  float: right;
}
.user-filter {
  height: 36px;
  min-width: 160px;
}
table {
  width: 100%;
  white-space: normal !important;
}
.text-column {
  max-width: 480px;
}
</style>
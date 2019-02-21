<template>
  <div>
    <!-- Component: RecommendDialog -->
    <recommend-dialog></recommend-dialog>
    <!-- Component: TableFilter -->
    <table-filter
      :targets="targets"
      :is-loading="isLoading"
      :requestedat="requested_at"
      v-on:change-target="changeTarget"
      v-on:export-csv="handleExport"
    ></table-filter>
    <!-- Component: LoadingBar -->
    <loading-bar :is-loading="isLoading"></loading-bar>
    <!-- Component: WeiboTable -->
    <weibo-table
      :table-data="weibo_list"
      :is-loading="isLoading"
      v-on:change-sort="changeSort"
      v-on:recommend="handleRecommend"
    ></weibo-table>
  </div>
</template>

<script>
import bus from "../bus";
import TableFilter from "../components/TableFilter";
import WeiboTable from "../components/WeiboTable";
import RecommendDialog from "../components/RecommendDialog";
import LoadingBar from "../components/LoadingBar";
import { generateCSV } from "../utils";

export default {
  name: "HotWeibo",
  components: {
    TableFilter,
    WeiboTable,
    RecommendDialog,
    LoadingBar
  },
  data() {
    return {
      isLoading: false,
      targets: [
        {
          user_id: "all",
          screen_name: "全部"
        }
      ],
      reqParams: {
        sort: "id",
        user: "all"
      },
      requested_at: 0,
      weibo_list: []
    };
  },
  created() {
    this.fetchData(this.reqParams);
    const targets = this.$global.targets;
    for (const target of targets) this.targets.push(target);
  },
  methods: {
    async fetchData(params) {
      this.isLoading = true
      const response = await this.$request('/weibo', { params })
      // console.log(response.data);
      this.requested_at = response.data.data.requested_at
      this.weibo_list = response.data.data.weibo_list
      this.isLoading = false
      // console.log(this.weibo_list.length);
      bus.$emit('change-badge', this.weibo_list.length)
    },
    changeTarget(target) {
      this.reqParams.user = target;
      this.fetchData(this.reqParams);
    },
    changeSort(val) {
      this.reqParams.sort = val;
      this.fetchData(this.reqParams);
    },
    handleExport() {
      const filename = `热门微博数据-${this.reqParams.user}-${this.$dayjs(
        this.requested_at * 1000
      ).format("YYYYMMDDHHmmss")}.csv`;
      generateCSV(this.weibo_list, filename);
    },
    handleRecommend(weibo) {
      // this.showDialog("recommend-dialog");
      let recommendText = document.querySelector(
        "#weibo-text-" + String(weibo.id)
      ).innerText;
      recommendText = `@${weibo.user} ${recommendText} ${
        weibo.scheme
      } 转发${String(weibo.reposts_count)}`;
      bus.$emit("show-recommend-dialog", recommendText);
    }

    // returnTop() {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    //   });
    // },
    // handleZoomin(id) {
    //   const img = document.querySelector("#page-pic-" + id);
    //   img.style["width"] = "320px";
    // },
    // handleZoomout(id) {
    //   const img = document.querySelector("#page-pic-" + id);
    //   img.style["width"] = "120px";
    // }
  }
};
</script>
<template>
  <div id="table-filter" class="mdl-card mdl-shadow--2dp table-filter-container">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <div class="filter-label">筛选：</div>
        <select class="user-filter" v-model="current" v-on:change="handleSelect">
          <option
            v-for="target in targets"
            :key="target.user_id"
            :value="target.user_id"
          >{{target.screen_name}}</option>
        </select>
        <button
          class="export-xlsx mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          :disabled="isLoading"
          @click="generateCSV"
        >导出 .csv</button>
        <div class="requested-at">数据更新于 {{requestedat ? $dayjs(requestedat * 1000).fromNow() : ''}}</div>
      </div>
      <div class="mdl-cell mdl-cell--4-col"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: "all",
      targets: [
        {
          user_id: "all",
          screen_name: "全部"
        }
      ]
    };
  },
  props: {
    requestedat: Number,
    isLoading: Boolean
  },
  created() {
    this.getTarget();
  },
  methods: {
    handleSelect() {
      this.$emit("change-target", this.current);
    },
    generateCSV() {
      this.$emit("export-csv");
    },
    async getTarget() {
      try {
        const r = await this.$request.get("/target");
        this.targets = this.targets.concat(r.data.data);
      } catch (error) {
        throw "获取观测目标失败，请重试";
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
/* .return-top {
  position: fixed;
  z-index: 999;
  bottom: 2rem;
  right: 2rem;
} */
</style>

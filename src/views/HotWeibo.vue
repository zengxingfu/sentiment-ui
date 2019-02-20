<template>
  <div>
    <!-- <div class="return-top">
      <a href="#table-filter">
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
          <i class="material-icons">arrow_upward</i>
        </button>
      </a>
    </div>-->
    <div id="toast" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
    <!-- 预览 dialog -->
    <!-- <dialog id="preview-dialog" class="mdl-dialog">
      <img class="preview-img" :src="previewUrl" alt="">
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close" @click="closeDialog('preview-dialog')">关闭</button>
      </div>
    </dialog>-->
    <!-- 推荐 Dialog -->
    <dialog id="recommend-dialog" class="mdl-dialog">
      <div class="mdl-dialog__content">
        <!-- <p>Allow this site to collect usage data to improve your experience?</p> -->
        <div class="mdl-textfield mdl-js-textfield textarea-container">
          <textarea
            id="recommend-text"
            class="mdl-textfield__input"
            type="text"
            rows="4"
            v-model="recommendText"
          ></textarea>
        </div>
        <!-- <button
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent copy-button"
        >复制到剪贴板</button>-->
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close" @click="closeDialog('recommend-dialog')">关闭</button>
        <button type="button" class="mdl-button" @click="handleCopy">复制到剪贴板</button>
      </div>
    </dialog>
    <div id="table-filter" class="mdl-card mdl-shadow--2dp table-filter-container">
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
          >导出 .csv</button>
          <div
            class="requested-at"
          >数据更新于 {{requested_at ? $dayjs(requested_at * 1000).fromNow() : ''}}</div>
        </div>
        <div class="mdl-cell mdl-cell--4-col"></div>
      </div>
    </div>
    <div v-show="isLoading" class="mdl-card mdl-shadow--2dp loading-container">
      <div id="loading" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <span>请求中，请稍后……</span>
    </div>
    <table v-show="!isLoading" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <!-- <th
            class="mdl-data-table__header--sorted-ascending"
            v-bind:class="{red: reqParams.sort==='id'}"
            @click="changeSort('id')"
          >ID</th>-->
          <th
            class="mdl-data-table__cell--non-numeric mdl-data-table__header--sorted-ascending"
            v-bind:class="{red: reqParams.sort==='id'}"
            @click="changeSort('id')"
          >时间</th>
          <!-- <th class="mdl-data-table__cell--non-numeric text-column">类型</th> -->
          <th class="mdl-data-table__cell--non-numeric text-column">预览</th>
          <th class="mdl-data-table__cell--non-numeric text-column">微博内容</th>
          <th class="mdl-data-table__cell--non-numeric">作者</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: reqParams.sort==='hot_val'}"
            @click="changeSort('hot_val')"
          >热度
            <div id="header-hot_value" class="icon material-icons">
              <i class="material-icons">help</i>
            </div>
            <div class="mdl-tooltip" data-mdl-for="header-hot_value">约定：热度 = 转发 / 平均转发</div>
          </th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: reqParams.sort==='reposts_count'}"
            @click="changeSort('reposts_count')"
          >转发</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: reqParams.sort==='comments_count'}"
            @click="changeSort('comments_count')"
          >评论</th>
          <th
            class="mdl-data-table__header--sorted-descending"
            v-bind:class="{red: reqParams.sort==='attitudes_count'}"
            @click="changeSort('attitudes_count')"
          >赞</th>
          <th class="mdl-data-table__cell--non-numeric">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weibo in weibo_list" :key="weibo.id">
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
              alt=""
            >
            <img
              v-else
              :src="weibo.pics[0]"
              class="weibo-page-pic"
              :id="'page-pic-' + weibo.id"
              alt=""
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
              @click="handleRecommend(weibo)"
            >推荐</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Json2csvParser from 'json2csv'
import saveAs from 'file-saver'
import bus from '../bus'

export default {
  name: 'HotWeibo',
  data() {
    return {
      isLoading: false,
      userFilter: {
        all: '全部',
        li: '梨视频',
        yishou: '一手Video',
        shijian: '时间视频',
        pengpai: '澎湃新闻',
        women: '新京报我们视频',
        yangshi: '央视新闻',
        xinhua: '新华视点',
        ziniu: '紫牛新闻',
        renren: '人人视频',
        huojian: '火箭视频',
        youtube: 'YouTube精彩视频'
      },
      reqParams: {
        sort: 'id',
        user: '全部'
      },
      requested_at: 0,
      weibo_list: [],
      recommendText: '',
      previewUrl: ''
    }
  },
  created() {
    this.fetchData(this.reqParams)
  },
  mounted() {
    const recommendDialog = document.querySelector('dialog#recommend-dialog')
    if (!recommendDialog.showModal) {
      dialogPolyfill.registerDialog(recommendDialog)
    }
    // const previewDialog = document.querySelector("dialog#preview-dialog");
    // if (!previewDialog.showModal) {
    //   dialogPolyfill.registerDialog(previewDialog);
    // }
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
    changeSort(val) {
      // console.log(val);
      this.reqParams.sort = val
      this.fetchData(this.reqParams)
    },
    generateCSV() {
      const fields = []
      for (const key in this.weibo_list[0]) {
        fields.push(key)
      }
      // const opts = { fields };
      try {
        const parser = new Json2csvParser.Parser({
          fields,
          withBOM: true
        })
        const csv = parser.parse(this.weibo_list)
        // console.log(csv);
        const filename = `热门微博数据-${this.reqParams.user}-${this.$dayjs(
          this.requested_at * 1000
        ).format('YYYYMMDDHHmmss')}.csv`
        const blob = new Blob([csv], { type: 'text/csv' })
        saveAs(blob, filename)
      } catch (err) {
        console.error(err)
      }
    },
    handleRecommend(weibo) {
      this.showDialog('recommend-dialog')
      const weiboText = document.querySelector(
        '#weibo-text-' + String(weibo.id)
      ).innerText
      this.recommendText = `@${weibo.user} ${weiboText} ${
        weibo.scheme
      } 转发${String(weibo.reposts_count)}`
    },
    showDialog(id) {
      const dialog = document.querySelector('#' + id)
      dialog.showModal()
    },
    closeDialog(id) {
      const dialog = document.querySelector('#' + id)
      dialog.close()
    },
    handleCopy() {
      const textarea = document.querySelector('#recommend-text')
      textarea.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        // alert("复制成功");
        const snackbarContainer = document.querySelector('#toast')
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: '复制成功'
        })
      } else {
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: '浏览器暂不支持，请手动复制'
        })
      }
      // this.closeDialog()
    },
    weiboTextProcess(text) {
      const pattern = '...<a href="/status/'
      if (text.indexOf(pattern) > 0) {
        text = text.replace(
          pattern,
          '...<a target="_blank" href="https://m.weibo.cn/status/'
        )
      }
      return text
    },
    returnTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    handleZoomin(id) {
      const img = document.querySelector('#page-pic-' + id)
      img.style['width'] = '320px'
    },
    handleZoomout(id) {
      const img = document.querySelector('#page-pic-' + id)
      img.style['width'] = '120px'
    }
  }
}
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
.loading-container {
  /* width: 100%; */
  width: 320px;
  height: 64px;
  min-height: 0;
  padding: 16px 24px 8px 24px;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  margin-top: calc(38.2vh - 132px) !important;
}
.loading-container #loading {
  width: 100%;
  margin-bottom: 0.75rem;
}
.red {
  color: #f44235 !important;
}
dialog {
  width: 38.2%;
}
dialog .textarea-container {
  width: 100%;
}
dialog .textarea-container textarea {
  font-size: 1rem;
  line-height: 2rem;
  color: rgba(0, 0, 0, 0.87);
}
@media (max-width: 1024px) {
  dialog {
    width: 61.8%;
  }
}
/* dialog#preview-dialog {
  width: 600px;
} */
/* dialog#preview-dialog img {
  width: 480px;
} */
.return-top {
  position: fixed;
  z-index: 999;
  bottom: 2rem;
  right: 2rem;
}
/* .copy-button {
  margin-left: calc(100% - 116px);
} */
</style>
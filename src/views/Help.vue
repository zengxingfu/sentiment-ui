<template>
  <div>
    <div class="mdl-card mdl-shadow--2dp about-container">
      <article>
        <h4>Weibo Sentiment 使用说明</h4>
        <hr>
        <h5>内容源</h5>
        <p>所有数据每 15 分钟更新一次，当前已预设的目标抓取微博为（抓取范围为目标账号24小时内的微博）：</p>
        <ul>
          <li>人民日报</li>
          <li>人民网</li>
          <li>新华视点</li>
          <li>央视新闻</li>
          <li>新京报我们视频</li>
          <li>时间视频</li>
          <li>澎湃新闻</li>
          <li>中国新闻网</li>
          <li>环球时报</li>
          <li>梨视频</li>
          <li>头条新闻</li>
          <li>封面新闻</li>
          <li>紫牛新闻</li>
          <li>火箭视频</li>
          <li>人人视频</li>
          <li>YouTube精彩视频</li>
        </ul>
        <p>上述列表的配置，计划在下个版本予以支持。</p>
        <h5>筛选与排序</h5>
        <p>点击“筛选”下拉框，选择指定微博作者，结果将只显示该微博的数据内容。</p>
        <p>表头中点击“转发”、“评论”或“赞”，结果将以该列数据降序排列，点击“ID”复位，即微博发布的时间顺序。</p>
        <h5>导出到本地</h5>
        <p>点击右上角“导出 .csv”按钮文件可将当前表格内容导出到本地，格式为.csv，请尽量使用 Microsoft Excel 或 WPS 等表格软件打开。</p>
        <h5>其他说明</h5>
        <p>由于新浪微博数据问题，表格中的超链接，除“全文”外其他超链接均可正常点击，建议在新窗口中打开。</p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
.about-container {
  width: 61.8%;
  min-height: 61.8vh;
}
@media (max-width: 1024px) {
  .about-container {
    width: 100%;
  }
}
article {
  padding: 0 24px;
}
article h5 {
  font-weight: 600;
}
/* article img {
  max-width: 200px;
} */
</style>
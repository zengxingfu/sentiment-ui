<template>
  <div>
    <div class="mdl-card mdl-shadow--2dp about-container">
      <article>
        <h4>关于 Weibo Sentiment</h4>
        <hr>
        <p>
          Weibo Sentiment 通过搜集公开的互联网信息，为媒体从业认为提供整齐划一的
          <b>内容数据参考服务</b>。
        </p>
        <p>测试版本仅提供 @梨视频 @时间视频 等部分微博的周期性数据。正式版中计划新增如下功能：</p>
        <ol>
          <li>可配置的观测微博列表</li>
          <li>可追溯的历史归档数据</li>
          <li>通过邮箱订阅数据报告</li>
          <li>精准可靠的微博数据分析系统</li>
          <li>在线报题审题系统</li>
          <li>及其他必要功能……</li>
        </ol>
        <p>如果你觉得 Weibo Sentiment 还不错，可以请我喝杯咖啡：</p>
        <p><img src="http://ww1.sinaimg.cn/large/007oivkWly1g08oq9e2zrj30gi0im3zv.jpg"></p>
        <p>
          其他建议，及定制化的数据需求，欢迎与我联系：
          <a href="mailto:zengxingfu@gmail.com">zengxingfu@gmail.com</a>。
        </p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
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
article img {
  max-width: 200px;
}
</style>
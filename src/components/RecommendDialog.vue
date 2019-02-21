<template>
  <div>
    <div id="toast" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
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
  </div>
</template>

<script>
import bus from "../bus";
export default {
  data() {
    return {
      recommendText: ""
    };
  },
  created() {
    bus.$on("show-recommend-dialog", text => {
      this.recommendText = text;
      this.showDialog("recommend-dialog");
    });
  },
  mounted() {
    const recommendDialog = document.querySelector("dialog#recommend-dialog");
    if (!recommendDialog.showModal) {
      dialogPolyfill.registerDialog(recommendDialog);
    }
  },
  methods: {
    showDialog(id) {
      const dialog = document.querySelector("#" + id);
      dialog.showModal();
    },
    closeDialog(id) {
      const dialog = document.querySelector("#" + id);
      dialog.close();
    },
    handleCopy() {
      const textarea = document.querySelector("#recommend-text");
      textarea.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        // alert("复制成功");
        const snackbarContainer = document.querySelector("#toast");
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: "复制成功"
        });
      } else {
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: "浏览器暂不支持，请手动复制"
        });
      }
      // this.closeDialog()
    }
  }
};
</script>


<style scoped>
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
</style>

export default {
    data() {
      return {
        isOpen: false,
        externalUrl: 'external.html' // 替换为您要加载的 HTML 文件的路径
      };
    },
    methods: {
      openPopup() {
        this.isOpen = true;
      },
      closePopup() {
        this.isOpen = false;
      }
    }
  };
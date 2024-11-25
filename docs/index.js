
window.$docsify = {
  // ... 其他配置 ...
  plugins: [
    function(hook) {
      hook.mounted(function() {
        const toTop = document.querySelector('.to-top');
        
        // 监听滚动事件
        window.addEventListener('scroll', () => {
          // 当页面滚动超过 200px 时显示按钮
          if (window.pageYOffset > 200) {
            toTop.style.display = 'flex';
          } else {
            toTop.style.display = 'none';
          }
        });

        // 点击回到顶部
        toTop.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动
          });
        });
      });
    }
  ],
  auto2top: true, // 切换页面后自动回到顶部
}; 
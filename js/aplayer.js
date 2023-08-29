!(function() {
    var oldLoadAp = window.onload;
    window.onload = function () {
      oldLoadAp && oldLoadAp();
  
      new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        autoplay: false,
        loop: 'all',
        order: 'random',
        theme: '#b7daff',
        preload: 'none',
        audio: [
          {
            name: '悬溺',
            artist: '葛东琪',
            url: 'http://www.kumeiwp.com/sub/filestores/2023/04/02/f919f1efccb0023bc211e3ec1cf2b02e.mp3',
            cover: 'https://y.qq.com/music/photo_new/T002R300x300M000002ZAHJs3IIZN7_2.jpg?max_age=2592000'
          }
        ]
      });
    }
  })();

  
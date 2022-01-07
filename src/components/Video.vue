<!--
 * @Author: Lvhz
 * @Date: 2021-04-17 21:02:59
 * @Description: 视频播放
 * 安装：npm i video.js@7.12.3 videojs-contrib-hls@5.15.0 -S
-->
<template>
  <div>
    <video 
      :id="`myVideo${index}`" 
      ref="myVideo" 
      muted 
      style="width: 100%; height: 100%; object-fit: fill;" 
      class="video-js vjs-default-skin vjs-big-play-centered" 
      controls 
      preload="auto" 
      data-setup="{}"
    >
      <source :src="src" type="application/x-mpegURL" class="src">
    </video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls';
export default {
  props: {
    // 'http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/48c8a9475285890781000441992/playlist.m3u8' // 测试讲义
    // 'https://www.2021lllllll.com/vid888/202011/26/5fbf177306f73a1d14777b65/3f92db/index.m3u8' // 测试片子
    src: {
      type: String,
      default: ''
    },
    index: {
      type: String | Number,
      default: 0
    }
  },
  data() {
    return {
      videoPlayer: null
    }
  },
  watch: {
    src() {
      videojs(`myVideo${this.index}`).src(this.src); // 切换视频src
    }
  },
  mounted() {
    this.initVideo();
  },
  beforeDestroy() {
    this.videoPlayer.dispose(); //销毁
  },
  methods: {
    initVideo() {
      const that = this;
      if (this.videoPlayer) this.videoPlayer.dispose();
      this.$nextTick(() => {
        this.videoPlayer = videojs(`myVideo${this.index}`, {
          autoplay: true,
          preload: true //预加载
        }, function onPlayerReady() {
          this.play();
          this.on('error', function(e) {
            console.log('error：', e);
            that.$emit('error', that.index);
          });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

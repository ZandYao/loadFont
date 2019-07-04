<template>
  <div class="css3page">
    <div class="translate1"></div>
    <div class="translate2">
    </div>
     <span class="shadow"></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'css3动画'
    }
  }
}
</script>
<style lang="scss">
.css3page {
  width: 100%;
  min-height: calc(100vh - #{$header-height} - 5px);
  border: 1px solid white;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  .translate1 {
    width: 100px;
    height: 100px;
    background-color: blue;
    border-radius: 100%;
    // border: 2px solid red;
    position: absolute;
    z-index: 99;
    margin: 80px 100px;
    // transform: translate(100px, 80px);
    transform-origin: (50%, 50%, 0);
    background: radial-gradient(circle at 100px 100px, #5cabff, #000);
    // transform: translate(100px, 80px) rotate(45deg) skew(35deg, 20deg);
    animation: routater 10s linear infinite alternate;
  }
  @keyframes backgroundShaw {
    from{
       transform:translate(0px, 0px) rotateX(80deg);
    }
    to{
       transform:translate(500px, 0px) rotateX(80deg);
    }
  }
  .shadow {
    position: absolute;
    display: block;
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 100%;
    // margin: 100px;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 50%);
    margin: 55px 101px;
    transform: rotateX(80deg);
    animation: backgroundShaw 10s linear infinite alternate;
    z-index: 999;
  }
  $deg: 60deg;
  @keyframes routater {
    from {
      transform:translate(0px, 0px) rotate(0deg);
    }

    to {
      transform:translate(500px, 0px) rotate(360deg);
    }
  }
  @keyframes yasuo {
    0%{
       transform:  skew(20deg, 20deg);
    }
    50% {
       transform:skew(20deg, 16deg)
    }
    100% {
       transform: skew(20deg, 20deg);
    }
  }
  .translate2 {
    width: 800px;
    height: 80px;
    transform: translate(0, 150px) skew(20deg, 20deg) rotateZ(-20deg);
    border: 1px solid wheat;
    background-color: gray;
    animation: yasuo10s linear infinite alternate;
  }
}
</style>

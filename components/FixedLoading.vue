<template>
  <div class="wrapper">
    <div class="circle bg-blue-gray-900 dark:bg-white"></div>
    <div class="circle bg-blue-gray-900 dark:bg-white"></div>
    <div class="circle bg-blue-gray-900 dark:bg-white"></div>
    <div class="shadow dark:bg-blue-gray-900 bg-white"></div>
    <div class="shadow dark:bg-blue-gray-900 bg-white"></div>
    <div class="shadow dark:bg-blue-gray-900 bg-white"></div>
    <span class="text-blue-gray-900 dark:text-white">Loading</span>
  </div>
</template>
<style>
.wrapper {
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.circle {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  left: 15%;
  transform-origin: 50%;
  animation: circle 0.5s alternate infinite ease;
}

@keyframes circle {
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
}
.circle:nth-child(2) {
  left: 45%;
  animation-delay: 0.2s;
}
.circle:nth-child(3) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}
.shadow {
  width: 20px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: shadow 0.5s alternate infinite ease;
}

@keyframes shadow {
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
}
.shadow:nth-child(4) {
  left: 45%;
  animation-delay: 0.2s;
}
.shadow:nth-child(5) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}
.wrapper span {
  position: absolute;
  top: 75px;
  font-family: 'Lato';
  font-size: 20px;
  letter-spacing: 12px;
  left: 15%;
}
</style>

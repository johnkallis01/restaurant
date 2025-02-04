<script setup>
const activate=ref(false);

const router = useRouter();

let interval;
onMounted(() => {
    interval = setInterval(()=>router.push('/'),3000);
});
onBeforeUnmount(() => {
    clearInterval(interval);
});
const pageNotFound=ref('Page Not Found. Sending You Home...');
</script>
<template>
    <div class="container" :class="{'day-color': activate}">
      <p class="message">{{pageNotFound}}</p>
      <ClientOnly>
        <Transition name="sun-rise" appear @appear="activate=true">
          <div class="sun">
              <div class="sun-ray1"></div>
              <div class="sun-ray2"></div>
              <div class="sun-ray3"></div>
              <div class="sun-ray4"></div> 
              <div class="sun-ray5"></div>
              <div class="sun-ray6"></div> 
              <div class="sun-ray7"></div>
              <div class="sun-ray8"></div> 
          </div>
      </Transition>
    </ClientOnly>
      <div class="roof">
        <div class="chimney"></div>
      </div>
      <div class="house">
        <div class="window-1">
            <div class="window-pane-1"></div>
            <div class="window-pane-2"></div>
        </div>
        <div class="window-2">
            <div class="window-pane-1"></div>
            <div class="window-pane-2"></div>
        </div>
        <div class="window-5"></div>
        <div class="window-3">
            <div class="window-pane-1"></div>
            <div class="window-pane-2"></div>
        </div>
        <div class="window-4">
            <div class="window-pane-1"></div>
            <div class="window-pane-2"></div>
        </div>
        <div class="door">
            <div class="door-knob"></div>
        </div>
      </div>
      <div class="ground"></div>
    </div>
</template>
<style scoped>
.sun{
    background-color: yellow;
    position: absolute;
    left: 15%;
    top: 60px;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    z-index: 3;
    transition: translate 1.8s ease;
}
.sun-rise-enter-active {
    animation: sun-rise 1.8s;
}
.sun-rise-enter-from{
  top: 200px;
  transform: translate(0, 300px);
}
.sun-rise-enter-to{
  transform: translate(0, 60px);
}
@keyframes sun-rise {
    0%{
        transform: translate(0, 300px);
    }
    10%{
        transform: translate(0, 275px);
    }
    20%{
      transform: translate(0, 250px);
    }
    30%{
      transform: translate(0, 225px);
    }
    40%{
      transform: translate(0, 200px);
    }
    50%{
      transform: translate(0, 175px);
    }
    60%{
      transform: translate(0, 150px);
    }
    70% {
      transform: translate(0, 125px);
    }
    75% {
      transform: translate(0, 115px);
    }
    80%{
      transform: translate(0, 100px);
    }
    85% {
      transform: translate(0, 85px);
    }
    90%{
      transform: translate(0, 75px);
    }
    95% { 
      transform: translate(0, 70px);
    }
    100% {
      transform: translate(0, 60px);
    }
}
.message{
  position: relative;
  top: 50px;
}
.container{
    width: 800px;
    height: 400px;
    display: flex;
    justify-content: flex-start;
    color: white;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: rgb(12, 45, 56);
    transition: background-color 2.8s ease-in-out;
}
.day-color{
  background-color:rgb(60, 192, 232);
}
.door-knob{
    position: relative;
    top: 36px;
    left: 28px;
    background-color: gold;
    height: 10px;
    width: 10px;
    border-radius: 5px;
}
.door{
    position: relative;
    height: 80px;
    width: 40px;
    top: 70px;
    left: 140px;
    background-color: rgb(181, 34, 8);
    z-index: 100;
}
.roof{
    position: absolute;
    width: 380px;
    height: 0;
    top: 100px;
    border-left: 200px solid transparent;
    border-right: 200px solid transparent;
    border-bottom: 100px solid rgb(67, 21, 1);
    z-index: 5;
}
.chimney{
    position: relative;
    left: 40px;
    top: 0;
    width: 28px;
    height: 60px;
    background-color: rgb(202, 52, 2);
}
.house{
    position: absolute;
    top: 200px;
    height: 150px;
    width: 320px;
    z-index: 3;
    background-color: burlywood;
}
.window-1{
    position: absolute;
    top: 70px;
    left: 28px;
    background-color: beige;
    height: 32px;
    width: 60px;
    border: 1px solid black;
    box-sizing: content-box;
}
.window-2{
    position: absolute;
    top: 70px;
    right: 28px;
    background-color: beige;
    height: 32px;
    width: 60px;
    border: 1px solid black;
    box-sizing: content-box;
}
.window-3{
    position: absolute;
    top: 20px;
    left: 28px;
    background-color: beige;
    height: 32px;
    width: 60px;
    border: 1px solid black;
    box-sizing: content-box;
}
.window-4{
    position: absolute;
    top: 20px;
    right: 28px;
    background-color: beige;
    height: 32px;
    width: 60px;
    border: 1px solid black;
    box-sizing: content-box;
}
.window-5{
    position: absolute;
    top: 45px;
    right: 140px;
    background-color: beige;
    height: 18px;
    width: 40px;
    border-radius: 16px 16px 0 0 ;
    border: 1px solid black;
    box-sizing: content-box;
}
.window-pane-1{
    position: relative;
    background-color: black;
    left: 28px;
    width: 4px;
    height: 32px;
}
.window-pane-2{
    position: relative;
    background-color: black;
    bottom: 16px;
    width: 60px;
    height: 4px;
}
.sun-ray1{
    position: absolute;
    left: 18px;
    bottom: 54px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 42px solid yellow;
}
.sun-ray2{
    position: absolute;
    left: 18px;
    top: 54px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 42px solid yellow;
}
.sun-ray3{
    position: absolute;
    top: 18px;
    left: 54px;
    border-bottom: 12px solid transparent;
    border-top: 12px solid transparent;
    border-left: 42px solid yellow;
}
.sun-ray4{
    position: absolute;
    top: 18px;
    right: 54px;
    border-bottom: 12px solid transparent;
    border-top: 12px solid transparent;
    border-right: 42px solid yellow;
}
.sun-ray5{
    position: absolute;
    top: -5px;
    right: 30px;
    border-right: 0px solid transparent;
    border-left: 30px solid yellow;
    border-top: 10px solid transparent;
    border-bottom: 20px solid  transparent;   
}
.sun-ray6{
    position: absolute;
    top: -5px;
    left: 30px;
    border-left: 0px solid transparent;
    border-right: 30px solid yellow;
    border-top: 10px solid transparent;
    border-bottom: 20px solid  transparent;
}
.sun-ray7{
    position: absolute;
    bottom: -5px;
    right: 30px;
    border-right: 0px solid transparent;
    border-left: 30px solid yellow;
    border-bottom: 10px solid transparent;
    border-top: 20px solid  transparent;
}
.sun-ray8{
    position: absolute;
    bottom: -5px;
    left: 30px;
    border-left: 0px solid transparent;
    border-right: 30px solid yellow;
    border-bottom: 10px solid transparent;
    border-top: 20px solid  transparent;
}

.ground{
    position: absolute;
    background-color: rgb(30, 112, 5);
    background-image: linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),
    linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),
    linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%);
    background-size: 53%, 79%, 73%, 83%;
    height: 80px;
    width: 100%;
    top: 320px;
    z-index: 5;
}
</style>
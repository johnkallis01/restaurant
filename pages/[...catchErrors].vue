<script setup>
const router = useRouter();
onMounted(() =>{router.push('/');});
</script>
<template>
    <div class="container">
      <p class="message">Page not found. Go Home...</p>
      <div class="sun-rays1"></div>
      <div class="sun-rays2"></div>
      <div class="sun-rays3"></div>
      <div class="sun-rays4"></div>
      <div class="sun-rays5"></div>
      <div class="sun-rays6"></div>
        <div class="sun"></div>
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
        <div class="door">
            <div class="door-knob"></div>
        </div>
      </div>
      <div class="ground"></div>
    </div>
</template>
<style scoped>
.message{
  position: relative;
  top: 5vh;
}
.container{
    width: 80vw;
    height: 80vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(83, 211, 247);
    position: relative;
}
.door-knob{
    position: relative;
    top: 6vh;
    left: 3.5vw;
    background-color: gold;
    height: 10px;
    width: 10px;
    border-radius: 5px;
}
.door{
    height: 15vh;
    width: 5vw;
    position: relative;
    top: 10vh;
    left: 12.5vw;
    background-color: rgb(181, 34, 8);
    z-index: 100;
}
.roof{
    position: absolute;
    width: 0;
    height: 0;
    top: 19vh;
    border-left: 35vh solid transparent;
    border-right: 35vh solid transparent;
    border-bottom: 20vh solid rgb(67, 21, 1);
    margin: 2rem;
    z-index: 5;
}
.chimney{
    position: relative;
    left: 5vw;
    top: 3vh;
    background-color: rgb(202, 52, 2);
    width: 28px;
    height: 8vh;
}
.house{
    background-color: burlywood;
    height: 25vh;
    width: 30vw;
    top: 45vh;
    position: absolute;
    z-index: 3;
}
.window-1{
    position: absolute;
    top: 7vh;
    left: 3vw;
    background-color: beige;
    height: 7vh;
    width: 6vw;
    border: 1px solid black;
    box-sizing: content-box;
}
.window-pane-1{
    position: relative;
    background-color: black;
    left: 2.75vw;
    width: 5px;
    height: 7vh;
}
.window-pane-2{
    position: relative;
    background-color: black;
    bottom: 3.5vh;
    width: 6vw;
    height: 5px;
}
.window-2{
    position: absolute;
    top: 7vh;
    right: 3vw;
    background-color: beige;
    height: 7vh;
    width: 6vw;
    border: 1px solid black;
    box-sizing: content-box;
}
.sun-rays1{
    position: absolute;
    left: 10.5vw;
    top: 12vh;
    background-color: yellow;
    border-left: 5vh solid transparent;
    border-right: 5vh solid transparent;
    border-bottom: 12vh solid rgb(83, 211, 247);
}
.sun-rays2{
    position: absolute;
    left: 10.5vw;
    top: 2vh;
    background-color: yellow;
    border-left: 5vh solid transparent;
    border-right: 5vh solid transparent;
    border-top: 12vh solid rgb(83, 211, 247);
}
.sun-rays3{
    position: absolute;
    left: 6vw;
    top: 9vh;
    background-color: yellow;
    border-top: 4vh solid transparent;
    border-bottom: 4vh solid transparent;
    border-left: 12vh solid rgb(83, 211, 247);
}
.sun-rays4{
    position: absolute;
    top: 9vh;
    left: 14vw;
    background-color: yellow;
    border-top: 4vh solid transparent;
    border-bottom: 4vh solid transparent;
    border-right: 12vh solid rgb(83, 211, 247);
}
.sun-rays5{
    position: absolute;
    left: 12vw;
    top: 0.5vh;
    background-color: rgb(83, 211, 247);
    border-left:  2vh solid transparent;
    border-right: 2vh solid transparent;
    border-bottom: 5vw solid yellow;
}
.sun-rays6{
    position: absolute;
    left: 12vw;
    top: 15vh;
    background-color: rgb(83, 211, 247);
    border-left:  2vh solid transparent;
    border-right: 2vh solid transparent;
    border-top: 5vw solid yellow;
}
.sun{
    background-color: yellow;
    position: absolute;
    left: 10vw;
    top: 7vh;
    height: 12vh;
    width: 12vh;
    border-radius: 6vh;
}
.ground{
    background-color: rgb(30, 112, 5);
    background-image: linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),
    linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),
    linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%);
    background-size: 53%, 79%, 73%, 83%;
    height: 15vh;
    width: 100%;
    position: relative;
    top: 60vh;
}
</style>
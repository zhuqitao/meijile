<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    // sockets: {
    //     connect: function () {
    //         console.log('socket connected')
    //     },
    //     customEmit: function (val) {
    //         console.log(val)
    //         // console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    //     },
    //     messageevent: function (messageevent) {
    //         console.log(messageevent)
    //     }
    // },
    created: function () {
        // this.$socket.emit('messageevent', 23764)
        let userAgentInfo = navigator.userAgent
        let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        for (let i = 0; i < userAgentInfo.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                this.$store.dispatch('setIsMobile', true)
            }
        }
        this.$store.dispatch('getLoginInfoFromLocal')
        this.$store.dispatch('checkToken')
    }
}
</script>

<style>
html, body{
  height: 100%;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
a {
    color: currentColor;
}
</style>

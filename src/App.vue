<template>
  <div id="app">
    <section class="main-content columns is-fullheight">
      <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <div class="columns">
          <div class="column">
            <span class="menu-label is-left">Servers</span>
          </div>
          <div class="column">
            <div class="buttons has-addons is-right">
              <span class="button is-small" @click="addServer()">
                <span class="icon"><i class="fa fa-plus"></i></span>
              </span>
            </div>
          </div>
        </div>
        <servers :servers="servers" :active="server" @activate="activate(server, $event)" @remove="remove(server, $event)"></servers>
      </aside>

      <div class="container column is-9">
        <div class="section" v-if="server.id">
          <div class="columns">
            <div class="column">
              <span class="menu-label is-left">Manage Jobs</span>
            </div>
            <div class="column">
              <div class="buttons has-addons is-right">
                <span class="button" :class="{'is-active': activeTab === 'jobs'}" @click="activeTab = 'jobs'">Jobs</span>
                <span class="button" :class="{'is-active': activeTab === 'server'}" @click="activeTab = 'server'">Server configuration</span>
              </div>
            </div>
          </div>
          
          <div class="card" v-if="activeTab === 'server' ">
            <div class="card-header"><p class="card-header-title">Server</p></div>
            <server :server="server" @update="update(server, $event)"></server>
          </div>
          
          <div v-if="activeTab === 'jobs' ">
            <jobs :server="server" @update="update(server, $event)"></jobs>
          </div>

        </div>
        <div class="section" v-else>
          <h3 class="title is-3">Select Server</h3>
          <h1 class="subtitle is-6">Choose server from left sidebar menu or add one</h1>
        </div>
      </div>
      
    </section>
  </div>
</template>

<script>
import Servers from './components/Servers.vue'
import Server from './components/Server'
import Jobs from './components/Jobs'
import uuidv1 from 'uuid/v1'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Servers,
    Server,
    Jobs,
  },
  data() {
    return {
      servers: [],
      server: {},
      activeTab: "jobs",
      api: "http://localhost:3000",
    }
  },
  methods: {
    store(key, val) {
      axios.post(`${this.api}/db`, {data: val})
    },
    fetch() {
      const vm = this
      axios.get(`${this.api}/db`)
        .then(function(response) {
					vm.servers = response.data.servers
				})
				.catch(function (err) {
					alert('Error with connecting server:', err)
				});
    },
    activate(e, server) {
      this.server = server
      this.activeTab = 'jobs'
    },
    remove(server) {
      const item = this.servers.filter(item => item.id === server.id)[0]
      const i = this.servers.indexOf(item)
      this.servers.splice(i, 1)
      this.store('servers', this.servers)
    },
    update(e, server) {
      const item = this.servers.filter(item => item.id === server.id)[0]
      const i = this.servers.indexOf(item)
      this.servers[i] = server
      this.store('servers', this.servers)
    },
    addServer() {
      const id = uuidv1(new Date())
      this.servers.push({
        id: id,
        title: `Server ${this.servers.length + 1}`,
        jobs: []
      })
      this.server = this.servers.filter(item => item.id === id)[0]
      this.activeTab = 'server'
    },
  },
  mounted() {
    this.fetch('servers')
    if(this.servers.length) {
      this.server = this.servers[0]
    }
  }
}
</script>

<style>
#app {
  
}
</style>

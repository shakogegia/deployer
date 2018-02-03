<template>
  <div>
    <ul class="menu-list">
			<li v-for="(server, i) in servers" :key="i">
					<a href="#" :class="{'is-active': active.id === server.id}">
						<div class="columns">
							<div class="column"  @click="activate(server)">
								<span class="icon"><i class="fa fa-desktop"></i></span>
								<span>{{ server.title }}</span>
							<!-- </div>
							<div class="column"> -->
							</div>
							<div class="has-text-right delete-container">
								<span @click="remove(server)" class="icon"><i class="far fa-times-circle"></i></span>
							</div>
						</div>
					</a>
			</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'servers',
  props: {
    servers: Array,
    active: Object,
	},
	methods: {
		activate(server) {
			this.$emit('activate', server)
		},
		remove(server) {
			if(confirm(`Are you Sure?`)) {
				this.$emit('remove', server)
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete-container {
	padding: 12px 5px;
}
</style>

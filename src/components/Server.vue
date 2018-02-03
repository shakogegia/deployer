<template>
  <div>
    <div class="card-content">
			<div class="notification">
				<!-- <button class="delete"></button> -->
				Deployer will use ssh to log in into your server.  You must configure ssh access manually
			</div>

			<form v-on:submit.prevent="update">
					<div class="field is-horizontal">
						<div class="field-label is-normal">
								<label class="label">Title</label>
						</div>
						<div class="field-body">
								<div class="field">
								<p class="control">
										<input class="input" type="text" v-model="server.title" placeholder="Enter server title">
								</p>
								</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
								<label class="label">Hostname</label>
						</div>
						<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="server.host" placeholder="Enter server host">
									</p>
								</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Username</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" v-model="server.username" placeholder="Enter server username">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
							<div class="field-label is-normal">
							</div>
							<div class="field-body">
								<div class="control">
									<button class="button is-primary">Submit</button>
								</div>
							</div>
					</div>
			</form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'server-config',
  props: {
    server: Object,
	},
	methods: {
		update() {
			this.$emit('update', this.server)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div class="modal" :class="{'is-active': opened}">
    <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h1 class="title">Update Available</h1> <br />
                <h2 class="subtitle">Your version: {{ currentVersion }} <br />Latest and Greatest: {{ latestVersion }} </h2>
                
                <a class="button is-primary" target="_blank" href="https://github.com/shakogegia/deployer/releases">Go to download</a>
                <a class="button is-danger" @click="close()">Cancel</a>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="close()"></button>
	</div>
</template>

<script>

export default {
	name: 'update',
	props: {
        currentVersion: String,
        latestVersion: String,
        opened: Boolean,
	},
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style scoped>

</style>

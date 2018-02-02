<template>
  <div>
    <div class="card">
			<header class="card-header">
				<p class="card-header-title">
					<span>{{ job.title }}</span>
					<!-- <progress class="progress" value="90" max="100">90%</progress> -->
				</p>
				<div class="column">
				</div>
				<div class="column">
					<div class="buttons is-right">
						<span class="button is-circle is-success" :class="{'is-loading': job.isLoading === true}" @click="deploy()">
							<i class="fas fa-play" aria-hidden="true"></i>
						</span>
						<span class="button is-circle is-warning">
							<i class="fas fa-list" aria-hidden="true"></i>
						</span>
						<span class="button is-circle is-danger" @click="remove()">
							<a class="delete"></a>
						</span>
					</div>
				</div>
				<a href="#" class="card-header-icon" aria-label="more options" @click="job.collapse = !job.collapse">
					<span class="icon">
						<i class="fas fa-angle-down" v-if="job.collapse === true" aria-hidden="true"></i>
						<i class="fas fa-angle-up" v-else aria-hidden="true"></i>
					</span>
				</a>
			</header>
			<div class="card-content" v-if="job.collapse">
				<div class="tabs is-fullwidth is-toggle">
						<ul>
								<li :class="{'is-active' :activeTab === 'info'}"><a @click="activeTab = 'info'">Job Description</a></li>
								<li :class="{'is-active' :activeTab === 'source'}"><a @click="activeTab = 'source'">Source</a></li>
								<li :class="{'is-active' :activeTab === 'build'}"><a @click="activeTab = 'build'">Build</a></li>
								<li :class="{'is-active' :activeTab === 'post'}"><a @click="activeTab = 'post'">Post</a></li>
						</ul>
				</div>
				
				<div v-if="activeTab === 'info'">
					<form v-on:submit.prevent="update">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Title</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="job.title" placeholder="Enter server title">
									</p>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Description</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
										<textarea class="textarea" v-model="job.description"></textarea>
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div v-if="activeTab === 'source'">
					<form v-on:submit.prevent="update">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Source Git Repository</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="job.repository" placeholder="Enter repositiry">
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div v-if="activeTab === 'build'">
					<form v-on:submit.prevent="update">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Build directory</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="job.directory" placeholder="Enter build directory">
									</p>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Build Command</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
										<textarea class="textarea" v-model="job.buildCommand"></textarea>
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div v-if="activeTab === 'post'">
					<form v-on:submit.prevent="update">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Slack Token</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="job.slackToken" placeholder="Enter slack token">
									</p>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Slack Channel</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="job.slackChannel" placeholder="Enter slack channe;">
									</p>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Slack Message</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
										<textarea class="textarea" v-model="job.slackMessage" placeholder="Enter slack message"></textarea>
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>

			</div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'job',
  props: {
    job: Object,
	},
	data() {
		return {
			activeTab: "info",
		}
	},
	methods: {
		update() {
			this.$emit('update', this.job)
		},
		remove() {
			if(confirm(`Are you sure?`)) {
				this.$emit('remove', this.job)
			}
		},
		deploy() {
			this.job.isLoading = true
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-circle {
	border-radius: 50%;
	width: 36px;
	height: 36px;
}
</style>

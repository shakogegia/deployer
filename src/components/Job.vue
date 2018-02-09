<template>
  <div>
    <div class="card">
			<header class="card-header">
				<div class="card-header-title">
					<div class="buttons is-left last-job-status">
						<span class="button is-circle is-warning" v-if="job.lastJobStatus === 'error'">
							<i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
						</span>
						<span class="button is-circle" v-if="job.lastJobStatus === 'success'">
							<i class="fas fa-check" aria-hidden="true"></i>
						</span>
					</div>
					<span>{{ job.title }}</span>
					<!-- <progress class="progress" value="90" max="100">90%</progress> -->
				</div>
				<div class="job-actions">
					<div class="buttons is-right">
						<span class="button" v-if="job.isLoading" v-html="time"></span>
						<span class="button is-circle is-success" :class="{'is-loading': job.isLoading === true}" :disabled="disabled" @click="deploy()">
							<i class="fas fa-play" aria-hidden="true"></i>
						</span>
						<span class="button is-circle is-primary" @click="showLogs=true">
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
											<input class="input" type="text" v-model="job.title" placeholder="Enter job title, Ex: Backend API">
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
										<textarea class="textarea" v-model="job.description"  placeholder="Enter job desc, Ex: Build Node.js API for my project"></textarea>
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div v-if="activeTab === 'source'">
					<div class="notification">
						<!-- <button class="delete"></button> -->
						Deployer will use ssh to pull repository. You must configure ssh access manually
					</div>
					<form v-on:submit.prevent="update">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Git Service</label>
							</div>
							<div class="field-body">
								<div class="field">
									<div class="control">
										<div class="select">
											<select v-model="job.source.service">
												<option :value="'github.com'">Github</option>
												<option :value="'bitbucket.com'">Bitbucket</option>
											</select>
										</div>
									</div>
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
										<input class="input" type="text" v-model="job.source.username" @keyup="suggestRepos()" placeholder="Enter username">
									</p>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Repository</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control is-expanded">
											<input class="input" type="text" v-model="job.source.repository" placeholder="Enter repository">
									</p>
								</div>
								<div class="field">
									<div class="control is-expanded">
										<div class="select">
											<select v-model="job.source.repository" :disabled="!repositories.length">
												<option value="" selected disabled>Choose one:</option>
												<option :value="repo.name" v-for="(repo, i) in repositories" :key="i">{{ repo.name }}</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Branch</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
										<input class="input" type="text" v-model="job.source.branch" disabled placeholder="Enter branch">
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div v-if="activeTab === 'build'">
					<div class="notification is-warning">
						<button class="delete"></button>
						This feature is not yet fully completed
					</div>
					<form v-on:submit.prevent="update">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Build directory</label>
							</div>
							<div class="field-body">
								<div class="field">
									<p class="control">
											<input class="input" type="text" v-model="job.directory" placeholder="Enter build directory: /home/default/project">
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
										<textarea class="textarea" v-model="job.buildCommand" disabled placeholder="Enter command like: npm install && pm2 reload all"></textarea>
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
											<input class="input" type="text" v-model="job.slack.token" placeholder="Enter slack token: xoxp-111111111-22222222....">
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
										<input class="input" type="text" v-model="job.slack.channel" placeholder="Enter slack channel ID Ex: C11111111">
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>

			</div>
    </div>
		
		<modal :opened="showLogs" :job="job" @close="closeModal($event)"></modal>

	</div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal.vue'

export default {
	name: 'job',
	components: {
		Modal
	},
  props: {
		job: Object,
		server: Object
	},
	data() {
		return {
			activeTab: "info",
			api: 'http://localhost:3000',
			startTime: null,
			currentTime: null,
			interval: null,
			showLogs: false,
			repositories: []
		}
	},
	computed: {
		time: function() {
				return this.minutes + ':' + this.seconds;
		},
		milliseconds: function() {
				return this.currentTime - this.$data.startTime;
		},
		minutes: function() {
				var lapsed = this.milliseconds;
				var min = Math.floor((lapsed / 1000 / 60) % 60);
				return min >= 10 ? min : '0' + min;
		},
		seconds: function() {
				var lapsed = this.milliseconds;
				var sec = Math.ceil((lapsed / 1000) % 60);
				return sec >= 10 ? sec : '0' + sec;
		},
		disabled(){
			return !(this.job.source
			&& this.job.source.repository
			&& this.job.source.username
			&& this.job.source.service
			&& this.job.source.service
			&& this.server.host
			&& this.server.username
			)
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
		stopwatch() {
			this.startTime = Date.now()
			this.currentTime = Date.now()
			this.interval = setInterval(this.updateCurrentTime, 1000);
		},
		deploy() {
			this.job.isLoading = true
			this.stopwatch()
			const vm = this
			vm.update()
			axios.post(`${this.api}/build`, {job:this.job, server: this.server})
				.then(function () {
						vm.done()
				})
				.catch(function (err) {
						vm.done(err)
				});
		},
		done(err) {
			this.job.isLoading = false
			this.job.lastJobStatus = err ? 'error' : 'success'
			clearInterval(this.interval)


			let title = 'Done!'
			let message = `Job ${this.job.title} successfully finished!`

			if(err) {
				title = 'Errored!'
				message = `Job ${this.job.title} errored! See logs for more information`
			}


			const log = {
				date: new Date(),
				result: err ? 'error' : 'success',
				stack: null, // err
			}
			
			if(!this.job.logs) {
				this.job.logs = []
			}

			this.job.logs.push(log)

			this.update()

			let myNotification = new Notification(title, {
				body: message
			})
			myNotification
		},
		updateCurrentTime: function() {
			this.currentTime = Date.now();
		},
		closeModal() {
			this.showLogs = false
		},
		suggestRepos() {
			this.repositories = []
			
			if(this.job.source.service !== 'github.com') {
				return
			}

			const vm = this
			axios.get(`https://api.github.com/users/${this.job.source.username}/repos`)
				.then(function (response) {
					vm.repositories = response.data
				})
				.catch(function (err) {
					vm.done(err)
				});
		}
	},
	mounted() {
		this.job.isLoading = false
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
.last-job-status {
	margin-bottom: 0!important;
	padding-bottom: 0;
	height: 2px;
	margin-top: 9px;
	margin-right: 13px;
}
.job-actions {
	margin-bottom: 0!important;
	padding-top: 6px;
}
</style>

<template>
	<div class="app-container">
		<el-card :class="{'padding-20':device=='mobile'}">
			<el-form :model="editForm" :rules="editRules" ref="editform" label-width="80px" :label-position="labelPosition">
				<el-form-item>
					<img :src="editForm.image||avatar" class="avatar">
				</el-form-item>
				<el-form-item label="头像" prop="image">
					<el-input type="textarea" v-model="editForm.image" placeholder="请选择头像" :disabled="!editting" autosize></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="editForm.username" placeholder="请输入帐号" :disabled="!editting"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email" placeholder="请输入邮箱" :disabled="!editting"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="editForm.phone" placeholder="请输入电话" :disabled="!editting"></el-input>
				</el-form-item>
				<el-form-item label="登录次数">
					<el-input v-model="editForm.inc" disabled></el-input>
				</el-form-item>
				<el-form-item label="客户端">
					<el-input v-model="editForm.client" :disabled="!editting"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-input :value="editForm.createdAt|dateTime" disabled></el-input>
				</el-form-item>
				<el-form-item label="最近修改">
					<el-input :value="editForm.updatedAt|dateTime" disabled></el-input>
				</el-form-item>
			</el-form>
			<el-row type="flex" justify="end">
				<el-button v-if="editting" type="warning" @click="cancel" plain>取消</el-button>
				<el-button v-if="editting" type="primary" @click="submit">保存</el-button>
				<el-button v-else type="primary" @click="editting=true">编辑</el-button>
			</el-row>
		</el-card>
	</div>
</template>

<style lang="scss" scoped>
	.avatar{
		height: 100px;
	}
	.padding-20{
		padding: 15px;
	}
</style>


<script>
	import { mapGetters } from 'vuex';
	import * as _ from 'lodash';
	function editForm () {
		return {
			username: null,
			email: null,
			phone: null,
			client: null,
			inc: null,
			image: null,
			createdAt: null,
			updatedAt: null,
		};
	}
	export default {
		computed: {
			...mapGetters(['myProfile', 'device']),
			labelPosition () {
				if (this.device == 'mobile') {
					return 'top';
				}
				return 'right';
			},
		},
		watch: {
			myProfile () {
				this.editForm = JSON.parse(JSON.stringify(this.myProfile));
			}
		},
		data () {
			return {
				avatar: require('@/assets/avatar.svg'),
				source: 'squats',
				searchForm: {
					from: null,
					to: null,
				},
				editForm: editForm(),
				editRules: {
					username: [
						{ required: true, message: '请输入数量', trigger: 'blur' },
					],
					email: [
						{ required: false, message: '请输入邮箱', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					],
					phone: [
						{ required: false, message: '请输入电话', trigger: 'blur' },
					],
				},
				editting: false
			};
		},
		methods: {
			submit () {
				this.$refs.editform.validate(async valid => {
					if (valid) {
						await this.patch(`services/users/${this.editForm._id}`, _.pick(this.editForm, ['username', 'email', 'phone', 'image']));
						this.$store.dispatch('GetProfile');
						this.$message({
							message: '修改成功',
							type: 'success',
							duration: 1500,
						});
						this.editting = false;
					}
				});
			},
			cancel () {
				if (JSON.stringify(this.myProfile) == JSON.stringify(this.editForm)) {
					this.editting = false;
					return;
				}
				this.$confirm('取消后编辑的资料将丢失, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					this.editForm = JSON.parse(JSON.stringify(this.myProfile));
					this.editting = false;
				});
			},
		},
		created () {
			this.editForm = JSON.parse(JSON.stringify(this.myProfile));
		}
	};
</script>

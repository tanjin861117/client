<template>
<el-dialog :visible.sync="isShow" v-loading="loading" loading="empty">
    <div slot="title">新建子网</div>
    <div class="pr130">
        <zt-form size="small" :model="data" :rules="rules" ref="form" label-width="140px" :inline-message="true">
            <zt-form-item label="专有网络">
                <el-input :value="vpcData.name" disabled></el-input>
            </zt-form-item>
            <zt-form-item label="名称" prop="name">
                <el-input v-model="data.name"></el-input>
                <span slot="help" class="input-help">描述长度为2-64个字符，不能以http://和https://开头。</span>
            </zt-form-item>
            <zt-form-item label="网段" prop="cindr">
                <ip-input v-model="data.cindr" v-if="isShow"></ip-input>
                <span slot="help" class="input-help">
                    <span class="text-warning">创建后无法修改。</span><br>
                    <span class="text-break-all">子网网段必须属于下面三类：10.0.0.0/8~28，172.16.0.0/12~28，192.168.0.0/16~28。</span><br>
                    例如：192.168.94.0/24
                </span>
            </zt-form-item>
            <zt-form-item label="描述">
                <el-input v-model="data.remark"></el-input>
                <span slot="help" class="input-help">描述长度为2-64个字符，不能以http://和https://开头。</span>
            </zt-form-item>
        </zt-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="font12" @click="confirm" :loading="loading">确 定</el-button>
        <el-button type="info" class="font12" @click="hide">取 消</el-button>
    </span>
</el-dialog>
</template>

<script>
import RegionSelect from '@/components/form/RegionSelect.vue';
import {createSubnet, updateNetwork} from '@/service/ecs/network.js';
import IpInput from '@/components/form/IPInput.vue';
function judgeSubnetIpValid(ip ,mask) {
    //子网网段必须属于下面三类：10.0.0.0/8~28，172.16.0.0/12~28，192.168.0.0/16~28。
    var ip_part0 = parseInt(ip[0]);
    var ip_part1 = parseInt(ip[1]);
    var ip_part2 = parseInt(ip[2]);
    var ip_part3 = parseInt(ip[3]);
    mask = parseInt(mask);
    if (ip_part2 < 0 || ip_part2 > 255) return false;
    if (ip_part3 < 0 || ip_part3 > 255) return false;

    //ip_to_binary
    var num = 0;
    num += parseInt(ip_part0) << 24;
    num += parseInt(ip_part1) << 16;
    num += parseInt(ip_part2) << 8;
    num += parseInt(ip_part3) << 0;
    num = num >>> 0;

    var ip_binary = num.toString(2);
    var host = ip_binary.substring(mask); //主机位

    if (parseInt(host) == 0) {
        return true; //合法
    } else {
        return false;
    }
}

export default {
    components: {
        RegionSelect,
        'ip-input': IpInput
    },
    data() {
        // 验证 IP 格式
        let cindr = function(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入网段'));
            } else {
                let [ipstr, port] = value.split('/');
                let ip = ipstr.split('.');
                if (port && ip.length === 4 && ip.every(e => e >= 0) && judgeSubnetIpValid(ip, port)) {
                    callback();
                } else {
                    callback(new Error('格式不正确'));
                }
            }
        };
        return {
            params: {},
            loading: false,
            isShow: false,
            vpcData: {},
            data: {
                name: `子网-${new Date().getTime()}`,
                remark: '',
                cindr: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入子网名称',
                        trigger: 'blur'
                    }
                ],
                cindr: [
                    {
                        required: true,
                        message: '请输入网段',
                        trigger: 'submit'
                    },
                    {
                        validator: cindr,
                        trigger: 'submit'
                    }
                ]
            },
            resolve: () => {},
            reject: () => {}
        };
    },
    computed: {},
    methods: {
        clear() {
            this.data.name = `子网-${new Date().getTime()}`;
            this.data.remark = '';
            this.data.cindr = '';
            this.$nextTick(() => {
                this.$refs.form.resetFields();
            });
        },
        hide() {
            this.isShow = false;
            this.reject('calcel');
        },
        show(data) {
            this.isShow = true;
            this.vpcData = data;
            this.clear();
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        createSubnet() {
            let params = {
                name: this.data.name,
                zone: this.vpcData.zone,
                remark: this.data.remark,
                vpcId: this.vpcData.hwId,
                vpcIdLocal: this.vpcData.id,
                subnet: this.data.cindr
            };
            this.params = params;
            this.loading = true;
            createSubnet(params)
                .then(ret => {
                    if (ret) {
                        this.resolve(ret);
                    }
                })
                .catch(error => {
                    console.warn('创建VPC', error.message);
                })
                .finally(() => {
                    this.loading = false;
                    this.hide();
                });
        },
        updateNetwork() {
            let params = Object.assign({}, this.data);
            params.vpcId = this.row.id;
            updateNetwork(params)
                .then(ret => {
                    if (ret) {
                        this.resolve(ret);
                    }
                })
                .catch(error => {
                    console.warn('更新VPC', error.message);
                })
                .finally(() => {
                    this.hide();
                });
        },
        confirm() {
            let form = this.$refs.form;
            if (!this.$refs.form) return false;

            // 表单验证
            form.validate(valid => {
                if (valid) {
                    this.createSubnet();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style>
</style>

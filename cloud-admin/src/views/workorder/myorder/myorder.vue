<template>
    <div class="page-main">
        <page-header>
            我的工单
        </page-header>
        <el-row class="mt20">
            <el-col :span="24">
                <el-form :inline="true" :model="formInline" size="small">
                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="createOrder({},1)">-->
                            <!--<span class="icon-zt_plus"></span>-->
                            <!--创建工单-->
                        <!--</el-button>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-select placeholder="请选择" v-model="type" @change="formInline.searchText = ''">
                            <el-option label="工单标题" value="orderTitle"></el-option>
                            <el-option label="工单号" value="orderNO"></el-option>
                            <el-option label="联系方式" value="phone"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input placeholder="搜索关键字" v-model="formInline.searchText"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="ml10" size="small" type="primary" @click="myorderList" icon="el-icon-search">搜索</el-button>
                    </el-form-item>
                    <el-form-item class="pull-right">
                        <el-button type="primary" class=" search-refresh-btn icon-zt_refresh" @click="myorderList"></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData"  header-row-class-name="data-list">
                    <template v-for="col in cols">
                        <!-- 工单号 -->
                        <template v-if="col.column=='orderNO'">
                            <el-table-column min-width="120" :prop="col.column" :label="col.text" :key="col.column">
                                <template slot-scope="scope">
                                    <span class="font12 mr10">{{scope.row.orderNO}}</span>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 标题 -->
                        <template v-if="col.column=='orderTitle'">
                            <el-table-column min-width="120" :prop="col.column" :label="col.text" :key="col.column">
                                <template slot-scope="scope">
                                    <a class="font12 mr10" @click="showDetail(scope.row)">{{scope.row.title}}</a>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 联系方式 -->
                        <template v-if="col.column=='phone'">
                            <el-table-column min-width="120" :prop="col.column" :label="col.text" :key="col.column">
                                <template slot-scope="scope">
                                    <span class="font12 mr10">{{scope.row.mobile}}</span>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 产品类型 -->
                        <template v-if="col.column=='productType'">
                            <el-table-column min-width="120" :prop="col.column" :label="col.text" :key="col.column">
                                <template slot-scope="scope">
                                    <span class="font12 mr10">{{getModuleTypeVal(scope.row.moduleType)}}</span>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 故障类型 -->
                        <template v-if="col.column=='faultType'">
                            <el-table-column min-width="120" :prop="col.column" :label="col.text" :key="col.column">
                                <template slot-scope="scope">
                                    <span class="font12 mr10">{{getOrderTypeVal(scope.row.moduleType, scope.row.orderType)}}</span>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 创建时间 -->
                        <template v-if="col.column=='createTime'">
                            <el-table-column min-width="120" :prop="col.column" :label="col.text" :key="col.column">
                                <template slot-scope="scope">
                                    <span class="font12 mr10">{{scope.row.createTime | date}}</span>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 状态 -->
                        <template v-if="col.column=='status'">
                            <el-table-column width="90" :prop="col.column" :label="col.text" :key="col.column" >
                                <template slot-scope="scope">
                                    <span class="font12 mr10" v-if="scope.row.status == 1">待处理</span>
                                    <span class="font12 mr10" v-if="scope.row.status == 2">已处理</span>
                                    <span class="font12 mr10" v-if="scope.row.status == 3">关闭</span>
                                </template>
                            </el-table-column>
                        </template>
                    </template>
                    <!-- 操作 -->
                    <template>
                        <el-table-column label="操作" key="op" width="200" class-name="option-snaplist">
                            <template slot-scope="scope">
                                <a  @click="transferOrder(scope.row)" class="btn-linker" v-if="scope.row.status == 1">转交</a>
                                <b class="link-division-symbol" v-if="scope.row.status == 1"></b>
                                <a  @click="reply(scope.row)" class="btn-linker" v-if="scope.row.status == 1">处理</a>
                                <!--<b class="link-division-symbol" ></b>-->
                                <!--<a  @click="delOrder(scope.row)" class="btn-linker" >删除</a>-->

                            </template>
                        </el-table-column>
                    </template>
                </el-table>
                <!--分页-->
                <div class="pagination">
                    <el-pagination background
                   @current-change="currentChange"
                   @size-change="handleSizeChange"
                   :current-page="searchObj.paging.pageIndex"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="searchObj.paging.limit"
                   layout="sizes, prev, pager, next"
                   :total="searchObj.paging.totalItems">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <create-order ref="CreateOrder"></create-order>
        <order-detail ref="OrderDetail"></order-detail>
        <!--回复-->
        <reply-dialog ref="ReplyDialog"></reply-dialog>
        <!-- 转交功能 -->
        <transfer-dialog ref="TransferDialog"></transfer-dialog>
        <!-- 补充工单 -->
        <supplement-dialog ref="SupplementDialog"></supplement-dialog>
    </div>
</template>
<script>
import PageHeader from '@/components/pageHeader/PageHeader';
import CreateOrder from './CreateOrder';
import OrderDetail from './OrderDetail';

import TransferDialog from './../dialog/TransferDialog';
import SupplementDialog from './../dialog/SupplementDialog';
import ReplyDialog from './../dialog/ReplyDialog';

import {myorderList} from '@/service/order.js';
export default {
    name: 'app',

    data() {
        let searchObj = {
            //分页
            paging: {
                pageIndex: 1,
                limit: 10,
                totalItems: 0
            },
        };
        let cols = [
            { column: 'orderNO', text:'工单号' , width: '10%'},
            { column: 'orderTitle', text:'问题标题' , width: '15%'},
            { column: 'productType', text: '产品类型', width: '10%' },
            { column: 'faultType', text: '故障类型', width: '10%' },
            { column: 'phone', text: '联系方式', width: '10%' },
            { column: 'createTime', text: '创建时间', width: '10%' },
            { column: 'status', text: '状态', width: '10%' },
        ];

        let moduleTypes = [
            {value: 1, label: '弹性云主机',
                orderTypes: [
                    {value: 10, label: '远程连接'},
                    {value: 11, label: '镜像'},
                    {value: 12, label: '安全组配置'},
                    {value: 13, label: '升降配'},
                    {value: 14, label: '磁盘扩容'},
                    {value: 15, label: '挂载磁盘'}
                ]
            },

            {value: 3, label: '对象存储OSS',
                orderTypes: [
                    {value: 30, label: '文件上传/下载'},
                    {value: 31, label: '读写限制'},
                    {value: 32, label: 'SDK/API'},
                    {value: 33, label: '图片处理服务'},
                    {value: 34, label: '域名/监控'},
                    {value: 35, label: '静态页面'},
                    {value: 36, label: '防盗链'},
                    {value: 37, label: '镜像回源'}
                ]
            },
            {value: 6, label: '专有网络VPC',
                orderTypes: [
                    {value: 60, label: 'VPC使用场景'},
                    {value: 61, label: 'VPC配置'},
                    {value: 62, label: '对等连接'},
                    {value: 63, label: '虚拟防火墙'}
                ]
            },            
        ];

        return {
            cols,
            searchObj,
            moduleTypes,
            daterange: '',
            formInline: {
                searchText: ''
            },
            type:'orderTitle',
            tableData: []

        };
    },
    components: {
        PageHeader,
        CreateOrder,
        OrderDetail,
        TransferDialog,
        SupplementDialog,
        ReplyDialog
    },
    methods: {
        myorderList(){
            let params = {
                paging:this.searchObj.paging
            };
            if(this.type && this.formInline.searchText){
                params[this.type] = this.formInline.searchText;
            }
            $log('params', params);
            this.tableData = [];
            myorderList(params).then(ret => {
                $log('data', ret);
                let resData = ret.data;
                if(resData && resData.data){
                    this.tableData = resData.data || [];
                    this.searchObj.paging.totalItems = resData.total || 0;
                }

            });
        },
        reply(item){
            this.$refs.ReplyDialog.show(item).then(ret => {
                $log('data', ret);
                if(ret && ret.suppleContent){
                    this.myorderList();
                }
            });
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        createOrder(item,optype){
            this.$refs.CreateOrder.show(item,optype)
                .then(ret => {
                    this.myorderList();
                    return this.$alert('操作成功','提示');
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                });
        },
        //工单详情
        showDetail(item){
            this.$refs.OrderDetail.show(item);
        },
        currentChange(val){
            this.searchObj.paging.pageIndex = val;
            this.myorderList();
        },
        handleSizeChange (val) {
            this.searchObj.paging.limit = val;
            this.myorderList();
        },
        // /**
        //  * 删除工单
        //  */
        // del(item){
        //     delOrder(item).then(ret=>{
        //         this.myorderList();
        //     });
        // },
        // delOrder(item) {
        //     this.$confirm('确定要进行删除操作吗？', '删除', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.del(item.id);
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // },
        // 转交工单
        transferOrder(row) {
            this.$refs['TransferDialog'].show({...row})
                .then((res) => {
                    $log(res);
                });
        },
        // 补充
        createRole(row) {
            this.$refs['SupplementDialog'].show({...row})
                .then((res) => {
                    $log(res);
                });
        },
        // 解析产品类型取值
        getModuleTypeVal(val) {
            return this.moduleTypes.filter(
                item => item.value === val
            )[0].label;
        },
        // 解析故障类型取值
        getOrderTypeVal(val1, val2) {
            let orderTypeList = this.moduleTypes.filter( item => item.value === val1 )[0].orderTypes;
            return orderTypeList.filter(
                item => item.value === val2
            )[0].label;
        }
    },

    mounted(){
        this.myorderList();
    }
};
</script>
<style scoped>
</style>

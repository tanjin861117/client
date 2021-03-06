<template>
    <div class="page-main">
        <!-- 顶部 -->
        <page-header>
            路由管理
            <div slot="content"  class="pull-right">
                <el-button type="primary" size="small" @click="openRouterDialog('create')" class="mr10">
                    添加路由
                </el-button>
                <el-button type="info" size="small" @click="getRouterListFn">
                    <i class="iconfont icon-icon-refresh"></i>
                </el-button>
            </div>
        </page-header>
        <!-- 搜索栏 -->
        <!-- <search-box :searchObjExtra="searchObjExtra" @select="getScreenVal"></search-box> -->
        <!-- 表格 -->
        <div class="page-body">
            <zt-table
                :loading="loading" 
                :data="routerList" 
                :search="true" 
                :search-condition="fields" 
                @search="getScreenVal" 
                :paging="searchObj.paging"
                size="small">
                <el-table-column label="路由名称" :min-width="180">
                    <template slot-scope="scope">
                        <div>{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <zt-status :status="ECS_STATUS" :value="scope.row.status.toLowerCase()" ></zt-status>
                    </template>
                </el-table-column>
                <el-table-column label="外部网络" :min-width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.networkName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="管理状态" :min-width="50">
                    <template slot-scope="scope">
                        <span class="color-success" v-if="scope.row.adminStateUp">UP</span>
                        <span class="color-danger" v-else>DOWN</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="操作" :min-width="90" class-name="option-column">
                    <template slot-scope="scope" >
                        <a @click="openRouterDialog('update', scope.row)">编辑路由</a>
                        <b class="link-division-symbol"></b>
                        <router-link :to="{name: 'app.vpc.pn-staticRouter', params: {id: scope.row.id } }">静态路由表</router-link>
                        <b class="link-division-symbol"></b>
                        <zt-dropdown>
                            <span class="el-dropdown-link font12">
                                更多<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <zt-dropdown-menu slot="dropdown">
                                <zt-dropdown-item @click="deleteRouter(scope.row)">删除</zt-dropdown-item>
                                <zt-dropdown-item v-if="scope.row.networkId" @click="clearGatewayFn(scope.row)">清除网关</zt-dropdown-item>
                                <zt-dropdown-item v-else @click="setGatewayFn(scope.row)">设置网关</zt-dropdown-item>
                                <zt-dropdown-item @click="openRoutePort(scope.row)" >路由接口</zt-dropdown-item>
                            </zt-dropdown-menu>
                        </zt-dropdown>
                    </template>
                </el-table-column>
            </zt-table>
        </div>

        <!-- 编辑路由弹窗 -->
        <edit-router ref="EditRouter"></edit-router>
        <!-- 设置网关 -->
        <set-gateway ref="SetGateway"></set-gateway>
        <!-- 路由接口 -->
        <route-port ref="RoutePort"></route-port>
    </div>
</template>
<script>
import searchBox from '@/components/search/SearchBox';
import {getRouterList, queryNetwork, deleteRouter, editGateway} from '@/service/ecs/network.js';
import {ECS_STATUS} from '@/constants/dicts/ecs.js';
import EditRouter from './dialog/EditRouter';
import SetGateway from './dialog/SetGateway';
import RoutePort from './dialog/RoutePort';

let statusArr = [
    {
        value: 'ACTIVE',
        text: '运行中'
    },
    {
        value: 'DOWN',
        text: '已关闭'
    }
];

let adminStateUpArr = [
    {
        value: true,
        text: 'UP' 
    },
    {
        value: false,
        text: 'DOWN' 
    }
];
let searchObj = {
    //分页
    paging: {
        pageIndex: 1,
        limit: 10,
        totalItems: 0
    }
};

let fields = [
    { field: 'name', label: '路由名称', tagType: 'INPUT' },
    { field: 'status', label: '状态', options: statusArr, tagType: 'SELECT' },
    { field: 'admin_state_up', label: '管理状态', options: adminStateUpArr, tagType: 'SELECT' }
];

export default {
    data() {
        return {
            fields,
            ECS_STATUS,
            searchObj,
            routerList: [],
            loading: false, 
            adminStateUpArr,
            statusArr,
            netListData: [],
            outerNetData: [] // 外网网络数据
        };
    },
    components: {
        searchBox,
        EditRouter,
        SetGateway,
        RoutePort
    },
    methods: {
        getScreenVal(params) {
            $log(params.fileds);
            this.searchObj.paging.pageIndex = params.pageIndex;
            this.getRouterListFn(params.fileds);
        },
        // 获得路由列表
        getRouterListFn(fileds) {
            let params = {
                ...this.searchObj.paging,
                ...fileds
            };

            this.loading = true;
            getRouterList(params)
                .then(res => {
                    if (res && res.data) {
                        let data = res.data;
                        if (data.code && data.code === this.CODE.SUCCESS_CODE) {
                            let dataList = data.data || [];
                            this.routerList = dataList.data;
                            this.searchObj.paging.totalItems = dataList.total;
                            $log('getRouterList ->', dataList);
                        }
                    }
                    this.loading = false;
                })
                .catch(e => {
                    console.error('getEcsInstList', e);
                    this.loading = false;
                });
        },
        // 清除网关
        clearGatewayFn(row) {
            let rowData = row;
            rowData.networkId = '';
            rowData.networkName = '';
            $log('clearGatewayFn', rowData);
            let params = {
                ...rowData,
                opName: 'clearGateway'
            };
            this.loading = true;
            editGateway(params)
                .then(res => {
                    if (res && res.code && res.code === this.CODE.SUCCESS_CODE) {
                        console.warn(res);
                        this.$message.success('操作成功');
                        this.getRouterListFn();
                    }
                })
                .catch(e => {
                    console.error('editGateway', e);
                    this.loading = false;
                });
        },
        // 设置网关
        setGatewayFn(row) {
            let SetGateway = this.$refs.SetGateway;
            if (SetGateway) {
                SetGateway.show({
                    outerNetData: this.outerNetData,
                    row: row
                }).then(ret => {
                    if (ret) {
                        this.$message.success('操作成功');
                        this.getRouterListFn();
                    }
                });
            }
        },
        // 打开编辑路由弹窗
        openRouterDialog(type, row) {
            let EditRouter = this.$refs.EditRouter;
            if (EditRouter) {
                EditRouter.show({
                    type: type,
                    outerNetData: this.outerNetData,
                    row: row
                }).then(ret => {
                    if (ret) {
                        this.getRouterListFn();
                    }
                });
            }
        },
        // 获得外网网络
        async getOuterNet() {
            try {
                // 清空数据
                let params = {
                    router_external: true
                };
                let ret = await queryNetwork(params);
                console.warn('getOuterNet', ret);

                this.outerNetData = ret.data;

            } catch (error) {
                console.error('getOuterNet', error.message);
            }
        },
        // 删除路由
        deleteRouter(row) {
            $log('删除数据', row);
            this.$confirm(`您确定要删除路由：${row.name} 吗？`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            })
                .then(() => {
                    return deleteRouter({
                        id: row.id
                    });
                    
                })
                .then(ret => {
                    $log('deleteRouter ret <-', ret);
                    if (ret) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getRouterListFn();
                    }
                })
                .catch((error) => {
                    // 取消
                    $log('deleteRouter', error.message);
                });
            
        },
        // 打开路由接口
        openRoutePort(row) {
            let RoutePort = this.$refs.RoutePort;
            if (RoutePort) {
                RoutePort.show({
                    row: row,
                    netListData: this.netListData
                }).then(ret => {
                    if (ret) {
                        this.$message.success('操作成功');
                        this.getRouterListFn();
                    }
                });
            }
        },
        // 获得网络列表
        async getNetList() {
            try {
                // 清空数据
                this.isLoading = true;
                let params = {
                    pageIndex: 1,
                    router_external: false
                };

                let ret = await queryNetwork(params);
                console.warn('fetchData', ret);
                this.netListData = ret.data;

            } catch (error) {
                console.error('fetchData', error.message);
            }
        },

    },
    created() {
        this.getRouterListFn();
        this.getOuterNet();
        this.getNetList();
    }
};
</script>
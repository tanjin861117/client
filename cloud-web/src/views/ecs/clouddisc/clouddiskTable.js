import LabelDropdown from '@/components/label/LabelDropdown';
import Retrieval from '@/components/retrieval/retrieval';
import AmendName from '@/components/amend/AmendName';
import EditLabelDialog from './../inst/ecsDialog/editLabelDialog';
import CreateSnapDialog from './../inst/ecsDialog/CreateSnapDialog';
import SetAutoSnapDialog from './../inst/ecsDialog/SetAutoSnapDialog';
import ModifyDiskDescripDialog from './../inst/ecsDialog/ModifyDiskDescripDialog';
import ModifyDiskPropDialog from './../inst/ecsDialog/ModifyDiskPropDialog';
import MountDataDisk from './dialog/MountDataDisk';

import {getDiskList,resizeDisk,unmoutDisk,releaseDisk} from '@/service/ecs/disk/disk.js';

import RevealPopover from '@/components/popover/RevealPopover';

export default {
    name: 'ClouddiskTable',
    components: {
        // PageHeader,
        // RegionRadio,
        LabelDropdown,
        Retrieval,
        EditLabelDialog,
        CreateSnapDialog,
        SetAutoSnapDialog,
        ModifyDiskDescripDialog,
        ModifyDiskPropDialog,
        AmendName,
        MountDataDisk,
        RevealPopover
    },
    props:['isShowSearch'],
    data() {
        let fields = [{field: 'diskName', label: '磁盘名称', inputval: ''}, {field: 'id', label: '磁盘ID', inputval: ''}];
        let searchObjExtra = {
            frominfo: '',
            fields: fields,
            selField: fields[0]
        };

        let cols = [
            {column: 'name', text: '磁盘ID/磁盘名称', width: '20%'},
            {column: 'lable', text: '标签', width: '4%'},
            {
                column: 'diskType',
                text: '磁盘种类',
                width: '4%',
                dropdowns: [{key: 0, text: '全部', state: true, value: ''}, {key: 1, text: 'SSD云盘', state: false, value: 'SSD'}, {key: 2, text: '高效云盘', state: false, value: 'SATA'}]
            },
            {
                column: 'diskStatus',
                text: '磁盘状态',
                width: '4%',
                dropdowns: [{key: 0, text: '全部', state: true, value: ''}, {key: 1, text: '使用中', state: false, value: 'in-use'}, {key: 2, text: '待挂载', state: false, value: 'available'}]
            },
            {column: 'volume_type', text: '付费方式', width: '4%'},
            {column: 'bootable', text: '可用区', width: '4%'},
            {
                column: 'isBoot',
                text: '磁盘属性',
                width: '4%',
                dropdowns: [{key: 0, text: '全部', state: true, value: ''}, {key: 1, text: '系统盘', state: false, value: '1'}, {key: 2, text: '数据盘', state: false, value: '0'}]
            },
            {column: 'countSnapshot', text: '快照数量', width: '10%'}
        ];
        let searchObj = {
            //分页
            paging: {
                pageIndex: 1,
                limit: 10,
                totalItems: 0
            },
            ////需要放入的其它参数
            //params: {},
            //附加查询条件
            extra: {
                //startTime:'',
                //endTime:'',
                //orderBy:'', //排序字段
                //ascOrDesc: '', //'DESC'、'ASC'  //descend 降序,ascend 升序
            }
        };
        let allLabelData = [
            {labelKey: 'dded', labelvalue: 'fddff'},
            {labelKey: 'ddd', labelvalue: 'fff2'},
            {labelKey: '2ddd', labelvalue: 'f3ff'},
            {labelKey: 'dd1', labelvalue: 'fddff'},
            {labelKey: 'dd2', labelvalue: 'fff2'},
            {labelKey: '2d3d', labelvalue: 'f3ff'}
        ];
        return {
            region: '',
            searchObjExtra,
            cols,
            tableData: [],
            searchObj,
            labelQueryData: [],
            allLabelData,
            fieldValue: '',
            retrievalData: [],
            selectLabelList: [],
            showId: ''
        };
    },    
    created() {
        this.getDiskList();
    },
    methods: {
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },

        //获取云盘列表数据
        getDiskList() {
            let params = {
                paging: this.searchObj.paging,
                fileds: {
                    [this.searchObjExtra.selField.field]: this.searchObjExtra.selField.inputval
                }
            };
            getDiskList(params).then(res => {
                if (res.code && res.code === this.CODE.SUCCESS_CODE) {
                    console.log('getDiskList', res);
                    let resData = res.result;
                    if (resData && resData.records) {
                        this.tableData = resData.records || [];
                        this.searchObj.totalItems = resData.total || 0;
                        console.log('getInstanceDetail tableData', this.tableData);
                    }
                }
            });
        },

        //卸载
        unmountDisk(rowItem) {
            let msg = {};
            switch (rowItem.isBoot) {
                case '1': {
                    msg.diskType = '系统盘';
                    msg.alertInfo = `
                    1、云硬盘卸载前，请保证该云硬盘在操作系统内的逻辑磁盘已通过unmount等命令进行卸载操作。<br/>
                    2、云硬盘卸载后，数据无法再写入对应云硬盘。                           
                    `;
                    break;
                }
                case '0': {
                    msg.diskType = '数据盘';
                    msg.alertInfo = `
                    1、云服务器卸载系统盘后，将无法登录及使用。<br/>
                    2、云服务器卸载系统盘后，如需重新挂载系统盘，请注意只能挂载与原服务器镜像相同的系统盘，否则会挂载失败。
                    `;
                    break;
                }
                default: {}
            }
            const h = this.$createElement;
            let message = h('div', null, [
                h('p', {class: {font16: true, mt10: true}}, `您确认要卸载此${msg.diskType}吗？`),
                h('el-alert', {props: {type: 'warning', closable: false}}, [
                    h('p', {
                        attr: {slot: 'description'},
                        domProps: {
                            innerHTML:msg.alertInfo
                        }
                    })
                ])
            ]);
            //卸载磁盘
            this.$confirm(message, '卸载磁盘').then(() => {
                //提交后台,卸载磁盘
                unmoutDisk({disk_id:rowItem.id})
                    .then();
               
            });
        },

        //释放磁盘
        releaseDisk(rowItem) {
            const h = this.$createElement;
            let message = h('div', null, [
                h('p', {class: {font16: true, mt10: true}}, `您确认要释放本磁盘吗？`),
                h('el-alert', {props: {type: 'warning', closable: false}}, [
                    h('p', {
                        attr: {slot: 'description'},
                        domProps: {
                            innerHTML: `
                            1.释放磁盘前，请先删除磁盘的快照，否则无法释放磁盘。<br/>
                            2.如果已为磁盘设置了"快照随磁盘释放"，则快照会随磁盘一起被删除。<br/>
                            3.磁盘释放后，数据将被永久清除，无法恢复，请谨慎操作。
                            `
                        }
                    })
                ])
            ]);
            //释放磁盘
            this.$confirm(message, '释放磁盘').then(() => {
                //提交后台,释放磁盘 
                releaseDisk({disk_id:rowItem.id})
                    .then();               
            });
        },

        //云盘扩容
        resizeDisk(){

            //提交后台
            resizeDisk();
        },

        /**
         * 编辑标签
         */
        editLabel: function(rowItem) {
            console.log('editLabel:', rowItem);
            this.$refs.editLabelDialog
                .show(rowItem, 1, 2)
                .then(ret => {
                    console.log('操作成功', ret);
                    return this.$confirm('操作成功');
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                });
        },
        /**
         * 获取标签筛选值
         * */

        getSelLabelList(data) {
            this.retrievalData = data;
        },
        getRetrieval(data) {
            this.selectLabelList = data;
        },
        /**
         * 创建快照
         */
        createSnap: function(rowItem) {
            console.log('editLabel:', rowItem);
            this.$refs.CreateSnapDialog.show(rowItem)
                .then(ret => {
                    this.$message.success('操作成功');
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                });
        },
        /**
         * 设置自动快照策略
         */
        setAutoSnap: function(rowItem) {
            console.log('editLabel:', rowItem);
            this.$refs.SetAutoSnapDialog.show(rowItem)
                .then(ret => {
                    console.log('操作成功', ret);
                    return this.$confirm('操作成功');
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                });
        },
        /**
         * 修改磁盘描述
         */
        modifyDiskDescrip: function(rowItem) {
            console.log('editLabel:', rowItem);
            this.$refs.ModifyDiskDescripDialog.show(rowItem)
                .then(ret => {
                    console.log('操作成功', ret);
                    return this.$confirm('操作成功');
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                });
        },
        /**
         * 修改磁盘属性
         */
        modifyDiskProp: function(rowItem) {
            console.log('editLabel:', rowItem);
            this.$refs.ModifyDiskPropDialog.show(rowItem)
                .then(ret => {
                    console.log('操作成功', ret);
                    return this.$confirm('操作成功');
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                });
        },
        /**
         * 挂载数据盘
         */
        mountDataDiskFn (rowItem) {
            console.log('MountDataDisk:',rowItem); 
            this.$refs.MountDataDisk
                .show(rowItem)
                .then(ret => {
                    console.log('操作成功', ret);
                    this.$message.success('操作成功');
                    this.getDiskList();
                })
                .catch(err => {
                    if (err) {
                        console.log('Error', err);
                    } else {
                        console.log('取消');
                    }
                }); 
        },
        /**
         * 更多菜单指令事件
         */
        handleCommand({handle, rowItem}) {
            if(!handle && !rowItem) return;
            if (handle && this[handle]) {
                this[handle](rowItem);
            }
        },
        /**
         * 进入单元格
         */
        showEditName(row, column, cell, event) {
            this.showId = row.id;
        }
    }
};
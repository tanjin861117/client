// 注册模块 User服务api文档,服务上下文为people-services-user
// const USER_CONTROLLER = 'people-services-user-tanjin';
const USER_CONTROLLER = 'identity';

// 云安全
// const SECURITY_CONTROLLER = 'people-services-security-pengjie';
const SECURITY_CONTROLLER = 'services-security';

// ECS模块服务上下文为services-ecs
const ECS_CTRL = 'services-ecs';

// OSS模块
const OSS_CONTROLLER = 'services-oss';

// rds模块
const RDS_CONTROLLER = 'services-rds';

// 私有镜像
const IMAGE_CTRL = 'services-image';

// 镜像
// const NEWIMAGE_CTRL = 'image-controller';

// 登录模块
export const API_LOGIN = {
    login: USER_CONTROLLER + '/auth/token',
    checkUserName: USER_CONTROLLER + '/user/checkUserName',
    getLoginState: '/auth/getLoginState'
};

// 注册模块
export const API_REGISTER = {
    register: USER_CONTROLLER + '/user/register',
    checkMobileExist: USER_CONTROLLER + '/user/checkMobileExist',
    checkImageCode: USER_CONTROLLER + '/user/checkImageCode',
    checkMobileCode: USER_CONTROLLER + '/user/checkMobileCode',
    getImageCode: USER_CONTROLLER + '/user/imageCode',
    sendMobileCode: USER_CONTROLLER + '/user/sendMobileCode'
};

//用户认证
export const API_USR_AUTH = {
    RSA: USER_CONTROLLER + '/rsa', //GET 用户认证资料详情
    getUserAuthInfo: USER_CONTROLLER + '/userAuth/{user_id}', //GET 用户认证资料详情
    userAuthMoneyConfirm: USER_CONTROLLER + '/userAuth/confirm',
    userAuthApply: USER_CONTROLLER + '/userAuth/apply',
    userAuthCompanyList: USER_CONTROLLER + '/userAuth/company/list' //已认证企业列表
};

// 联系人管理模块
export const API_CONTACT = {
    getContact: USER_CONTROLLER + '/contact/list', // 查询联系人列表
    addContact: USER_CONTROLLER + '/contact', // 添加联系人
    amendContact: USER_CONTROLLER + '/contact', // 修改联系人
    delContact: USER_CONTROLLER + '/contact' // 删除联系人
};
// ecs模块
export const API_ECS = {
    overview: {
        getVolumeCount: ECS_CTRL + '/overview/volume-count',
        getServerCount: ECS_CTRL + '/overview/server-count'
    },
    inst: {
        getInstList: ECS_CTRL + '/servers',
        createECS: ECS_CTRL + '/servers',
        getInstanceCountInfo: ECS_CTRL + '/servers/{instanceId}/count-info',
        getInstanceDetail: ECS_CTRL + '/servers/{instanceId}/detail',
        getInstanceNet: ECS_CTRL + '/servers/{instanceId}/net-info',
        modifyInstFlavor: ECS_CTRL + '/servers/{instanceId}/resize/{flavorId}',
        resizeInstFlavor: ECS_CTRL + '/servers/{instanceId}/resize/{flavorId}',
        reloadInstOS: ECS_CTRL + '/servers/reloadSystem',
        actionInst: ECS_CTRL + '/servers/{instanceId}/action/{type}',
        editInstInfo: ECS_CTRL + '/servers/{instanceId}',
        deleteInst: ECS_CTRL + '/servers/{instanceId}',
        getPortByEcsId: ECS_CTRL + '/servers/{ecsId}/port',
        getBindedPublicIpByEcsId: ECS_CTRL + '/servers/{ecsId}/float-ip',
        getAllPortList: ECS_CTRL + '/servers/ports',
        resetPassword: ECS_CTRL + '/servers/{ecsId}/os-reset-password'
    },
    monitor: {
        moniterEchartMetricData: ECS_CTRL + '/moniter/echart-metric-data'
    },
    flavors: {
        getFlavors: ECS_CTRL + '/flavors',
        getFlavorsDetail: ECS_CTRL + '/flavors/{flavorId}/detail'
    },
    vnc: {
        vncCheck: ECS_CTRL + '/vnc/{instanceId}/check',
        vncGetUrl: ECS_CTRL + '/vnc/{instanceId}',
        vncModify: ECS_CTRL + '/vnc/modify'
    },
    disk: {
        getDiskList: ECS_CTRL + '/disk/list',
        setDiskSnapshotPolicy: ECS_CTRL + '/disk/snapshot-policy',
        updateDisk: ECS_CTRL + '/disk/{disk_id}',
        diskRollback: ECS_CTRL + '/disk/{disk_id}/rollback/{snapshot_id}', //回滚磁盘
        mountDisk: ECS_CTRL + '/disk/{disk_id}/mount', //挂载云盘
        unmoutDisk: ECS_CTRL + '/disk/{disk_id}/unmount', //卸载云盘
        releaseDisk: ECS_CTRL + '/disk/{disk_id}', //释放、删除云盘
        resizeDisk: ECS_CTRL + '/disk/{disk_id}/resize' //云盘扩容
    },
    snapshot: {
        createSnapshot: ECS_CTRL + '/snapshots',
        getSnapshotList: ECS_CTRL + '/snapshots/list',
        deleteSnap: ECS_CTRL + '/snapshots/{snapshot_ids}'
    },
    policy: {
        getPolicy: ECS_CTRL + '/policy/list',
        createPolicy: ECS_CTRL + '/policy',
        modifyPolicy: ECS_CTRL + '/policy/{policy_id}',
        deletePolicy: ECS_CTRL + '/policy/{policy_id}'
    },
    images: {
        createImage: ECS_CTRL + '/images',
        getImages: ECS_CTRL + '/images',
        imageGroups: ECS_CTRL + '/images/groups',
        updateImages: ECS_CTRL + '/images/{imageId}',
        deleteImages: ECS_CTRL + '/images/{imageId}'
    },
    floatIp: {
        create: ECS_CTRL + '/floating/create',
        bundlingIp: ECS_CTRL + '/floating/bundlingIp',
        getPortByInstanceId: ECS_CTRL + '/floating/getPortByInstanceId',
        llistFloatIpist: ECS_CTRL + '/floating/interface/list',
        list: ECS_CTRL + '/floating/list',
        updateFloatingIp: ECS_CTRL + '/floating/{id}',
        unbundlingIp: ECS_CTRL + '/floating/unbundlingIp',
        deleteFloatIp: ECS_CTRL + '/floating/{id}',
        getFloatingList: ECS_CTRL + '/floating/list',
        modifyFloating: ECS_CTRL + '/floating/{id}',
        // 查询浮动IP
        queryFloatIp: ECS_CTRL + '/floating/interface/list'
    },
    keypairs: {
        searchKeypairs: ECS_CTRL + '/keypairs', //get
        sreateKeypairs: ECS_CTRL + '/keypairs', //post
        deleteKeypairs: ECS_CTRL + '/keypairs/{keyId}' //delete {keyId}
    },
    labels: {
        labels: ECS_CTRL + '/labels',
        labelsCount: ECS_CTRL + '/labels/count'
    },
    network: {
        network: ECS_CTRL + '/networks',
        networkID: ECS_CTRL + '/networks/{vpcId}',
        networkCount: ECS_CTRL + '/networks/count/{vpcId}',
        getNetwork: ECS_CTRL + '/networks',
        getSubnetByNetId: ECS_CTRL + '/networks/{networkId}/subnets',
        subnet: ECS_CTRL + '/network/subnet',
        subnetID: ECS_CTRL + '/network/subnet/{subnetId}'
    },
    security: {
        createGroup: ECS_CTRL + '/security-group', // 创建安全组
        modifyGroup: ECS_CTRL + '/security-group/{group_id}', // 修改安全组
        exampleBindGroup: ECS_CTRL + '/security-group/bind-ecs', // 给实例绑定安全组
        exampleUntieGroup: ECS_CTRL + '/security-group/unbind-ecs', // 给实例解绑安全组
        createGroupRule: ECS_CTRL + '/security-group/rule', // 创建安全组规则
        updateGroupRule: ECS_CTRL + '/security-group/rule/{rule_id}', // 更新安全组规则
        getGroupList: ECS_CTRL + '/security-group/list', // 查询安全组列表
        listByInstanceType: ECS_CTRL + '/security-group/listByInstanceType',
        existGroup: ECS_CTRL + '/security-group/not-exist-group', // 查询所有安全组-用于给实例添加安全组-过滤掉已经加入到本实例中的安全组
        existEcs: ECS_CTRL + '/security-group/{group_id}/not-exist-ecs', // 查询所有实例-用于给安全组添加实例-过滤掉已经加入到本安全组的实例
        deleteGroupRule: ECS_CTRL + '/security-group/{rule_id}', // 删除安全组规则
        deleteGroup: ECS_CTRL + '/security-group/{group_id}', // 删除安全组
        getGroupRuleList: ECS_CTRL + '/security-group/{group_id}/rules-vo' // 查询安全组规则列表
    },
    // 对等链接
    peering: {
        peering: ECS_CTRL + '/peering',
        peeringList: ECS_CTRL + '/peering/list',
        //  删除，修改
        actionPeering: ECS_CTRL + 'peering/{peering_id}',
        // 路由
        route: ECS_CTRL + '/peering/{peering_id}/route',
        deleteRoute: ECS_CTRL + '/peering/{peering_id}/route/{route_id}',
        getGroupRuleList: ECS_CTRL + '/security-group/{group_id}/rules', // 查询安全组规则列表
        getInstByGroup: ECS_CTRL + '/servers' // 根据安全组查询所绑定的实例
    },
    // 防火墙
    firewall: {
        firewall: ECS_CTRL + '/firewall',
        ID: ECS_CTRL + '/firewall/{firewall_id}',
        IDNetwork: ECS_CTRL + '/firewall/{firewall_id}/network', //防火墙绑定子网
        list: ECS_CTRL + '/firewall/list',
        rule: ECS_CTRL + '/firewall/rule',
        ruleList: ECS_CTRL + '/firewall/rule/list',
        ruleID: ECS_CTRL + '/firewall/rule/{id}'
    },
    newimages: {
        image: IMAGE_CTRL + '/image',
        // 根据类别查询镜像接口
        list: IMAGE_CTRL + '/image/images/list',
        // 列表接口
        type: IMAGE_CTRL + '/image/list'
    }
};

// OSS对象存储模块API地址
export const API_OSS = {
    // GET /ossSpace 获取命名空间信息-首页加载总概览
    ossSpace: OSS_CONTROLLER + '/ossSpace',
    // 获取命名空间秘钥接口
    getAuthKeys: OSS_CONTROLLER + '/ossSpace/authKeys',
    createAuthKey: OSS_CONTROLLER + '/ossSpace/authKeys',
    ossSpaceData: OSS_CONTROLLER + '/ossSpace/data',
    delete: OSS_CONTROLLER + '/ossSpace/authKeys/{keyId}',
    bucketList: OSS_CONTROLLER + '/ossBucket/list',
    createBucket: OSS_CONTROLLER + '/ossBucket',
    // 给空间绑定(解绑)一个域名接口
    domain: OSS_CONTROLLER + '/ossBucket/domain',
    // 获取空间下绑定的域名列表接口
    bucketDomainList: OSS_CONTROLLER + '/ossBucket/domain/list/{bucketId}',
    // 获取用户绑定的域名接口
    userDomains: OSS_CONTROLLER + '/ossBucket/domain/userDomains/{bucketId}',
    // 查询桶的单个统计数据接口
    getBucketDataByItem: OSS_CONTROLLER + '/ossBucket/data/item/{bucketId}',
    // 查询桶的统计数据接口
    getBucketData: OSS_CONTROLLER + '/ossBucket/data/{bucketId}',
    // 查询bucket的流量和请求数的统计数据接口
    getBucket: OSS_CONTROLLER + '/ossBucket/{bucketId}/getBucket',
    // 查询基础设置信息
    getBucketBasic: OSS_CONTROLLER + '/ossBucket/{bucketId}',
    // 文件操作 上传 下载 删除
    file: OSS_CONTROLLER + '/ossBucket/file',
    // 获取空间中的文件列表
    fileList: OSS_CONTROLLER + '/ossBucket/file/list',
    // 从空间中搜索指定的文件列表接口
    search: OSS_CONTROLLER + '/ossBucket/file/search',
    // 新建目录
    createDir: OSS_CONTROLLER + '/ossBucket/dir',
    downloadFile: OSS_CONTROLLER + '/ossBucket/file/download',
    uploadFile: OSS_CONTROLLER + '/ossBucket/{bucket_id}/file',
    fileLink: OSS_CONTROLLER + '/ossBucket/file/link'
};
// 用户账号模块
export const API_UserAccount = {
    checkMobileExist: '/user/checkMobileExist',
    checkEmailExist: USER_CONTROLLER + '/user/checkEmailExist',
    validatePassword: USER_CONTROLLER + '/user/validatePassword',
    checkImageCode: 'user/checkImageCode',
    checkMobileCode: 'user/checkImageCode',
    pwdForget: USER_CONTROLLER + '/user/resetPassword',
    bindMail: USER_CONTROLLER + '/user/sendEmailValidate',
    // bindMail: USER_CONTROLLER + '/user/bindMail', // 改成发送验证码
    pwdReset: USER_CONTROLLER + '/user/changePassword',
    activeMail: USER_CONTROLLER + '/user/activeMail',
    validateEmailCode: USER_CONTROLLER + '/user/validateEmailCode',
    uploadFile: USER_CONTROLLER + '/file/upload',
    getUploadFile: USER_CONTROLLER + '/file',
    // userAuthApply: USER_CONTROLLER + '/userAuth/apply ',
    // userAuthResult: USER_CONTROLLER + '/userAuth/{user_id}',
    // userAuthMoneyConfirm: USER_CONTROLLER + '/userAuth/confirm ',
    getUserInfo: USER_CONTROLLER + '/user/{user_id}/info',
    getUserInfoDetail: USER_CONTROLLER + '/user/{user_id}/info',
    getUserDetail: USER_CONTROLLER + '/user/{user_id}',
    saveUserInfo: USER_CONTROLLER + '/user/info',
    updateUserInfo: USER_CONTROLLER + '/user/info/{id}',
    bindMobile: USER_CONTROLLER + '/user/bindPhone'
};

// 云安全
export const API_SECURITY = {
    // 安全
    event: SECURITY_CONTROLLER + '/security/event',
    info: SECURITY_CONTROLLER + '/security/info',
    weakness: SECURITY_CONTROLLER + '/security/weakness',
    getWarningConfig: SECURITY_CONTROLLER + '/security/warningConfig/getConfig',
    setWarningConfig: SECURITY_CONTROLLER + '/security/warningConfig/setConfig',
    // 资产列表
    assetList: SECURITY_CONTROLLER + '/asset/list',
    onKeyScan: SECURITY_CONTROLLER + '/asset/onKeyScan',
    protect: SECURITY_CONTROLLER + '/asset/protect',
    // 主机信息
    onkeyscanStatus: SECURITY_CONTROLLER + '/hostInfo/onkeyscanStatus',
    hostInfoList: SECURITY_CONTROLLER + '/hostInfo/list',
    hostInfoProcess: SECURITY_CONTROLLER + '/hostInfo/process',
    hostInfoPort: SECURITY_CONTROLLER + '/hostInfo/port',
    hostInfoAccount: SECURITY_CONTROLLER + '/hostInfo/account',
    hostInfoWeb: SECURITY_CONTROLLER + '/hostInfo/web',
    hostAnomaly: SECURITY_CONTROLLER + '/hostInfo/hostAnomaly',
    // 漏洞管理
    leakManageList: SECURITY_CONTROLLER + '/leakManage/list',
    leakManageDetail: SECURITY_CONTROLLER + '/leakManage/detail',
    leakManageIgnore: SECURITY_CONTROLLER + '/leakManage/ignore',
    leakManageIgnoreCancel: SECURITY_CONTROLLER + '/leakManage/ignoreCancel',
    leakManageIgnoreVerify: SECURITY_CONTROLLER + '/leakManage/verify',
    // 基线检查
    baseLineList: SECURITY_CONTROLLER + '/baseLine/list',
    baseLineDetail: SECURITY_CONTROLLER + '/baseLine/detail',
    baseLineIgnore: SECURITY_CONTROLLER + '/baseLine/ignore',
    baseLineVerify: SECURITY_CONTROLLER + '/baseLine/verify',
    baseLineIgnoreCancel: SECURITY_CONTROLLER + '/baseLine/ignoreCancel',
    // 弱口令
    weakPwdDetail: SECURITY_CONTROLLER + '/weakPwd/detail',
    // 防暴力破解
    bruteForceDetail: SECURITY_CONTROLLER + '/bruteForce/list',
    bruteForceAddTrust: SECURITY_CONTROLLER + '/bruteForce/addTrust',
    bruteForceUnlockIP: SECURITY_CONTROLLER + '/bruteForce/unlockIP',
    bruteForceConfig: SECURITY_CONTROLLER + '/bruteForce/config',
    // 端口扫描
    portScanDetail: SECURITY_CONTROLLER + '/portScan/list',
    portScanAddTrust: SECURITY_CONTROLLER + '/portScan/addTrust',
    portScanUnlockIP: SECURITY_CONTROLLER + '/portScan/unlockIP',
    portScanConfig: SECURITY_CONTROLLER + '/portScan/config',
    // 主机木马
    webshellDetail: SECURITY_CONTROLLER + '/webshell/list',
    webshellTrust: SECURITY_CONTROLLER + '/webshell/trust',
    webshellBackup: SECURITY_CONTROLLER + '/webshell/backup',
    webshellWebList: SECURITY_CONTROLLER + '/webshell/webList',
    webshellWebPath: SECURITY_CONTROLLER + '/webshell/webPath',
    // 异常登录
    abnLoginDetail: SECURITY_CONTROLLER + '/abnLogin/list',
    abnLoginAddTrust: SECURITY_CONTROLLER + '/abnLogin/addIpWhitelist',
    abnLoginLockIP: SECURITY_CONTROLLER + '/abnLogin/lockIP',
    abnLoginUnlockIP: SECURITY_CONTROLLER + '/abnLogin/unlockIP',
    abnLoginSecuritySetting: SECURITY_CONTROLLER + '/abnLogin/securitySetting',
    abnLoginSecuritySettingList: SECURITY_CONTROLLER + '/abnLogin/securitySetting/list',
    abnLoginSecuritySettingStatus: SECURITY_CONTROLLER + '/abnLogin/securitySetting/status',
    // 安全设置
    safeConfigWebshellConfigList: SECURITY_CONTROLLER + '/safeConfig/webshellConfig/list',
    safeConfigWebshellConfig: SECURITY_CONTROLLER + '/safeConfig/webshellConfig',
    safeConfigBaseLineConfig: SECURITY_CONTROLLER + '/safeConfig/baseLineConfig',
    safeConfigStatus: SECURITY_CONTROLLER + '/safeConfig/safeConfigStatus',
    safeConfigAgentModelList: SECURITY_CONTROLLER + '/safeConfig/agentModel/list',
    // 操作审计
    opAuditList: SECURITY_CONTROLLER + '/opAudit/list'
};

// rds api
export const API_RDS = {
    // 创建rds实例
    create: RDS_CONTROLLER + '/instance',
    // 删除 详情 修改
    instance: RDS_CONTROLLER + '/instance/{instance_id}',
    // 实例列表
    list: RDS_CONTROLLER + '/instance/list',
    // 调整实例
    action: RDS_CONTROLLER + '/instance/{instance_id}/action',
    // 创建 快照
    snapshot: RDS_CONTROLLER + '/snapshot',
    // 快照列表
    snapshotList: RDS_CONTROLLER + '/snapshot/list',
    // 删除快照
    deleteSnapshot: RDS_CONTROLLER + '/snapshot/{backup_id}',
    // 数据库类型
    dataStoreType: RDS_CONTROLLER + '/datastore/type',
    // 只读副本数量
    replicaCount: RDS_CONTROLLER + '/instance/{instance_id}/replica_count',
    // 绑定/解绑浮动IP
    floatIp: RDS_CONTROLLER + '/instance/{instance_id}/float_ip',
    // 错误日志
    errorLog: RDS_CONTROLLER + '/log/{instance_id}/error',
    // 慢日
    slowLog: RDS_CONTROLLER + '/log/{instance_id}/slow',
    // 添加白名单
    addWhite: RDS_CONTROLLER + '/white',
    // 白名单列表
    whiteList: RDS_CONTROLLER + '/white/list',
    // 删除,更新白名单
    updateWhite: RDS_CONTROLLER + '/white/{group_id}',
    // 清空白名单
    clearWhite: RDS_CONTROLLER + '/white/{group_id}/clear',
    // 性能优化
    performance: RDS_CONTROLLER + '/instance/{instance_id}/performance',
    // 设置自动备份
    policy: RDS_CONTROLLER + '/instance/{instance_id}/policy',
    // 配置参数
    parameters: RDS_CONTROLLER + '/instance/{instance_id}/parameters'
};

//私有镜像
export const API_IMAGE = {
    //添加自定义镜像
    addCustomImage: IMAGE_CTRL + '/image'
};
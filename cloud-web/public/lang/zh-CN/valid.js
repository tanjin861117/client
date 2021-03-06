export default {
    // 用户登录密码/弹性云主机密码
    password: {
        length: '8-32个字符，字母区分大小写',
        char: '只能包含数字，字母，特殊符号（空格，>，<除外）',
        regex: '数字，字母，特殊符号必须同时存在'
    },
    // 远程登录密码
    remotePasswod: {
        length: '长度小于等于6个字符',
        regex: '只能包含数字，字母'
    },
    // 实例/云盘名称/安全组名称/自动快照策略
    name: {
        length: '2-64个字符',
        regex: '只能包含中英文，数字，下划线，中划线'
    },
    accountName: {
        length: '5-32字符，推荐使用公司名称进行注册',
        char: '只能包含中英文，数字，下划线，中划线',
        regex: '不能为纯数字'
    },
    // 快照名称
    snapshot: {
        length: '2-64个字符',
        regex: '只能包含英文字母，数字，下划线，中划线'
    },
    oss: {
        legnth: '4-64个字符',
        char: '只能包含小写字母、数字、"-"、"."',
        regex: '不能以特殊符号开头'
    },
    image: {
        legnth: ' 2-64个字符',
        regex: '只能包含英文字母，数字，下划线，中划线'
    },
    remark: {
        length: '长度小于300个字符'
    },
    equal: {
        tips1: '两次输入密码不一致',
        tips2: '两次输入密码不一致，请重新输入'
    }
};

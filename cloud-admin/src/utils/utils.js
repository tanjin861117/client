/*
 * @Author: wenfang 
 * @Date: 2018-06-21 11:35:47 
 * @Last Modified by: wenfang
 * @Last Modified time: 2018-08-03 14:37:21
 */

import moment from 'moment';

/**
 * 引入lodash模块中的isEmpty方法 后续可引入lodash其他模块
 * isEmpty 只支持object, array, string,不支持number
 */
export {isEmpty, isArray, isObject, isNumber, cloneDeep, get, isDate} from 'lodash';

/**
 * 时间格式化
 * @param {*} value 需要格式化的时间
 * @param {*} formatString 格式
 */
export const dateFormat = (value = '', formatString = 'YYYY-MM-DD HH:mm') => {
    if (value === '' || value === null || value === undefined) return;
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment(value).format(formatString);
};
/**
 * 获取DOM
 */
export const getDom = {
    getId: id => {
        return document.getElementById(id);
    },
    /**
     * 通过classname获取节点
     */
    getClass: className => {
        return document.getElementsByClassName(className);
    },
    getTag: tagName => {
        return document.getElementsByTagName(tagName);
    }
};

/**
 * 原生JS实现addClass,removeClass,toggleClass
 * @param {*} obj
 * @param {*} cls
 */
export const hasClass = (obj, cls) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

export const addClass = (obj, cls) => {
    if (!hasClass(obj, cls)) obj.className += ' ' + cls;
};

export const removeClass = (obj, cls) => {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};

/**
 * 动态切换样式
 */
export const toggleClass = (obj, cls) => {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    // 在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode === 'float' ? parseFloat(target) : parseInt(target);
};

/**
 * 根据当前路由获取子菜单
 * matched  一个数组，包含当前路由的所有嵌套路径片段的路由记录
 */
export const getSubMenu = matched => {
    // 直接上级路由
    let parentRouter = matched[matched.length - 2];
    // 当前路由
    let currentRouter = matched[matched.length - 1];
    // 设置当前路由对应的一级菜单选中状态
    let activeIndex = matched[1].name;
    // 当前模块名称
    let moduleName = '';
    let subMenu = [];
    let menu = [];

    let name = '';
    // 如果当前路由指定了上级菜单 则获取指定的菜单子菜单
    if (currentRouter.meta && currentRouter.meta.parentName) {
        name = currentRouter.meta.parentName ? currentRouter.meta.parentName : name;
    } else {
        // 如果meta定义了父级路由则根据定义的路由找对应的菜单
        name = parentRouter.meta.parentName ? parentRouter.meta.parentName : parentRouter.name;
    }
    try {
        menu = window.navList.find(item => {
            return item.sref === name;
        });
        // 如果在一级菜单中没找到，查找二级菜单
        if (menu === undefined) {
            let parentNode = window.navList.find(item => {
                return item.sref === activeIndex;
            });
            moduleName = parentNode.text;
            menu = parentNode['submenu'].find(item => {
                return item.sref === name;
            });
        } else {
            moduleName = menu.text;
        }
        subMenu = menu !== undefined ? menu['submenu'] : [];
    } catch (error) {
        subMenu = [];
    }
    return {
        moduleName,
        subMenu,
        activeIndex
    };
};

//根据key-text展示文本内容 add by suersheng
//items:映射数组
//val: 给定val值
//itemkeyname:映射数组中的key字段名
//itemtextname:映射数组中的text字段名
export const showTextByKey = (items, val, itemkeyname = 'key', itemtextname = 'text') => {
    if (typeof val === 'undefined') {
        return '';
    }
    if (Array.isArray(items)) {
        for (var i = 0, ii = items.length; i < ii; i++) {
            var item = items[i];
            if (val == item[itemkeyname] || parseInt(val) === parseInt(item[itemkeyname])) {
                return item[itemtextname];
            }
        }
    }
    return '';
};

/**
 * 线程等待
 * @param {String, Number} timeout 等待时间
 */
export const sleep = timeout => {
    if (!timeout) return Promise.resolve();
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};

/**
 * 正则替换url参数
 * @param {*} url
 * @param {*} replaceWith
 * replaceWith('parmaA/{1}/parmaB/{2}', ['A','B']) 替换后的结果是parmaA/A/parmaB/B
 */
export const replaceParamVal = (url, replaceWith = []) => {
    if (url) {
        replaceWith.forEach((value, index) => {
            url = url.replace(/{\w+}/, replaceWith[index]);
        });
        return url;
    }
    return url;
};

/**
 * echart图表数据转换成v-charts图表的rows
 * 转换前的格式:
 * {
 *  datas: [],
 *  times: [],
 * }
 * 转换后的格式: [{date: value, ...}, {date: value, ...}]
 * @param {*} data
 * @param {*} columns Y轴对应的数据列 {'日期': 'times', '数据A': '10', '数据B': '20'} 第一个元素为X轴 后面的是Y轴对应的数据
 * @param {*} format 日期格式
 * 调用试例
 * echartToVchartData(data, {'date': 'times', 'mem': 'datas'})
 */
export const echartToVchartData = (data, columns = {}, format = 'YYYY-MM-DD HH:mm:ss') => {
    let rows = [];
    try {
        // 获取columns对应第一个元素的value
        let values = Object.values(columns);
        // x轴数据
        let dates = values[0];
        // 获取总行数
        let length = values[0].length;
        for (let index = 0; index < length; index++) {
            // 定义列
            let col = {};
            // 添加列
            for (let [key, value] of Object.entries(columns)) {
                if (key === 'date') {
                    col[key] = dateFormat(new Date(dates[index] * 1000), format);
                } else {
                    col[key] = data[value]['datas'][index];
                }
            }
            rows.push(col);
        }
        $log('转换后的数据', rows);
        return rows;
    } catch (err) {
        console.log(err.toString());
    }
    return rows;
};

/**
 * echart图表数据转换成v-charts图表的rows
 * 转换前的格式: 
 * [
 *    {
 *        legendname:'172.16.0.251',  //图例名称
 *        seriesData:["0.30","0.65"],  //y轴数值
 *        xData:["07:23","07:24"],  //日期
 *    }    
 * ]
 * 转换后的格式: { 
 *                 columns:['date','172.16.0.251'],
 *                 rows:[ 
 *                          { date:'07:23','172.16.0.251':'0.30' } 
 *                          { date:'07:24','172.16.0.251':'0.65' } 
 *                      ],
 * }

 * 调用试例
 * convertToVchartData(datas)
 */
export const convertToVchartData = datas => {
    let columns = ['date'];
    let rows = [];
    let outdata = {
        columns,
        rows
    };
    if (Array.isArray(datas)) {
        datas.forEach(data => {
            columns.push(data.legendname);
            if (data.seriesData && Array.isArray(data.seriesData)) {
                let xData = data.xData;
                data.seriesData.forEach((yData, idx) => {
                    if (!rows[idx]) {
                        rows[idx] = {};
                        rows[idx].date = xData[idx];
                    }
                    rows[idx][data.legendname] = yData;
                });
            }
        });
    }
    return outdata;
};

/**
 * 格式化状态内容
 * @param {*} module 状态列表
 * @param {*} value 状态值
 */
export const formatter = (module, value) => {
    if (Array.isArray(module) && value) {
        let item = module.find(arr => {
            return arr.value === value;
        });
        if (item !== undefined) {
            return `<span class="${item.className}"><i class="iconfont ${item.icon}"></i> ${item.text}</span>`;
        }
    }
    return '';
};

/**
 * 检测大写键是否开启
 * @param {*} e window.event
 */
export const checkCapsLock = e => {
    e = e || window.event;
    let valueCapsLock = e.keyCode ? e.keyCode : e.which; // 按键
    let valueShift = e.shiftKey ? e.shiftKey : valueCapsLock == 16 ? true : false; // shift键是否按住
    if (
        (valueCapsLock >= 65 && valueCapsLock <= 90 && !valueShift) || // 输入了大写字母，并且shift键没有按住，说明Caps Lock打开
        (valueCapsLock >= 97 && valueCapsLock <= 122 && valueShift)
    ) {
        // 输入了小写字母，并且按住 shift键，说明Caps Lock打开
        return true;
    } else {
        return false;
    }
};

/**
 * 给元素添加监听事件 addEventListener
 */
export const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/**
 * 移除某个元素的监听事件
 */
export const off = (function() {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
